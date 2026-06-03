import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";
import ChatSupport from "./components/support/ChatSupport";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const shouldHideLayout = isAdminPage || isAuthPage;

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideLayout && <Header />}

      <main
        className={!shouldHideLayout ? "flex-grow pt-16 lg:pt-20" : "flex-grow"}
      >
        <AppRoutes />
      </main>

      {!shouldHideLayout && <Footer />}

      {/* {!isAdminPage && <ChatSupport />} */}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
