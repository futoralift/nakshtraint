-- Allow public website visitors (anon) to submit leads
GRANT INSERT ON public.leads TO anon, authenticated;

DO $$ BEGIN
  CREATE POLICY "Allow public lead submissions"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Allow bump_rate_limit for spam protection
GRANT EXECUTE ON FUNCTION public.bump_rate_limit(text, integer, integer) TO anon, authenticated;
GRANT ALL ON public.rate_limits TO anon, authenticated;

DO $$ BEGIN
  CREATE POLICY "Allow rate limit tracking"
  ON public.rate_limits
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Allow floor-plans bucket creation and public file uploads
DO $$ BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('floor-plans', 'floor-plans', false)
  ON CONFLICT (id) DO NOTHING;
EXCEPTION WHEN OTHERS THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow public upload floor plans"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'floor-plans');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE POLICY "Allow public read floor plans"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'floor-plans');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

