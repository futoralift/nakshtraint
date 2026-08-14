import { useQuery } from "@tanstack/react-query";
import { FileText, Loader2, Mail, MapPin, MessageCircle, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/site";

export type LeadRecord = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  location: string;
  project_timeline: string | null;
  service_interest: string[] | null;
  requirements: string | null;
  source: string;
  status: LeadStatus;
  submission_count: number;
  created_at: string;
  floor_plan_path: string | null;
  floor_plan_name: string | null;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export function LeadDetailDialog({
  lead,
  onClose,
  onStatusChange,
  statusPending,
}: {
  lead: LeadRecord;
  onClose: () => void;
  onStatusChange: (status: LeadStatus) => void;
  statusPending: boolean;
}) {
  const path = lead.floor_plan_path;

  const floorPlan = useQuery({
    queryKey: ["admin", "floor-plan", path],
    enabled: Boolean(path),
    staleTime: 4 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from("floor-plans")
        .createSignedUrl(path as string, 60 * 10);
      if (error) throw error;
      return data.signedUrl;
    },
  });

  const isPdf = (lead.floor_plan_name ?? path ?? "").toLowerCase().endsWith(".pdf");
  const digits = lead.phone.replace(/\D/g, "");

  const rows: Array<[string, string]> = [
    ["Phone", lead.phone],
    ["Email", lead.email || "—"],
    ["Location", lead.location],
    ["Possession / Timeline", lead.project_timeline ?? "—"],
    ["Service Interest", (lead.service_interest ?? []).join(", ") || "—"],
    ["Requirements", lead.requirements ?? "—"],
    ["Source", lead.source],
    ["Submitted", formatDate(lead.created_at)],
    ["Submissions", String(lead.submission_count)],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/60 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Lead details for ${lead.full_name}`}
        className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6 shadow-xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label-caps text-wood">Lead details</p>
            <h2 className="display mt-2 text-3xl text-forest">{lead.full_name}</h2>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5" /> {lead.location}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close lead details"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          <Button asChild className="w-full">
            <a href={`tel:${lead.phone}`}>
              <Phone className="size-4" /> Call {lead.phone}
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href={`https://wa.me/${digits}`} target="_blank" rel="noreferrer noopener">
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full" disabled={!lead.email}>
            <a href={`mailto:${lead.email ?? ""}`}>
              <Mail className="size-4" /> Email
            </a>
          </Button>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label} className="border-b border-border pb-3 text-sm">
              <dt className="label-caps text-muted-foreground">{label}</dt>
              <dd className="mt-1 break-words">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8">
          <p className="label-caps text-muted-foreground">Floor plan</p>
          {!path ? (
            <p className="mt-2 text-sm text-muted-foreground">No floor plan uploaded.</p>
          ) : floorPlan.isLoading ? (
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading floor plan…
            </p>
          ) : floorPlan.isError || !floorPlan.data ? (
            <p className="mt-2 text-sm text-destructive">Couldn&apos;t load the floor plan file.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {isPdf ? (
                <div className="flex items-center gap-2 border border-border bg-muted p-4 text-sm">
                  <FileText className="size-4 text-wood" />
                  {lead.floor_plan_name ?? "Floor plan.pdf"}
                </div>
              ) : (
                <a href={floorPlan.data} target="_blank" rel="noreferrer noopener">
                  <img
                    src={floorPlan.data}
                    alt={`Floor plan uploaded by ${lead.full_name}`}
                    className="max-h-72 w-full border border-border object-contain"
                  />
                </a>
              )}
              <Button asChild variant="outline" size="sm">
                <a href={floorPlan.data} target="_blank" rel="noreferrer noopener">
                  Open / download
                </a>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-2">
          <Label htmlFor="lead-status">Current Status</Label>
          <div className="flex items-center gap-3">
            <select
              id="lead-status"
              value={lead.status}
              disabled={statusPending}
              onChange={(event) => onStatusChange(event.target.value as LeadStatus)}
              className="h-9 flex-1 rounded-md border border-input bg-transparent px-3 text-sm"
            >
              {LEAD_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {statusPending ? (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
