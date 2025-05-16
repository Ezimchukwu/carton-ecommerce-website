
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ searchQuery, onSearchChange }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "Pizza Boxes", 
    "Mailer Boxes", 
    "Cargo Boxes", 
    "Wrapping Papers", 
    "Gift Bags", 
    "Adhesives"
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically be handled by a parent component
    console.log("Search submitted:", searchQuery);
  };

  const handleFilterSubmit = () => {
    console.log("Filters applied:", {
      priceRange,
      sortBy,
      inStockOnly,
      selectedCategories
    });
    setFilterOpen(false);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <form onSubmit={handleSearchSubmit} className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search products..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={handleClearSearch}
          >
            <X size={16} />
          </Button>
        )}
      </form>
      
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={20} />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
            <SheetDescription>
              Refine your search with these filters
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm">Price Range (₦)</h3>
              <div className="px-2">
                <Slider
                  min={0}
                  max={50000}
                  step={500}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="my-6"
                />
                <div className="flex justify-between text-sm">
                  <span>₦{priceRange[0].toLocaleString()}</span>
                  <span>₦{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Sort By */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Categories */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Categories</h3>
              <div className="space-y-2 mt-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.toLowerCase().replace(' ', '-')}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label 
                      htmlFor={`category-${category.toLowerCase().replace(' ', '-')}`}
                      className="text-sm cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* In Stock Only */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="in-stock"
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(checked === true)}
              />
              <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                In Stock Only
              </Label>
            </div>
          </div>
          
          <SheetFooter>
            <Button onClick={handleFilterSubmit} className="w-full">
              Apply Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchFilterBar;
