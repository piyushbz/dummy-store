import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  FileText, 
  Truck, 
  MapPin, 
  Check, 
  Clock, 
  ChevronDown 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import InvoiceModal from '../../components/InvoiceModal';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const statuses = ['Placed', 'In Transit', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.trackingNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-gray-950">
            Fulfillment &amp; Orders Pipeline ({orders.length})
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Manage dispatch statuses and print official GST invoices.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Order ID, Customer, or AWB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:border-black focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Orders List Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase text-gray-500 tracking-wider">
                <th className="p-3.5">Order ID &amp; Date</th>
                <th className="p-3.5">Customer &amp; Destination</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Fulfillment Status</th>
                <th className="p-3.5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Order ID & Date */}
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-gray-900 block">{order.id}</span>
                    <span className="text-[11px] text-gray-400 font-medium">{order.date}</span>
                    <span className="text-[10px] text-gray-500 font-mono block mt-0.5">AWB: {order.trackingNumber}</span>
                  </td>

                  {/* Customer */}
                  <td className="p-3.5">
                    <span className="font-bold text-gray-900 block">{order.customer?.name}</span>
                    <span className="text-[11px] text-gray-500">{order.customer?.city}, {order.customer?.state}</span>
                    <span className="text-[10px] text-gray-400 font-mono block">{order.customer?.phone}</span>
                  </td>

                  {/* Items Summary */}
                  <td className="p-3.5">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                          <span className="font-bold text-gray-900">{item.quantity}x</span>
                          <span className="truncate max-w-[150px]">{item.name}</span>
                          <span className="text-gray-400">({item.size})</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="p-3.5">
                    <span className="inline-block text-[11px] font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                      {order.paymentMethod}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="p-3.5 font-mono font-bold text-gray-950">
                    ₹{order.finalAmount}
                  </td>

                  {/* Status Dropdown */}
                  <td className="p-3.5">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-xs font-bold uppercase rounded-lg px-2.5 py-1.5 border cursor-pointer focus:outline-hidden ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : order.status === 'In Transit'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  {/* Invoice Trigger */}
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                      title="View / Print Tax Invoice"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#e12d2d]" />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={true}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}

    </div>
  );
}
