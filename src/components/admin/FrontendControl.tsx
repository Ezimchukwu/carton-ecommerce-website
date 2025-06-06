
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Save, Upload, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const FrontendControl: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['frontend-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('frontend_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;
      return data;
    }
  });

  const { data: products } = useQuery({
    queryKey: ['products-for-frontend'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data;
    }
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { data, error } = await supabase
        .from('frontend_settings')
        .update({ 
          setting_value: value, 
          updated_by: user?.id,
          updated_at: new Date().toISOString()
        })
        .eq('setting_key', key)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['frontend-settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update settings: ' + error.message);
    }
  });

  const getSetting = (key: string) => {
    return settings?.find(s => s.setting_key === key)?.setting_value;
  };

  const updateSetting = (key: string, value: any) => {
    updateSettingMutation.mutate({ key, value });
  };

  const heroSection = getSetting('hero_section') || {};
  const featuredCategories = getSetting('featured_categories') || [];
  const promoBanner = getSetting('promo_banner') || {};
  const contactInfo = getSetting('contact_info') || {};

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corporate"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Frontend Control</h2>
          <p className="text-gray-600">Manage homepage content, banners, and featured items</p>
        </div>
        <Button variant="outline" onClick={() => window.open('/', '_blank')}>
          <Eye className="mr-2 h-4 w-4" />
          Preview Website
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="categories">Featured Categories</TabsTrigger>
          <TabsTrigger value="promo">Promotions</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Manage the main banner and text on your homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Main Title</Label>
                <Input
                  id="hero-title"
                  value={heroSection.title || ''}
                  onChange={(e) => updateSetting('hero_section', { ...heroSection, title: e.target.value })}
                  placeholder="Your main headline..."
                />
              </div>

              <div>
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={heroSection.subtitle || ''}
                  onChange={(e) => updateSetting('hero_section', { ...heroSection, subtitle: e.target.value })}
                  placeholder="Supporting text for your headline..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="hero-image">Banner Image URL</Label>
                <Input
                  id="hero-image"
                  type="url"
                  value={heroSection.banner_image || ''}
                  onChange={(e) => updateSetting('hero_section', { ...heroSection, banner_image: e.target.value })}
                  placeholder="https://example.com/banner.jpg"
                />
              </div>

              <div className="text-sm text-gray-500">
                <p><strong>Current:</strong></p>
                <p><strong>Title:</strong> {heroSection.title}</p>
                <p><strong>Subtitle:</strong> {heroSection.subtitle}</p>
                <p><strong>Image:</strong> {heroSection.banner_image}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Featured Categories</CardTitle>
              <CardDescription>
                Choose which product categories to highlight on the homepage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Available Categories</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {['pizza-boxes', 'mailer-boxes', 'cargo-boxes', 'wrapping-papers', 'gift-bags', 'adhesives'].map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={category}
                        checked={featuredCategories.includes(category)}
                        onChange={(e) => {
                          const newCategories = e.target.checked
                            ? [...featuredCategories, category]
                            : featuredCategories.filter((c: string) => c !== category);
                          updateSetting('featured_categories', newCategories);
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={category} className="text-sm">
                        {category.replace('-', ' ').toUpperCase()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Currently Featured</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {featuredCategories.map((category: string) => (
                    <Badge key={category} variant="default">
                      {category.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promo">
          <Card>
            <CardHeader>
              <CardTitle>Promotional Banner</CardTitle>
              <CardDescription>
                Set up site-wide promotional messages and discounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="promo-active"
                  checked={promoBanner.active || false}
                  onCheckedChange={(checked) => updateSetting('promo_banner', { ...promoBanner, active: checked })}
                />
                <Label htmlFor="promo-active">Enable Promotional Banner</Label>
              </div>

              <div>
                <Label htmlFor="promo-text">Promotion Text</Label>
                <Input
                  id="promo-text"
                  value={promoBanner.text || ''}
                  onChange={(e) => updateSetting('promo_banner', { ...promoBanner, text: e.target.value })}
                  placeholder="Special offer message..."
                  disabled={!promoBanner.active}
                />
              </div>

              <div>
                <Label htmlFor="promo-discount">Discount Percentage</Label>
                <Input
                  id="promo-discount"
                  type="number"
                  min="0"
                  max="100"
                  value={promoBanner.discount || 0}
                  onChange={(e) => updateSetting('promo_banner', { ...promoBanner, discount: parseInt(e.target.value) })}
                  placeholder="0"
                  disabled={!promoBanner.active}
                />
              </div>

              {promoBanner.active && (
                <div className="p-4 bg-corporate text-white rounded-md">
                  <div className="flex justify-between items-center">
                    <span>{promoBanner.text}</span>
                    {promoBanner.discount > 0 && (
                      <Badge variant="secondary">{promoBanner.discount}% OFF</Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Update contact details displayed across the website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactInfo.email || ''}
                  onChange={(e) => updateSetting('contact_info', { ...contactInfo, email: e.target.value })}
                  placeholder="info@company.com"
                />
              </div>

              <div>
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={contactInfo.phone || ''}
                  onChange={(e) => updateSetting('contact_info', { ...contactInfo, phone: e.target.value })}
                  placeholder="+1-555-0123"
                />
              </div>

              <div>
                <Label htmlFor="contact-address">Business Address</Label>
                <Textarea
                  id="contact-address"
                  value={contactInfo.address || ''}
                  onChange={(e) => updateSetting('contact_info', { ...contactInfo, address: e.target.value })}
                  placeholder="123 Business St, City, State 12345"
                  rows={3}
                />
              </div>

              <div className="text-sm text-gray-500">
                <p><strong>Current Contact Info:</strong></p>
                <p><strong>Email:</strong> {contactInfo.email}</p>
                <p><strong>Phone:</strong> {contactInfo.phone}</p>
                <p><strong>Address:</strong> {contactInfo.address}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrontendControl;
