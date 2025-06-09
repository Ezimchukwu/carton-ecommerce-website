
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
import { Badge } from '@/components/ui/badge';
import { Save, Upload, Eye, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { HeroSection, PromoBanner, ContactInfo, FeaturedCategories, FrontendSetting } from '@/types/frontend.types';

const FrontendControl: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['frontend-settings'],
    queryFn: async () => {
      console.log('Fetching frontend settings...');
      const { data, error } = await supabase
        .from('frontend_settings')
        .select('*')
        .order('setting_key');

      if (error) {
        console.error('Error fetching frontend settings:', error);
        throw error;
      }
      
      console.log('Frontend settings fetched:', data);
      return data as FrontendSetting[];
    }
  });

  const createSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { data, error } = await supabase
        .from('frontend_settings')
        .insert({
          setting_key: key,
          setting_value: value,
          updated_by: user?.id ? String(user.id) : null,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['frontend-settings'] });
      toast.success('Settings created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create settings: ' + error.message);
    }
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      // Check if setting exists
      const existingSetting = settings?.find(s => s.setting_key === key);
      
      if (existingSetting) {
        // Update existing setting
        const { data, error } = await supabase
          .from('frontend_settings')
          .update({ 
            setting_value: value, 
            updated_by: user?.id ? String(user.id) : null,
            updated_at: new Date().toISOString()
          })
          .eq('setting_key', key)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new setting
        return createSettingMutation.mutateAsync({ key, value });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['frontend-settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update settings: ' + error.message);
    }
  });

  const getSetting = (key: string): any => {
    const setting = settings?.find(s => s.setting_key === key)?.setting_value;
    console.log(`Getting setting ${key}:`, setting);
    return setting;
  };

  const updateSetting = (key: string, value: any) => {
    console.log(`Updating setting ${key}:`, value);
    updateSettingMutation.mutate({ key, value });
  };

  // Helper functions to safely access nested properties with defaults
  const getHeroSection = (): HeroSection => {
    const heroData = getSetting('hero_section');
    return {
      title: heroData?.title || 'Welcome to Our Store',
      subtitle: heroData?.subtitle || 'Discover premium packaging solutions for your business',
      banner_image: heroData?.banner_image || ''
    };
  };

  const getFeaturedCategories = (): FeaturedCategories => {
    const categoriesData = getSetting('featured_categories');
    return Array.isArray(categoriesData) ? categoriesData : ['pizza-boxes', 'mailer-boxes', 'cargo-boxes'];
  };

  const getPromoBanner = (): PromoBanner => {
    const promoData = getSetting('promo_banner');
    return {
      active: promoData?.active || false,
      text: promoData?.text || 'Special Offer - Get 20% off your first order!',
      discount: Number(promoData?.discount) || 20
    };
  };

  const getContactInfo = (): ContactInfo => {
    const contactData = getSetting('contact_info');
    return {
      email: contactData?.email || 'info@yourstore.com',
      phone: contactData?.phone || '+1-555-0123',
      address: contactData?.address || '123 Business Street, City, State 12345'
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corporate"></div>
        <span className="ml-2">Loading frontend settings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600">Error Loading Settings</h3>
          <p className="text-gray-600 mt-2">
            Failed to load frontend settings. This might be because the settings table hasn't been initialized yet.
          </p>
          <Button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['frontend-settings'] })}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const heroSection = getHeroSection();
  const featuredCategories = getFeaturedCategories();
  const promoBanner = getPromoBanner();
  const contactInfo = getContactInfo();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Frontend Control</h2>
          <p className="text-gray-600">Manage homepage content, banners, and featured items</p>
          {settings && (
            <p className="text-sm text-gray-500 mt-1">
              {settings.length} settings configured
            </p>
          )}
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
                  value={heroSection.title}
                  onChange={(e) => updateSetting('hero_section', { ...heroSection, title: e.target.value })}
                  placeholder="Your main headline..."
                />
              </div>

              <div>
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Textarea
                  id="hero-subtitle"
                  value={heroSection.subtitle}
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
                  value={heroSection.banner_image}
                  onChange={(e) => updateSetting('hero_section', { ...heroSection, banner_image: e.target.value })}
                  placeholder="https://example.com/banner.jpg"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm mb-2">Preview:</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Title:</strong> {heroSection.title}</p>
                  <p><strong>Subtitle:</strong> {heroSection.subtitle}</p>
                  {heroSection.banner_image && (
                    <p><strong>Image:</strong> {heroSection.banner_image}</p>
                  )}
                </div>
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
                  checked={promoBanner.active}
                  onCheckedChange={(checked) => updateSetting('promo_banner', { ...promoBanner, active: checked })}
                />
                <Label htmlFor="promo-active">Enable Promotional Banner</Label>
              </div>

              <div>
                <Label htmlFor="promo-text">Promotion Text</Label>
                <Input
                  id="promo-text"
                  value={promoBanner.text}
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
                  value={promoBanner.discount}
                  onChange={(e) => updateSetting('promo_banner', { ...promoBanner, discount: parseInt(e.target.value) || 0 })}
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
                  value={contactInfo.email}
                  onChange={(e) => updateSetting('contact_info', { ...contactInfo, email: e.target.value })}
                  placeholder="info@company.com"
                />
              </div>

              <div>
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => updateSetting('contact_info', { ...contactInfo, phone: e.target.value })}
                  placeholder="+1-555-0123"
                />
              </div>

              <div>
                <Label htmlFor="contact-address">Business Address</Label>
                <Textarea
                  id="contact-address"
                  value={contactInfo.address}
                  onChange={(e) => updateSetting('contact_info', { ...contactInfo, address: e.target.value })}
                  placeholder="123 Business St, City, State 12345"
                  rows={3}
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm mb-2">Current Contact Info:</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Email:</strong> {contactInfo.email}</p>
                  <p><strong>Phone:</strong> {contactInfo.phone}</p>
                  <p><strong>Address:</strong> {contactInfo.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrontendControl;
