-- Create monthly_declarations table
CREATE TABLE IF NOT EXISTS public.monthly_declarations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  declaration TEXT NOT NULL,
  bible_references TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- (Optional) Insert a sample declaration
INSERT INTO public.monthly_declarations (title, declaration, bible_references)
VALUES (
  'March Declaration',
  'We declare a month of fruitfulness and spiritual growth over our church and families.',
  'John 15:5; Galatians 5:22-23'
)
ON CONFLICT (id) DO NOTHING;
