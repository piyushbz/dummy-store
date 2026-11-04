import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, Truck, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function MobileBottomNav() {
  const location = useLocation();
  const { cartCount, wishlist, setIsCartOpen } = useShop();

  const isCurrent = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Hide on admin routes or checkout
  if (location.pathname.startsWith('/admin') || location.pathname === '/checkout') {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-14">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
            isCurrent('/') ? 'text-[#e12d2d]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight">Home</span>
        </Link>

        {/* Drops / Catalog */}
        <Link
          to="/products"
          className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
            isCurrent('/products') ? 'text-[#e12d2d]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight">Drops</span>
        </Link>

        {/* Wishlist */}
        <Link
          to="/profile#wishlist"
          className={`relative flex flex-col items-center justify-center gap-0.5 transition-colors ${
            location.hash === '#wishlist' ? 'text-[#e12d2d]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#e12d2d] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight">Wishlist</span>
        </Link>

        {/* Track Orders */}
        <Link
          to="/track-order"
          className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
            isCurrent('/track-order') ? 'text-[#e12d2d]' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Truck className="w-5 h-5 text-amber-500" />
          <span className="text-[10px] font-bold tracking-tight">Track</span>
        </Link>

        {/* Bag (Opens Cart Drawer) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center gap-0.5 text-gray-700 hover:text-black active:scale-95 transition-transform"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#e12d2d]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#111827] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black uppercase text-[#e12d2d]">Bag</span>
        </button>
      </div>
    </div>
  );
}
