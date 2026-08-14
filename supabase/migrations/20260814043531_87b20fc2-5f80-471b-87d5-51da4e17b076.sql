CREATE POLICY "Admins can read floor plans"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'floor-plans' AND public.has_role(auth.uid(), 'admin'::public.app_role));