
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Barcode } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  categories: Array<{ _id: string; name: string; slug: string }>;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ 
  onSearch, 
  onCategoryChange,
  categories 
}) => {
  const [searchText, setSearchText] = useState('');
  const [barcodeMode, setBarcodeMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const toggleBarcodeMode = () => {
    setBarcodeMode(!barcodeMode);
    if (!barcodeMode) {
      // Focus on input when switching to barcode mode
      setTimeout(() => {
        const input = document.getElementById('barcode-input');
        if (input) input.focus();
      }, 100);
    }
  };

  return (
    <div className="bg-white p-4 border-b border-gray-200">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input
            id={barcodeMode ? 'barcode-input' : 'search-input'}
            type="text"
            placeholder={barcodeMode ? "Scan barcode..." : "Search products..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {barcodeMode ? (
              <Barcode className="h-4 w-4 text-gray-500" />
            ) : (
              <Search className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </div>
        
        <Button type="submit" variant="default">
          Search
        </Button>
        
        <Button 
          type="button" 
          variant={barcodeMode ? "default" : "outline"}
          onClick={toggleBarcodeMode}
        >
          <Barcode className="h-4 w-4" />
          {barcodeMode ? " Scanning" : " Barcode"}
        </Button>
        
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </form>
    </div>
  );
};

export default ProductSearch;
