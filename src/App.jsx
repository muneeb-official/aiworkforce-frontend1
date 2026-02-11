// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import { useState } from "react";
// import Dashboard from "./components/Dashboard";
// import SalesAgent from "./pages/SalesAgent";

// // Simple routing without react-router for now
// function App() {
//   const [currentPage, setCurrentPage] = useState("dashboard");

// You can replace this with React Router later
//   const renderPage = () => {
//     switch (currentPage) {
//       case "sales":
//         return <SalesAgent />;
//       case "dashboard":
//       default:
//         return <Dashboard onNavigate={setCurrentPage} />;
//     }
//   };

//   return renderPage();
// }

// export default App;

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import SalesAgent from './pages/SalesAgent';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/sales" element={<SalesAgent />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// App.jsx
// import { useState } from "react";
// import Layout from "./components/Layout";
// import DashboardContent from "./components/DashboardContent";
// import SalesAgentContent from "./pages/SalesAgentContent";

// function App() {
//   const [activePage, setActivePage] = useState("analytics");

//   const renderContent = () => {
//     switch (activePage) {
//       case "sales":
//         return <SalesAgentContent />;
//       case "analytics":
//       default:
//         return <DashboardContent />;
//     }
//   };

//   return (
//     <Layout activePage={activePage} setActivePage={setActivePage}>
//       {renderContent()}
//     </Layout>
//   );
// }

// export default App;

// App.jsx
// import { useState } from "react";
// import { SearchProvider } from "./context/SearchContext";
// import { B2BSearchProvider } from "./context/B2BSearchContext";
// import Layout from "./components/Layout";
// import DashboardContent from "./components/DashboardContent";
// import SalesAgentContent from "./pages/SalesAgentContent";
// import B2BAgentContent from "./pages/B2BAgentContent";

// function AppContent() {
//   const [activePage, setActivePage] = useState("analytics");

//  const renderContent = () => {
//     switch (activePage) {
//       case "dashboard":
//         return <DashboardContent />;
//       case "b2c":
//         return <SalesAgentContent />;
//       case "b2b":
//         return <B2BAgentContent />;
//       default:
//         return <SalesAgentContent />;
//     }
//   };

//   return (
//     <Layout activePage={activePage} setActivePage={setActivePage}>
//       {renderContent()}
//     </Layout>
//   );
// }

// function App() {
//   return (
//     <SearchProvider>
//       <B2BSearchProvider>
//         <AppContent />
//       </B2BSearchProvider>
//     </SearchProvider>
//   );
// }

// export default App;


// App.jsx 
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { B2BSearchProvider } from "./context/B2BSearchContext";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { SubscriptionProvider } from "./services/SubscriptionContext";

// Layout & Pages
import Layout from "./components/layout/Layout";
import DashboardContent from "./pages/DashboardContent";
import SalesAgentContent from "./pages/salesAgent/SalesAgentContent";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ChoosePlanPage from "./pages/auth/ChoosePlanPage";
import CartPage from "./pages/auth/CartPage";
import PaymentSuccessPage from "./pages/auth/PaymentSuccessPage";
import PaymentCancelPage from "./pages/auth/PaymentCancelPage";
import IntegrationHubPage from "./pages/auth/IntegrationHubPage";
import WelcomePage from "./pages/auth/WelcomePage";
import OnboardingPage from "./pages/auth/OnboardingPage";

// Context hooks
import { useSearch } from "./context/SearchContext";
import { useB2BSearch } from "./context/B2BSearchContext";

// Route Guards
import {
  PublicRoute,
  PaymentFlowRoute,
  IntegrationRoute,
  OnboardingQuestionsRoute,
  DashboardRoute,
  ProtectedRoute,
} from "./components/auth/OnboardingGuard";

// Main App Content (Dashboard with internal navigation)
function AppContent() {
  const [activePage, setActivePage] = useState("analytics");

  const b2cContext = useSearch();
  const b2bContext = useB2BSearch();
  const credits = activePage === "b2b" ? b2bContext.credits : b2cContext.credits;

  const renderContent = () => {
    switch (activePage) {
      case "analytics":
        return <DashboardContent setActivePage={setActivePage} />;
      case "b2c":
        return <SalesAgentContent mode="b2c" setActivePage={setActivePage} />;
      case "b2b":
        return <SalesAgentContent mode="b2b" setActivePage={setActivePage} />;
      default:
        return <DashboardContent setActivePage={setActivePage} />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage} credits={credits}>
      {renderContent()}
    </Layout>
  );
}

// App with all providers and routing
function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <SubscriptionProvider>
          <Router>
            <Routes>
              {/* ==================== */}
              {/* PUBLIC ROUTES        */}
              {/* ==================== */}
              
              {/* Login - Redirects to appropriate step if authenticated */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              
              {/* SignUp - Public access */}
              <Route path="/signup" element={<SignUpPage />} />

              {/* ==================== */}
              {/* PAYMENT FLOW         */}
              {/* Step: payment        */}
              {/* ==================== */}
              
              <Route
                path="/choose-plan"
                element={
                  <PaymentFlowRoute>
                    <ChoosePlanPage />
                  </PaymentFlowRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <PaymentFlowRoute>
                    <CartPage />
                  </PaymentFlowRoute>
                }
              />
              
              {/* Payment callbacks - Protected but allow during payment step */}
              <Route
                path="/payment/success"
                element={
                  <ProtectedRoute>
                    <PaymentSuccessPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment/cancel"
                element={
                  <ProtectedRoute>
                    <PaymentCancelPage />
                  </ProtectedRoute>
                }
              />

              {/* ==================== */}
              {/* INTEGRATION HUB      */}
              {/* Steps: crm_integration, email_integration, phone_setup, social_media */}
              {/* ==================== */}
              
              <Route
                path="/integration-hub"
                element={
                  <IntegrationRoute>
                    <IntegrationHubPage />
                  </IntegrationRoute>
                }
              />

              {/* ==================== */}
              {/* ONBOARDING QUESTIONS */}
              {/* Steps: onboarding_1, onboarding_2, onboarding_3, knowledge_base */}
              {/* ==================== */}
              
              <Route
                path="/onboarding"
                element={
                  <OnboardingQuestionsRoute>
                    <OnboardingPage />
                  </OnboardingQuestionsRoute>
                }
              />
              
              {/* Welcome/Thank You Page - After onboarding complete */}
              <Route
                path="/welcome"
                element={
                  <ProtectedRoute>
                    <WelcomePage />
                  </ProtectedRoute>
                }
              />

              {/* ==================== */}
              {/* MAIN DASHBOARD       */}
              {/* Requires: is_onboarding_completed = true */}
              {/* ==================== */}
              
              <Route
                path="/dashboard/*"
                element={
                  <DashboardRoute>
                    <SearchProvider>
                      <B2BSearchProvider>
                        <AppContent />
                      </B2BSearchProvider>
                    </SearchProvider>
                  </DashboardRoute>
                }
              />

              {/* ==================== */}
              {/* DEFAULT REDIRECTS    */}
              {/* ==================== */}
              
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </SubscriptionProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}

export default App;