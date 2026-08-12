REVOKE ALL ON FUNCTION public.bump_rate_limit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.bump_rate_limit(text, integer, integer) TO service_role;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
CREATE POLICY "No direct access to rate limits" ON public.rate_limits FOR SELECT TO authenticated USING (false);