export interface Product {
  id: string;
  code: string;
  name: string;
  specification: string;
  unit: string;
  costPrice: number;
  listPrice: number;
  category: string;
  manufacturer: string;
  stock: number;
  lastUpdated: string;
}

export interface Customer {
  id: string;
  code: string;
  name: string;
  address: string;
  tel: string;
  fax: string;
  contactPerson: string;
  markupRate: number;
  paymentTerms: string;
}

export interface EstimateItem {
  id: string;
  productId: string;
  code: string;
  name: string;
  specification: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
  costPrice: number;
  remarks: string;
}

export interface Estimate {
  id: string;
  estimateNumber: string;
  projectName: string;
  customerId: string;
  customerName: string;
  date: string;
  validUntil: string;
  deliveryPlace: string;
  deliveryDate: string;
  paymentTerms: string;
  items: EstimateItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'sent' | 'analyzing';
  createdBy: string;
  approvedBy?: string;
  approvedAt?: string;
  itemCount: number;
}

export interface ApprovalRequest {
  id: string;
  estimateId: string;
  estimateNumber: string;
  customerName: string;
  total: number;
  approvalLevel: string;
  requestedBy: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
}

export interface AnalysisResult {
  id: string;
  row: number;
  readValue: string;
  matchCode: string;
  productName: string;
  quantity: number;
  unitPrice?: number;
  confidence: number;
  status: 'matched' | 'review' | 'unmatched';
}
