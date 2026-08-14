import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { LEAD_STATUSES, SERVICE_INTERESTS, type LeadStatus } from "@/lib/site";
import { LeadDetailDialog, type LeadRecord as Lead } from "@/components/admin/LeadDetailDialog";

const NAV = ["Overview", "Leads", "Settings"] as const;

const formatDate = (value: string) =>
  new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const queryClient = useQueryClient();
  const [section, setSection] = useState<(typeof NAV)[number]>("Overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeadStatus>("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [selected, setSelected] = useState<Lead | null>(null);

  const leadsQuery = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: async (): Promise<Lead[]> => {
      const { data, error } = await supabase
        .from("leads")
        .select(
          "id, full_name, phone, email, location, project_timeline, service_interest, requirements, source, status, submission_count, created_at, floor_plan_path, floor_plan_name",
        )
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Lead[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
      return { id, status };
    },
    onSuccess: ({ id, status }) => {
      toast.success(`Status updated to ${status}.`);
      setSelected((current) => (current && current.id === id ? { ...current, status } : current));
      queryClient.invalidateQueries({ queryKey: ["admin", "leads"] });
    },
    onError: () => toast.error("Couldn't update the status. Please try again."),
  });

  const rawLeads = leadsQuery.data;
  const leads = useMemo(() => rawLeads ?? [], [rawLeads]);

  const stats = useMemo(() => {
    const counts = { New: 0, Contacted: 0, Qualified: 0, Converted: 0 };
    for (const l of leads) {
      if (l.status in counts) counts[l.status as keyof typeof counts]++;
    }
    return { total: leads.length, ...counts };
  }, [leads]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = leads.filter((lead) => {
      const matchesTerm =
        !term ||
        [lead.full_name, lead.phone, lead.email, lead.location]
          .filter((v): v is string => Boolean(v))
          .some((value) => value.toLowerCase().includes(term));
      const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
      const matchesService =
        serviceFilter === "All" || (lead.service_interest ?? []).includes(serviceFilter);
      const matchesDate = !dateFilter || lead.created_at.slice(0, 10) === dateFilter;
      return matchesTerm && matchesStatus && matchesService && matchesDate;
    });
    return list.sort((a, b) =>
      sort === "newest"
        ? b.created_at.localeCompare(a.created_at)
        : a.created_at.localeCompare(b.created_at),
    );
  }, [leads, search, statusFilter, serviceFilter, dateFilter, sort]);

  return (
    <div className="min-h-screen bg-secondary lg:flex">
      <aside className="bg-sidebar text-sidebar-foreground lg:min-h-screen lg:w-60 lg:shrink-0">
        <div className="px-6 py-6">
          <img src="/logo.png" alt="Nakshtra Interior" className="h-10 w-auto object-contain" />
        </div>
        <nav aria-label="Admin sections" className="px-3 pb-6">
          <ul className="flex gap-1 lg:flex-col">
            {NAV.map((item) => (
              <li key={item} className="flex-1">
                <button
                  type="button"
                  onClick={() => setSection(item)}
                  aria-current={section === item}
                  className={`label-caps w-full px-3 py-3 text-left transition-colors ${
                    section === item
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground"
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
            <li className="flex-1">
              <button
                type="button"
                onClick={onSignOut}
                className="label-caps w-full px-3 py-3 text-left text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 px-5 py-8 sm:px-8">
        <header>
          <h1 className="display text-2xl uppercase tracking-[0.2em] text-forest">
            Nakshtra Interior
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Lead Management Dashboard</p>
        </header>

        {section === "Settings" ? (
          <section className="mt-8 max-w-xl border border-border bg-card p-6">
            <h2 className="text-lg">Settings</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Admin access is managed securely on the server. To change the admin email or password,
              update the stored credentials in your project&apos;s backend secrets — they are never
              stored in this dashboard or in your browser.
            </p>
            <Button variant="outline" className="mt-6" onClick={onSignOut}>
              Sign out
            </Button>
          </section>
        ) : (
          <>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
              {(
                [
                  ["Total Leads", stats.total],
                  ["New Leads", stats.New],
                  ["Contacted", stats.Contacted],
                  ["Qualified", stats.Qualified],
                  ["Converted", stats.Converted],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="border border-border bg-card p-5">
                  <dt className="label-caps text-muted-foreground">{label}</dt>
                  <dd className="display mt-3 text-3xl text-forest">
                    {leadsQuery.isLoading ? <Skeleton className="h-8 w-12" /> : value}
                  </dd>
                </div>
              ))}
            </dl>

            <section className="mt-8 border border-border bg-card">
              <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-2 xl:grid-cols-5">
                <div className="space-y-1">
                  <Label htmlFor="lead-search" className="text-xs">
                    Search
                  </Label>
                  <Input
                    id="lead-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Name, phone, email, location"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status-filter" className="text-xs">
                    Status
                  </Label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as "All" | LeadStatus)}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  >
                    <option value="All">All</option>
                    {LEAD_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="service-filter" className="text-xs">
                    Service
                  </Label>
                  <select
                    id="service-filter"
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  >
                    <option value="All">All</option>
                    {SERVICE_INTERESTS.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="date-filter" className="text-xs">
                    Date
                  </Label>
                  <Input
                    id="date-filter"
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="sort-order" className="text-xs">
                    Sort
                  </Label>
                  <select
                    id="sort-order"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>

              {leadsQuery.isLoading ? (
                <div className="space-y-3 p-4">
                  {[0, 1, 2, 3, 4].map((row) => (
                    <Skeleton key={row} className="h-10 w-full" />
                  ))}
                </div>
              ) : leadsQuery.isError ? (
                <div className="p-10 text-center text-sm text-destructive">
                  We couldn&apos;t load your enquiries. Please refresh and try again.
                </div>
              ) : leads.length === 0 ? (
                <div className="p-14 text-center">
                  <p className="display text-2xl text-forest">No enquiries yet.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    New website enquiries will appear here.
                  </p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="p-14 text-center text-sm text-muted-foreground">
                  No leads match these filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-sm">
                    <thead className="bg-muted text-left">
                      <tr className="label-caps text-muted-foreground">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Phone</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Service</th>
                        <th className="px-4 py-3">Timeline</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Submitted</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => setSelected(lead)}
                          className="cursor-pointer border-t border-border transition-colors hover:bg-accent/60"
                        >
                          <td className="px-4 py-3 font-medium">{lead.full_name}</td>
                          <td className="px-4 py-3">{lead.phone}</td>
                          <td className="px-4 py-3">{lead.email ?? "—"}</td>
                          <td className="px-4 py-3">{lead.location}</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {(lead.service_interest ?? []).join(", ") || "—"}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {lead.project_timeline ?? "—"}
                          </td>
                          <td className="px-4 py-3">
                            <span className="border border-forest/30 bg-accent px-2 py-1 text-xs text-forest">
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {formatDate(lead.created_at)}
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelected(lead);
                              }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>

      {selected ? (
        <LeadDetailDialog
          lead={selected}
          onClose={() => setSelected(null)}
          statusPending={updateStatus.isPending}
          onStatusChange={(status) => updateStatus.mutate({ id: selected.id, status })}
        />
      ) : null}
    </div>
  );
}
