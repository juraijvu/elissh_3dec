import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye, Calendar, User, Tag, Upload, Save, FileText } from 'lucide-react';

const BlogManager = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Summer Skincare Routine',
      slug: 'summer-skincare-routine',
      excerpt: 'Essential tips for maintaining healthy skin during summer',
      status: 'published',
      author: 'Admin User',
      publishedAt: '2024-01-15',
      categories: ['Skincare', 'Tips'],
      tags: ['summer', 'skincare', 'routine'],
      views: 1250,
      likes: 45
    },
    {
      id: 2,
      title: 'Top 10 Makeup Trends 2024',
      slug: 'top-10-makeup-trends-2024',
      excerpt: 'Discover the hottest makeup trends for this year',
      status: 'draft',
      author: 'Admin User',
      publishedAt: null,
      categories: ['Makeup', 'Trends'],
      tags: ['makeup', 'trends', '2024'],
      views: 0,
      likes: 0
    }
  ]);

  const [editingBlog, setEditingBlog] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    categories: [],
    tags: [],
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    scheduledAt: ''
  });

  const blogCategories = ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Tips', 'Trends', 'Reviews', 'Tutorials'];

  const handleSaveBlog = () => {
    if (editingBlog) {
      setBlogs(prev => prev.map(blog => 
        blog.id === editingBlog.id 
          ? { ...blog, ...blogForm, publishedAt: blogForm.status === 'published' ? new Date().toISOString().split('T')[0] : null }
          : blog
      ));
    } else {
      const newBlog = {
        ...blogForm,
        id: Date.now(),
        author: 'Admin User',
        publishedAt: blogForm.status === 'published' ? new Date().toISOString().split('T')[0] : null,
        views: 0,
        likes: 0
      };
      setBlogs(prev => [...prev, newBlog]);
    }
    resetForm();
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content || '',
      featuredImage: blog.featuredImage || '',
      categories: blog.categories,
      tags: blog.tags,
      status: blog.status,
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      scheduledAt: blog.scheduledAt || ''
    });
    setShowEditor(true);
  };

  const handleDeleteBlog = (id) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    }
  };

  const resetForm = () => {
    setBlogForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      categories: [],
      tags: [],
      status: 'draft',
      metaTitle: '',
      metaDescription: '',
      scheduledAt: ''
    });
    setEditingBlog(null);
    setShowEditor(false);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-');
  };

  if (showEditor) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h1>
            <p className="text-muted-foreground">Write and publish engaging content</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button onClick={handleSaveBlog}>
              <Save className="w-4 h-4 mr-2" />
              {blogForm.status === 'published' ? 'Publish' : 'Save Draft'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="content">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="title">Blog Title</Label>
                      <Input
                        id="title"
                        value={blogForm.title}
                        onChange={(e) => {
                          setBlogForm(prev => ({ 
                            ...prev, 
                            title: e.target.value,
                            slug: generateSlug(e.target.value)
                          }));
                        }}
                        placeholder="Enter blog title"
                        className="text-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={blogForm.slug}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="blog-url-slug"
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        rows={3}
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Brief description of the blog post"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        rows={20}
                        value={blogForm.content}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your blog content here..."
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        You can use Markdown formatting
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        value={blogForm.metaTitle}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="SEO title for search engines"
                      />
                    </div>

                    <div>
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        rows={3}
                        value={blogForm.metaDescription}
                        onChange={(e) => setBlogForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                        placeholder="SEO description for search engines"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Publishing Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={blogForm.status} onValueChange={(value) => setBlogForm(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {blogForm.status === 'scheduled' && (
                      <div>
                        <Label htmlFor="scheduledAt">Publish Date</Label>
                        <Input
                          id="scheduledAt"
                          type="datetime-local"
                          value={blogForm.scheduledAt}
                          onChange={(e) => setBlogForm(prev => ({ ...prev, scheduledAt: e.target.value }))}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">Upload featured image</p>
                  <p className="text-xs text-gray-400">Recommended: 1200x630px</p>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {blogCategories.map(category => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={blogForm.categories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBlogForm(prev => ({ ...prev, categories: [...prev.categories, category] }));
                          } else {
                            setBlogForm(prev => ({ ...prev, categories: prev.categories.filter(c => c !== category) }));
                          }
                        }}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Add tags separated by commas"
                  value={blogForm.tags.join(', ')}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, tags: e.target.value.split(', ').filter(tag => tag.trim()) }))}
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {blogForm.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pt-2">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage your blog content</p>
        </div>
        <Button onClick={() => setShowEditor(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Blog Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Blog Posts ({blogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{blog.title}</p>
                      <p className="text-sm text-muted-foreground">{blog.excerpt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      blog.status === 'published' ? 'default' : 
                      blog.status === 'draft' ? 'secondary' : 'outline'
                    }>
                      {blog.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {blog.categories.map(cat => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {blog.publishedAt ? (
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        {blog.publishedAt}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not published</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Eye className="w-4 h-4" />
                      {blog.views}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditBlog(blog)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteBlog(blog.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManager;