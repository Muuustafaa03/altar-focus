
CREATE TABLE public.rituals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT,
  sacrifice_text TEXT NOT NULL,
  duration INTEGER NOT NULL,
  completed_status BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.rituals ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous) to insert rituals
CREATE POLICY "Anyone can insert rituals"
  ON public.rituals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to update rituals (used to mark complete/abandoned by id)
CREATE POLICY "Anyone can update rituals"
  ON public.rituals
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
