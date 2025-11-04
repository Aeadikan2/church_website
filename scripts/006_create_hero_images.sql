-- Create hero_images table
CREATE TABLE IF NOT EXISTS public.hero_images (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	page TEXT NOT NULL,
	image_url TEXT NOT NULL,
	caption TEXT,
	ordering INTEGER DEFAULT 0,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example seed rows for home page (optional)
INSERT INTO public.hero_images (page, image_url, caption, ordering)
VALUES
	('home', '/wfc1.jpg', 'Welcome to Word Faith Church', 1),
	('home', '/wfc2.jpg', 'Join us in worship', 2),
	('home', '/wfc3.jpg', 'Grow in faith with us', 3)
ON CONFLICT (id) DO NOTHING;
