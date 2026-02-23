import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle, XCircle, Clock, AlertTriangle, X } from 'lucide-react';
import { approvalRequests as initialRequests } from '../data/sampleData';
import type { ApprovalRequest } from '../types';

const statusConfig: Record<string, { label: string; cls: string }> = {
  pending: { label: '承認待ち', cls: 'bg-amber-100 text-amber-700' },
  approved: { label: '承認済', cls: 'bg-green-500 text-white' },
  rejected: { label: '差戻し', cls: 'bg-red-500 text-white' },
};

export default function ApprovalWorkflow() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests);
  const [actionModal, setActionModal] = useState<{ id: string; action: 'approve' | 'reject' } | null>(null);
  const [comment, setComment] = useState('');

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  const handleAction = () => {
    if (!actionModal) return;
    setRequests(requests.map(r =>
      r.id === actionModal.id
        ? { ...r, status: actionModal.action === 'approve' ? 'approved' : 'rejected', comment: comment || undefined }
        : r
    ));
    setActionModal(null);
    setComment('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">承認管理</h1>
        <p className="text-sm text-gray-500 mt-1">承認待ち: {pendingCount}件</p>
      </div>

      {/* Approval Rule */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center gap-3">
        <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
        <p className="text-sm text-amber-900">
          承認ルール: <span className="font-bold">¥1,500,000以上</span>は上長承認が必要です。それ未満は担当営業が承認可能です。
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center">
            <Clock size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">承認待ち</p>
            <p className="text-2xl font-bold text-gray-900">{pendingCount}件</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
            <CheckCircle size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">承認済</p>
            <p className="text-2xl font-bold text-gray-900">{approvedCount}件</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
            <XCircle size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">差戻し</p>
            <p className="text-2xl font-bold text-gray-900">{rejectedCount}件</p>
          </div>
        </div>
      </div>

      {/* Approval History */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">承認履歴</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left px-5 py-3 font-semibold text-gray-500">見積番号</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">顧客名</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-500">金額</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-500">承認区分</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">申請者</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-500">申請日時</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-500">状態</th>
                <th className="text-center px-5 py-3 font-semibold text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => {
                const sc = statusConfig[req.status];
                return (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <Link to="/estimate-preview" className="text-blue-600 hover:underline font-mono text-sm">
                        {req.estimateNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-900">{req.customerName}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-gray-900">
                      ¥{req.total.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-full ${
                        req.approvalLevel === '上長承認' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {req.approvalLevel}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-500">👤</span>
                        {req.requestedBy}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{req.requestedAt}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${sc.cls}`}>
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          to="/estimate-preview"
                          className="flex items-center gap-1 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
                        >
                          <Eye size={13} /> 詳細
                        </Link>
                        {req.status === 'pending' && (
                          <>
                            <button
                              onClick={() => { setActionModal({ id: req.id, action: 'approve' }); setComment(''); }}
                              className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600"
                            >
                              承認
                            </button>
                            <button
                              onClick={() => { setActionModal({ id: req.id, action: 'reject' }); setComment(''); }}
                              className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                            >
                              差戻
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">
                {actionModal.action === 'approve' ? '承認確認' : '差戻確認'}
              </h3>
              <button onClick={() => setActionModal(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                この見積を{actionModal.action === 'approve' ? '承認' : '差戻'}しますか？
              </p>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                placeholder="コメント（任意）"
              />
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200">
              <button onClick={() => setActionModal(null)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                キャンセル
              </button>
              <button
                onClick={handleAction}
                className={`px-5 py-2 text-sm text-white rounded-lg ${
                  actionModal.action === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {actionModal.action === 'approve' ? '承認する' : '差戻する'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
