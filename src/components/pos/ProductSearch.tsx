
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Barcode, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Handle search form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };

  // Toggle barcode scanning mode
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

  // Handle category change and propagate to parent
  const handleCategorySelection = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  // Barcode auto-submit after scanning
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (barcodeMode && searchText.length >= 8) {
      timeout = setTimeout(() => {
        onSearch(searchText);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [searchText, barcodeMode, onSearch]);

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
          <Barcode className="h-4 w-4 mr-1" />
          {barcodeMode ? "Scanning" : "Barcode"}
        </Button>
        
        <Select value={selectedCategory} onValueChange={handleCategorySelection}>
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
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
              <SheetDescription>
                Set advanced filters to narrow down your search results.
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Price Range</h3>
                <div className="space-y-4">
                  <Slider 
                    value={[priceRange[0]]} 
                    min={0}
                    max={1000}
                    step={5}
                    onValueChange={(value) => setPriceRange([value[0], priceRange[1]])}
                  />
                  <Slider 
                    value={[priceRange[1]]} 
                    min={0}
                    max={1000}
                    step={5}
                    onValueChange={(value) => setPriceRange([priceRange[0], value[0]])}
                  />
                  <div className="flex justify-between">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="in-stock" 
                    checked={inStockOnly}
                    onCheckedChange={(checked) => setInStockOnly(checked === true)}
                  />
                  <Label htmlFor="in-stock">In Stock Only</Label>
                </div>
              </div>
            </div>
            
            <SheetFooter>
              <SheetClose asChild>
                <Button 
                  className="w-full"
                  onClick={() => {
                    // Apply filters logic here
                    // This would typically update the parent component's filter state
                    console.log('Applied filters:', { priceRange, inStockOnly });
                  }}
                >
                  Apply Filters
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </form>
    </div>
  );
};

export default ProductSearch;
