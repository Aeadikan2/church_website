-- Create live_services table
CREATE TABLE IF NOT EXISTS public.live_services (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	title TEXT NOT NULL,
	description TEXT,
	image_url TEXT,
	link TEXT,
	ordering INTEGER DEFAULT 0,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example seed
INSERT INTO public.live_services (title, description, image_url, link, ordering)
VALUES (
	'Sunday Morning Service',
	'Join our live Sunday morning service every week.',
	'/live_bg.jpg',
	'https://youtube.com/example',
	1
)
ON CONFLICT (id) DO NOTHING;
