import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  IndianRupee, 
  Plus, 
  ArrowRight, 
  Truck, 
  Clock 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function AdminDashboardPage() {
  const { products, orders } = useShop();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.finalAmount || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="space-y-8">
      
      {/* Top Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-gray-950">
            Operations Dashboard
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Live client-side data synchronized across browser storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="bg-[#e12d2d] hover:bg-[#c81e1e] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Drop</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase tracking-wider">
            <span>Gross Revenue</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-950 font-mono">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>+14.2%</span> from last week
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase tracking-wider">
            <span>Orders Placed</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-950 font-mono">
            {totalOrders}
          </div>
          <p className="text-[11px] text-gray-400">All channels combined</p>
        </div>

        {/* Total Drops */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase tracking-wider">
            <span>Live Catalog Drops</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-950 font-mono">
            {totalProducts}
          </div>
          <p className="text-[11px] text-gray-400">In stock &amp; published</p>
        </div>

        {/* AOV */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase tracking-wider">
            <span>Average Order Value</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-950 font-mono">
            ₹{aov}
          </div>
          <p className="text-[11px] text-gray-400">Per shopper basket</p>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
            Recent Orders &amp; Fulfillment
          </h2>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-[#e12d2d] hover:underline flex items-center gap-1"
          >
            <span>Manage All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase text-gray-500 tracking-wider">
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-gray-900">{order.id}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-gray-900 block">{order.customer?.name}</span>
                    <span className="text-[11px] text-gray-400">{order.customer?.city || 'Bengaluru'}</span>
                  </td>
                  <td className="p-3.5 text-gray-600">{order.date}</td>
                  <td className="p-3.5 text-gray-700">{order.items?.length || 1} drops</td>
                  <td className="p-3.5 font-mono font-bold text-gray-950">₹{order.finalAmount}</td>
                  <td className="p-3.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : order.status === 'In Transit'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      to="/admin/orders"
                      className="text-xs font-bold text-gray-700 hover:text-black underline"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
