
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Monitor, Smartphone, Tablet } from 'lucide-react';
import { toast } from 'sonner';

const CMSThemeCustomizer: React.FC = () => {
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#10b981',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    fontSize: '16',
    fontFamily: 'Inter',
    borderRadius: '8',
    spacing: '16'
  });

  const [viewport, setViewport] = useState('desktop');

  const handleColorChange = (property: string, value: string) => {
    setThemeSettings(prev => ({ ...prev, [property]: value }));
  };

  const handleSaveTheme = () => {
    toast.success('Theme settings saved successfully');
  };

  const handleResetTheme = () => {
    setThemeSettings({
      primaryColor: '#3b82f6',
      secondaryColor: '#64748b',
      accentColor: '#10b981',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      fontSize: '16',
      fontFamily: 'Inter',
      borderRadius: '8',
      spacing: '16'
    });
    toast.info('Theme reset to defaults');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Customizer
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleResetTheme}>
              Reset to Default
            </Button>
            <Button onClick={handleSaveTheme}>
              Save Theme
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Theme Controls */}
            <div className="space-y-6">
              <Tabs defaultValue="colors" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                </TabsList>

                <TabsContent value="colors" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={themeSettings.primaryColor}
                          onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={themeSettings.primaryColor}
                          onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={themeSettings.secondaryColor}
                          onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={themeSettings.secondaryColor}
                          onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="accentColor"
                          type="color"
                          value={themeSettings.accentColor}
                          onChange={(e) => handleColorChange('accentColor', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={themeSettings.accentColor}
                          onChange={(e) => handleColorChange('accentColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="backgroundColor">Background Color</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="backgroundColor"
                          type="color"
                          value={themeSettings.backgroundColor}
                          onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                          className="w-16 h-10"
                        />
                        <Input
                          value={themeSettings.backgroundColor}
                          onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="typography" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fontFamily">Font Family</Label>
                      <Input
                        id="fontFamily"
                        value={themeSettings.fontFamily}
                        onChange={(e) => setThemeSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fontSize">Base Font Size (px)</Label>
                      <Input
                        id="fontSize"
                        type="number"
                        value={themeSettings.fontSize}
                        onChange={(e) => setThemeSettings(prev => ({ ...prev, fontSize: e.target.value }))}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="borderRadius">Border Radius (px)</Label>
                      <Input
                        id="borderRadius"
                        type="number"
                        value={themeSettings.borderRadius}
                        onChange={(e) => setThemeSettings(prev => ({ ...prev, borderRadius: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="spacing">Base Spacing (px)</Label>
                      <Input
                        id="spacing"
                        type="number"
                        value={themeSettings.spacing}
                        onChange={(e) => setThemeSettings(prev => ({ ...prev, spacing: e.target.value }))}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Preview</h3>
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={viewport === 'desktop' ? 'default' : 'ghost'}
                    onClick={() => setViewport('desktop')}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewport === 'tablet' ? 'default' : 'ghost'}
                    onClick={() => setViewport('tablet')}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewport === 'mobile' ? 'default' : 'ghost'}
                    onClick={() => setViewport('mobile')}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div 
                className={`border-2 border-gray-200 rounded-lg overflow-hidden ${
                  viewport === 'desktop' ? 'w-full h-96' :
                  viewport === 'tablet' ? 'w-3/4 h-80 mx-auto' :
                  'w-1/2 h-96 mx-auto'
                }`}
                style={{
                  backgroundColor: themeSettings.backgroundColor,
                  fontFamily: themeSettings.fontFamily,
                  fontSize: `${themeSettings.fontSize}px`,
                  color: themeSettings.textColor
                }}
              >
                <div className="p-6">
                  <div 
                    className="w-full h-12 rounded mb-4 flex items-center justify-center text-white font-semibold"
                    style={{ 
                      backgroundColor: themeSettings.primaryColor,
                      borderRadius: `${themeSettings.borderRadius}px`
                    }}
                  >
                    Header
                  </div>
                  
                  <h2 className="text-xl font-bold mb-2">Sample Heading</h2>
                  <p className="mb-4">This is a preview of your theme settings. You can see how colors, typography, and layout changes affect the overall appearance.</p>
                  
                  <div 
                    className="inline-block px-4 py-2 rounded text-white"
                    style={{ 
                      backgroundColor: themeSettings.accentColor,
                      borderRadius: `${themeSettings.borderRadius}px`
                    }}
                  >
                    Sample Button
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSThemeCustomizer;
