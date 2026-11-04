import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  RotateCcw, 
  Check 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/mockProducts';

export default function ProductListPage() {
  const { products, gender, setGender } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [selectedGender, setSelectedGender] = useState(0); // 0: All, 1: Men, 2: Women
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && !selectedCategories.includes(cat)) {
      setSelectedCategories([cat]);
    }
  }, [searchParams]);

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const toggleCategory = (catName) => {
    setSelectedCategories(prev =>
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedGender(0);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setMaxPrice(3000);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedGender !== 0) {
          if (p.gender !== selectedGender && p.gender !== 3) return false;
        }

        if (selectedCategories.length > 0) {
          if (!selectedCategories.includes(p.category)) return false;
        }

        if (selectedSizes.length > 0) {
          const hasSelectedSize = selectedSizes.some(
            size => p.size_stock && (p.size_stock[size] || 0) > 0
          );
          if (!hasSelectedSize) return false;
        }

        if (p.spl_price > maxPrice) return false;

        if (initialSearch.trim()) {
          const query = initialSearch.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchCat = p.category?.toLowerCase().includes(query);
          if (!matchName && !matchCat) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.spl_price - b.spl_price;
        if (sortBy === 'price-desc') return b.spl_price - a.spl_price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'discount') {
          const discA = ((a.price - a.spl_price) / a.price);
          const discB = ((b.price - b.spl_price) / b.price);
          return discB - discA;
        }
        return 0;
      });
  }, [products, selectedGender, selectedCategories, selectedSizes, maxPrice, sortBy, initialSearch]);

  const hasActiveFilters = 
    selectedGender !== 0 || 
    selectedCategories.length > 0 || 
    selectedSizes.length > 0 || 
    maxPrice < 3000 || 
    initialSearch;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 md:pb-12">
      
      {/* Top Header / Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 border-b border-gray-200 gap-3">
        <div>
          <h1 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-gray-950">
            {initialSearch ? `Results: "${initialSearch}"` : 'All Streetwear Drops'}
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> items • 240+ GSM Combed Cottons
          </p>
        </div>

        {/* Mobile Sticky Control Bar (Sort + Filter Buttons) */}
        <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold bg-gray-100 rounded-xl hover:bg-gray-200 text-gray-800 border border-gray-200 active:scale-95"
          >
            <Filter className="w-3.5 h-3.5 text-[#e12d2d]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#e12d2d]" />
            )}
          </button>

          <div className="flex-1 sm:flex-initial flex items-center gap-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto text-xs font-bold bg-white border border-gray-200 rounded-xl px-2.5 sm:px-3 py-2 text-gray-800 focus:outline-hidden focus:border-black cursor-pointer shadow-xs"
            >
              <option value="popular">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips (Scrollable row on mobile) */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 pt-3 pb-1 overflow-x-auto scrollbar-none whitespace-nowrap">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-0.5">Active:</span>

          {selectedGender !== 0 && (
            <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-gray-800 shrink-0">
              {selectedGender === 1 ? 'Men' : 'Women'}
              <button onClick={() => setSelectedGender(0)}><X className="w-3 h-3 text-gray-500" /></button>
            </span>
          )}

          {selectedCategories.map(cat => (
            <span key={cat} className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-gray-800 shrink-0">
              {cat}
              <button onClick={() => toggleCategory(cat)}><X className="w-3 h-3 text-gray-500" /></button>
            </span>
          ))}

          {selectedSizes.map(size => (
            <span key={size} className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-gray-800 shrink-0">
              Size: {size}
              <button onClick={() => toggleSize(size)}><X className="w-3 h-3 text-gray-500" /></button>
            </span>
          ))}

          {maxPrice < 3000 && (
            <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-gray-800 shrink-0">
              Under ₹{maxPrice}
              <button onClick={() => setMaxPrice(3000)}><X className="w-3 h-3 text-gray-500" /></button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-[11px] font-bold text-red-600 hover:text-red-700 underline ml-2 shrink-0"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden md:block space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#e12d2d]" />
              <span>Filter Catalog</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-red-600 hover:text-red-700"
              >
                Reset
              </button>
            )}
          </div>

          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Gender</label>
            <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedGender(0)}
                className={`py-1.5 text-xs font-black uppercase rounded-md transition-all ${
                  selectedGender === 0 ? 'bg-white text-black shadow-xs' : 'text-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedGender(1)}
                className={`py-1.5 text-xs font-black uppercase rounded-md transition-all ${
                  selectedGender === 1 ? 'bg-white text-black shadow-xs' : 'text-gray-600'
                }`}
              >
                Men
              </button>
              <button
                onClick={() => setSelectedGender(2)}
                className={`py-1.5 text-xs font-black uppercase rounded-md transition-all ${
                  selectedGender === 2 ? 'bg-white text-black shadow-xs' : 'text-gray-600'
                }`}
              >
                Women
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Categories</label>
            <div className="space-y-1.5">
              {CATEGORIES.map(cat => {
                const isSelected = selectedCategories.includes(cat.name);
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.name)}
                    className="w-full flex items-center justify-between py-1 text-xs text-gray-700 hover:text-black group text-left cursor-pointer"
                  >
                    <span className={`group-hover:font-semibold ${isSelected ? 'font-bold text-[#e12d2d]' : ''}`}>
                      {cat.name}
                    </span>
                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#e12d2d] border-[#e12d2d] text-white' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sizes Filter */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">Filter By Size</label>
            <div className="grid grid-cols-3 gap-2">
              {allSizes.map(size => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-2 text-xs font-black uppercase rounded-md border transition-all ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="uppercase tracking-wider text-gray-500">Max Price</span>
              <span className="font-mono text-gray-900">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="499"
              max="3000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#e12d2d] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>₹499</span>
              <span>₹3,000</span>
            </div>
          </div>
        </aside>

        {/* Product Grid Area (2-Col on Mobile) */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 text-center border border-gray-100">
              <h4 className="text-sm sm:text-base font-black text-gray-900 mb-1">No Streetwear Matches Found</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-5">
                Try widening your price limit or clearing active size and category filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#111827] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filter Drawer (Bottom Sheet) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col">
              <div className="p-4 bg-[#111827] text-white flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider">Filter Catalog</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 rounded-full bg-gray-800 text-gray-300">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
                {/* Gender */}
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block">Gender</label>
                  <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg">
                    {['All', 'Men', 'Women'].map((label, idx) => (
                      <button
                        key={label}
                        onClick={() => setSelectedGender(idx)}
                        className={`py-1.5 text-xs font-bold rounded-md transition-all ${
                          selectedGender === idx ? 'bg-black text-white' : 'text-gray-700'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block">Category</label>
                  <div className="space-y-1.5">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.name)}
                        className="w-full flex items-center justify-between text-xs py-1.5 text-gray-800 border-b border-gray-100"
                      >
                        <span>{cat.name}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          selectedCategories.includes(cat.name) ? 'bg-[#e12d2d] border-[#e12d2d] text-white' : 'border-gray-300'
                        }`}>
                          {selectedCategories.includes(cat.name) && <Check className="w-3 h-3" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1.5 block">Size Stock</label>
                  <div className="grid grid-cols-3 gap-2">
                    {allSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-2 text-xs font-black rounded-lg border ${
                          selectedSizes.includes(size) ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-1">
                    <span className="text-[10px] font-black uppercase text-gray-400">Max Price</span>
                    <span className="font-mono text-gray-900">₹{maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="499"
                    max="3000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#e12d2d]"
                  />
                </div>
              </div>

              <div className="p-3 border-t border-gray-100 flex gap-2">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-3 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 text-xs font-bold text-white bg-[#e12d2d] rounded-xl shadow-xs"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
