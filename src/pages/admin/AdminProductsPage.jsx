import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  X, 
  Check, 
  Sparkles, 
  Search,
  Image as ImageIcon 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/mockProducts';

export default function AdminProductsPage() {
  const { products, addProduct, deleteProduct } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New product form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Oversized T-Shirts');
  const [gender, setGender] = useState(1);
  const [price, setPrice] = useState(1499);
  const [splPrice, setSplPrice] = useState(999);
  const [primaryImage, setPrimaryImage] = useState(
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80'
  );

  const [sizeStock, setSizeStock] = useState({
    XS: 8,
    S: 15,
    M: 25,
    L: 20,
    XL: 12,
    XXL: 5
  });

  const handleStockChange = (size, val) => {
    setSizeStock(prev => ({ ...prev, [size]: Number(val) }));
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addProduct({
      name,
      category,
      gender: Number(gender),
      price: Number(price),
      spl_price: Number(splPrice),
      primary_image: primaryImage,
      images: [primaryImage],
      size_stock: sizeStock
    });

    setName('');
    setShowAddModal(false);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-gray-950">
            Catalog &amp; Drops ({products.length})
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Add or remove apparel pieces. Changes instantly update the storefront.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#e12d2d] hover:bg-[#c81e1e] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Drop</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search catalog drops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:border-black focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase text-gray-500 tracking-wider">
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Target</th>
                <th className="p-3.5">Price / MRP</th>
                <th className="p-3.5">Size Stocks</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredProducts.map(p => {
                const totalStock = Object.values(p.size_stock || {}).reduce((a, b) => a + b, 0);

                return (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.primary_image}
                          alt=""
                          className="w-12 h-14 object-cover object-top rounded-lg bg-gray-100 shrink-0 border border-gray-200"
                        />
                        <div>
                          <a 
                            href={`/product/${p.id}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="font-bold text-gray-900 hover:text-[#e12d2d] flex items-center gap-1"
                          >
                            <span>{p.name}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                          <span className="text-[10px] font-mono text-gray-400">ID: {p.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-gray-700">{p.category}</td>

                    <td className="p-3.5">
                      <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-0.5 rounded">
                        {p.gender === 1 ? 'Men' : p.gender === 2 ? 'Women' : 'Unisex'}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold font-mono text-gray-950">₹{p.spl_price}</span>
                      <span className="text-gray-400 line-through text-[11px] block font-mono">₹{p.price}</span>
                    </td>

                    <td className="p-3.5">
                      <span className={`font-mono text-xs font-bold ${totalStock < 10 ? 'text-red-600' : 'text-gray-800'}`}>
                        {totalStock} units
                      </span>
                      <div className="flex gap-1 text-[9px] text-gray-500 mt-0.5">
                        {Object.entries(p.size_stock || {}).map(([sz, qty]) => (
                          <span key={sz} className="border border-gray-200 px-1 rounded-xs">
                            {sz}:{qty}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-3.5 text-gray-700">
                      ★ {p.rating} ({p.rating_count})
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 z-10 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h2 className="text-sm font-black uppercase tracking-wider text-gray-900">
                Create New Streetwear Drop
              </h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase text-gray-700 block mb-1">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Acid-Wash Cyber Tokyo Heavyweight Hoodie"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-gray-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase text-gray-700 block mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden cursor-pointer"
                  >
                    <option value={1}>Men</option>
                    <option value={2}>Women</option>
                    <option value={3}>Unisex</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-gray-700 block mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-gray-700 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={splPrice}
                    onChange={(e) => setSplPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase text-gray-700 block mb-1">Primary Image URL (Unsplash)</label>
                <input
                  type="url"
                  value={primaryImage}
                  onChange={(e) => setPrimaryImage(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-hidden"
                  required
                />
              </div>

              {/* Size Stocks Grid */}
              <div>
                <label className="font-bold uppercase text-gray-700 block mb-1">Inventory by Size</label>
                <div className="grid grid-cols-6 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <div key={size} className="text-center">
                      <span className="font-bold text-[10px] text-gray-500 block mb-0.5">{size}</span>
                      <input
                        type="number"
                        min="0"
                        value={sizeStock[size]}
                        onChange={(e) => handleStockChange(size, e.target.value)}
                        className="w-full px-1.5 py-1 text-center font-mono text-xs bg-gray-50 border border-gray-200 rounded-md focus:border-black focus:outline-hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#111827] hover:bg-black text-white py-3 rounded-xl font-black uppercase tracking-wider transition-colors shadow-sm"
                >
                  Publish Drop to Storefront
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
