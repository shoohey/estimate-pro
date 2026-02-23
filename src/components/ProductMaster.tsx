import { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { products as initialProducts } from '../data/sampleData';
import type { Product } from '../types';

export default function ProductMaster() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    code: '', name: '', specification: '', unit: '', costPrice: 0, listPrice: 0, category: '', manufacturer: '', stock: 0,
  });

  const filtered = products.filter(
    (p) =>
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const product: Product = {
      ...newProduct as Product,
      id: `p${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setProducts([...products, product]);
    setShowAddModal(false);
    setNewProduct({ code: '', name: '', specification: '', unit: '', costPrice: 0, listPrice: 0, category: '', manufacturer: '', stock: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">商品マスター</h1>
          <p className="text-sm text-gray-500 mt-1">登録商品数: {products.length}件</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-[#1a2332] text-white text-sm rounded-lg hover:bg-[#243044] transition-colors"
        >
          <Plus size={16} /> 新規登録
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 gap-2 max-w-lg">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="品番・商品名で検索..."
            className="bg-transparent border-none outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-5 py-3.5 font-semibold text-gray-500">品番</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-500">商品名</th>
                <th className="text-center px-5 py-3.5 font-semibold text-gray-500">カテゴリ</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-500">メーカー</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-500">仕入単価</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-500">定価</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-500">在庫</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="text-blue-600 font-mono text-sm cursor-pointer hover:underline">{p.code}</span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-900">{p.name}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">{p.manufacturer}</td>
                  <td className="px-5 py-3.5 text-right text-gray-700">¥{p.costPrice.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right text-gray-700">¥{p.listPrice.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={p.stock <= 15 ? 'text-red-600 font-semibold' : 'text-gray-700'}>
                      {p.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg animate-fade-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">商品を登録</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: 'code', label: '品番', type: 'text' },
                { key: 'name', label: '商品名', type: 'text' },
                { key: 'category', label: 'カテゴリ', type: 'text' },
                { key: 'manufacturer', label: 'メーカー', type: 'text' },
                { key: 'unit', label: '単位', type: 'text' },
                { key: 'costPrice', label: '仕入単価', type: 'number' },
                { key: 'listPrice', label: '定価', type: 'number' },
                { key: 'stock', label: '在庫数', type: 'number' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    value={(newProduct as any)[f.key] || ''}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        [f.key]: f.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                キャンセル
              </button>
              <button onClick={handleAdd} className="px-5 py-2 text-sm bg-[#2563eb] text-white rounded-lg hover:bg-blue-700">
                登録
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
