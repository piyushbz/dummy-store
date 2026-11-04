import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Check, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const [selectedSize, setSelectedSize] = useState(null);
  const [justAdded, setJustAdded] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(
    ((product.price - product.spl_price) / product.price) * 100
  );

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleQuickAdd = (size, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, size);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setShowSizes(false);
    }, 1200);
  };

  return (
    <div 
      className="group relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
      onMouseEnter={() => setShowSizes(true)}
      onMouseLeave={() => setShowSizes(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.primary_image}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-sm backdrop-blur-xs transition-transform active:scale-90 ${
            isWishlisted 
              ? 'bg-red-50 text-[#e12d2d]' 
              : 'bg-white/80 hover:bg-white text-gray-700 hover:text-black'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#e12d2d]' : ''}`} />
        </button>

        {/* Rating Badge */}
        {product.rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-1 rounded-sm text-[11px] font-bold text-gray-900 shadow-xs">
            <span className="flex items-center text-amber-500 font-black">
              ★ {product.rating}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 font-medium">{product.rating_count || 12}</span>
          </div>
        )}

        {/* Quick Add Size Overlay (Slide Up on Hover) */}
        <div className={`absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md p-3 border-t border-gray-100 transition-all duration-200 ${
          showSizes ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">
              {justAdded ? 'Added to Bag!' : 'Select Size to Add'}
            </span>
            {justAdded && (
              <span className="flex items-center text-emerald-600 text-[10px] font-bold">
                <Check className="w-3 h-3 mr-0.5" /> Added {selectedSize}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-1.5">
            {availableSizes.map(size => {
              const stock = product.size_stock?.[size];
              const isOutOfStock = stock === 0;

              return (
                <button
                  key={size}
                  disabled={isOutOfStock}
                  onClick={(e) => handleQuickAdd(size, e)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-sm border transition-all ${
                    isOutOfStock
                      ? 'border-gray-200 text-gray-300 line-through cursor-not-allowed bg-gray-50'
                      : 'border-gray-300 hover:border-black hover:bg-black hover:text-white text-gray-800'
                  }`}
                  title={isOutOfStock ? `${size} - Out of Stock` : `Add size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            <span>{product.category || 'STREETWEAR'}</span>
            <span className="text-gray-500">{product.gender === 1 ? 'MEN' : 'WOMEN'}</span>
          </div>

          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#e12d2d] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-black text-gray-950">
            ₹{product.spl_price}
          </span>
          {product.price > product.spl_price && (
            <>
              <span className="text-xs text-gray-400 line-through">
                ₹{product.price}
              </span>
              <span className="text-[11px] font-black text-emerald-600">
                {discountPercent}% OFF
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
