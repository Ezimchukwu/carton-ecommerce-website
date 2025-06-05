
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Search, Filter, Grid, List, Image as ImageIcon, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  uploadDate: string;
  alt: string;
}

const CMSMediaLibrary: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-image.jpg',
      type: 'image/jpeg',
      size: '2.1 MB',
      url: '/placeholder.svg',
      uploadDate: '2024-01-15',
      alt: 'Hero section background'
    },
    {
      id: '2',
      name: 'product-1.png',
      type: 'image/png',
      size: '1.5 MB',
      url: '/placeholder.svg',
      uploadDate: '2024-01-14',
      alt: 'Product showcase image'
    },
    {
      id: '3',
      name: 'logo.svg',
      type: 'image/svg+xml',
      size: '45 KB',
      url: '/placeholder.svg',
      uploadDate: '2024-01-13',
      alt: 'Company logo'
    }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const filteredFiles = mediaFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.alt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    // Simulate file upload
    Array.from(selectedFiles).forEach(file => {
      const newMediaFile: MediaFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString().split('T')[0],
        alt: file.name.split('.')[0]
      };
      setMediaFiles(prev => [...prev, newMediaFile]);
    });

    toast.success(`${selectedFiles.length} file(s) uploaded successfully`);
    setIsUploadDialogOpen(false);
    setSelectedFiles(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    setMediaFiles(files => files.filter(file => file.id !== id));
    toast.success('File deleted successfully');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Media Library
        </CardTitle>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Media Files</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <Label htmlFor="fileUpload">Select Files</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: Images, Videos, PDF, Documents
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Upload Files
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {/* Media Library Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Media Files Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {filteredFiles.map((file) => (
              <div key={file.id} className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                
                <div className="p-2">
                  <p className="text-xs font-medium truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button size="sm" variant="secondary">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleDelete(file.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-white border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={file.url}
                        alt={file.alt}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.type} • {file.size} • {file.uploadDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(file.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredFiles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No files match your search.' : 'No media files uploaded yet.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CMSMediaLibrary;
