import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { DummyMascotIcon } from '../../components/BrandLogo';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { label: 'Overview & Metrics', path: '/admin', icon: LayoutDashboard },
    { label: 'Manage Products / Drops', path: '/admin/products', icon: Package },
    { label: 'Orders & Fulfillment', path: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-gray-100/70 text-gray-900 flex flex-col font-sans">
      
      {/* Admin Top Header */}
      <header className="bg-[#111827] text-white border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DummyMascotIcon className="w-8 h-8" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-tight uppercase">DUMMYSTORE</span>
                <span className="bg-amber-400 text-gray-950 font-black text-[9px] uppercase px-1.5 py-0.5 rounded-xs">
                  MERCHANT HUB
                </span>
              </div>
              <p className="text-[10px] text-gray-400">Zero-Backend Client Console (LocalStorage Engine)</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs font-bold text-gray-300 hover:text-white flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors border border-gray-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </Link>
          </div>
        </div>

        {/* Admin Nav Tabs */}
        <div className="bg-[#0b0f19] border-t border-gray-800/80 px-4 sm:px-8 flex overflow-x-auto gap-6 text-xs font-bold uppercase tracking-wider">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`py-3 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-amber-400 text-amber-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main Admin View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

    </div>
  );
}
