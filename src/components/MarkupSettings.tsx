import { useState } from 'react';
import { Save, Plus, X, Edit3 } from 'lucide-react';
import { customers as initialCustomers } from '../data/sampleData';
import type { Customer } from '../types';

export default function MarkupSettings() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    code: '', name: '', markupRate: 1.3,
  });

  const handleEdit = (id: string, field: keyof Customer, value: any) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSave = () => {
    setSaved(true);
    setEditingId(null);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAdd = () => {
    const customer: Customer = {
      ...newCustomer as Customer,
      id: `c${Date.now()}`,
    };
    setCustomers([...customers, customer]);
    setShowAddModal(false);
    setNewCustomer({ code: '', name: '', markupRate: 1.3 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">掛率設定</h1>
          <p className="text-sm text-gray-500 mt-1">取引先ごとの掛率（マークアップ率）を管理します</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            <Plus size={16} /> 取引先追加
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-5 py-2 text-sm rounded-lg transition-all ${
              saved ? 'bg-green-600 text-white' : 'bg-[#2563eb] text-white hover:bg-blue-700'
            }`}
          >
            {saved ? '保存しました' : <><Save size={16} /> 保存</>}
          </button>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h3 className="text-sm font-bold text-blue-900 mb-2">掛率の説明</h3>
        <p className="text-sm text-blue-800">
          掛率は仕入単価に対する販売価格の倍率です。例: 仕入単価 ¥100,000 × 掛率 1.35 = 販売単価 ¥135,000
        </p>
        <p className="text-sm text-blue-700 mt-1">
          取引先ごとに異なる掛率を設定できます。カテゴリ単位での掛率設定にも対応予定です。
        </p>
      </div>

      {/* Customer Markup Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left px-5 py-3.5 font-semibold text-gray-500">取引先コード</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-500">取引先名</th>
                <th className="text-center px-5 py-3.5 font-semibold text-gray-500">掛率</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-500">支払条件</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-500">
                  シミュレーション（¥100,000仕入時）
                </th>
                <th className="px-5 py-3.5 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-sm text-gray-500">{c.code}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-900">{c.name}</td>
                  <td className="px-5 py-3.5 text-center">
                    {editingId === c.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={c.markupRate}
                        onChange={(e) => handleEdit(c.id, 'markupRate', parseFloat(e.target.value) || 1)}
                        className="w-20 border border-blue-400 rounded px-2 py-1 text-sm text-center outline-none focus:ring-2 focus:ring-blue-500/20"
                        autoFocus
                      />
                    ) : (
                      <span className="inline-block bg-blue-50 text-blue-700 font-bold text-sm px-3 py-1 rounded-full">
                        ×{c.markupRate.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs">{c.paymentTerms}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="text-gray-900 font-medium">
                      ¥{Math.round(100000 * c.markupRate).toLocaleString()}
                    </span>
                    <span className="text-xs text-green-600 ml-2">
                      (+¥{Math.round(100000 * (c.markupRate - 1)).toLocaleString()})
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => setEditingId(editingId === c.id ? null : c.id)}
                      className={`p-1.5 rounded hover:bg-blue-50 ${editingId === c.id ? 'text-green-600' : 'text-blue-600'}`}
                    >
                      <Edit3 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Category Markup (future) */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-base font-bold text-gray-900 mb-3">カテゴリ別デフォルト掛率</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['伸縮装置', '止水材', '鉄筋', 'アンカー', '型枠材', 'シール材', 'コンクリート', '配管部品'].map((cat) => (
            <div key={cat} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-gray-700">{cat}</span>
              <span className="text-sm font-bold text-blue-600">×1.30</span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">取引先を追加</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">取引先コード</label>
                <input
                  type="text"
                  value={newCustomer.code || ''}
                  onChange={(e) => setNewCustomer({ ...newCustomer, code: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">取引先名</label>
                <input
                  type="text"
                  value={newCustomer.name || ''}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">掛率</label>
                <input
                  type="number"
                  step="0.01"
                  value={newCustomer.markupRate || 1.3}
                  onChange={(e) => setNewCustomer({ ...newCustomer, markupRate: parseFloat(e.target.value) || 1 })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                キャンセル
              </button>
              <button onClick={handleAdd} className="px-5 py-2 text-sm bg-[#2563eb] text-white rounded-lg hover:bg-blue-700">
                追加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
