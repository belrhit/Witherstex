import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, LogOut, Package, Upload, X, Loader2, ArrowLeft, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
// useStore not needed anymore since we removed orders
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import type { Product } from '@/types';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

// Product images for display
import productKevlar from '@/assets/product-kevlar.jpg';
import productNitrile from '@/assets/product-nitrile.jpg';
import productWelding from '@/assets/product-welding.jpg';
import productChemical from '@/assets/product-chemical.jpg';

const productImages: Record<string, string> = {
  '1': productNitrile,
  '2': productChemical,
  '3': productWelding,
  '4': productKevlar,
  '5': productNitrile,
  '6': productKevlar,
  '7': productChemical,
  '8': productWelding,
  '9': productKevlar,
  '10': productNitrile,
  '11': productWelding,
  '12': productChemical,
  '13': productNitrile,
};

const Admin = () => {
  const { user, loading: authLoading, isAdmin, signIn, signUp, signOut } = useAuth();
  const { language, cycleLanguage, t } = useLanguage();

  const getLanguageLabel = () => {
    switch (language) {
      case 'fr': return 'FR';
      case 'en': return 'EN';
      case 'zh': return '中文';
    }
  };

  // Database products
  const { data: products, isLoading: productsLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  // Removed activeTab since we only have products now
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    pcsPerColis: '30',
    category: 'industrial' as Product['category'],
    availableSizes: '8, 9, 10',
    material: '',
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            setAuthError(t('toast.emailUsed'));
          } else {
            setAuthError(error.message);
          }
        } else {
          toast.success(t('toast.accountCreated'));
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setAuthError(t('toast.invalidCredentials'));
          } else {
            setAuthError(error.message);
          }
        } else {
          toast.success(t('toast.loginSuccess'));
        }
      }
    } catch (error) {
      setAuthError(t('toast.error'));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success(t('toast.logoutSuccess'));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      pcsPerColis: '30',
      category: 'industrial',
      availableSizes: '8, 9, 10',
      material: '',
    });
    setEditingProduct(null);
    setIsAddingProduct(false);
    setUploadedImageUrl(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setUploadedImageUrl(product.imageUrl || null);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      pcsPerColis: product.pcsPerColis.toString(),
      category: product.category,
      availableSizes: product.technicalSpecs?.sizes || '8, 9, 10',
      material: product.technicalSpecs?.material || '',
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('toast.selectImage'));
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('toast.imageTooLarge'));
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setUploadedImageUrl(publicUrl);
      toast.success(t('toast.imageUploaded'));
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(t('toast.uploadError'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveProduct = async () => {
    if (!formData.name) {
      toast.error(t('toast.fillRequired'));
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const technicalSpecs = {
      material: formData.material || 'À définir',
      coating: 'À définir',
      sizes: formData.availableSizes || '8, 9, 10',
      certification: 'EN388',
      resistance: 'À définir',
    };

    if (editingProduct) {
      updateProduct.mutate({
        id: editingProduct.id,
        updates: {
          name: formData.name,
          slug,
          description: formData.description,
          category: formData.category,
          technicalSpecs,
          pcsPerColis: parseInt(formData.pcsPerColis) || 30,
          imageUrl: uploadedImageUrl || undefined,
        }
      });
    } else {
      createProduct.mutate({
        name: formData.name,
        slug,
        description: formData.description,
        category: formData.category,
        images: ['/placeholder.svg'],
        imageUrl: uploadedImageUrl || undefined,
        technicalSpecs,
        pcsPerColis: parseInt(formData.pcsPerColis) || 30,
        isB2B: true, // All products are B2B
      });
    }
    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm(t('admin.deleteConfirm'))) {
      deleteProduct.mutate(id);
    }
  };

  const productList = products || [];

  // Loading Screen
  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-petrol" />
      </main>
    );
  }

  // Login/Signup Screen
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-lg border border-border p-8 shadow-lg">
            <h1 className="font-heading text-2xl font-bold text-center mb-2">
              {t('admin.auth.title')}
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              {t('admin.auth.subtitle')}
            </p>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.auth.email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@witherstex.com"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-petrol"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('admin.auth.password')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-petrol"
                  required
                  minLength={6}
                />
              </div>
              
              {authError && (
                <p className="text-destructive text-sm">{authError}</p>
              )}
              
              <button 
                type="submit" 
                className="btn-primary w-full flex items-center justify-center gap-2"
                disabled={isAuthLoading}
              >
                {isAuthLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isSignUp ? t('admin.auth.signup') : t('admin.auth.login')}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setAuthError('');
                }}
                className="text-sm text-petrol hover:underline"
              >
                {isSignUp ? t('admin.auth.hasAccount') : t('admin.auth.noAccount')}
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  // Not Admin - Access Denied
  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-lg border border-border p-8 shadow-lg text-center">
            <h1 className="font-heading text-2xl font-bold mb-2 text-destructive">
              {t('admin.auth.accessDenied')}
            </h1>
            <p className="text-muted-foreground mb-4">
              {t('admin.auth.noPermission')}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {t('admin.auth.loggedAs')} {user.email}
            </p>
            <button 
              onClick={handleSignOut}
              className="btn-secondary flex items-center gap-2 mx-auto"
            >
              <LogOut className="w-4 h-4" />
              {t('admin.logout')}
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-anthracite text-sand-light py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-xl font-bold">
              {t('admin.title')}
            </h1>
            <p className="text-sand/70 text-sm">{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switch Button */}
            <button
              onClick={cycleLanguage}
              className="flex items-center gap-2 px-3 py-2 bg-sand/10 hover:bg-sand/20 rounded-full transition-colors"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium text-sm">{getLanguageLabel()}</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sand/70 hover:text-sand-light transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t('admin.logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Products Header */}
        <div className="flex items-center gap-2 mb-8">
          <Package className="w-5 h-5 text-petrol" />
          <h2 className="text-xl font-semibold">{t('admin.products')} ({productList.length})</h2>
        </div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
            {/* Add Product Button */}
            {!isAddingProduct && !editingProduct && (
              <button
                onClick={() => setIsAddingProduct(true)}
                className="btn-primary mb-6 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {t('admin.addProduct')}
              </button>
            )}

            {/* Product Form */}
            {(isAddingProduct || editingProduct) && (
              <div className="bg-card border border-border rounded-lg p-6 mb-8">
                {/* Back Button */}
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('admin.backToList')}
                </button>
                <h2 className="font-heading text-xl font-bold mb-4">
                  {editingProduct ? t('admin.editProduct') : t('admin.newProduct')}
                </h2>

                {/* Image Upload Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">{t('admin.productImage')}</label>
                  
                  {uploadedImageUrl ? (
                    <div className="relative inline-block">
                      <img
                        src={uploadedImageUrl}
                        alt="Aperçu du produit"
                        className="w-32 h-32 object-cover rounded-lg border border-border"
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-32 h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-petrol transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      {isUploading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-petrol"></div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                          <span className="text-xs text-muted-foreground text-center">{t('admin.upload')}</span>
                        </>
                      )}
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {t('admin.imageFormats')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('admin.name')} *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('admin.slug')}</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder={t('admin.slugPlaceholder')}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('admin.pcsPerColis')}</label>
                    <input
                      type="number"
                      value={formData.pcsPerColis}
                      onChange={(e) => setFormData({ ...formData, pcsPerColis: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{t('admin.minOrder')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('admin.category')}</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Product['category'] })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="industrial">{t('admin.categoryIndustrial')}</option>
                      <option value="chemical">{t('admin.categoryChemical')}</option>
                      <option value="handling">{t('admin.categoryHandling')}</option>
                      <option value="thermal">{t('admin.categoryThermal')}</option>
                      <option value="precision">{t('admin.categoryPrecision')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('admin.availableSizes')}</label>
                    <input
                      type="text"
                      value={formData.availableSizes}
                      onChange={(e) => setFormData({ ...formData, availableSizes: e.target.value })}
                      placeholder={t('admin.sizesPlaceholder')}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t('admin.material')}</label>
                    <input
                      type="text"
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      placeholder={t('admin.materialPlaceholder')}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">{t('admin.description')}</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> {t('admin.orderNote')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={handleSaveProduct} 
                    className="btn-primary"
                    disabled={createProduct.isPending || updateProduct.isPending}
                  >
                    {(createProduct.isPending || updateProduct.isPending) ? t('admin.saving') : editingProduct ? t('admin.save') : t('admin.add')}
                  </button>
                  <button onClick={resetForm} className="btn-secondary">
                    {t('admin.cancel')}
                  </button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                {productsLoading ? (
                  <div className="p-8 space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 w-full bg-muted animate-pulse rounded" />
                    ))}
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>{t('admin.image')}</th>
                        <th>{t('admin.name')}</th>
                        <th>{t('admin.category')}</th>
                        <th>{t('admin.pcsPerColis')}</th>
                        <th>{t('admin.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((product) => {
                        const imageUrl = product.imageUrl || productImages[product.id] || productNitrile;
                        return (
                          <tr key={product.id}>
                            <td>
                              <div className="w-12 h-12 rounded overflow-hidden bg-sand-light">
                                <img
                                  src={imageUrl}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>
                            <td>
                              <div>
                                <span className="font-medium">{product.name}</span>
                                {product.isB2B && (
                                  <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">B2B</span>
                                )}
                              </div>
                            </td>
                            <td className="capitalize">{product.category}</td>
                            <td className="font-medium">{product.pcsPerColis} pcs</td>
                            <td>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="p-2 hover:bg-muted rounded transition-colors"
                                  title={t('admin.edit')}
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                                  title={t('admin.delete')}
                                  disabled={deleteProduct.isPending}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Admin;
