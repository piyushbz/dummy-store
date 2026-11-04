import React, { useState } from 'react';
import { 
  RotateCcw, 
  ShieldCheck, 
  Package, 
  CheckCircle, 
  Truck, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function ReturnsPage() {
  const { orders } = useShop();

  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || '');
  const [returnType, setReturnType] = useState('exchange'); // exchange | refund
  const [exchangeSize, setExchangeSize] = useState('L');
  const [reason, setReason] = useState('Size is too small');
  const [comments, setComments] = useState('');
  const [submittedResult, setSubmittedResult] = useState(null);

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const returnNumber = `RTN-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedResult({
      returnNumber,
      orderId: selectedOrderId,
      type: returnType === 'exchange' ? `Size Exchange (${exchangeSize})` : 'Full Refund',
      pickupDate: 'Thursday, Nov 7',
      status: 'Reverse Pickup Scheduled'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
          <RotateCcw className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-950">
          30-DAY HASSLE-FREE RETURNS &amp; EXCHANGES
        </h1>
        <p className="text-xs text-gray-500 font-medium max-w-md mx-auto">
          Doesn't fit quite right? We offer free doorstep reverse pick up across 28,000+ pincodes.
        </p>
      </div>

      {submittedResult ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xs text-center space-y-6">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {submittedResult.status}
            </span>
            <h2 className="text-xl font-black text-gray-900 mt-3">
              Request Initiated: {submittedResult.returnNumber}
            </h2>
            <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
              Our courier executive will arrive at your address on <strong>{submittedResult.pickupDate}</strong> to inspect &amp; collect the product.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl text-xs text-left max-w-md mx-auto space-y-2 border border-gray-100 font-medium text-gray-700">
            <div className="flex justify-between">
              <span>Order Reference:</span>
              <strong className="font-mono text-gray-900">{submittedResult.orderId}</strong>
            </div>
            <div className="flex justify-between">
              <span>Resolution Type:</span>
              <strong className="text-gray-900">{submittedResult.type}</strong>
            </div>
            <div className="flex justify-between">
              <span>Doorstep Pickup Fee:</span>
              <strong className="text-emerald-600 font-bold">FREE (₹0)</strong>
            </div>
          </div>

          <button
            onClick={() => setSubmittedResult(null)}
            className="text-xs font-bold text-gray-600 hover:text-black underline"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Order selection */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-700 block mb-1">
              Select Your Order
            </label>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:outline-hidden cursor-pointer"
            >
              {orders.map(order => (
                <option key={order.id} value={order.id}>
                  {order.id} • Placed on {order.date} (₹{order.finalAmount})
                </option>
              ))}
            </select>
          </div>

          {/* Action Choice: Exchange vs Refund */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-700 block mb-2">
              Select Resolution Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReturnType('exchange')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  returnType === 'exchange'
                    ? 'border-black bg-black text-white shadow-xs'
                    : 'border-gray-200 text-gray-800 bg-white hover:border-gray-300'
                }`}
              >
                <span className="font-bold text-xs block">Exchange Size</span>
                <span className={`text-[11px] block mt-0.5 ${returnType === 'exchange' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Get a different size delivered to you
                </span>
              </button>

              <button
                type="button"
                onClick={() => setReturnType('refund')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  returnType === 'refund'
                    ? 'border-black bg-black text-white shadow-xs'
                    : 'border-gray-200 text-gray-800 bg-white hover:border-gray-300'
                }`}
              >
                <span className="font-bold text-xs block">Full Refund</span>
                <span className={`text-[11px] block mt-0.5 ${returnType === 'refund' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Credited back to your original source
                </span>
              </button>
            </div>
          </div>

          {/* Exchange Size Choice */}
          {returnType === 'exchange' && (
            <div>
              <label className="text-xs font-bold uppercase text-gray-700 block mb-1">
                Choose New Replacement Size
              </label>
              <div className="grid grid-cols-6 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => setExchangeSize(size)}
                    className={`py-2 text-xs font-black uppercase rounded-lg border transition-all ${
                      exchangeSize === size ? 'bg-[#e12d2d] text-white border-[#e12d2d]' : 'border-gray-200 text-gray-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="text-xs font-bold uppercase text-gray-700 block mb-1">
              Reason for Return / Exchange
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:outline-hidden cursor-pointer"
            >
              <option value="Size is too small">Size is too tight / small</option>
              <option value="Size is too large">Size is too oversized / large</option>
              <option value="Fabric not as expected">Fabric / drape not as expected</option>
              <option value="Defective or damaged">Received defective or stained item</option>
              <option value="Changed mind">Changed my mind / styling preference</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-gray-700 block mb-1">
              Additional Feedback (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Tell our design team what we can improve..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#111827] hover:bg-black text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span>Schedule Doorstep Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

    </div>
  );
}
