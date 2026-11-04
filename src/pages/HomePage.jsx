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
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-[#111827] text-white overflow-hidden">
        {/* Abstract Background Gradient & Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e12d2d_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-red-400">
                <Flame className="w-3.5 h-3.5 text-[#e12d2d]" />
                <span>DROP 04 / 2026 NOW LIVE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.08]">
                HEAVYWEIGHT <br />
                <span className="text-[#e12d2d] underline decoration-wavy decoration-amber-400/60">STREETWEAR</span> <br />
                FOR THE CULTURE.
              </h1>

              <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                High-density 240+ GSM combed cotton, custom boxy silhouettes, 
                and limited pop-culture drops crafted in Bengaluru. Zero middlemen, pure fabric.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/products"
                  className="bg-[#e12d2d] hover:bg-[#c81e1e] text-white px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-red-500/25 active:scale-95"
                >
                  <span>EXPLORE ALL DROPS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center bg-gray-800/80 p-1 rounded-full border border-gray-700">
                  <button
                    onClick={() => setGender(1)}
                    className={`px-4 py-2 text-xs font-black uppercase rounded-full transition-all ${
                      gender === 1 ? 'bg-white text-black shadow-xs' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    SHOP MEN
                  </button>
                  <button
                    onClick={() => setGender(2)}
                    className={`px-4 py-2 text-xs font-black uppercase rounded-full transition-all ${
                      gender === 2 ? 'bg-white text-black shadow-xs' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    SHOP WOMEN
                  </button>
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-gray-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>240+ GSM Bio-Washed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Dispatched in 24h</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>4.8/5 Rated (20k+ Fans)</span>
                </div>
              </div>
            </div>

            {/* Right Hero Feature Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md bg-gradient-to-b from-gray-800 to-gray-900 p-3 rounded-2xl shadow-2xl border border-gray-700">
                <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-gray-950">
                  <img
                    src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=80"
                    alt="DummyStore Streetwear Lookbook"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Lil' Dummy Mascot Floater Badge */}
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

                  {/* Card Bottom Tag */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Featured Drop</span>
                      <h4 className="text-sm font-black">Cyber Ronin Oversized Tee</h4>
                    </div>
                    <span className="text-sm font-black text-[#facc15]">₹899</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Pills / Quick Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950">
              CATEGORIES TO BAG
            </h2>
            <p className="text-xs text-gray-500 font-medium">Curated fits designed for everyday comfort &amp; styling</p>
          </div>
          <Link 
            to="/products" 
            className="text-xs font-black uppercase text-[#e12d2d] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-xl overflow-hidden aspect-4/5 bg-gray-100 border border-gray-200 shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-white">
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide leading-tight group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Drops Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#e12d2d] tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>HANDPICKED FOR {gender === 1 ? "MEN" : "WOMEN"}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-gray-950">
              TRENDING DROPS
            </h2>
          </div>

          {/* Gender Filter Toggle Bar */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl self-start sm:self-auto border border-gray-200">
            <button
              onClick={() => setGender(1)}
              className={`px-4 py-1.5 text-xs font-black uppercase rounded-lg transition-all ${
                gender === 1 ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              Men's Drops
            </button>
            <button
              onClick={() => setGender(2)}
              className={`px-4 py-1.5 text-xs font-black uppercase rounded-lg transition-all ${
                gender === 2 ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'
              }`}
            >
              Women's Drops
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#111827] hover:bg-black text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105"
          >
            <span>VIEW ALL {products.length} STREETWEAR PIECES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Fabric & Culture Feature Strip */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="space-y-2">
              <span className="text-2xl font-black text-[#e12d2d] font-mono">240+ GSM</span>
              <h4 className="text-sm font-bold text-gray-900 uppercase">Heavy Cotton Standard</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                We reject flimsy, see-through tees. Every piece features high-density combed cotton with substantial drape and zero shrink.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-2xl font-black text-[#e12d2d] font-mono">BOX FIT</span>
              <h4 className="text-sm font-bold text-gray-900 uppercase">Engineered Dropped Shoulders</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Custom oversized patterns built with wider chests, relaxed armholes, and ribbed collars that never stretch out over time.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-2xl font-black text-[#e12d2d] font-mono">ZERO DB</span>
              <h4 className="text-sm font-bold text-gray-900 uppercase">Client-Side Zero-Backend</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Lightning fast instant loads. All catalog drops, order pipelines, and reviews run natively in code and browser storage.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
