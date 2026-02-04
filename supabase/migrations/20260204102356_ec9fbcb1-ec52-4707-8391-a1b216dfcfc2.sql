-- Remove price column since pricing is now handled outside the system
ALTER TABLE public.products 
DROP COLUMN price;