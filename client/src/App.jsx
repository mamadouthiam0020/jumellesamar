import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar, { MobileTabBar } from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import WhatsAppButton from './components/WhatsAppButton';

import Home from './pages/Home';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCollections from './pages/admin/AdminCollections';
import AdminNews from './pages/admin/AdminNews';
import AdminContacts from './pages/admin/AdminContacts';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:slug" element={<CollectionDetail />} />
        <Route path="/actualites" element={<News />} />
        <Route path="/actualites/:slug" element={<NewsDetail />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="collections" element={<AdminCollections />} />
          <Route path="actualites" element={<AdminNews />} />
          <Route path="messages" element={<AdminContacts />} />
        </Route>

        <Route path="*" element={<Loading fullScreen />} />
      </Routes>
      <Footer />
      <div className="lg:hidden h-16" aria-hidden="true" />
      <MobileTabBar />
      <WhatsAppButton />
    </>
  );
}
