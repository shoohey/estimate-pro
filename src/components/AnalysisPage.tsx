import { Link } from 'react-router-dom';
import { ArrowRight, Eye, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { analysisResults } from '../data/sampleData';

const statusConfig: Record<string, { label: string; cls: string }> = {
  matched: { label: '一致', cls: 'bg-green-500 text-white' },
  review: { label: '要確認', cls: 'bg-amber-400 text-white' },
  unmatched: { label: '未一致', cls: 'bg-red-500 text-white' },
};

export default function AnalysisPage() {
  const matchedCount = analysisResults.filter(r => r.status === 'matched').length;
  const reviewCount = analysisResults.filter(r => r.status === 'review').length;
  const unmatchedCount = analysisResults.filter(r => r.status === 'unmatched').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI解析結果</h1>
          <p className="text-sm text-gray-500 mt-1">発注書_〓〓〓〓_20250120.pdf の解析結果</p>
        </div>
        <Link
          to="/estimate-preview"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1a2332] text-white text-sm rounded-lg hover:bg-[#243044] transition-colors"
        >
          見積生成へ進む <ArrowRight size={16} />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">完全一致</p>
            <p className="text-2xl font-bold text-gray-900">{matchedCount}件</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
            <AlertTriangle size={20} className="text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">要確認（ゆらぎ候補）</p>
            <p className="text-2xl font-bold text-gray-900">{reviewCount}件</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <HelpCircle size={20} className="text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">未マッチ</p>
            <p className="text-2xl font-bold text-gray-900">{unmatchedCount}件</p>
          </div>
        </div>
      </div>

      {/* Analysis Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">解析明細</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Eye size={14} /> 元伝票を表示
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left px-5 py-3 font-semibold text-gray-500 w-12">行</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">読取値</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">マッチ品番</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">商品名</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-500">数量</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-500">単価</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-500">信頼度</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-500">状態</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {analysisResults.map((r) => {
                const sc = statusConfig[r.status];
                return (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 text-gray-400">{r.row}</td>
                    <td className="px-5 py-3.5 font-mono text-sm text-gray-700">{r.readValue}</td>
                    <td className="px-5 py-3.5 font-mono text-sm text-gray-700">{r.matchCode}</td>
                    <td className="px-5 py-3.5 text-gray-900">{r.productName}</td>
                    <td className="px-5 py-3.5 text-right text-gray-700">{r.quantity}</td>
                    <td className="px-5 py-3.5 text-right text-gray-700">
                      {r.unitPrice ? `¥${r.unitPrice.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              r.confidence >= 90
                                ? 'bg-green-500'
                                : r.confidence >= 70
                                ? 'bg-amber-400'
                                : 'bg-gray-300'
                            }`}
                            style={{ width: `${r.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-8 text-right">{r.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${sc.cls}`}>
                        {sc.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
