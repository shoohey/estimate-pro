import { Link } from 'react-router-dom';
import { FileText, Upload, Clock, TrendingUp, ArrowRight, AlertTriangle, Info } from 'lucide-react';
import { estimates } from '../data/sampleData';

const statusConfig: Record<string, { label: string; cls: string }> = {
  draft: { label: '下書き', cls: 'bg-gray-100 text-gray-600' },
  pending: { label: '承認待ち', cls: 'bg-amber-100 text-amber-700' },
  approved: { label: '承認済', cls: 'bg-green-100 text-green-700' },
  rejected: { label: '差戻し', cls: 'bg-red-100 text-red-700' },
  sent: { label: '送付済', cls: 'bg-blue-100 text-blue-700' },
  analyzing: { label: 'AI解析中', cls: 'bg-blue-100 text-blue-700' },
};

export default function Dashboard() {
  const pendingCount = estimates.filter(e => e.status === 'pending').length;
  const analyzingCount = estimates.filter(e => e.status === 'analyzing').length;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-sm text-gray-500 mt-1">AI見積自動作成システム — マルマン商事株式会社</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">本日の見積件数</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
              <p className="text-xs text-blue-600 mt-1">+3件</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <FileText size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">AI解析中</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analyzingCount > 0 ? analyzingCount : 3}</p>
              <p className="text-xs text-gray-400 mt-1">処理中</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Upload size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">承認待ち</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{pendingCount > 0 ? pendingCount : 5}</p>
              <p className="text-xs text-orange-600 mt-1">要対応</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <Clock size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">今月の処理件数</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">287</p>
              <p className="text-xs text-green-600 mt-1">+18%</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
              <TrendingUp size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Estimates */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">最近の見積</h3>
            <Link to="/estimate-preview" className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
              すべて表示 <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {estimates.slice(0, 5).map((est) => {
              const sc = statusConfig[est.status] || statusConfig.draft;
              return (
                <Link
                  key={est.id}
                  to={`/estimate-preview`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{est.customerName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {est.estimateNumber} · {est.itemCount}品目
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900">
                      ¥{est.total.toLocaleString()}
                    </p>
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${sc.cls}`}>
                      {sc.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-amber-500" />
              通知・アラート
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">品番「ED-001」の在庫が残り5個です</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">△△建設向け見積の承認期限が本日です</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">新規掛率テーブルの更新が完了しました</p>
              </div>
            </div>
          </div>

          {/* Efficiency */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm text-gray-500 flex items-center gap-2 mb-2">
              <TrendingUp size={14} />
              今月の効率化
            </h3>
            <p className="text-3xl font-bold text-green-600">42時間削減</p>
            <p className="text-sm text-gray-400 mt-1">手動入力比 約68%短縮</p>
          </div>
        </div>
      </div>
    </div>
  );
}
