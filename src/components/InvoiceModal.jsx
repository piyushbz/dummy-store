import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { brandConfig } from '../config/brandConfig';

export default function InvoiceModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const invoiceNumber = `INV-${order.id.replace('DUMMY-', '')}`;
  const invoiceDate = order.date || new Date().toISOString().slice(0, 10);

  // Calculation for tax breakdown (GST 5% composite for apparel < ₹1000)
  const gstRate = 0.05;
  const taxableValue = Math.round(order.finalAmount / (1 + gstRate));
  const totalGst = order.finalAmount - taxableValue;
  const cgst = Math.round(totalGst / 2);
  const sgst = totalGst - cgst;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity print:hidden"
        onClick={onClose}
      />

      {/* Invoice Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 z-10 print:shadow-none print:border-none print:w-full print:max-w-none print:rounded-none">
        
        {/* Top Actions Bar (Hidden on print) */}
        <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between print:hidden print-hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Official Tax Invoice • {invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#e12d2d] hover:bg-[#c81e1e] text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Body */}
        <div id="printable-tax-invoice" className="p-8 sm:p-10 text-gray-900 space-y-6 text-xs font-sans print:p-0">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl uppercase tracking-tight text-gray-950">DUMMY</span>
                <span className="font-black text-2xl uppercase tracking-tight text-[#e12d2d]">STORE</span>
              </div>
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest mt-0.5">
                {brandConfig.companyLegalName}
              </p>
              <p className="text-[11px] text-gray-600 mt-2 max-w-xs leading-relaxed">
                {brandConfig.address}
              </p>
              <div className="mt-2 text-[10px] font-mono text-gray-700 space-y-0.5">
                <div>GSTIN: <strong className="text-black">{brandConfig.gstin}</strong></div>
                <div>CIN: <strong className="text-black">{brandConfig.cin}</strong></div>
                <div>PAN: <strong className="text-black">AABCD1234E</strong></div>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-red-50 text-[#e12d2d] border border-red-200 px-3 py-1 rounded text-xs font-black uppercase tracking-wider mb-2">
                TAX INVOICE
              </span>
              <table className="text-[11px] text-right ml-auto">
                <tbody>
                  <tr>
                    <td className="text-gray-500 pr-2">Invoice No:</td>
                    <td className="font-mono font-bold text-gray-900">{invoiceNumber}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 pr-2">Order ID:</td>
                    <td className="font-mono font-bold text-gray-900">{order.id}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 pr-2">Invoice Date:</td>
                    <td className="font-medium text-gray-900">{invoiceDate}</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 pr-2">Place of Supply:</td>
                    <td className="font-medium text-gray-900">29 - Karnataka</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Billing & Shipping Details */}
          <div className="grid grid-cols-2 gap-8 border-b border-gray-200 pb-6">
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">
                Billed To:
              </h5>
              <p className="font-bold text-sm text-gray-900">{order.customer?.name || 'Customer'}</p>
              <p className="text-gray-600 text-xs mt-0.5">{order.customer?.phone || '+91 9024556229'}</p>
              <p className="text-gray-600 text-xs">{order.customer?.email || 'shopper@dummystore.com'}</p>
            </div>

            <div>
              <h5 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">
                Shipped To (Delivery Destination):
              </h5>
              <p className="font-bold text-sm text-gray-900">{order.customer?.name || 'Customer'}</p>
              <p className="text-gray-600 text-xs mt-0.5">{order.customer?.address || 'Plot 3B, Subhash Nagar, Pal Road'}</p>
              <p className="text-gray-600 text-xs">
                {order.customer?.city || 'Jodhpur'}, {order.customer?.state || 'Rajasthan'} - {order.customer?.pincode || '342008'}
              </p>
              <p className="text-gray-600 text-xs mt-0.5">Phone: {order.customer?.phone || '+91 9024556229'}</p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-300 text-[10px] font-black uppercase tracking-wider text-gray-500 bg-gray-50">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">HSN Code</th>
                  <th className="py-2.5 px-3 text-center">Size</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Taxable Amt</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.items.map((item, idx) => {
                  const itemTotal = item.spl_price * item.quantity;
                  const itemTaxable = Math.round(itemTotal / (1 + gstRate));

                  return (
                    <tr key={`${item.id}-${item.size}-${idx}`} className="text-xs">
                      <td className="py-3 px-3 text-gray-400 font-mono">{idx + 1}</td>
                      <td className="py-3 px-3 font-bold text-gray-900">{item.name}</td>
                      <td className="py-3 px-3 font-mono text-gray-500 text-[11px]">61091000</td>
                      <td className="py-3 px-3 text-center font-bold text-gray-700">{item.size}</td>
                      <td className="py-3 px-3 text-center font-bold text-gray-900">{item.quantity}</td>
                      <td className="py-3 px-3 text-right font-mono">₹{item.spl_price}</td>
                      <td className="py-3 px-3 text-right font-mono">₹{itemTaxable}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-gray-900">₹{itemTotal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary & Tax Split */}
          <div className="pt-4 border-t border-gray-200 flex justify-between items-start gap-8">
            <div className="space-y-3 max-w-sm">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-[11px] space-y-1">
                <p className="font-bold text-gray-800">GST Breakdown (5% Apparel GST):</p>
                <div className="flex justify-between text-gray-600">
                  <span>CGST @ 2.5%:</span>
                  <span className="font-mono">₹{cgst}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>SGST @ 2.5%:</span>
                  <span className="font-mono">₹{sgst}</span>
                </div>
                <div className="flex justify-between text-gray-800 font-bold border-t border-gray-200 pt-1">
                  <span>Total Tax Included:</span>
                  <span className="font-mono">₹{totalGst}</span>
                </div>
              </div>

              <div className="text-[11px] text-gray-500">
                Payment Mode: <strong className="text-gray-900">{order.paymentMethod}</strong>
              </div>
            </div>

            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (MRP):</span>
                <span className="font-mono">₹{order.totalMrp}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Total Savings:</span>
                <span className="font-mono">-₹{order.discount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Charges:</span>
                <span className="font-mono">{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
              </div>
              <div className="pt-2 border-t border-gray-300 flex justify-between text-sm font-black text-gray-950">
                <span>Grand Total (INR):</span>
                <span className="font-mono">₹{order.finalAmount}</span>
              </div>
            </div>
          </div>

          {/* Footer Note & Signatory */}
          <div className="pt-6 border-t border-gray-200 flex items-end justify-between">
            <div className="text-[10px] text-gray-400 space-y-1">
              <p>1. This is a computer-generated tax invoice and requires no physical signature.</p>
              <p>2. Goods once sold are eligible for 30 days hassle-free exchange/return.</p>
              <p>3. Subject to Bengaluru jurisdiction only.</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-12 border-b border-gray-400 flex items-center justify-center text-[10px] font-mono text-gray-400 italic">
                DummyStore Authorized
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700 block mt-1">
                Authorised Signatory
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
