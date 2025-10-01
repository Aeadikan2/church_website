-- Seed some sample announcements
INSERT INTO public.announcements (title, content, date)
VALUES 
  ('Sunday Service', 'Join us this Sunday at 10:00 AM for worship and fellowship.', CURRENT_DATE),
  ('Bible Study', 'Wednesday evening Bible study at 7:00 PM. All are welcome!', CURRENT_DATE + INTERVAL '2 days'),
  ('Community Outreach', 'Volunteer opportunity this Saturday. Help us serve our community.', CURRENT_DATE + INTERVAL '5 days');

-- Seed some sample blog posts
INSERT INTO public.blog_posts (title, content, excerpt, author, published_date, image_url)
VALUES 
  (
    'Walking in Faith',
    'Faith is the substance of things hoped for, the evidence of things not seen. In our daily walk with Christ, we are called to trust in His promises and lean not on our own understanding. This journey of faith is not always easy, but it is always worth it.',
    'Exploring what it means to walk by faith and not by sight in our daily lives.',
    'Pastor John Smith',
    CURRENT_DATE - INTERVAL '5 days',
    '/placeholder.svg?height=400&width=600'
  ),
  (
    'The Power of Prayer',
    'Prayer is our direct line to God. It is through prayer that we find strength, guidance, and peace. Whether in times of joy or sorrow, prayer connects us to the heart of our Heavenly Father and reminds us that we are never alone.',
    'Discovering the transformative power of prayer in our spiritual journey.',
    'Pastor John Smith',
    CURRENT_DATE - INTERVAL '12 days',
    '/placeholder.svg?height=400&width=600'
  );

-- Seed some sample gallery images
INSERT INTO public.gallery_images (title, image_url, description)
VALUES 
  ('Sunday Worship', '/placeholder.svg?height=400&width=600', 'Our vibrant Sunday morning worship service'),
  ('Youth Group', '/placeholder.svg?height=400&width=600', 'Youth fellowship and activities'),
  ('Community Service', '/placeholder.svg?height=400&width=600', 'Serving our community with love'),
  ('Christmas Celebration', '/placeholder.svg?height=400&width=600', 'Celebrating the birth of our Savior'),
  ('Baptism Service', '/placeholder.svg?height=400&width=600', 'New believers being baptized'),
  ('Prayer Meeting', '/placeholder.svg?height=400&width=600', 'Weekly prayer gathering');
