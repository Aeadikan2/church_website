-- Enable Row Level Security on all tables
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Announcements policies (public read, admin write)
CREATE POLICY "announcements_public_read"
  ON public.announcements FOR SELECT
  USING (true);

CREATE POLICY "announcements_admin_insert"
  ON public.announcements FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "announcements_admin_update"
  ON public.announcements FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "announcements_admin_delete"
  ON public.announcements FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Blog posts policies (public read, admin write)
CREATE POLICY "blog_posts_public_read"
  ON public.blog_posts FOR SELECT
  USING (true);

CREATE POLICY "blog_posts_admin_insert"
  ON public.blog_posts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "blog_posts_admin_update"
  ON public.blog_posts FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "blog_posts_admin_delete"
  ON public.blog_posts FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Gallery images policies (public read, admin write)
CREATE POLICY "gallery_images_public_read"
  ON public.gallery_images FOR SELECT
  USING (true);

CREATE POLICY "gallery_images_admin_insert"
  ON public.gallery_images FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "gallery_images_admin_update"
  ON public.gallery_images FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "gallery_images_admin_delete"
  ON public.gallery_images FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- About content policies (public read, admin write)
CREATE POLICY "about_content_public_read"
  ON public.about_content FOR SELECT
  USING (true);

CREATE POLICY "about_content_admin_update"
  ON public.about_content FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Contact submissions policies (public insert, admin read/delete)
CREATE POLICY "contact_submissions_public_insert"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "contact_submissions_admin_read"
  ON public.contact_submissions FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "contact_submissions_admin_delete"
  ON public.contact_submissions FOR DELETE
  USING (auth.uid() IS NOT NULL);
