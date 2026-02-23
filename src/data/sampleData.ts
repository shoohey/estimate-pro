import type { Product, Customer, Estimate, ApprovalRequest, AnalysisResult } from '../types';

export const products: Product[] = [
  { id: 'p1', code: 'HJ-S50DG', name: 'ﾊｲﾌﾞﾘｯﾄﾞｼﾞｮｲﾝﾄ S-50DG', specification: 'H=125 誘導板両側装着', unit: 'ｍ', costPrice: 95000, listPrice: 127300, category: '伸縮装置', manufacturer: 'クリテック工業', stock: 30, lastUpdated: '2025-01-15' },
  { id: 'p2', code: 'ST-N50', name: '二次止水材 No.50ﾀｲﾌﾟ', specification: 'S=0～50', unit: 'ｍ', costPrice: 27000, listPrice: 36500, category: '止水材', manufacturer: 'クリテック工業', stock: 120, lastUpdated: '2025-01-15' },
  { id: 'p3', code: 'S50-CJ', name: 'S-50 地覆ｼﾞｮｲﾝﾄ', specification: 'H=125', unit: '個', costPrice: 19000, listPrice: 25670, category: '伸縮装置', manufacturer: 'クリテック工業', stock: 45, lastUpdated: '2025-01-15' },
  { id: 'p4', code: 'RB-D16', name: '補強鉄筋 D16', specification: '通し筋', unit: 'kg', costPrice: 220, listPrice: 300, category: '鉄筋', manufacturer: '共栄鋼業', stock: 500, lastUpdated: '2025-01-10' },
  { id: 'p5', code: 'ED-001', name: '端部排水装置', specification: '', unit: '本', costPrice: 4200, listPrice: 5800, category: '排水装置', manufacturer: 'クリテック工業', stock: 80, lastUpdated: '2025-01-15' },
  { id: 'p6', code: 'DA-D16', name: '差し筋アンカー D16×200', specification: '', unit: '本', costPrice: 520, listPrice: 700, category: 'アンカー', manufacturer: '旭化成建材', stock: 340, lastUpdated: '2025-01-12' },
  { id: 'p7', code: 'UR-150', name: 'ウレタン 150×100×2000 グレー', specification: '内型枠材', unit: '本', costPrice: 3300, listPrice: 4500, category: '型枠材', manufacturer: '東洋紡', stock: 60, lastUpdated: '2025-01-08' },
  { id: 'p8', code: 'PS-BK', name: 'シール材 POSシール 黒', specification: '333ml/本', unit: '本', costPrice: 1600, listPrice: 2200, category: 'シール材', manufacturer: 'ポリマー技研', stock: 200, lastUpdated: '2025-01-05' },
  { id: 'p9', code: 'SC-DAY', name: '超速硬コンクリート 昼', specification: '', unit: '回', costPrice: 185000, listPrice: 250000, category: 'コンクリート', manufacturer: '住友大阪セメント', stock: 10, lastUpdated: '2025-01-14' },
  { id: 'p10', code: 'SH-FW32', name: 'サクションホース', specification: 'FW32 5m/本', unit: '本', costPrice: 280, listPrice: 375, category: '配管部品', manufacturer: 'カクイチ', stock: 50, lastUpdated: '2025-01-10' },
  { id: 'p11', code: 'HB-HS20', name: 'ホースバンド', specification: 'HS20（19～44mm）', unit: '個', costPrice: 220, listPrice: 300, category: '配管部品', manufacturer: 'TOYOX', stock: 150, lastUpdated: '2025-01-10' },
  { id: 'p12', code: 'SP-SUS', name: 'ステンレスパイプ', specification: 'SUS 25.4×40-1.5t', unit: '個', costPrice: 45, listPrice: 60, category: '配管部品', manufacturer: '日鉄ステンレス', stock: 90, lastUpdated: '2025-01-10' },
];

export const customers: Customer[] = [
  { id: 'c1', code: 'CST-001', name: '〓〓〓〓株式会社', address: '愛知県＠＠＠市＃＃町', tel: '0568-00-0000', fax: '0568-00-0000', contactPerson: '□□ □□', markupRate: 1.35, paymentTerms: '締日から35日以内に御支払' },
  { id: 'c2', code: 'CST-002', name: '株式会社△△建設', address: '東京都千代田区丸の内1-1-1', tel: '03-1234-5678', fax: '03-1234-5679', contactPerson: '山田 太郎', markupRate: 1.30, paymentTerms: '月末締め翌月末払い' },
  { id: 'c3', code: 'CST-003', name: '○○道路株式会社', address: '大阪府大阪市中央区本町2-2-2', tel: '06-1234-5678', fax: '06-1234-5679', contactPerson: '佐藤 花子', markupRate: 1.25, paymentTerms: '月末締め翌々月10日払い' },
  { id: 'c4', code: 'CST-004', name: '××エンジニアリング', address: '北海道札幌市中央区北1条西1-1', tel: '011-123-4567', fax: '011-123-4568', contactPerson: '鈴木 一郎', markupRate: 1.40, paymentTerms: '締日から45日以内に御支払' },
];

export const estimates: Estimate[] = [
  {
    id: 'e1', estimateNumber: 'Q-2025-0891', projectName: '●●線（■■橋） 橋梁修繕工事', customerId: 'c1', customerName: '〓〓〓〓株式会社',
    date: '2025-01-20', validUntil: '2025-04-20', deliveryPlace: '御打ち合わせ', deliveryDate: '御注文後40日', paymentTerms: '締日から35日以内に御支払',
    items: [
      { id: 'ei1', productId: 'p1', code: 'HJ-S50DG', name: 'ﾊｲﾌﾞﾘｯﾄﾞｼﾞｮｲﾝﾄ S-50DG', specification: 'H=125 誘導板両側装着', quantity: 5, unit: 'ｍ', unitPrice: 127300, amount: 636500, costPrice: 95000, remarks: '' },
      { id: 'ei2', productId: 'p2', code: 'ST-N50', name: '二次止水材 No.50ﾀｲﾌﾟ', specification: 'S=0～50', quantity: 5, unit: 'ｍ', unitPrice: 36500, amount: 182500, costPrice: 27000, remarks: '' },
      { id: 'ei3', productId: 'p3', code: 'S50-CJ', name: 'S-50 地覆ｼﾞｮｲﾝﾄ', specification: 'H=125', quantity: 2, unit: '個', unitPrice: 25670, amount: 51340, costPrice: 19000, remarks: '' },
      { id: 'ei4', productId: 'p4', code: 'RB-D16', name: '補強鉄筋 D16', specification: '通し筋', quantity: 46.8, unit: 'kg', unitPrice: 300, amount: 14040, costPrice: 220, remarks: '' },
      { id: 'ei5', productId: 'p5', code: 'ED-001', name: '端部排水装置', specification: '', quantity: 2, unit: '本', unitPrice: 5800, amount: 11600, costPrice: 4200, remarks: '' },
    ],
    subtotal: 895980, tax: 89598, total: 985578, notes: '', status: 'approved', createdBy: '田中 太郎', approvedBy: '石戸 杏奈', approvedAt: '2025-01-22', itemCount: 5,
  },
  {
    id: 'e2', estimateNumber: 'Q-2025-0890', projectName: '△△高速道路 伸縮継手取替工事', customerId: 'c2', customerName: '株式会社△△建設',
    date: '2025-02-05', validUntil: '2025-05-05', deliveryPlace: '現場搬入', deliveryDate: '御注文後30日', paymentTerms: '月末締め翌月末払い',
    items: [
      { id: 'ei10', productId: 'p1', code: 'HJ-S50DG', name: 'ﾊｲﾌﾞﾘｯﾄﾞｼﾞｮｲﾝﾄ S-50DG', specification: 'H=125 誘導板両側装着', quantity: 12, unit: 'ｍ', unitPrice: 120000, amount: 1440000, costPrice: 95000, remarks: '' },
      { id: 'ei11', productId: 'p2', code: 'ST-N50', name: '二次止水材 No.50ﾀｲﾌﾟ', specification: 'S=0～50', quantity: 12, unit: 'ｍ', unitPrice: 35000, amount: 420000, costPrice: 27000, remarks: '' },
      { id: 'ei12', productId: 'p9', code: 'SC-DAY', name: '超速硬コンクリート 昼', specification: '', quantity: 3, unit: '回', unitPrice: 250000, amount: 750000, costPrice: 185000, remarks: '' },
    ],
    subtotal: 2610000, tax: 261000, total: 2871000, notes: '', status: 'pending', createdBy: '佐藤 花子', itemCount: 3,
  },
  {
    id: 'e3', estimateNumber: 'Q-2025-0889', projectName: '○○橋 補修工事', customerId: 'c3', customerName: '○○道路株式会社',
    date: '2025-02-10', validUntil: '2025-05-10', deliveryPlace: '御打ち合わせ', deliveryDate: '御注文後45日', paymentTerms: '月末締め翌々月10日払い',
    items: [
      { id: 'ei15', productId: 'p1', code: 'HJ-S50DG', name: 'ﾊｲﾌﾞﾘｯﾄﾞｼﾞｮｲﾝﾄ S-50DG', specification: 'H=125 誘導板両側装着', quantity: 8, unit: 'ｍ', unitPrice: 115000, amount: 920000, costPrice: 95000, remarks: '' },
    ],
    subtotal: 920000, tax: 92000, total: 1012000, notes: '', status: 'analyzing', createdBy: '田中 太郎', itemCount: 12,
  },
  {
    id: 'e4', estimateNumber: 'Q-2025-0888', projectName: '□□高架橋 伸縮装置取替', customerId: 'c4', customerName: '××エンジニアリング',
    date: '2025-02-12', validUntil: '2025-05-12', deliveryPlace: '現場搬入', deliveryDate: '御注文後35日', paymentTerms: '締日から45日以内に御支払',
    items: [
      { id: 'ei20', productId: 'p1', code: 'HJ-S50DG', name: 'ﾊｲﾌﾞﾘｯﾄﾞｼﾞｮｲﾝﾄ S-50DG', specification: 'H=125 誘導板両側装着', quantity: 5, unit: 'ｍ', unitPrice: 130000, amount: 650000, costPrice: 95000, remarks: '' },
      { id: 'ei21', productId: 'p3', code: 'S50-CJ', name: 'S-50 地覆ｼﾞｮｲﾝﾄ', specification: 'H=125', quantity: 4, unit: '個', unitPrice: 26000, amount: 104000, costPrice: 19000, remarks: '' },
    ],
    subtotal: 754000, tax: 75400, total: 829400, notes: '', status: 'approved', createdBy: '佐藤 花子', approvedBy: '石戸 杏奈', approvedAt: '2025-02-14', itemCount: 5,
  },
  {
    id: 'e5', estimateNumber: 'Q-2025-0887', projectName: '◇◇線 橋梁補修工事', customerId: 'c2', customerName: '株式会社△△建設',
    date: '2025-02-14', validUntil: '2025-05-14', deliveryPlace: '現場搬入', deliveryDate: '御注文後30日', paymentTerms: '月末締め翌月末払い',
    items: [],
    subtotal: 1120000, tax: 112000, total: 1232000, notes: '', status: 'rejected', createdBy: '山田 次郎', itemCount: 6,
  },
];

export const approvalRequests: ApprovalRequest[] = [
  { id: 'ar1', estimateId: 'e1', estimateNumber: 'Q-2025-0891', customerName: '〓〓〓〓株式会社', total: 985578, approvalLevel: '営業承認', requestedBy: '田中 太郎', requestedAt: '2025/01/15 14:30', status: 'approved' },
  { id: 'ar2', estimateId: 'e2', estimateNumber: 'Q-2025-0890', customerName: '株式会社△△建設', total: 2871000, approvalLevel: '上長承認', requestedBy: '佐藤 花子', requestedAt: '2025/01/15 11:20', status: 'pending' },
  { id: 'ar3', estimateId: 'e3', estimateNumber: 'Q-2025-0889', customerName: '○○道路株式会社', total: 1012000, approvalLevel: '営業承認', requestedBy: '田中 太郎', requestedAt: '2025/01/14 16:45', status: 'pending' },
  { id: 'ar4', estimateId: 'e5', estimateNumber: 'Q-2025-0887', customerName: '株式会社△△建設', total: 1232000, approvalLevel: '営業承認', requestedBy: '山田 次郎', requestedAt: '2025/01/14 09:10', status: 'rejected' },
  { id: 'ar5', estimateId: 'e4', estimateNumber: 'Q-2025-0888', customerName: '××エンジニアリング', total: 829400, approvalLevel: '営業承認', requestedBy: '佐藤 花子', requestedAt: '2025/01/13 15:00', status: 'pending' },
  { id: 'ar6', estimateId: 'e1', estimateNumber: 'Q-2025-0886', customerName: '〓〓〓〓株式会社', total: 340000, approvalLevel: '営業承認', requestedBy: '佐藤 花子', requestedAt: '2025/01/13 10:00', status: 'approved' },
];

export const analysisResults: AnalysisResult[] = [
  { id: 'a1', row: 1, readValue: 'HJ-S50DG', matchCode: 'HJ-S50DG', productName: 'ﾊｲﾌﾞﾘｯﾄﾞｼﾞｮｲﾝﾄ S-50DG', quantity: 5, unitPrice: 127300, confidence: 98, status: 'matched' },
  { id: 'a2', row: 2, readValue: 'ST-N50', matchCode: 'ST-N50', productName: '二次止水材 No.50ﾀｲﾌﾟ', quantity: 5, unitPrice: 36500, confidence: 95, status: 'matched' },
  { id: 'a3', row: 3, readValue: 'S50-CJ-H125', matchCode: 'S50-CJ', productName: 'S-50 地覆ｼﾞｮｲﾝﾄ', quantity: 2, unitPrice: 25670, confidence: 88, status: 'review' },
  { id: 'a4', row: 4, readValue: 'RB-D16-TS', matchCode: 'RB-D16', productName: '補強鉄筋 D16', quantity: 46.8, unitPrice: 300, confidence: 72, status: 'review' },
  { id: 'a5', row: 5, readValue: '特注品A-01', matchCode: '—', productName: '—', quantity: 5, unitPrice: undefined, confidence: 0, status: 'unmatched' },
];
