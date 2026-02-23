import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, MessageSquare } from 'lucide-react';

type TabType = 'upload' | 'memo';

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [memoText, setMemoText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) simulateUpload(files[0].name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) simulateUpload(file.name);
  };

  const simulateUpload = (filename: string) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      navigate('/analysis');
    }, 2000);
  };

  const handleMemoSubmit = () => {
    if (!memoText.trim()) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      navigate('/analysis');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">伝票入力・商品特定</h1>
        <p className="text-sm text-gray-500 mt-1">伝票アップロードまたはメモ入力で、AIが自動的に商品を特定・解析します</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm transition-colors ${
              activeTab === 'upload'
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Upload size={16} /> 伝票アップロード
          </button>
          <button
            onClick={() => setActiveTab('memo')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm transition-colors ${
              activeTab === 'memo'
                ? 'bg-white text-gray-900 shadow-sm font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare size={16} /> メモから特定
          </button>
        </div>
      </div>

      {/* Upload Area */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div
            className={`border-2 border-dashed rounded-xl p-16 text-center transition-colors ${
              dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploading ? (
              <div className="space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-600">AIが解析中です...</p>
                <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Upload size={28} className="text-gray-400" />
                </div>
                <p className="text-base font-medium text-gray-700 mb-1">ファイルをドラッグ＆ドロップ</p>
                <p className="text-sm text-gray-400 mb-4">または クリックしてファイルを選択</p>
                <div className="flex justify-center gap-2 mb-5">
                  <span className="text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-500">PDF</span>
                  <span className="text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-500">Excel</span>
                  <span className="text-xs border border-gray-300 rounded px-2.5 py-1 text-gray-500">画像(FAX)</span>
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="px-6 py-2.5 bg-[#1a2332] text-white text-sm rounded-lg hover:bg-[#243044] transition-colors"
                >
                  ファイルを選択
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* Memo Input */}
      {activeTab === 'memo' && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-sm text-gray-600">
              電話やFAXで受けた注文内容をメモとして入力してください。AIが商品を自動特定します。
            </p>
            <textarea
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
              rows={10}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              placeholder={`例:\nHJ-S50DG 5m\n二次止水材 50タイプ 5m\n地覆ジョイント H125 2個\n鉄筋 D16 通し筋 46.8kg`}
            />
            <div className="flex justify-end">
              <button
                onClick={handleMemoSubmit}
                disabled={!memoText.trim() || uploading}
                className="px-6 py-2.5 bg-[#2563eb] text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {uploading ? 'AI解析中...' : 'AIで解析する'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
