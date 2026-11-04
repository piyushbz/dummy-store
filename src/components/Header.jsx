import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  LogOut,
  PackageCheck,
  LayoutDashboard
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useShop } from '../context/ShopContext';

export default function Header() {
  const navigate = useNavigate();
  const { 
    gender, 
    setGender, 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    user, 
    setUser,
    setIsAuthModalOpen 
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'ALL DROPS', path: '/products' },
    { label: 'OVERSIZED TEES', path: '/products?category=Oversized%20T-Shirts' },
    { label: 'HOODIES & KNITS', path: '/products?category=Heavyweight%20Hoodies' },
    { label: 'TACTICAL CARGOS', path: '/products?category=Tactical%20Cargos' },
    { label: 'OUTERWEAR', path: '/products?category=Outerwear' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-[#111827] text-white text-[11px] font-medium tracking-wider px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap mx-auto sm:mx-0">
          <span className="bg-[#e12d2d] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs">
            SPECIAL OFFER
          </span>
          <span>
            FLAT ₹200 OFF on orders above ₹1,499 | Use Code: <span className="text-[#facc15] font-black">DUMMY10</span> for 10% Extra Off!
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-gray-300">
          <Link to="/track-order" className="hover:text-white flex items-center gap-1 transition-colors">
            <Truck className="w-3.5 h-3.5 text-[#facc15]" />
            <span>Track Order</span>
          </Link>
          <span className="text-gray-600">|</span>
          <Link to="/returns" className="hover:text-white flex items-center gap-1 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>30-Day Returns</span>
          </Link>
          <span className="text-gray-600">|</span>
          <Link 
            to="/admin" 
            className="bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 px-2 py-0.5 rounded-xs flex items-center gap-1 transition-colors font-bold"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Merchant Admin</span>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Mobile Menu Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-gray-700 hover:text-black focus:outline-hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left: Gender Toggle (Desktop) & Brand Logo */}
          <div className="flex items-center gap-4 lg:gap-6">
            <BrandLogo />

            {/* Gender Switcher Pill */}
            <div className="hidden lg:flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200">
              <button
                onClick={() => setGender(1)}
                className={`px-3 py-1 text-xs font-black uppercase rounded-full transition-all ${
                  gender === 1 
                    ? 'bg-[#111827] text-white shadow-xs' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Men
              </button>
              <button
                onClick={() => setGender(2)}
                className={`px-3 py-1 text-xs font-black uppercase rounded-full transition-all ${
                  gender === 2 
                    ? 'bg-[#111827] text-white shadow-xs' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Women
              </button>
            </div>
          </div>

          {/* Middle Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-bold tracking-wider text-gray-800">
            {navLinks.map((item) => (
              <Link 
                key={item.label}
                to={item.path} 
                className="hover:text-[#e12d2d] transition-colors py-2 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e12d2d] transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Section: Search & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Input Box (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative items-center">
              <input
                type="text"
                placeholder="Search tees, hoodies, cargos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-60 pl-8 pr-3 py-1.5 text-xs bg-gray-100 focus:bg-white rounded-full border border-transparent focus:border-gray-300 focus:outline-hidden transition-all placeholder:text-gray-400"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
            </form>

            {/* Profile Dropdown / Login */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xs font-semibold text-gray-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center text-[10px] font-black">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user.email || user.phone}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-black"
                      >
                        <User className="w-4 h-4 text-gray-400" />
                        My Profile &amp; Addresses
                      </Link>
                      <Link 
                        to="/profile#orders" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-black"
                      >
                        <PackageCheck className="w-4 h-4 text-gray-400" />
                        Past Orders &amp; Invoices
                      </Link>
                      <Link 
                        to="/track-order" 
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-black"
                      >
                        <Truck className="w-4 h-4 text-gray-400" />
                        Track Active Order
                      </Link>
                      <div className="border-t border-gray-100 my-1" />
                      <button
                        onClick={() => {
                          setUser(null);
                          localStorage.removeItem('dummystore_user');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex items-center gap-1.5 p-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition-colors"
                  title="Sign In / Register"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline text-xs font-bold">Login</span>
                </button>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              to="/profile#wishlist"
              className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#111827] text-white text-[10px] font-black flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag / Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#e12d2d] hover:bg-[#c81e1e] text-white px-3 sm:px-4 py-2 rounded-full font-black text-xs transition-colors shadow-xs"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BAG</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-white text-[#e12d2d] text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search tees, hoodies, cargos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-100 rounded-lg border border-transparent focus:border-gray-300 focus:outline-hidden"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
          </form>

          {/* Gender Switcher Mobile */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => { setGender(1); setMobileMenuOpen(false); }}
              className={`flex-1 py-1.5 text-xs font-black uppercase rounded-md text-center ${
                gender === 1 ? 'bg-[#111827] text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              Shop Men
            </button>
            <button
              onClick={() => { setGender(2); setMobileMenuOpen(false); }}
              className={`flex-1 py-1.5 text-xs font-black uppercase rounded-md text-center ${
                gender === 2 ? 'bg-[#111827] text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              Shop Women
            </button>
          </div>

          {/* Nav Links */}
          <div className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2 text-xs font-medium text-gray-600">
            <Link 
              to="/track-order" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-md text-gray-800"
            >
              <Truck className="w-4 h-4 text-[#facc15]" />
              Track Active Shipment
            </Link>
            <Link 
              to="/returns" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-md text-gray-800"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Easy Returns &amp; Exchanges
            </Link>
            <Link 
              to="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-900 rounded-md font-bold"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-600" />
              Merchant Admin Hub
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
