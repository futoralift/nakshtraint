-- Allow public website visitors (anon) to submit leads
GRANT INSERT ON public.leads TO anon, authenticated;

CREATE POLICY "Allow public lead submissions"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

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
