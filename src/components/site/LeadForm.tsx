import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { leadInputSchema, submitLead } from "@/lib/leads.functions";
import { SERVICE_INTERESTS, TIMELINES } from "@/lib/site";

type Errors = Partial<Record<string, string>>;

const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_BYTES = 5 * 1024 * 1024;

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("READ_FAILED"));
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(file);
  });

export function LeadForm({ onSuccess }: { onSuccess: () => void }) {
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [floorPlan, setFloorPlan] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setFloorPlan(null);
      setFileError(null);
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      setFloorPlan(null);
      setFileError("Please upload a JPG, PNG, WEBP or PDF file.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_BYTES) {
      setFloorPlan(null);
      setFileError("File is too large. Maximum size is 5 MB.");
      event.target.value = "";
      return;
    }
    setFileError(null);
    setFloorPlan(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      location: String(form.get("location") ?? ""),
      projectTimeline: String(form.get("projectTimeline") ?? ""),
      requirements: String(form.get("requirements") ?? ""),
      serviceInterest: services,
    };

    const parsed = leadInputSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setFormError(null);
      return;
    }

    setErrors({});
    setFormError(null);
    setSubmitting(true);

    try {
      const filePart = floorPlan
        ? {
            floorPlan: {
              name: floorPlan.name,
              type: floorPlan.type as "image/jpeg" | "image/png" | "image/webp" | "application/pdf",
              data: await fileToBase64(floorPlan),
            },
          }
        : {};
      await submitLead({ data: { ...payload, ...filePart } });
      onSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("TOO_MANY_REQUESTS")) {
        setFormError("You've sent a few enquiries already. Please try again a little later.");
      } else if (message.includes("FILE_TOO_LARGE") || message.includes("UPLOAD_FAILED")) {
        setFormError("We couldn't upload your floor plan. Please try a smaller file.");
      } else if (typeof navigator !== "undefined" && !navigator.onLine) {
        setFormError("Connection issue. Please check your internet connection and try again.");
      } else {
        setFormError("We couldn't submit your enquiry. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };


  const fieldClass = (key: string) =>
    errors[key] ? "border-destructive focus-visible:ring-destructive" : "";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            className={fieldClass("fullName")}
            aria-invalid={!!errors["fullName"]}
          />
          {errors["fullName"] ? (
            <p className="text-xs text-destructive">{errors["fullName"]}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            required
            className={fieldClass("phone")}
            aria-invalid={!!errors["phone"]}
          />
          {errors["phone"] ? <p className="text-xs text-destructive">{errors["phone"]}</p> : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            name="location"
            placeholder="Ambegaon BK, Pune"
            required
            className={fieldClass("location")}
            aria-invalid={!!errors["location"]}
          />
          {errors["location"] ? (
            <p className="text-xs text-destructive">{errors["location"]}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectTimeline">Possession</Label>
        <select
          id="projectTimeline"
          name="projectTimeline"
          defaultValue=""
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <option value="">When do you get possession?</option>
          {TIMELINES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">What are you looking for?</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICE_INTERESTS.map((service) => {
            const active = services.includes(service);
            return (
              <button
                type="button"
                key={service}
                onClick={() => toggleService(service)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  active
                    ? "border-forest bg-forest text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-forest/50"
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="requirements">Project Requirements</Label>
        <Textarea
          id="requirements"
          name="requirements"
          rows={3}
          placeholder="Tell us about your space or requirements..."
        />
      </div>

      {formError ? (
        <p role="alert" className="text-sm text-destructive">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Submitting...
          </>
        ) : (
          "Get a Consultation"
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Serving Ambegaon BK and greater Pune.
      </p>
    </form>
  );
}
