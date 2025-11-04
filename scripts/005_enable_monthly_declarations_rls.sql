-- Enable Row Level Security for monthly_declarations and add policies
ALTER TABLE public.monthly_declarations ENABLE ROW LEVEL SECURITY;

-- Allow public read of monthly_declarations
CREATE POLICY "monthly_declarations_public_read"
  ON public.monthly_declarations FOR SELECT
  USING (true);

-- Allow authenticated users (admins) to insert
CREATE POLICY "monthly_declarations_admin_insert"
  ON public.monthly_declarations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users (admins) to update
CREATE POLICY "monthly_declarations_admin_update"
  ON public.monthly_declarations FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users (admins) to delete
CREATE POLICY "monthly_declarations_admin_delete"
  ON public.monthly_declarations FOR DELETE
  USING (auth.uid() IS NOT NULL);
