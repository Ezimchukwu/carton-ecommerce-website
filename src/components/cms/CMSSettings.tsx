
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Globe, Shield, Code, Database } from 'lucide-react';
import { toast } from 'sonner';

const CMSSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: 'Packaging Solutions',
    siteDescription: 'Professional packaging solutions for your business',
    siteUrl: 'https://yoursite.com',
    contactEmail: 'contact@yoursite.com',
    timezone: 'UTC',
    
    // SEO Settings
    defaultMetaTitle: 'Packaging Solutions - Professional Packaging',
    defaultMetaDescription: 'Find the best packaging solutions for your business needs',
    seoEnabled: true,
    analyticsCode: '',
    
    // Security Settings
    maintenanceMode: false,
    cacheEnabled: true,
    backupEnabled: true,
    twoFactorAuth: false,
    
    // Performance Settings
    imageCompression: true,
    lazyLoading: true,
    minifyCSS: true,
    minifyJS: true
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  const handleBackup = () => {
    toast.info('Creating backup...');
    setTimeout(() => {
      toast.success('Backup created successfully');
    }, 2000);
  };

  const handleRestore = () => {
    if (!confirm('Are you sure you want to restore from backup? This will overwrite current data.')) return;
    toast.info('Restoring from backup...');
    setTimeout(() => {
      toast.success('Restore completed successfully');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            CMS Settings
          </CardTitle>
          <Button onClick={handleSave}>
            Save All Settings
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="seo">SEO & Analytics</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => setSettings(prev => ({ ...prev, siteUrl: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Europe/London">London</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  id="seoEnabled"
                  checked={settings.seoEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, seoEnabled: checked }))}
                />
                <Label htmlFor="seoEnabled">Enable SEO Features</Label>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="defaultMetaTitle">Default Meta Title</Label>
                  <Input
                    id="defaultMetaTitle"
                    value={settings.defaultMetaTitle}
                    onChange={(e) => setSettings(prev => ({ ...prev, defaultMetaTitle: e.target.value }))}
                    disabled={!settings.seoEnabled}
                  />
                </div>
                
                <div>
                  <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                  <Textarea
                    id="defaultMetaDescription"
                    value={settings.defaultMetaDescription}
                    onChange={(e) => setSettings(prev => ({ ...prev, defaultMetaDescription: e.target.value }))}
                    disabled={!settings.seoEnabled}
                  />
                </div>
                
                <div>
                  <Label htmlFor="analyticsCode">Google Analytics Code</Label>
                  <Textarea
                    id="analyticsCode"
                    value={settings.analyticsCode}
                    onChange={(e) => setSettings(prev => ({ ...prev, analyticsCode: e.target.value }))}
                    placeholder="Paste your Google Analytics tracking code here"
                    disabled={!settings.seoEnabled}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Enable 2FA for admin accounts</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="cacheEnabled">Enable Caching</Label>
                    <p className="text-sm text-gray-500">Improve site performance with caching</p>
                  </div>
                  <Switch
                    id="cacheEnabled"
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, cacheEnabled: checked }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="imageCompression">Image Compression</Label>
                    <p className="text-sm text-gray-500">Automatically compress uploaded images</p>
                  </div>
                  <Switch
                    id="imageCompression"
                    checked={settings.imageCompression}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, imageCompression: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lazyLoading">Lazy Loading</Label>
                    <p className="text-sm text-gray-500">Load images only when needed</p>
                  </div>
                  <Switch
                    id="lazyLoading"
                    checked={settings.lazyLoading}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, lazyLoading: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="minifyCSS">Minify CSS</Label>
                    <p className="text-sm text-gray-500">Compress CSS files for faster loading</p>
                  </div>
                  <Switch
                    id="minifyCSS"
                    checked={settings.minifyCSS}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, minifyCSS: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="minifyJS">Minify JavaScript</Label>
                    <p className="text-sm text-gray-500">Compress JS files for faster loading</p>
                  </div>
                  <Switch
                    id="minifyJS"
                    checked={settings.minifyJS}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, minifyJS: checked }))}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="backup" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="backupEnabled">Automatic Backups</Label>
                    <p className="text-sm text-gray-500">Enable daily automatic backups</p>
                  </div>
                  <Switch
                    id="backupEnabled"
                    checked={settings.backupEnabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, backupEnabled: checked }))}
                  />
                </div>
                
                <div className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold">Manual Backup & Restore</h3>
                  <div className="flex space-x-4">
                    <Button onClick={handleBackup} variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Create Backup
                    </Button>
                    <Button onClick={handleRestore} variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Restore from Backup
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Last backup: January 15, 2024 at 2:30 PM
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSSettings;
