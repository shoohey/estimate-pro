import { useState } from 'react';
import { CheckCircle, Printer, Download, Send } from 'lucide-react';
import { estimates } from '../data/sampleData';

export default function EstimatePreview() {
  const [selectedId, setSelectedId] = useState(estimates[0]?.id || '');
  const estimate = estimates.find(e => e.id === selectedId) || estimates[0];
  const [showSuccess, setShowSuccess] = useState(false);

  if (!estimate) return null;

  const handleApprovalRequest = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">見積書プレビュー</h1>
          <p className="text-sm text-gray-500 mt-1">
            {estimate.estimateNumber} · {estimate.customerName} 様
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <CheckCircle size={15} /> メーカー価格照合
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Printer size={15} /> 印刷
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={15} /> PDF出力
          </button>
          <button
            onClick={handleApprovalRequest}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#2563eb] text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send size={15} /> 承認申請
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
          <CheckCircle size={18} className="text-green-600" />
          <p className="text-sm text-green-800">承認申請が完了しました。承認管理から状態を確認できます。</p>
        </div>
      )}

      {/* Estimate Selector */}
      <div className="no-print">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
        >
          {estimates.map(e => (
            <option key={e.id} value={e.id}>
              {e.estimateNumber} - {e.customerName} (¥{e.total.toLocaleString()})
            </option>
          ))}
        </select>
      </div>

      {/* Estimate Document */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-12">
        <div className="max-w-3xl mx-auto" style={{ fontFamily: "'Yu Mincho', 'Hiragino Mincho ProN', serif" }}>
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-[0.4em] mb-3">御 見 積 書</h2>
            <p className="text-sm text-gray-500">
              見積番号: {estimate.estimateNumber}　|　発行日: {estimate.date}　|　有効期限: {estimate.validUntil}
            </p>
          </div>

          {/* Parties */}
          <div className="flex justify-between mb-8 pb-6 border-b border-gray-200">
            <div>
              <p className="text-lg font-bold">{estimate.customerName} 御中</p>
              {estimate.customerName.includes('〓') && (
                <p className="text-sm text-gray-500 mt-1">購買部 工具課</p>
              )}
            </div>
            <div className="text-right text-sm text-gray-600">
              <p className="font-bold text-gray-900">マルマン商事株式会社</p>
              <p>〒460-0024 愛知県名古屋市中区正木2丁目8-16</p>
              <p>TEL: 052-XXX-XXXX</p>
            </div>
          </div>

          {/* Total */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-5 mb-8 flex items-center justify-between">
            <p className="text-sm font-medium text-blue-800">合計金額（税込）</p>
            <p className="text-3xl font-bold text-blue-700">¥{estimate.total.toLocaleString()}</p>
          </div>

          {/* Items Table */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2.5 px-3 font-semibold text-gray-600 w-10">No</th>
                <th className="text-left py-2.5 px-3 font-semibold text-gray-600">品番</th>
                <th className="text-left py-2.5 px-3 font-semibold text-gray-600">品名</th>
                <th className="text-right py-2.5 px-3 font-semibold text-gray-600">数量</th>
                <th className="text-right py-2.5 px-3 font-semibold text-gray-600">単価</th>
                <th className="text-right py-2.5 px-3 font-semibold text-gray-600">金額</th>
              </tr>
            </thead>
            <tbody>
              {estimate.items.map((item, i) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 px-3 text-gray-400">{i + 1}</td>
                  <td className="py-3 px-3 font-mono text-gray-700">{item.code}</td>
                  <td className="py-3 px-3 text-gray-900">{item.name}</td>
                  <td className="py-3 px-3 text-right text-gray-700">{item.quantity}</td>
                  <td className="py-3 px-3 text-right text-gray-700">¥{item.unitPrice.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-900">¥{item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-gray-500">小計</span>
                <span className="text-gray-900">¥{estimate.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">消費税(10%)</span>
                <span className="text-gray-900">¥{estimate.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-t-2 border-gray-800 font-bold text-base">
                <span className="text-gray-900">合計</span>
                <span className="text-gray-900">¥{estimate.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
