import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  Download, 
  Truck, 
  FileText, 
  RotateCcw, 
  Edit3, 
  Check, 
  ShoppingBag,
  Trash2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import InvoiceModal from '../components/InvoiceModal';
import ProductCard from '../components/ProductCard';

export default function ProfilePage() {
  const location = useLocation();
  const { user, setUser, orders, wishlist, products, addToCart, toggleWishlist } = useShop();

  const [activeTab, setActiveTab] = useState('orders'); // orders | addresses | wishlist
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(user?.name || 'Piyush Rathi');
  const [phone, setPhone] = useState(user?.phone || '9024556229');
  const [email, setEmail] = useState(user?.email || 'piyush@example.com');

  useEffect(() => {
    if (location.hash === '#orders') setActiveTab('orders');
    if (location.hash === '#addresses') setActiveTab('addresses');
    if (location.hash === '#wishlist') setActiveTab('wishlist');
  }, [location.hash]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { name, phone, email };
    setUser(updated);
    localStorage.setItem('dummystore_user', JSON.stringify(updated));
    setIsEditingProfile(false);
  };

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="bg-[#111827] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-[#e12d2d] text-white flex items-center justify-center text-2xl font-black shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">{user?.name || 'Shopper'}</h1>
            <p className="text-xs text-gray-400 mt-0.5">{user?.email} • {user?.phone}</p>
            <span className="inline-block mt-2 text-[10px] font-black uppercase tracking-wider bg-gray-800 text-amber-300 px-2.5 py-0.5 rounded-full border border-gray-700">
              Verified DummyStore Member
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border border-gray-700"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Edit Profile Drawer / Inline Card */}
      {isEditingProfile && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-xs">
          <h3 className="text-xs font-black uppercase tracking-wider text-gray-900">Update Profile Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold text-gray-700 uppercase">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-700 uppercase">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-700 uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#111827] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Profile Tabs Navigation */}
      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'orders'
              ? 'border-[#e12d2d] text-[#e12d2d]'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'wishlist'
              ? 'border-[#e12d2d] text-[#e12d2d]'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'addresses'
              ? 'border-[#e12d2d] text-[#e12d2d]'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-500">You haven't placed any orders yet.</p>
              <Link to="/products" className="inline-block mt-3 text-xs font-black text-[#e12d2d] uppercase underline">
                Browse New Drops
              </Link>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
                {/* Order Top Bar */}
                <div className="bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between border-b border-gray-200 gap-4 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-gray-400 block tracking-wider">Order Reference</span>
                    <span className="font-mono font-bold text-gray-900">{order.id}</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-gray-400 block tracking-wider">Date Placed</span>
                    <span className="font-medium text-gray-800">{order.date}</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase text-gray-400 block tracking-wider">Total Amount</span>
                    <span className="font-black font-mono text-gray-950">₹{order.finalAmount}</span>
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items in order */}
                <div className="p-6 divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt=""
                          className="w-16 h-20 object-cover object-top rounded-lg bg-gray-100 shrink-0 border border-gray-100"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Size: <strong className="text-gray-800">{item.size}</strong> • Qty: {item.quantity}
                          </p>
                          <p className="text-xs font-bold font-mono text-gray-900 mt-1">₹{item.spl_price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer Actions */}
                <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-[11px] text-gray-500 font-mono">
                    BlueDart AWB: <strong>{order.trackingNumber}</strong>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedOrderForInvoice(order)}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#e12d2d]" />
                      <span>Download Tax Invoice (PDF)</span>
                    </button>

                    <Link
                      to={`/track-order?id=${order.id}`}
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Track Shipment</span>
                    </Link>

                    <Link
                      to="/returns"
                      className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Return / Exchange</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistedProducts.length === 0 ? (
            <div className="p-12 text-center bg-gray-50 rounded-2xl border border-gray-100">
              <Heart className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Your wishlist is empty.</p>
              <Link to="/products" className="inline-block mt-3 text-xs font-black text-[#e12d2d] uppercase underline">
                Browse Drops
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {wishlistedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border-2 border-black p-5 relative shadow-xs">
            <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
              DEFAULT
            </span>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-[#e12d2d]" />
              <h4 className="text-xs font-black uppercase text-gray-900">Home Delivery</h4>
            </div>
            <p className="text-xs font-bold text-gray-900">{user?.name || 'Piyush Rathi'}</p>
            <p className="text-xs text-gray-600 mt-1">Plot 3B, Subhash Nagar, Pal Road</p>
            <p className="text-xs text-gray-600">Jodhpur, Rajasthan - 342008</p>
            <p className="text-xs text-gray-600 font-mono mt-2">Mobile: {user?.phone || '9024556229'}</p>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedOrderForInvoice && (
        <InvoiceModal
          isOpen={true}
          onClose={() => setSelectedOrderForInvoice(null)}
          order={selectedOrderForInvoice}
        />
      )}

    </div>
  );
}
