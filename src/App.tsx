import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import AnalysisPage from './components/AnalysisPage';
import EstimatePreview from './components/EstimatePreview';
import ProductMaster from './components/ProductMaster';
import MarkupSettings from './components/MarkupSettings';
import ApprovalWorkflow from './components/ApprovalWorkflow';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/estimate-preview" element={<EstimatePreview />} />
          <Route path="/products" element={<ProductMaster />} />
          <Route path="/markup" element={<MarkupSettings />} />
          <Route path="/approvals" element={<ApprovalWorkflow />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
