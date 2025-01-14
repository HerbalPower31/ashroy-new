import React, { useEffect } from 'react';
import { 
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
  useLocation,
  Navigate
} from 'react-router-dom';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Booking from './pages/Booking';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import BlockDates from './pages/admin/BlockDates';
import Login from './pages/admin/Login';
import Contact from './pages/Contact';
import ManageRooms from './pages/admin/ManageRooms';
import ManageAdmins from './pages/admin/ManageAdmins';
import AdminSignup from './pages/admin/AdminSignup';
import BookingConfirmation from './pages/BookingConfirmation';

// Wrapper component to handle AOS refresh on route changes
const AnimationWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return children;
};

// Root layout component that includes AnimationWrapper
const RootLayout = () => {
  return (
    <AnimationWrapper>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </AnimationWrapper>
  );
};

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 50,
      easing: 'ease-in-out',
    });

    window.addEventListener('load', AOS.refresh);
    window.addEventListener('resize', AOS.refresh);

    return () => {
      window.removeEventListener('load', AOS.refresh);
      window.removeEventListener('resize', AOS.refresh);
    };
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<AdminSignup />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="block-dates" element={<BlockDates />} />
            <Route path="manage-rooms" element={<ManageRooms />} />
            <Route path="manage-admins" element={<ManageAdmins />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/" element={
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: 'background.default'
            }}
          >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Outlet />
            </Box>
            <Footer />
          </Box>
        }>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id" element={<RoomDetail />} />
          <Route path="booking" element={<Navigate to="/rooms" replace />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="booking-confirmation" element={<BookingConfirmation />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <CssBaseline />
      <RouterProvider 
        router={router} 
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      />
      <style jsx="true" global="true">{`
        [data-aos] {
          pointer-events: none;
        }
        
        [data-aos].aos-animate {
          pointer-events: auto;
        }

        .aos-init[data-aos][data-aos].aos-animate {
          transform: unset;
        }
      `}</style>
    </>
  );
}

export default App;