
DROP POLICY "Anyone can update rituals" ON public.rituals;

CREATE POLICY "Anyone can finalize a pending ritual"
  ON public.rituals
  FOR UPDATE
  TO anon, authenticated
  USING (completed_status = false AND created_at > now() - interval '24 hours')
  WITH CHECK (created_at > now() - interval '24 hours');
