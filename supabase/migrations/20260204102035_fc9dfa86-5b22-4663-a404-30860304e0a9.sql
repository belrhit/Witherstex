-- Add pieces per colis column to products table
ALTER TABLE public.products 
ADD COLUMN pcs_per_colis integer NOT NULL DEFAULT 30;

-- Remove stock column since it's no longer needed
ALTER TABLE public.products 
DROP COLUMN stock;