import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/layout/PageTransition";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import AIPlanner from "../pages/AIPlanner";
import AIPlannerResultPage from "../pages/AIPlannerResultPage";
import Destinations from "../pages/Destinations";
import DestinationDetail from "../pages/DestinationDetail";
import Tours from "../pages/Tours";
import LocalBuddy from "../pages/LocalBuddy";
import GuideDetail from "../pages/GuideDetail";
import Community from "../pages/Community";
import About from "../pages/About";
import Contact from "../pages/Contact";
import TourDetail from "../pages/TourDetail";
import UserProfile from "../pages/UserProfile";
import Blogs from "../pages/Blogs";
import BlogDetail from "../pages/BlogDetail";
// Service pages imports
import Hotels from "../pages/Hotels";
import HotelDetail from "../pages/HotelDetail";
import Restaurants from "../pages/Restaurants";
import RestaurantDetail from "../pages/RestaurantDetail";

// Auth Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import ConfirmEmail from "../pages/ConfirmEmail";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import MyPlans from "../pages/MyPlans";

// B2B Management Pages
import B2BDashboard from "../pages/b2b/B2BDashboard";
import B2BServiceManagement from "../pages/b2b/B2BServiceManagement";
import B2BBookingManagement from "../pages/b2b/B2BBookingManagement";
import B2BNewsManagement from "../pages/b2b/B2BNewsManagement";

// Local Buddy Pages
import LocalBuddyDashboard from "../pages/localbuddy/LocalBuddyDashboard";

// Admin Pages
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminHome from "../pages/admin/AdminHome";
import AdminDestinations from "../pages/admin/AdminDestinations";
import AdminGiftcodes from "../pages/admin/AdminGiftcodes";
import AdminFeedback from "../pages/admin/AdminFeedback";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminSpinWheel from "../pages/admin/AdminSpinWheel";
import AdminCrawlJobs from "../pages/admin/AdminCrawlJobs";

// Error Pages
import Error401 from "../pages/errors/Error401";
import Error403 from "../pages/errors/Error403";
import Error500 from "../pages/errors/Error500";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PageTransition>
              <ForgotPassword />
            </PageTransition>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PageTransition>
              <ResetPassword />
            </PageTransition>
          }
        />

        {/* Email Confirmation Route */}
        <Route
          path="/confirm-email"
          element={
            <PageTransition>
              <ConfirmEmail />
            </PageTransition>
          }
        />

        {/* Protected Profile Route */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PageTransition>
                <Profile />
              </PageTransition>
            </PrivateRoute>
          }
        />

        <Route
          path="/my-plans"
          element={
            <PrivateRoute>
              <PageTransition>
                <MyPlans />
              </PageTransition>
            </PrivateRoute>
          }
        />

        <Route
          path="/ai-planner"
          element={
            <PageTransition>
              <AIPlanner />
            </PageTransition>
          }
        />
        <Route
          path="/ai-planner-result"
          element={
            <PageTransition>
              <AIPlannerResultPage />
            </PageTransition>
          }
        />
        <Route
          path="/destinations"
          element={
            <PageTransition>
              <Destinations />
            </PageTransition>
          }
        />
        <Route
          path="/destinations/:id"
          element={
            <PageTransition>
              <DestinationDetail />
            </PageTransition>
          }
        />
        <Route
          path="/tours"
          element={
            <PageTransition>
              <Tours />
            </PageTransition>
          }
        />
        <Route
          path="/tours/:id"
          element={
            <PageTransition>
              <TourDetail />
            </PageTransition>
          }
        />
        {/* Local Buddy Routes */}
        <Route
          path="/local-buddy"
          element={
            <PageTransition>
              <LocalBuddy />
            </PageTransition>
          }
        />
        <Route
          path="/local-buddy/:guideId"
          element={
            <PageTransition>
              <GuideDetail />
            </PageTransition>
          }
        />
        <Route
          path="/community"
          element={
            <PageTransition>
              <Community />
            </PageTransition>
          }
        />

        <Route
          path="/community/profile/:userId"
          element={
            <PageTransition>
              <UserProfile />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />

        {/* Blog Routes */}
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <PageTransition>
                <Blogs />
              </PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <PrivateRoute>
              <PageTransition>
                <BlogDetail />
              </PageTransition>
            </PrivateRoute>
          }
        />

        {/* Booking Routes (Hotels & Restaurants) */}
        <Route
          path="/booking/hotels"
          element={
            <PageTransition>
              <Hotels />
            </PageTransition>
          }
        />
        <Route
          path="/booking/hotels/:slug"
          element={
            <PageTransition>
              <HotelDetail />
            </PageTransition>
          }
        />
        <Route
          path="/booking/restaurants"
          element={
            <PageTransition>
              <Restaurants />
            </PageTransition>
          }
        />
        <Route
          path="/booking/restaurants/:slug"
          element={
            <PageTransition>
              <RestaurantDetail />
            </PageTransition>
          }
        />

        {/* B2B Management Routes */}
        <Route
          path="/b2b"
          element={
            <PageTransition>
              <B2BDashboard />
            </PageTransition>
          }
        />
        <Route
          path="/b2b/services"
          element={
            <PageTransition>
              <B2BServiceManagement />
            </PageTransition>
          }
        />
        <Route
          path="/b2b/bookings"
          element={
            <PageTransition>
              <B2BBookingManagement />
            </PageTransition>
          }
        />
        <Route
          path="/b2b/news"
          element={
            <PageTransition>
              <B2BNewsManagement />
            </PageTransition>
          }
        />

        {/* Local Buddy Routes */}
        <Route
          path="/buddy/dashboard"
          element={
            <PageTransition>
              <LocalBuddyDashboard />
            </PageTransition>
          }
        />

        {/* Admin Routes - Nested with AdminDashboard layout */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          {/* Admin Dashboard Home */}
          <Route
            index
            element={
              <PageTransition>
                <AdminHome />
              </PageTransition>
            }
          />
          {/* Admin Destinations Management */}
          <Route
            path="destinations"
            element={
              <PageTransition>
                <AdminDestinations />
              </PageTransition>
            }
          />
          {/* Admin Giftcodes Management */}
          <Route
            path="giftcodes"
            element={
              <PageTransition>
                <AdminGiftcodes />
              </PageTransition>
            }
          />
          {/* Admin Feedback Management */}
          <Route
            path="feedback"
            element={
              <PageTransition>
                <AdminFeedback />
              </PageTransition>
            }
          />
          {/* Admin Users Management */}
          <Route
            path="users"
            element={
              <PageTransition>
                <AdminUsers />
              </PageTransition>
            }
          />
          {/* Admin Blogs Management */}
          <Route
            path="blogs"
            element={
              <PageTransition>
                <AdminBlogs />
              </PageTransition>
            }
          />
          {/* Admin Spin Wheel Config */}
          <Route
            path="spin-wheel"
            element={
              <PageTransition>
                <AdminSpinWheel />
              </PageTransition>
            }
          />
          <Route
            path="crawl-jobs"
            element={
              <PageTransition>
                <AdminCrawlJobs />
              </PageTransition>
            }
          />
        </Route>

        {/* Error Routes */}
        <Route
          path="/401"
          element={
            <PageTransition>
              <Error401 />
            </PageTransition>
          }
        />
        <Route
          path="/403"
          element={
            <PageTransition>
              <Error403 />
            </PageTransition>
          }
        />
        <Route
          path="/500"
          element={
            <PageTransition>
              <Error500 />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
