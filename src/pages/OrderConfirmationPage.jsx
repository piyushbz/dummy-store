import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Download, 
  Truck, 
  ArrowRight, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  FileText 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import InvoiceModal from '../components/InvoiceModal';
import { DummyMascotIcon } from '../components/BrandLogo';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useShop();

  const order = orders.find(o => o.id === orderId) || orders[0];
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Order Not Found</h2>
        <Link to="/" className="text-xs font-bold text-[#e12d2d] underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-950">
          ORDER CONFIRMED!
        </h1>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          Thank you for shopping with DummyStore! We've received your order and our Bengaluru fulfilment hub is preparing your package.
        </p>

        <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-gray-800">
          <span>Order ID:</span>
          <span className="text-[#e12d2d]">{order.id}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setShowInvoice(true)}
          className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Download Tax Invoice (PDF)</span>
        </button>

        <Link
          to={`/track-order?id=${order.id}`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <Truck className="w-4 h-4 text-[#e12d2d]" />
          <span>Track Shipment</span>
        </Link>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6 text-xs">
        {/* Shipping details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
              Delivery Address:
            </span>
            <p className="font-bold text-gray-900">{order.customer?.name}</p>
            <p className="text-gray-600 mt-0.5">{order.customer?.address}</p>
            <p className="text-gray-600">{order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}</p>
            <p className="text-gray-600 mt-0.5 font-mono">Mobile: {order.customer?.phone}</p>
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">
              Payment &amp; Logistics:
            </span>
            <p className="text-gray-700">Payment Mode: <strong className="text-gray-900">{order.paymentMethod}</strong></p>
            <p className="text-gray-700 mt-0.5">Carrier: <strong className="text-gray-900">{order.carrier || 'BlueDart Air'}</strong></p>
            <p className="text-gray-700 font-mono">AWB: <strong className="text-gray-900">{order.trackingNumber || 'BD-84920192'}</strong></p>
            <p className="text-gray-700 mt-0.5">Status: <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">{order.status}</span></p>
          </div>
        </div>

        {/* Ordered items */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
            Items in this order:
          </span>
          <div className="divide-y divide-gray-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center gap-3">
                <img
                  src={item.image}
                  alt=""
                  className="w-14 h-16 object-cover object-top rounded-lg bg-gray-100 shrink-0 border border-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs truncate">{item.name}</h4>
                  <p className="text-[11px] text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                </div>
                <span className="font-bold font-mono text-gray-950">₹{item.spl_price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total calculation */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-black text-gray-950">
          <span>Total Paid (Inclusive of Taxes)</span>
          <span className="font-mono text-base">₹{order.finalAmount}</span>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-black underline"
        >
          <span>Continue Exploring More Drops</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tax Invoice Modal */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        order={order}
      />
    </div>
  );
}
