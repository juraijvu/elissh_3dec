import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

const ContentManager = () => {
  const [banners, setBanners] = useState([
    { id: 1, title: 'Summer Sale', subtitle: 'Up to 50% Off', image: '', link: '/sale' },
    { id: 2, title: 'New Arrivals', subtitle: 'Latest Beauty Trends', image: '', link: '/products' }
  ]);

  const [pages, setPages] = useState([
    { id: 1, title: 'About Us', slug: 'about', content: 'Welcome to Elissh Beauty...' },
    { id: 2, title: 'Privacy Policy', slug: 'privacy', content: 'Your privacy is important...' }
  ]);

  const [editingBanner, setEditingBanner] = useState(null);
  const [editingPage, setEditingPage] = useState(null);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground">Manage your website content dynamically</p>
      </div>

      <Tabs defaultValue="banners" className="space-y-6">
        <TabsList>
          <TabsTrigger value="banners">Hero Banners</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="banners">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Hero Banners
                <Button onClick={() => setEditingBanner({ id: Date.now(), title: '', subtitle: '', image: '', link: '' })}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Banner
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingBanner && (
                <Card className="mb-4 border-primary">
                  <CardHeader>
                    <CardTitle>Edit Banner</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={editingBanner.title}
                        onChange={(e) => setEditingBanner({...editingBanner, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={editingBanner.subtitle}
                        onChange={(e) => setEditingBanner({...editingBanner, subtitle: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={editingBanner.image}
                        onChange={(e) => setEditingBanner({...editingBanner, image: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="link">Link</Label>
                      <Input
                        id="link"
                        value={editingBanner.link}
                        onChange={(e) => setEditingBanner({...editingBanner, link: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => {
                        setBanners(prev => {
                          const existing = prev.find(b => b.id === editingBanner.id);
                          if (existing) {
                            return prev.map(b => b.id === editingBanner.id ? editingBanner : b);
                          }
                          return [...prev, editingBanner];
                        });
                        setEditingBanner(null);
                      }}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingBanner(null)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {banners.map((banner) => (
                  <Card key={banner.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{banner.title}</h3>
                          <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
                          <p className="text-xs text-muted-foreground">Link: {banner.link}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingBanner(banner)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => setBanners(prev => prev.filter(b => b.id !== banner.id))}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Static Pages
                <Button onClick={() => setEditingPage({ id: Date.now(), title: '', slug: '', content: '' })}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Page
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingPage && (
                <Card className="mb-4 border-primary">
                  <CardHeader>
                    <CardTitle>Edit Page</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="pageTitle">Page Title</Label>
                      <Input
                        id="pageTitle"
                        value={editingPage.title}
                        onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={editingPage.slug}
                        onChange={(e) => setEditingPage({...editingPage, slug: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        rows={10}
                        value={editingPage.content}
                        onChange={(e) => setEditingPage({...editingPage, content: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => {
                        setPages(prev => {
                          const existing = prev.find(p => p.id === editingPage.id);
                          if (existing) {
                            return prev.map(p => p.id === editingPage.id ? editingPage : p);
                          }
                          return [...prev, editingPage];
                        });
                        setEditingPage(null);
                      }}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setEditingPage(null)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {pages.map((page) => (
                  <Card key={page.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{page.title}</h3>
                          <p className="text-sm text-muted-foreground">/{page.slug}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingPage(page)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => setPages(prev => prev.filter(p => p.id !== page.id))}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions">
          <Card>
            <CardHeader>
              <CardTitle>Promotions & Offers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage promotional banners, discount codes, and special offers.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle>Site Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create site-wide announcements and notifications.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;