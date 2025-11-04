-- Create give_accounts table
CREATE TABLE IF NOT EXISTS public.give_accounts (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	title TEXT NOT NULL,
	account_number TEXT NOT NULL,
	image_url TEXT,
	instructions TEXT,
	ordering INTEGER DEFAULT 0,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Example seed
INSERT INTO public.give_accounts (title, account_number, image_url, instructions, ordering)
VALUES (
	'Main Church Account',
	'0123456789',
	'/give_bg.jpg',
	'Please use the account number above and reference "Tithe" in your transfer notes.',
	1
)
ON CONFLICT (id) DO NOTHING;
