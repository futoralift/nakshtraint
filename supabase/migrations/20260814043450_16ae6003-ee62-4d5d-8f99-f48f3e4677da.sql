ALTER TABLE public.leads ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS floor_plan_path text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS floor_plan_name text;