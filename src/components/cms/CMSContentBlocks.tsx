
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Copy, Layout as LayoutIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ContentBlock {
  id: string;
  name: string;
  type: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

const CMSContentBlocks: React.FC = () => {
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: '1',
      name: 'Hero Section',
      type: 'hero',
      content: '<div class="hero-section">Welcome to our website</div>',
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Feature Cards',
      type: 'cards',
      content: '<div class="feature-cards">Our amazing features</div>',
      isActive: true,
      createdAt: '2024-01-14'
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'text',
    content: ''
  });

  const blockTypes = [
    { value: 'text', label: 'Text Block' },
    { value: 'hero', label: 'Hero Section' },
    { value: 'cards', label: 'Feature Cards' },
    { value: 'gallery', label: 'Image Gallery' },
    { value: 'testimonial', label: 'Testimonial' },
    { value: 'cta', label: 'Call to Action' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBlock) {
      setContentBlocks(blocks =>
        blocks.map(block =>
          block.id === editingBlock.id
            ? { ...block, name: formData.name, type: formData.type, content: formData.content }
            : block
        )
      );
      toast.success('Content block updated');
    } else {
      const newBlock: ContentBlock = {
        id: Date.now().toString(),
        name: formData.name,
        type: formData.type,
        content: formData.content,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setContentBlocks(blocks => [...blocks, newBlock]);
      toast.success('Content block created');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this content block?')) return;
    
    setContentBlocks(blocks => blocks.filter(block => block.id !== id));
    toast.success('Content block deleted');
  };

  const handleDuplicate = (block: ContentBlock) => {
    const duplicatedBlock: ContentBlock = {
      ...block,
      id: Date.now().toString(),
      name: `${block.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setContentBlocks(blocks => [...blocks, duplicatedBlock]);
    toast.success('Content block duplicated');
  };

  const resetForm = () => {
    setFormData({ name: '', type: 'text', content: '' });
    setEditingBlock(null);
  };

  const openEditDialog = (block: ContentBlock) => {
    setEditingBlock(block);
    setFormData({ name: block.name, type: block.type, content: block.content });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <LayoutIcon className="h-5 w-5" />
          Content Blocks
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Create Block
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingBlock ? 'Edit Content Block' : 'Create Content Block'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blockName">Block Name</Label>
                  <Input
                    id="blockName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="blockType">Block Type</Label>
                  <select
                    id="blockType"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {blockTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="blockContent">Content (HTML/React)</Label>
                <Textarea
                  id="blockContent"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="min-h-[200px] font-mono"
                  placeholder="Enter your block content here..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingBlock ? 'Update' : 'Create'} Block
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contentBlocks.map((block) => (
              <TableRow key={block.id}>
                <TableCell className="font-medium">{block.name}</TableCell>
                <TableCell>{blockTypes.find(t => t.value === block.type)?.label}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    block.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {block.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>{block.createdAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(block)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDuplicate(block)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(block.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CMSContentBlocks;
