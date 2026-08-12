CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.lead_status AS ENUM ('New','Contacted','Qualified','Converted','Closed');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  location text NOT NULL,
  project_timeline text,
  service_interest text[] NOT NULL DEFAULT '{}',
  requirements text,
  source text NOT NULL DEFAULT 'Website Popup',
  status public.lead_status NOT NULL DEFAULT 'New',
  submission_count integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX leads_email_idx ON public.leads (email);
CREATE INDEX leads_phone_idx ON public.leads (phone);
CREATE INDEX leads_status_idx ON public.leads (status);
CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);

GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER leads_set_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.rate_limits (
  key text PRIMARY KEY,
  hits integer NOT NULL DEFAULT 0,
  window_start timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.rate_limits TO service_role;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.bump_rate_limit(_key text, _limit integer, _window_seconds integer)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _hits integer;
BEGIN
  INSERT INTO public.rate_limits (key, hits, window_start)
  VALUES (_key, 1, now())
  ON CONFLICT (key) DO UPDATE SET
    hits = CASE WHEN public.rate_limits.window_start < now() - make_interval(secs => _window_seconds) THEN 1 ELSE public.rate_limits.hits + 1 END,
    window_start = CASE WHEN public.rate_limits.window_start < now() - make_interval(secs => _window_seconds) THEN now() ELSE public.rate_limits.window_start END
  RETURNING hits INTO _hits;
  RETURN _hits <= _limit;
END; $$;