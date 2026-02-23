import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Search,
  FileText,
  Package,
  Percent,
  CheckSquare,
  Menu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'ダッシュボード' },
  { path: '/upload', icon: Upload, label: '伝票アップロード' },
  { path: '/analysis', icon: Search, label: 'AI解析結果' },
  { path: '/estimate-preview', icon: FileText, label: '見積生成確認' },
  { path: '/products', icon: Package, label: '商品マスター' },
  { path: '/markup', icon: Percent, label: '掛率設定' },
  { path: '/approvals', icon: CheckSquare, label: '承認管理' },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f7fa]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-[#1a2332] text-white transition-all duration-300 ${
          collapsed ? 'w-[68px]' : 'w-[240px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className={`flex items-center h-[64px] px-4 ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-9 h-9 rounded-lg bg-[#2563eb] flex items-center justify-center text-white flex-shrink-0">
            <FileText size={18} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-[15px] font-bold leading-tight">AI見積システム</h1>
              <p className="text-[11px] text-gray-400 leading-tight">マルマン商事</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-[13px] ${
                  isActive
                    ? 'bg-[#2563eb] text-white font-medium'
                    : 'text-gray-400 hover:bg-[#243044] hover:text-gray-200'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className={`border-t border-white/10 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center gap-2.5 ${collapsed ? '' : ''}`}>
            <div className="w-8 h-8 rounded bg-[#334155] flex items-center justify-center text-gray-300 flex-shrink-0">
              <LayoutDashboard size={14} />
            </div>
            {!collapsed && (
              <div>
                <p className="text-[13px] text-gray-200 font-medium leading-tight">田中 太郎</p>
                <p className="text-[11px] text-gray-500 leading-tight">営業部</p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center h-10 border-t border-white/10 text-gray-500 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="h-[52px] bg-white border-b border-gray-200 flex items-center px-4 lg:hidden flex-shrink-0">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 -ml-2"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <h2 className="ml-2 text-[15px] font-semibold text-gray-800">
            AI見積システム
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
