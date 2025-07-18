
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="w-full mb-4 sm:mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10 sm:h-12 text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default SearchFilterBar;
