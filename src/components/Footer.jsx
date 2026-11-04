import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  RotateCcw, 
  Banknote, 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Heart
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { brandConfig } from '../config/brandConfig';

export default function Footer() {
  return (
    <footer className="bg-[#0b0f19] text-gray-400 text-xs border-t border-gray-800">
      {/* Trust Badges Strip */}
      <div className="border-b border-gray-800/80 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-3 bg-red-500/10 rounded-xl text-[#e12d2d] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">100% Original Products</h4>
                <p className="text-gray-400 text-[11px] mt-0.5">Heavyweight 240+ GSM fabrics &amp; officially curated drops</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">30-Day Easy Returns</h4>
                <p className="text-gray-400 text-[11px] mt-0.5">Doorstep reverse pick up with zero questions asked</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Cash On Delivery</h4>
                <p className="text-gray-400 text-[11px] mt-0.5">Pay via Cash or UPI at your doorstep on delivery</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Superfast Shipping</h4>
                <p className="text-gray-400 text-[11px] mt-0.5">Dispatched in 24 hours across 28,000+ pincodes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="dark" />
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              DummyStore is India's favourite pop-culture &amp; high-density streetwear hub. 
              Featuring our animated mascot <span className="text-white font-bold">Lil' Dummy</span>, 
              we craft oversized silhouettes, heavy cottons, and aesthetic everyday staples.
            </p>

            <div className="space-y-1.5 text-[11px] text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#e12d2d] shrink-0" />
                <span>{brandConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#e12d2d] shrink-0" />
                <span>{brandConfig.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#e12d2d] shrink-0" />
                <span>{brandConfig.supportPhone} (Mon–Sat, 10am–7pm IST)</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-gray-400 space-x-3">
              <span>GSTIN: <strong className="text-gray-300 font-mono">{brandConfig.gstin}</strong></span>
              <span>CIN: <strong className="text-gray-300 font-mono">{brandConfig.cin}</strong></span>
            </div>
          </div>

          {/* NEED HELP */}
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Need Help</h5>
            <ul className="space-y-2.5">
              <li>
                <Link to="/track-order" className="hover:text-white transition-colors">
                  Track Your Shipment
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  Returns &amp; Exchanges
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Order Invoices &amp; History
                </Link>
              </li>
              <li>
                <Link to="/profile#addresses" className="hover:text-white transition-colors">
                  Saved Delivery Addresses
                </Link>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-white">Shipping &amp; Delivery Policy</span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-white">Terms &amp; Conditions</span>
              </li>
            </ul>
          </div>

          {/* SHOP DROPS */}
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Shop Streetwear</h5>
            <ul className="space-y-2.5">
              <li>
                <Link to="/products?category=Oversized%20T-Shirts" className="hover:text-white transition-colors">
                  Oversized T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/products?category=Heavyweight%20Hoodies" className="hover:text-white transition-colors">
                  Heavyweight Hoodies
                </Link>
              </li>
              <li>
                <Link to="/products?category=Tactical%20Cargos" className="hover:text-white transition-colors">
                  Tactical Cargo Pants
                </Link>
              </li>
              <li>
                <Link to="/products?category=Outerwear" className="hover:text-white transition-colors">
                  Jackets &amp; Outerwear
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  All Drops &amp; New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* PORTAL & ADMIN */}
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Operations</h5>
            <ul className="space-y-2.5">
              <li>
                <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  Merchant Admin Hub
                </Link>
              </li>
              <li>
                <Link to="/admin/products" className="hover:text-white transition-colors">
                  Manage Catalog / Products
                </Link>
              </li>
              <li>
                <Link to="/admin/orders" className="hover:text-white transition-colors">
                  Order Fulfillment Pipeline
                </Link>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-white">Store Locator (Bengaluru)</span>
              </li>
              <li>
                <span className="text-gray-400 cursor-pointer hover:text-white">Sustainability &amp; Cotton</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-[#070a11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-gray-400">
            © 2026 {brandConfig.companyLegalName}. All Rights Reserved. Built frontend-only with React &amp; Tailwind.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">100% Secure Payments:</span>
            <div className="flex items-center gap-1.5 bg-gray-900 px-2 py-1 rounded-sm border border-gray-800 text-[10px] font-bold text-gray-300">
              <span className="text-[#00baf2]">UPI</span>
              <span>•</span>
              <span className="text-[#1a1f71]">VISA</span>
              <span>•</span>
              <span className="text-[#eb001b]">Mastercard</span>
              <span>•</span>
              <span className="text-[#0070ba]">RuPay</span>
              <span>•</span>
              <span className="text-emerald-400">COD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
