import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import { RoleGuard, ProtectedRoute } from './components/RoleGuard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Diagnosis from './pages/Diagnosis';

// Owner Pages
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import OrdersPage from './pages/OrdersPage';
import InventoryPage from './pages/InventoryPage';
import InventoryAdd from './pages/InventoryAdd';
import InventoryEdit from './pages/InventoryEdit';
import FlowerCatalog from './pages/FlowerCatalog';
import FlowerAdd from './pages/FlowerAdd';
import FlowerEdit from './pages/FlowerEdit';
import FlowerDetails from './pages/FlowerDetails';
import DiagnosisPage from './pages/DiagnosisPage';
import DiagnosisResult from './pages/DiagnosisResult';
import AnalyticsPage from './pages/AnalyticsPage';
import SuppliersPage from './pages/SuppliersPage';
import SupplierDetails from './pages/SupplierDetails';
import SupplierOrderForm from './pages/SupplierOrderForm';
import SupplierOrderDetails from './pages/SupplierOrderDetails';
import CustomersPage from './pages/CustomersPage';
import EventsPage from './pages/EventsPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import OwnerLayout from './components/OwnerLayout';

// Customer Pages
import CustomerLayout from './components/CustomerLayout';
import CustomerHome from './pages/customer/CustomerHome';
import CustomerShop from './pages/customer/CustomerShop';
import ProductDetails from './pages/customer/ProductDetails';
import CustomerCart from './pages/customer/CustomerCart';
import Checkout from './pages/customer/Checkout';
import BouquetBuilder from './pages/customer/BouquetBuilder';
import MyOccasions from './pages/customer/MyOccasions';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/diagnosis" element={<Diagnosis />} />

          {/* Owner Protected Routes */}
          <Route path="/dashboard" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><Dashboard /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/calendar" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><CalendarPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/orders" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><OrdersPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/inventory" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><InventoryPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/inventory/add" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><InventoryAdd /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/inventory/:itemId/edit" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><InventoryEdit /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/flowers" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><FlowerCatalog /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/flowers/add" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><FlowerAdd /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/flowers/:flowerId/edit" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><FlowerEdit /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/flowers/:flowerId" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><FlowerDetails /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/ai-diagnosis" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><DiagnosisPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/ai-diagnosis/:diagnosisId" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><DiagnosisResult /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/analytics" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><AnalyticsPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/suppliers" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><SuppliersPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/suppliers/:supplierId" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><SupplierDetails /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/suppliers/:supplierId/order" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><SupplierOrderForm /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/supplier-orders/:orderId" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><SupplierOrderDetails /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/customers" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><CustomersPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/events" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><EventsPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/notifications" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><NotificationsPage /></OwnerLayout></RoleGuard>} />
          <Route path="/owner/settings" element={<RoleGuard allowedRoles={['owner']}><OwnerLayout><SettingsPage /></OwnerLayout></RoleGuard>} />

          {/* Customer Protected Routes */}
          <Route path="/customer/home" element={<RoleGuard allowedRoles={['customer']}><CustomerLayout><CustomerHome /></CustomerLayout></RoleGuard>} />
          <Route path="/customer/shop" element={<RoleGuard allowedRoles={['customer']}><CustomerLayout><CustomerShop /></CustomerLayout></RoleGuard>} />
          <Route path="/customer/products/:productId" element={<RoleGuard allowedRoles={['customer']}><CustomerLayout><ProductDetails /></CustomerLayout></RoleGuard>} />
          <Route path="/customer/cart" element={<RoleGuard allowedRoles={['customer']}><CustomerLayout><CustomerCart /></CustomerLayout></RoleGuard>} />
          <Route path="/customer/checkout" element={<RoleGuard allowedRoles={['customer']}><CustomerLayout><Checkout /></CustomerLayout></RoleGuard>} />
          <Route path="/customer/bouquet-builder" element={<RoleGuard allowedRoles={['customer']}><CustomerLayout><BouquetBuilder /></CustomerLayout></RoleGuard>} />
          <Route path="/customer/occasions" element={<RoleGuard allowedRoles={['customer']}><CustomerLayout><MyOccasions /></CustomerLayout></RoleGuard>} />
          {/* We will add more customer routes here in subsequent steps */}
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
