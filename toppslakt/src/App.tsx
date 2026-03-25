import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import MarketsPage from './pages/MarketsPage';
import CasePage from './pages/CasePage';
import ContactPage from './pages/ContactPage';
import ToolsPage from './pages/ToolsPage';

export default function App() {
  const { dark, toggle } = useTheme();

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header dark={dark} onToggleTheme={toggle} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/case" element={<CasePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/tools" element={<ToolsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
