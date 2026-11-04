import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Truck, 
  PackageCheck, 
  MapPin, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const { orders } = useShop();

  const initialId = searchParams.get('id') || (orders[0]?.id || '');
  const [searchId, setSearchId] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState(
    orders.find(o => o.id === initialId) || orders[0]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(
      o => o.id.toLowerCase() === searchId.trim().toLowerCase() ||
           o.trackingNumber?.toLowerCase() === searchId.trim().toLowerCase()
    );
    setSearchedOrder(found || null);
  };

  const stages = [
    {
      title: 'Order Confirmed',
      desc: 'Order verified & sent to Bengaluru warehouse',
      date: 'Nov 03, 10:30 AM',
      completed: true
    },
    {
      title: 'Quality Check & Packed',
      desc: '240 GSM fabric inspected & tamper-proof sealed',
      date: 'Nov 03, 04:15 PM',
      completed: true
    },
    {
      title: 'In Transit',
      desc: 'Dispatched via BlueDart Air Express Hub',
      date: 'Nov 04, 09:40 AM',
      completed: searchedOrder?.status === 'In Transit' || searchedOrder?.status === 'Delivered'
    },
    {
      title: 'Out for Delivery',
      desc: 'With delivery executive at destination hub',
      date: 'Estimated Nov 07',
      completed: searchedOrder?.status === 'Delivered'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-red-100 text-[#e12d2d] rounded-2xl flex items-center justify-center mx-auto">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-950">
          TRACK YOUR SHIPMENT
        </h1>
        <p className="text-xs text-gray-500 font-medium max-w-sm mx-auto">
          Enter your DummyStore Order ID or BlueDart AWB tracking code below.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="e.g. DUMMY-849201-92 or BD-..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-9 pr-3 py-3 text-xs font-mono uppercase bg-gray-50 border border-gray-200 rounded-xl focus:border-black focus:outline-hidden"
            required
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
        </div>
        <button
          type="submit"
          className="bg-[#111827] hover:bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-sm"
        >
          Track
        </button>
      </form>

      {/* Shipment Status Display */}
      {searchedOrder ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-8">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                Active Order
              </span>
              <h3 className="text-base font-black font-mono text-gray-950">{searchedOrder.id}</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Carrier: {searchedOrder.carrier} • AWB: <strong className="font-mono text-gray-800">{searchedOrder.trackingNumber}</strong>
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                Current Status
              </span>
              <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                {searchedOrder.status}
              </span>
            </div>
          </div>

          {/* 4-Stage Timeline */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">
              Shipment Milestones
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {stages.map((stage, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white ${
                    stage.completed ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-gray-300'
                  }`}>
                    {stage.completed ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3 h-3" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className={`text-xs font-bold ${stage.completed ? 'text-gray-950' : 'text-gray-400'}`}>
                        {stage.title}
                      </h5>
                      <span className="text-[11px] font-mono text-gray-400">{stage.date}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Destination */}
          <div className="pt-6 border-t border-gray-100 flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
            <MapPin className="w-4 h-4 text-[#e12d2d] shrink-0 mt-0.5" />
            <div className="text-xs text-gray-700">
              <span className="font-bold block text-gray-900">Delivery Address:</span>
              <p>{searchedOrder.customer?.name} • {searchedOrder.customer?.phone}</p>
              <p>{searchedOrder.customer?.address}, {searchedOrder.customer?.city}, {searchedOrder.customer?.state} - {searchedOrder.customer?.pincode}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-xs font-bold text-gray-800">No active tracking found for "{searchId}"</p>
          <p className="text-[11px] text-gray-500 mt-1">Please verify your Order ID or check your profile orders history.</p>
        </div>
      )}

      <div className="text-center pt-2">
        <Link to="/profile#orders" className="text-xs font-bold text-[#e12d2d] hover:underline">
          View all your past orders in profile
        </Link>
      </div>
    </div>
  );
}
