import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { DummyMascotIcon } from './BrandLogo';

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  const freeShippingThreshold = 999;
  const progressPercent = Math.min(100, Math.round((totalSelling / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalSelling);

  const handleApplyPromo = (codeToApply) => {
    const code = codeToApply || promoInput;
    const res = applyPromo(code);
    setPromoFeedback(res);
    setTimeout(() => {
      setPromoFeedback(null);
    }, 3500);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#e12d2d]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
                MY BAG ({cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Strip */}
          <div className="bg-amber-50/70 border-b border-amber-100 px-5 py-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-800 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                {amountToFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-amber-700">₹{amountToFreeShipping}</strong> more for <strong>FREE Express Delivery</strong>!
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> FREE Express Delivery unlocked!
                  </span>
                )}
              </div>
              <span className="text-[11px] font-bold text-gray-500">{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/50 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  progressPercent >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Drawer Body */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4">
                <DummyMascotIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-base font-black text-gray-900 mb-1">Your Bag is Empty!</h3>
              <p className="text-xs text-gray-500 max-w-xs mb-6">
                Lil' Dummy checked the racks — no streetwear here yet. Discover our oversized tees, heavyweight hoodies, and tactical cargos!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/products');
                }}
                className="bg-[#111827] hover:bg-black text-white text-xs font-black uppercase px-6 py-3 rounded-full transition-colors shadow-sm"
              >
                Explore Drops Now
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover object-top rounded-lg bg-gray-100 shrink-0 border border-gray-100"
                    />

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-sm">
                            Size: {item.size}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-gray-200 rounded-md bg-gray-50">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.size, -1)}
                            className="p-1 hover:bg-white text-gray-600 rounded-l-md transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.size, 1)}
                            className="p-1 hover:bg-white text-gray-600 rounded-r-md transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <div className="text-right">
                          <span className="text-xs font-black text-gray-950">
                            ₹{item.spl_price * item.quantity}
                          </span>
                          {item.price > item.spl_price && (
                            <span className="text-[10px] text-gray-400 line-through block">
                              ₹{item.price * item.quantity}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Strip */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="w-full pl-8 pr-2 py-2 text-xs uppercase font-bold bg-white border border-gray-200 rounded-md focus:border-black focus:outline-hidden"
                    />
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    onClick={() => handleApplyPromo()}
                    className="bg-[#111827] hover:bg-black text-white px-4 py-2 text-xs font-bold uppercase rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Quick Coupon Chip */}
                {!appliedPromo && (
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-600">
                    <span>Quick Coupon:</span>
                    <button
                      onClick={() => handleApplyPromo('DUMMY10')}
                      className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-black px-2 py-0.5 rounded-sm border border-amber-300 transition-colors cursor-pointer"
                    >
                      DUMMY10 (10% OFF)
                    </button>
                  </div>
                )}

                {promoFeedback && (
                  <div className={`mt-2 text-xs font-semibold flex items-center gap-1.5 ${
                    promoFeedback.success ? 'text-emerald-600' : 'text-red-500'
                  }`}>
                    {promoFeedback.success ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{promoFeedback.message}</span>
                  </div>
                )}

                {appliedPromo && (
                  <div className="mt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-sm flex items-center justify-between">
                    <span>Coupon '{appliedPromo}' applied!</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="p-5 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Total MRP</span>
                  <span>₹{totalMrp}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Retail Discount</span>
                  <span>-₹{retailDiscount}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon Discount</span>
                    <span>-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-950">
                  <span>Total Payable</span>
                  <span>₹{finalAmount}</span>
                </div>

                {/* Checkout CTA */}
                <div className="pt-3 space-y-2">
                  <button
                    onClick={handleProceedCheckout}
                    className="w-full bg-[#e12d2d] hover:bg-[#c81e1e] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="text-[11px] font-bold text-gray-500 hover:text-black underline transition-colors"
                    >
                      View Full Bag &amp; Details
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
