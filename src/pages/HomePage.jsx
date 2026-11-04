import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Zap, 
  ChevronRight, 
  Star 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../data/mockProducts';
import { DummyMascotIcon } from '../components/BrandLogo';

export default function HomePage() {
  const { products, gender, setGender } = useShop();

  // Filter products by selected gender (or unisex)
  const displayProducts = products.filter(
    p => p.gender === gender || p.gender === 3
  );

  return (
    <div className="space-y-6 sm:space-y-16 pb-20 md:pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-[#111827] text-white overflow-hidden">
        {/* Abstract Background Gradient & Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e12d2d_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute -top-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-red-400">
                <Flame className="w-3.5 h-3.5 text-[#e12d2d]" />
                <span>DROP 04 / 2026 NOW LIVE</span>
              </div>

              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1]">
                HEAVYWEIGHT <br className="hidden sm:inline" />
                <span className="text-[#e12d2d] underline decoration-wavy decoration-amber-400/60">STREETWEAR</span> <br />
                FOR THE CULTURE.
              </h1>

              <p className="text-gray-300 text-xs sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                240+ GSM combed cotton, custom boxy silhouettes, 
                and limited pop-culture drops crafted in Bengaluru. Zero middlemen, pure fabric.
              </p>

              {/* Mobile Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <Link
                  to="/products"
                  className="bg-[#e12d2d] hover:bg-[#c81e1e] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all shadow-lg active:scale-95"
                >
                  <span>EXPLORE ALL DROPS</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>

                <div className="flex items-center bg-gray-800/90 p-0.5 sm:p-1 rounded-full border border-gray-700">
                  <button
                    onClick={() => setGender(1)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black uppercase rounded-full transition-all ${
                      gender === 1 ? 'bg-white text-black shadow-xs' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    SHOP MEN
                  </button>
                  <button
                    onClick={() => setGender(2)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black uppercase rounded-full transition-all ${
                      gender === 2 ? 'bg-white text-black shadow-xs' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    SHOP WOMEN
                  </button>
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-3 sm:pt-6 border-t border-gray-800/80 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[10px] sm:text-xs text-gray-400 font-medium">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>240+ GSM Bio-Washed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Dispatched in 24h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                  <span>4.8/5 Rated</span>
                </div>
              </div>
            </div>

            {/* Right Hero Feature Card */}
            <div className="lg:col-span-5 relative hidden sm:block">
              <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-gray-800 to-gray-900 p-3 rounded-2xl shadow-2xl border border-gray-700">
                <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-gray-950">
                  <img
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80"
                    alt="DummyStore Streetwear Lookbook"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Mascot Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-2.5 flex items-center gap-2.5 shadow-lg border border-gray-200">
                    <DummyMascotIcon className="w-8 h-8" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#e12d2d] block">
                        Lil' Dummy Approved
                      </span>
                      <span className="text-[11px] font-bold text-gray-900 block leading-tight">
                        Authentic Street Fit
                      </span>
                    </div>
                  </div>

                  {/* Tag */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Featured Drop</span>
                      <h4 className="text-sm font-black">Cyber Ronin Oversized Tee</h4>
                    </div>
                    <span className="text-sm font-black text-[#facc15] font-mono">₹899</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Stories (Horizontal Swipeable Row on Mobile) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-2xl font-black uppercase tracking-tight text-gray-950">
              CATEGORIES TO BAG
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium">Swipe through our curated styles</p>
          </div>
          <Link 
            to="/products" 
            className="text-[11px] sm:text-xs font-black uppercase text-[#e12d2d] hover:underline flex items-center gap-0.5"
          >
            <span>All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Horizontal Snap-Scroll / Tablet Grid */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="snap-start shrink-0 w-32 sm:w-auto group relative rounded-xl overflow-hidden aspect-4/5 bg-gray-100 border border-gray-200 shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 inset-x-2.5 text-white">
                <h3 className="text-[11px] sm:text-sm font-black uppercase tracking-wide leading-tight group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Drops Product Grid (2 Columns on Mobile) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase text-[#e12d2d] tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FOR {gender === 1 ? "MEN" : "WOMEN"}</span>
            </div>
            <h2 className="text-lg sm:text-3xl font-black uppercase tracking-tight text-gray-950">
              TRENDING DROPS
            </h2>
          </div>

          {/* Gender Filter Toggle Bar */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-xs font-black uppercase">
            <button
              onClick={() => setGender(1)}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-md transition-all text-[11px] sm:text-xs ${
                gender === 1 ? 'bg-black text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setGender(2)}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-md transition-all text-[11px] sm:text-xs ${
                gender === 2 ? 'bg-black text-white shadow-xs' : 'text-gray-600'
              }`}
            >
              Women
            </button>
          </div>
        </div>

        {/* 2-Column Grid on Mobile, 3 on Tablet, 4 on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#111827] hover:bg-black text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <span>VIEW ALL {products.length} STREETWEAR PIECES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Fabric Specs Feature Cards */}
      <section className="bg-gray-50 border-y border-gray-200 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs space-y-1.5">
              <span className="text-xl sm:text-2xl font-black text-[#e12d2d] font-mono">240+ GSM</span>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase">Heavy Cotton Standard</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Zero see-through fabrics. High-density combed cotton with substantial drape.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs space-y-1.5">
              <span className="text-xl sm:text-2xl font-black text-[#e12d2d] font-mono">BOX FIT</span>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase">Dropped Shoulders</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Custom oversized patterns with wider chest and ribbed collars that never stretch out.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs space-y-1.5">
              <span className="text-xl sm:text-2xl font-black text-[#e12d2d] font-mono">ZERO DB</span>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase">Client-Side Engine</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Instant loads across 4G &amp; 5G networks. Works 100% offline with zero backend lag.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
