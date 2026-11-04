import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DummyMascotIcon } from '../components/BrandLogo';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    totalMrp,
    totalSelling,
    retailDiscount,
    promoDiscount,
    shippingFee,
    finalAmount,
    cartCount,
    appliedPromo,
    applyPromo
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState(null);

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((totalSelling / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalSelling);

  const handleApplyPromo = (codeToApply) => {
    const code = codeToApply || promoInput;
    const res = applyPromo(code);
    setPromoFeedback(res);
    setTimeout(() => setPromoFeedback(null), 3500);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="mb-4">
          <DummyMascotIcon className="w-16 h-16 mx-auto" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
          Lil' Dummy is waiting for you to add some fresh heavyweight drops.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#e12d2d] hover:bg-[#c81e1e] text-white px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors shadow-md"
        >
          <span>Explore Streetwear Drops</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-950">
          MY BAG ({cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'})
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">
          Items in your bag are reserved for a limited time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Strip */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                {amountToFreeShipping > 0
                  ? `Add ₹${amountToFreeShipping} more to claim FREE Express Delivery!`
                  : '🎉 Free Express Delivery Unlocked!'}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/50 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  progressPercent >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-32 object-cover object-top rounded-xl bg-gray-100 shrink-0 border border-gray-100"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2.5 py-1 rounded">
                        Size: {item.size}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.size, -1)}
                        className="px-2.5 py-1.5 hover:bg-white text-gray-600 rounded-l-lg transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.size, 1)}
                        className="px-2.5 py-1.5 hover:bg-white text-gray-600 rounded-r-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-gray-950">
                        ₹{item.spl_price * item.quantity}
                      </span>
                      {item.price > item.spl_price && (
                        <span className="text-xs text-gray-400 line-through block">
                          ₹{item.price * item.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4 space-y-4">
          {/* Coupon Box */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              Coupons &amp; Offers
            </h4>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  className="w-full pl-8 pr-2 py-2 text-xs uppercase font-bold bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                />
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
              </div>
              <button
                onClick={() => handleApplyPromo()}
                className="bg-[#111827] hover:bg-black text-white px-4 py-2 text-xs font-bold uppercase rounded-lg transition-colors"
              >
                Apply
              </button>
            </div>

            {!appliedPromo && (
              <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                <span>Try Demo Coupon:</span>
                <button
                  onClick={() => handleApplyPromo('DUMMY10')}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded text-[11px] border border-amber-300"
                >
                  DUMMY10
                </button>
              </div>
            )}

            {promoFeedback && (
              <div className={`text-xs font-semibold flex items-center gap-1.5 ${
                promoFeedback.success ? 'text-emerald-600' : 'text-red-500'
              }`}>
                {promoFeedback.success ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                <span>{promoFeedback.message}</span>
              </div>
            )}

            {appliedPromo && (
              <div className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center justify-between">
                <span>Code {appliedPromo} applied!</span>
                <span>-₹{promoDiscount}</span>
              </div>
            )}
          </div>

          {/* Bill Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 shadow-xs text-xs">
            <h4 className="font-bold uppercase tracking-wider text-gray-900 pb-2 border-b border-gray-100">
              Price Details
            </h4>

            <div className="flex justify-between text-gray-600">
              <span>Total MRP</span>
              <span className="font-mono">₹{totalMrp}</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Retail Discount</span>
              <span className="font-mono">-₹{retailDiscount}</span>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Coupon Discount</span>
                <span className="font-mono">-₹{promoDiscount}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between text-sm font-black text-gray-950">
              <span>Total Payable</span>
              <span className="font-mono">₹{finalAmount}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-3 bg-[#e12d2d] hover:bg-[#c81e1e] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-99"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 flex items-center justify-center gap-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Safe &amp; Secure Payments</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
