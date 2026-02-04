import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, TechnicalSpecs } from '@/types';
import { toast } from 'sonner';

// Transform database row to frontend Product type
const transformProduct = (row: {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  image_url: string | null;
  technical_specs: unknown;
  pcs_per_colis: number;
  is_b2b: boolean;
  badge: string | null;
}): Product => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  category: row.category as Product['category'],
  images: row.images,
  imageUrl: row.image_url || undefined,
  technicalSpecs: row.technical_specs as TechnicalSpecs,
  pcsPerColis: row.pcs_per_colis,
  isB2B: row.is_b2b,
  badge: row.badge || undefined,
});

// Fetch all products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return (data || []).map(transformProduct);
    },
  });
};

// Fetch single product by slug
export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['products', slug],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        console.error('Error fetching product:', error);
        throw error;
      }

      return transformProduct(data);
    },
    enabled: !!slug,
  });
};

// Create product mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: Omit<Product, 'id'>) => {
      const insertData = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        category: product.category,
        images: product.images,
        image_url: product.imageUrl || null,
        technical_specs: JSON.parse(JSON.stringify(product.technicalSpecs)),
        pcs_per_colis: product.pcsPerColis,
        is_b2b: product.isB2B,
        badge: product.badge || null,
      };

      const { data, error } = await supabase
        .from('products')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;
      return transformProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produit ajouté avec succès');
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      toast.error('Erreur lors de l\'ajout du produit');
    },
  });
};

// Update product mutation
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Product> }) => {
      const dbUpdates: Record<string, unknown> = {};
      
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.category !== undefined) dbUpdates.category = updates.category;
      if (updates.images !== undefined) dbUpdates.images = updates.images;
      if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl || null;
      if (updates.technicalSpecs !== undefined) dbUpdates.technical_specs = updates.technicalSpecs;
      if (updates.pcsPerColis !== undefined) dbUpdates.pcs_per_colis = updates.pcsPerColis;
      if (updates.isB2B !== undefined) dbUpdates.is_b2b = updates.isB2B;
      if (updates.badge !== undefined) dbUpdates.badge = updates.badge || null;

      const { data, error } = await supabase
        .from('products')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return transformProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produit mis à jour');
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      toast.error('Erreur lors de la mise à jour');
    },
  });
};

// Delete product mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Produit supprimé');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      toast.error('Erreur lors de la suppression');
    },
  });
};
