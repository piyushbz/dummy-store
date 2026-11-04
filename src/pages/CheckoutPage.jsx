import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Truck,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import PaymentModal from '../components/PaymentModal';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { 
    cart, 
    user, 
    totalMrp, 
    retailDiscount, 
    promoDiscount, 
    shippingFee, 
    finalAmount, 
    placeOrder 
  } = useShop();

  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || 'Piyush Rathi',
    phone: user?.phone || '9024556229',
    email: user?.email || 'piyush@example.com',
    pincode: '342008',
    address: 'Plot 3B, Subhash Nagar, Pal Road',
    city: 'Jodhpur',
    state: 'Rajasthan'
  });

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Items In Cart</h2>
        <p className="text-xs text-gray-500 mb-6">Please add items to your cart before proceeding to checkout.</p>
        <Link 
          to="/products"
          className="bg-[#111827] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
        >
          Browse Drops
        </Link>
      </div>
    );
  }

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleStartPayment = (e) => {
    e.preventDefault();
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = ({ paymentMethod }) => {
    setIsPaymentModalOpen(false);
    const newOrder = placeOrder({
      customer: shippingAddress,
      paymentMethod
    });
    navigate(`/order-confirmation/${newOrder.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <Link to="/cart" className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bag</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Left Form: Shipping Address */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <MapPin className="w-5 h-5 text-[#e12d2d]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
                1. Shipping &amp; Delivery Address
              </h2>
            </div>

            <form onSubmit={handleStartPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleAddressChange}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength="10"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Email (For Tax Invoice)</label>
                <input
                  type="email"
                  name="email"
                  value={shippingAddress.email}
                  onChange={handleAddressChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Flat / House No. / Building / Street</label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-700 block mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength="6"
                    value={shippingAddress.pincode}
                    onChange={handleAddressChange}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-700 block mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-700 block mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#e12d2d] hover:bg-[#c81e1e] text-white py-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-99"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>PROCEED TO PAYMENT (₹{finalAmount})</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Summary: Items & Total */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold uppercase tracking-wider text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Order Summary ({cart.length} Drops)</span>
              <Link to="/cart" className="text-[11px] font-bold text-[#e12d2d] hover:underline">Edit Bag</Link>
            </h3>

            {/* Compact items list */}
            <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="py-2.5 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-14 object-cover object-top rounded-md bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold font-mono text-gray-950">₹{item.spl_price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (MRP)</span>
                <span className="font-mono">₹{totalMrp}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Total Savings</span>
                <span className="font-mono">-₹{retailDiscount + promoDiscount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-950">
                <span>Amount to Pay</span>
                <span className="font-mono text-base">₹{finalAmount}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-2 text-[11px] text-gray-600">
              <Truck className="w-4 h-4 text-[#e12d2d] shrink-0" />
              <span>Express Dispatch in 24h via BlueDart Air Express</span>
            </div>
          </div>
        </div>

      </div>

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={finalAmount}
        customer={shippingAddress}
      />
    </div>
  );
}
