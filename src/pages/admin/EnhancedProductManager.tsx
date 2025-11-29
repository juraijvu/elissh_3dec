import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, Package, Search, Star, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';

const EnhancedProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    brand: '',
    categoryId: '',
    price: '',
    originalPrice: '',
    stock: '',
    sku: '',
    weight: '',
    howToUse: '',
    ingredients: [],
    benefits: [],
    variants: [],
    deliveryDays: '3',
    codAvailable: true,
    isHalal: false,
    isVegan: false,
    isCrueltyFree: false,
    isActive: true,
    isFeatured: false,
    isOnSale: false,
    images: []
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [newBenefit, setNewBenefit] = useState('');
  const [selectedVariantType, setSelectedVariantType] = useState('colors');
  const [newVariant, setNewVariant] = useState({ name: '', value: '' });
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast({ title: 'Failed to fetch products', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock),
        weight: formData.weight ? parseFloat(formData.weight) : null,
        deliveryDays: parseInt(formData.deliveryDays),
        categoryId: parseInt(formData.categoryId),
        images: formData.images,
        ingredients: formData.ingredients,
        benefits: formData.benefits,
        variants: formData.variants
      };
      
      if (editingProduct) {
        const response = await api.put(`/admin/products/${editingProduct.id}`, productData);
        const data = await response.json();
        if (data.success) {
          toast({ title: 'Product updated successfully!' });
        } else {
          throw new Error(data.message);
        }
      } else {
        const response = await api.post('/admin/products', productData);
        const data = await response.json();
        if (data.success) {
          toast({ title: 'Product created successfully!' });
        } else {
          throw new Error(data.message);
        }
      }
      setIsDialogOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Save error:', error);
      toast({ title: 'Failed to save product', variant: 'destructive' });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription || '',
      brand: product.brand,
      categoryId: product.categoryId?.toString() || '',
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      stock: product.stock.toString(),
      sku: product.sku,
      weight: product.weight?.toString() || '',
      howToUse: product.howToUse || '',
      ingredients: Array.isArray(product.ingredients) ? product.ingredients : [],
      benefits: Array.isArray(product.benefits) ? product.benefits : [],
      variants: Array.isArray(product.variants) ? product.variants : [],
      deliveryDays: product.deliveryDays?.toString() || '3',
      codAvailable: product.codAvailable ?? true,
      isHalal: product.isHalal || false,
      isVegan: product.isVegan || false,
      isCrueltyFree: product.isCrueltyFree || false,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      isOnSale: product.isOnSale,
      images: Array.isArray(product.images) ? product.images : []
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await api.delete(`/admin/products/${id}`);
        const data = await response.json();
        if (data.success) {
          toast({ title: 'Product deleted successfully!' });
          fetchProducts();
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        toast({ title: 'Failed to delete product', variant: 'destructive' });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      shortDescription: '',
      brand: '',
      categoryId: '',
      price: '',
      originalPrice: '',
      stock: '',
      sku: '',
      weight: '',
      howToUse: '',
      ingredients: [],
      benefits: [],
      variants: [],
      deliveryDays: '3',
      codAvailable: true,
      isHalal: false,
      isVegan: false,
      isCrueltyFree: false,
      isActive: true,
      isFeatured: false,
      isOnSale: false,
      images: []
    });
    setEditingProduct(null);
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };

  const removeIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }));
      setNewBenefit('');
    }
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addVariant = () => {
    if (newVariant.name.trim() && newVariant.value.trim()) {
      const variant = {
        type: selectedVariantType,
        name: newVariant.name.trim(),
        value: newVariant.value.trim()
      };
      setFormData(prev => ({
        ...prev,
        variants: [...prev.variants, variant]
      }));
      setNewVariant({ name: '', value: '' });
    }
  };

  const removeVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('Selected file:', file.name, file.type, file.size);

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    
    // Log FormData contents
    for (let pair of formDataUpload.entries()) {
      console.log('FormData entry:', pair[0], pair[1]);
    }

    try {
      // Use fetch directly to avoid API client issues
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/upload/image', {
        method: 'POST',
        body: formDataUpload,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      console.log('Upload response:', data);
      
      if (data.success) {
        setFormData(prev => {
          const newImages = [...prev.images];
          newImages[0] = data.imageUrl;
          return {
            ...prev,
            images: newImages
          };
        });
        toast({ title: 'Main image uploaded successfully!' });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Failed to upload image', variant: 'destructive' });
    }
  };

  const handleGalleryImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const formDataUpload = new FormData();
    files.forEach(file => {
      formDataUpload.append('images', file);
    });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/upload/images', {
        method: 'POST',
        body: formDataUpload,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...data.imageUrls]
        }));
        toast({ title: `${files.length} images uploaded successfully!` });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'Failed to upload images', variant: 'destructive' });
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'none' || product.categoryId?.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 pt-2">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Product Management</h1>
          <p className="text-muted-foreground">Complete product catalog management</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand">Brand *</Label>
                      <Input
                        id="brand"
                        value={formData.brand}
                        onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                      placeholder="Brief product description"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Full Description *</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="howToUse">How to Use</Label>
                    <Textarea
                      id="howToUse"
                      rows={3}
                      value={formData.howToUse}
                      onChange={(e) => setFormData(prev => ({ ...prev, howToUse: e.target.value }))}
                      placeholder="Instructions for product usage"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Category & Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Category & Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="categoryId">Category *</Label>
                      <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="sku">SKU *</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="price">Price (AED) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice">Original Price (AED)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (g)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        value={formData.weight}
                        onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery & Availability */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Delivery & Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryDays">Delivery Days</Label>
                      <Input
                        id="deliveryDays"
                        type="number"
                        min="1"
                        max="30"
                        value={formData.deliveryDays}
                        onChange={(e) => setFormData(prev => ({ ...prev, deliveryDays: e.target.value }))}
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Checkbox
                        id="codAvailable"
                        checked={formData.codAvailable}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, codAvailable: checked }))}
                      />
                      <Label htmlFor="codAvailable">Cash on Delivery Available</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Certifications & Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isHalal"
                        checked={formData.isHalal}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isHalal: checked }))}
                      />
                      <Label htmlFor="isHalal">Halal Certified</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isVegan"
                        checked={formData.isVegan}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVegan: checked }))}
                      />
                      <Label htmlFor="isVegan">Vegan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isCrueltyFree"
                        checked={formData.isCrueltyFree}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isCrueltyFree: checked }))}
                      />
                      <Label htmlFor="isCrueltyFree">Cruelty Free</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Variants */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Variants</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Variant Type</Label>
                    <Select value={selectedVariantType} onValueChange={setSelectedVariantType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="colors">Colors</SelectItem>
                        <SelectItem value="skinType">Skin Type</SelectItem>
                        <SelectItem value="size">Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Name (e.g., Rose Gold)"
                      value={newVariant.name}
                      onChange={(e) => setNewVariant(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      placeholder={selectedVariantType === 'colors' ? 'Hex code (e.g., #FF5733)' : 'Value'}
                      value={newVariant.value}
                      onChange={(e) => setNewVariant(prev => ({ ...prev, value: e.target.value }))}
                    />
                  </div>
                  <Button type="button" onClick={addVariant} className="w-full">Add Variant</Button>
                  <div className="flex flex-wrap gap-2">
                    {formData.variants.map((variant, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        {variant.type === 'colors' && variant.value.startsWith('#') && (
                          <div 
                            className="w-3 h-3 rounded-full border" 
                            style={{ backgroundColor: variant.value }}
                          />
                        )}
                        <span>{variant.name}</span>
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeVariant(index)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ingredients */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ingredients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add ingredient"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                    />
                    <Button type="button" onClick={addIngredient}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {ingredient}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeIngredient(index)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add benefit"
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                    />
                    <Button type="button" onClick={addBenefit}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {benefit}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeBenefit(index)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Images</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mainImage">Main Product Image</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="mainImage"
                        accept="image/*"
                        onChange={handleMainImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                    </div>
                    {formData.images && formData.images.length > 0 && formData.images[0] && (
                      <div className="mt-2">
                        <div className="w-32 h-32 border rounded-lg overflow-hidden bg-gray-50">
                          <img 
                            src={`http://localhost:5001${formData.images[0]}`}
                            alt="Main product" 
                            className="w-full h-full object-cover"
                            onLoad={() => console.log('Image loaded successfully:', formData.images[0])}
                            onError={(e) => {
                              console.error('Image load error:', e.target.src);
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Main Image</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="galleryImages">Gallery Images (up to 10)</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="galleryImages"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryImagesUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90"
                      />
                    </div>
                    {formData.images && formData.images.length > 1 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-2">Gallery Images ({formData.images.length - 1})</p>
                        <div className="grid grid-cols-4 gap-2">
                          {formData.images.slice(1).map((img, index) => (
                            <div key={index} className="relative">
                              <img 
                                src={img.startsWith('http') ? img : `http://localhost:5001${img}`} 
                                alt={`Gallery ${index + 1}`} 
                                className="w-20 h-20 object-cover rounded-lg border"
                                onError={(e) => {
                                  console.error('Gallery image load error:', e.target.src);
                                  e.target.style.display = 'none';
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removeGalleryImage(index + 1)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                      />
                      <Label htmlFor="isActive">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                      />
                      <Label htmlFor="isFeatured">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isOnSale"
                        checked={formData.isOnSale}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isOnSale: checked }))}
                      />
                      <Label htmlFor="isOnSale">On Sale</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Update' : 'Create'} Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products by name, brand, or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                  {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                    <img 
                      src={`http://localhost:5001${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onLoad={() => console.log('Admin card image loaded:', product.images[0])}
                      onError={(e) => {
                        console.error('Admin card image error:', e.target.src);
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Package className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex gap-1 ml-2">
                      {product.isFeatured && <Star className="h-3 w-3 text-yellow-500" />}
                      {product.isOnSale && <Badge variant="destructive" className="text-xs">Sale</Badge>}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
                  <p className="text-xs text-muted-foreground mb-3">{product.category?.name}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.isHalal && <Badge variant="outline" className="text-xs">Halal</Badge>}
                    {product.isVegan && <Badge variant="outline" className="text-xs">Vegan</Badge>}
                    {product.isCrueltyFree && <Badge variant="outline" className="text-xs">Cruelty Free</Badge>}
                    {product.codAvailable && <Badge variant="outline" className="text-xs">COD</Badge>}
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">AED {product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">AED {product.originalPrice}</span>
                      )}
                    </div>
                    <Badge variant={product.stock < 10 ? 'destructive' : 'default'} className="text-xs">
                      {product.stock} in stock
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <Badge variant={product.isActive ? 'default' : 'secondary'} className="text-xs">
                        {product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedProductManager;