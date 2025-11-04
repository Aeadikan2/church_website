-- Enable Row Level Security for hero_images, live_services, and give_accounts and add policies

ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.give_accounts ENABLE ROW LEVEL SECURITY;

-- Public read for hero_images
CREATE POLICY "hero_images_public_read"
  ON public.hero_images FOR SELECT
  USING (true);

CREATE POLICY "hero_images_admin_insert"
  ON public.hero_images FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "hero_images_admin_update"
  ON public.hero_images FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "hero_images_admin_delete"
  ON public.hero_images FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Public read for live_services
CREATE POLICY "live_services_public_read"
  ON public.live_services FOR SELECT
  USING (true);

CREATE POLICY "live_services_admin_insert"
  ON public.live_services FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "live_services_admin_update"
  ON public.live_services FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "live_services_admin_delete"
  ON public.live_services FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Public read for give_accounts
CREATE POLICY "give_accounts_public_read"
  ON public.give_accounts FOR SELECT
  USING (true);

CREATE POLICY "give_accounts_admin_insert"
  ON public.give_accounts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "give_accounts_admin_update"
  ON public.give_accounts FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "give_accounts_admin_delete"
  ON public.give_accounts FOR DELETE
  USING (auth.uid() IS NOT NULL);
