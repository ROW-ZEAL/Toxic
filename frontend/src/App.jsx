import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// Main Layout & Pages
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

// Auth Pages
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail ";

// Admin Auth & Layout
import AdminRegistration from "./pages/admin/AdminRegistration";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Admin Venue Management
import ManageVenues from "./pages/admin/ManageVenues";
import VenueAdd from "./pages/admin/Venue/VenueAdd";
import AddSlots from "./pages/admin/Venue/AddSlots";

// Pages
import CategoryPage from "./pages/Homes/Venue/CategoryPage";
import BookingPage from "./pages/Homes/Venue/BookingPage";

function App() {
  const { access_token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="venues/manage" element={<ManageVenues />} />
          <Route path="venues/add" element={<VenueAdd />} />
          <Route path="venues/slots" element={<AddSlots />} />
        </Route>

        {/* Main Routes with Layout */}
        <Route path="/" element={<Layout />}>
          {/* Admin Auth Routes */}
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/register" element={<AdminRegistration />} />
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route
            path="login"
            element={
              !access_token ? <LoginReg /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="sendpasswordresetemail"
            element={<SendPasswordResetEmail />}
          />
          <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
          <Route
            path="dashboard"
            element={access_token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="admin/register"
            element={
              !access_token ? (
                <AdminRegistration />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="/book/:id" element={<BookingPage />} />
        </Route>

        {/* Fallback route for 404 */}
        <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
