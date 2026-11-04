import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Truck, 
  ShieldCheck, 
  ChevronDown, 
  LogOut, 
  PackageCheck, 
  LayoutDashboard,
  ArrowRight,
  Flame,
  Sparkles
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { useShop } from '../context/ShopContext';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
      setMobileSearchOpen(false);
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
      <div className="bg-[#111827] text-white text-[10px] sm:text-[11px] font-medium tracking-wider px-3 sm:px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden text-ellipsis whitespace-nowrap mx-auto sm:mx-0">
          <span className="bg-[#e12d2d] text-white text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs">
            SPECIAL
          </span>
          <span className="truncate">
            FLAT ₹200 OFF on ₹1,499+ | Use: <strong className="text-[#facc15] font-black">DUMMY10</strong>
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2 sm:gap-3">
          
          {/* Left: Mobile Hamburger & Logo */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            <button 
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 -ml-1 text-gray-800 hover:text-black focus:outline-hidden"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <BrandLogo />

            {/* Desktop Gender Switcher Pill */}
            <div className="hidden lg:flex items-center bg-gray-100 p-0.5 rounded-full border border-gray-200 ml-2">
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
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Desktop Search Input */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative items-center">
              <input
                type="text"
                placeholder="Search tees, hoodies, cargos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 lg:w-60 pl-8 pr-3 py-1.5 text-xs bg-gray-100 focus:bg-white rounded-full border border-transparent focus:border-gray-300 focus:outline-hidden transition-all placeholder:text-gray-400"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
            </form>

            {/* Mobile Search Button (Triggers Search Input Dropdown) */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="sm:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile Dropdown / Login */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xs font-semibold text-gray-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#111827] text-white flex items-center justify-center text-[10px] font-black">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                    <ChevronDown className="w-3 h-3 text-gray-500 hidden sm:inline" />
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
                  className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition-colors"
                  title="Sign In / Register"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline text-xs font-bold">Login</span>
                </button>
              )}
            </div>

            {/* Wishlist Link (Desktop) */}
            <Link
              to="/profile#wishlist"
              className="hidden sm:flex relative p-2 rounded-full hover:bg-gray-100 text-gray-700 hover:text-black transition-colors"
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
              className="relative flex items-center gap-1.5 bg-[#e12d2d] hover:bg-[#c81e1e] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-black text-xs transition-colors shadow-xs active:scale-95"
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

        {/* Mobile Search Input Drawer (Dropdown when Search tapped on phone) */}
        {mobileSearchOpen && (
          <div className="sm:hidden pb-3 pt-1 border-t border-gray-100 animate-in slide-in-from-top-2 duration-150">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                autoFocus
                placeholder="Search tees, hoodies, cargos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs bg-gray-100 rounded-xl border border-transparent focus:border-black focus:bg-white focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 absolute right-2 text-gray-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}

        {/* Mobile Quick Gender Bar (Always accessible right below header on phones) */}
        <div className="lg:hidden flex items-center justify-center border-t border-gray-100 py-1.5 bg-gray-50/70 -mx-3 px-3">
          <div className="flex bg-gray-200/80 p-0.5 rounded-full w-full max-w-xs text-center">
            <button
              onClick={() => setGender(1)}
              className={`flex-1 py-1 text-xs font-black uppercase rounded-full transition-all ${
                gender === 1 ? 'bg-black text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              Shop Men
            </button>
            <button
              onClick={() => setGender(2)}
              className={`flex-1 py-1 text-xs font-black uppercase rounded-full transition-all ${
                gender === 2 ? 'bg-black text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              Shop Women
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu (Full-height App Drawer) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Top of drawer */}
            <div className="p-4 bg-[#111827] text-white flex items-center justify-between">
              <BrandLogo variant="dark" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-gray-800 text-gray-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable menu content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* User greeting */}
              {user ? (
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Logged in as</span>
                    <p className="text-xs font-black text-gray-900 truncate">{user.name}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold text-[#e12d2d] underline"
                  >
                    Profile
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full bg-[#e12d2d] text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
                >
                  <User className="w-4 h-4" />
                  <span>Login / Register</span>
                </button>
              )}

              {/* Categories */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2">
                  STREETWEAR COLLECTIONS
                </span>
                <div className="space-y-1">
                  {navLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-bold text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Services */}
              <div className="pt-2 border-t border-gray-100 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2">
                  ORDERS &amp; HELP
                </span>
                <Link
                  to="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-500" />
                    <span>Track Active Order</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>

                <Link
                  to="/returns"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>30-Day Easy Returns</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 text-xs font-bold text-amber-900 bg-amber-50 rounded-lg mt-2"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4 text-amber-600" />
                    <span>Merchant Admin Hub</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </Link>
              </div>
            </div>

            {/* Bottom info */}
            <div className="p-4 border-t border-gray-100 text-[10px] text-gray-400 text-center">
              DummyStore™ • Bengaluru, Karnataka
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
