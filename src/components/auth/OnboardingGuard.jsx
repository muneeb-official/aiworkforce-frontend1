// src/components/auth/OnboardingGuard.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { STEP_ROUTES } from '../../services/onboardingService';

// Loading spinner component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#4F46E5]"></div>
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
);

/**
 * OnboardingGuard - Protects routes and ensures users are on the correct onboarding step
 * 
 * @param {ReactNode} children - The component to render if access is allowed
 * @param {string} requiredStep - The step this route corresponds to (optional)
 * @param {boolean} requireCompleted - If true, requires onboarding to be complete (for dashboard)
 * @param {boolean} allowIfPaymentPending - Allow access even if payment is pending (for payment flow)
 */
const OnboardingGuard = ({ 
  children, 
  requiredStep = null,
  requireCompleted = false,
  allowIfPaymentPending = false,
}) => {
  const location = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { 
    status, 
    loading: onboardingLoading, 
    isOnboardingCompleted,
    currentStep,
    isStepCompleted,
  } = useOnboarding();

  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    // Don't do anything while loading
    if (authLoading || onboardingLoading) return;

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      setRedirectTo('/login');
      return;
    }

    // No status yet - wait
    if (!status) return;

    // Route requires completed onboarding (dashboard)
    if (requireCompleted && !isOnboardingCompleted) {
      // Redirect to current step
      const targetRoute = STEP_ROUTES[currentStep] || '/choose-plan';
      setRedirectTo(targetRoute);
      return;
    }

    // Onboarding is completed - allow access to everything except onboarding pages
    if (isOnboardingCompleted) {
      // If trying to access onboarding pages after completion, redirect to dashboard
      const onboardingRoutes = ['/choose-plan', '/cart', '/integration-hub', '/onboarding'];
      if (onboardingRoutes.includes(location.pathname)) {
        setRedirectTo('/dashboard');
        return;
      }
      setRedirectTo(null);
      return;
    }

    // Special handling for payment flow
    if (allowIfPaymentPending && currentStep === 'payment') {
      setRedirectTo(null);
      return;
    }

    // Check if user is trying to access a step they shouldn't
    if (requiredStep) {
      // User is trying to access a step
      const currentStepOrder = status.steps.find(s => s.step_name === currentStep)?.order ?? 0;
      const requiredStepOrder = status.steps.find(s => s.step_name === requiredStep)?.order ?? 0;

      // If trying to access a future step, redirect to current step
      if (requiredStepOrder > currentStepOrder && !isStepCompleted(requiredStep)) {
        const targetRoute = STEP_ROUTES[currentStep] || '/choose-plan';
        if (targetRoute !== location.pathname) {
          setRedirectTo(targetRoute);
          return;
        }
      }
    }

    // All checks passed
    setRedirectTo(null);
  }, [
    authLoading, 
    onboardingLoading, 
    isAuthenticated, 
    status, 
    requireCompleted, 
    isOnboardingCompleted, 
    currentStep, 
    requiredStep, 
    location.pathname,
    allowIfPaymentPending,
    isStepCompleted,
  ]);

  // Show loading while checking auth/onboarding
  if (authLoading || onboardingLoading) {
    return <LoadingScreen />;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Need to redirect
  if (redirectTo && redirectTo !== location.pathname) {
    return <Navigate to={redirectTo} replace />;
  }

  // All good - render children
  return children;
};

/**
 * ProtectedRoute - Simple auth check, redirects to login if not authenticated
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/**
 * PublicRoute - For login/signup pages, redirects authenticated users
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { getRedirectUrl, loading: onboardingLoading, status } = useOnboarding();
  const [redirectTo, setRedirectTo] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRedirect = async () => {
      if (authLoading || onboardingLoading) return;

      if (isAuthenticated && status) {
        try {
          const url = await getRedirectUrl();
          setRedirectTo(url);
        } catch {
          setRedirectTo('/dashboard');
        }
      }
      setChecking(false);
    };

    checkRedirect();
  }, [isAuthenticated, authLoading, onboardingLoading, status, getRedirectUrl]);

  if (authLoading || onboardingLoading || checking) {
    return <LoadingScreen />;
  }

  if (isAuthenticated && redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

/**
 * PaymentFlowRoute - For payment-related pages (choose-plan, cart)
 * Allows access if user is on payment step
 */
export const PaymentFlowRoute = ({ children }) => {
  return (
    <OnboardingGuard allowIfPaymentPending={true} requiredStep="payment">
      {children}
    </OnboardingGuard>
  );
};

/**
 * IntegrationRoute - For integration hub page
 * Requires payment to be completed
 */
export const IntegrationRoute = ({ children }) => {
  return (
    <OnboardingGuard requiredStep="crm_integration">
      {children}
    </OnboardingGuard>
  );
};

/**
 * OnboardingQuestionsRoute - For onboarding questionnaire page
 * Requires payment to be completed
 */
export const OnboardingQuestionsRoute = ({ children }) => {
  return (
    <OnboardingGuard requiredStep="onboarding_1">
      {children}
    </OnboardingGuard>
  );
};

/**
 * DashboardRoute - For main dashboard
 * Requires full onboarding completion
 */
export const DashboardRoute = ({ children }) => {
  return (
    <OnboardingGuard requireCompleted={true}>
      {children}
    </OnboardingGuard>
  );
};

export default OnboardingGuard;