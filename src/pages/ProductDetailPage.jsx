import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Ruler, 
  Sparkles,
  ChevronRight,
  MessageSquarePlus,
  X,
  UploadCloud,
  ThumbsUp
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist, submitReview, user } = useShop();

  const product = products.find(p => p.id === Number(id) || p.slug === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [pincode, setPincode] = useState('342008');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newFit, setNewFit] = useState('True to Size');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Streetwear Drop Not Found</h2>
        <p className="text-xs text-gray-500 mb-6">The item you are searching for might have sold out or was unlisted.</p>
        <Link 
          to="/products"
          className="bg-[#111827] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
        >
          Back to Drops
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.primary_image];

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = Math.round(((product.price - product.spl_price) / product.price) * 100);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryResult({
        date: 'Thursday, Nov 7',
        cod: true,
        fast: true
      });
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    submitReview(product.id, {
      author: user?.name || 'Verified Buyer',
      rating: newRating,
      title: newTitle,
      text: newText,
      fit: newFit
    });

    setNewTitle('');
    setNewText('');
    setShowReviewModal(false);
  };

  const similarProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link to="/products" className="hover:text-black">Drops</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link to={`/products?category=${encodeURIComponent(product.category || '')}`} className="hover:text-black">
          {product.category || 'Apparel'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-20 sm:w-full rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? 'border-[#e12d2d]' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image */}
          <div className="flex-1 relative aspect-4/5 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-xs">
            <img
              src={images[selectedImage] || product.primary_image}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-4 left-4 bg-[#111827] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-sm tracking-wider">
              OFFICIAL DROP
            </div>
          </div>
        </div>

        {/* Right: Product Details & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#e12d2d]">
                {product.category}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-bold text-gray-500 uppercase">
                {product.gender === 1 ? "MEN'S" : product.gender === 2 ? "WOMEN'S" : "UNISEX"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 leading-snug">
              {product.name}
            </h1>

            {/* Rating Star Badge */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-xs font-bold text-amber-900">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{product.rating}</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 font-medium">{product.rating_count} Ratings</span>
              </div>
              <span className="text-xs text-gray-400 font-medium">• 100% Cotton Bio-Washed</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-gray-950">
                ₹{product.spl_price}
              </span>
              {product.price > product.spl_price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.price}
                  </span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              Inclusive of all taxes. Free shipping on orders above ₹999.
            </p>
          </div>

          {/* Size Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-800">
                Select Size
              </label>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-xs font-bold text-[#e12d2d] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => {
                const stock = product.size_stock?.[size];
                const isOutOfStock = stock === 0;
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg text-xs font-black uppercase transition-all ${
                      isOutOfStock
                        ? 'border border-gray-200 text-gray-300 line-through bg-gray-50 cursor-not-allowed'
                        : isSelected
                        ? 'bg-black text-white shadow-md'
                        : 'border border-gray-300 text-gray-800 hover:border-black bg-white'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Low stock alert */}
            {product.size_stock?.[selectedSize] > 0 && product.size_stock[selectedSize] <= 5 && (
              <p className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                <span>⚠️ Only {product.size_stock[selectedSize]} left in size {selectedSize} - Grab it quick!</span>
              </p>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#e12d2d] hover:bg-[#c81e1e] text-white py-4 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{justAdded ? 'ADDED TO BAG! ✓' : 'ADD TO BAG'}</span>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-4 rounded-xl border transition-all ${
                isWishlisted
                  ? 'border-red-300 bg-red-50 text-[#e12d2d]'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#e12d2d]' : ''}`} />
            </button>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-800">
              <Truck className="w-4 h-4 text-[#e12d2d]" />
              <span>Check Delivery Pincode</span>
            </div>

            <form onSubmit={checkPincode} className="flex gap-2">
              <input
                type="text"
                maxLength="6"
                placeholder="Enter 6-Digit Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase rounded-lg transition-colors"
              >
                Check
              </button>
            </form>

            {deliveryResult && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Delivery by {deliveryResult.date}</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Cash on delivery available • Free shipping on this order
                </p>
              </div>
            )}
          </div>

          {/* Product Specifications */}
          <div className="pt-4 border-t border-gray-200 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-gray-900">Product Highlights</h4>
            <div className="grid grid-cols-2 gap-3 text-gray-600">
              <div>
                <span className="font-bold text-gray-900 block">Fabric:</span>
                <span>100% Combed Cotton (240 GSM)</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Fit Type:</span>
                <span>Oversized Boxy Fit</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Neck / Collar:</span>
                <span>Lycra Ribbed Round Neck</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 block">Wash Care:</span>
                <span>Cold Wash inside out</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-10 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950">
              CUSTOMER REVIEWS &amp; FIT
            </h2>
            <p className="text-xs text-gray-500 font-medium">Authentic feedback from verified street stylists</p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="self-start sm:self-auto bg-[#111827] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            <span>WRITE A REVIEW</span>
          </button>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
          <div className="text-center md:text-left flex flex-col justify-center">
            <div className="text-4xl font-black text-gray-950">{product.rating}</div>
            <div className="flex items-center justify-center md:justify-start gap-1 my-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <p className="text-xs text-gray-500 font-medium">Based on {product.rating_count} verified purchases</p>
          </div>

          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const pct = stars === 5 ? 75 : stars === 4 ? 20 : stars === 3 ? 5 : 0;
              return (
                <div key={stars} className="flex items-center gap-3 text-xs">
                  <span className="w-8 font-bold text-gray-700">{stars} ★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-8 text-right text-gray-500 text-[11px] font-mono">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((rev) => (
              <div key={rev.id} className="p-5 bg-white border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400">{rev.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-900">{rev.title}</span>
                  {rev.fit && (
                    <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      Fit: {rev.fit}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">{rev.text}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </section>

      {/* Similar Drops Recommendations */}
      {similarProducts.length > 0 && (
        <section className="pt-10 border-t border-gray-200">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-950 mb-6">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowSizeGuide(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">
                Oversized Fit Size Chart (Inches)
              </h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 font-bold uppercase text-gray-700">
                  <th className="p-2 border">Size</th>
                  <th className="p-2 border">Chest</th>
                  <th className="p-2 border">Length</th>
                  <th className="p-2 border">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-medium">
                <tr><td className="p-2 border font-bold">XS</td><td className="p-2 border">40"</td><td className="p-2 border">28"</td><td className="p-2 border">19.5"</td></tr>
                <tr><td className="p-2 border font-bold">S</td><td className="p-2 border">42"</td><td className="p-2 border">28.5"</td><td className="p-2 border">20"</td></tr>
                <tr><td className="p-2 border font-bold">M</td><td className="p-2 border">44"</td><td className="p-2 border">29"</td><td className="p-2 border">21"</td></tr>
                <tr><td className="p-2 border font-bold">L</td><td className="p-2 border">46"</td><td className="p-2 border">29.5"</td><td className="p-2 border">22"</td></tr>
                <tr><td className="p-2 border font-bold">XL</td><td className="p-2 border">48"</td><td className="p-2 border">30"</td><td className="p-2 border">23"</td></tr>
                <tr><td className="p-2 border font-bold">XXL</td><td className="p-2 border">50"</td><td className="p-2 border">30.5"</td><td className="p-2 border">24"</td></tr>
              </tbody>
            </table>
            <p className="text-[11px] text-gray-500 mt-3">
              * Note: These are oversized fits with dropped shoulders. Order your regular size for intended baggy fit.
            </p>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowReviewModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black uppercase text-gray-900">Write a Review</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Your Rating</label>
                <div className="flex gap-2 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-500' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Fit Feedback</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Runs Small', 'True to Size', 'Runs Large'].map((fit) => (
                    <button
                      type="button"
                      key={fit}
                      onClick={() => setNewFit(fit)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        newFit === fit ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Best heavy cotton tee in my closet"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Detailed Review</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about the drape, comfort, collar quality, etc."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#e12d2d] hover:bg-[#c81e1e] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
