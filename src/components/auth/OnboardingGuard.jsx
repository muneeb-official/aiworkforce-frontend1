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
 * PublicRoute - For login page ONLY (not signup)
 * Redirects authenticated users to their appropriate step
 */
export const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, status, loading: onboardingLoading } = useOnboarding();
  const [timedOut, setTimedOut] = useState(false);
  
  // If not authenticated, show children (login page)
  if (!isAuthenticated) {
    return children;
  }

  // If auth is loading, show loading
  if (authLoading) {
    return <LoadingScreen />;
  }

  // Set up timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Wait for onboarding to initialize (with timeout)
  if (!initialized && !timedOut && onboardingLoading) {
    return <LoadingScreen />;
  }

  // Determine redirect URL based on onboarding status
  let redirectTo = '/dashboard';
  
  if (initialized && status) {
    if (isOnboardingCompleted) {
      redirectTo = '/dashboard';
    } else if (currentStep) {
      redirectTo = STEP_ROUTES[currentStep] || '/choose-plan';
    } else {
      // No current step means user just signed up - go to choose-plan
      redirectTo = '/choose-plan';
    }
  } else if (timedOut || !onboardingLoading) {
    // If timed out or not loading anymore but no status,
    // check if we have any indication of where to go
    if (isOnboardingCompleted) {
      redirectTo = '/dashboard';
    } else {
      // Default to choose-plan for new users
      redirectTo = '/choose-plan';
    }
  }

  return <Navigate to={redirectTo} replace />;
};

/**
 * PaymentFlowRoute - For payment-related pages (choose-plan, cart)
 * Allows access for users who need to complete payment
 */
export const PaymentFlowRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, loading: onboardingLoading } = useOnboarding();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If onboarding is completed, redirect to dashboard
  if (initialized && isOnboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  // FIX: If onboarding is initialized and user is NOT on payment step,
  // redirect them to their current step
  if (initialized && currentStep && currentStep !== 'payment') {
    const redirectTo = STEP_ROUTES[currentStep];
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  // Allow access:
  // 1. When onboarding not initialized yet (new user after signup)
  // 2. When current step is 'payment'
  // 3. When no current step (fresh signup)
  return children;
};

/**
 * IntegrationRoute - For integration hub page
 * Requires payment to be completed
 */
export const IntegrationRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, loading: onboardingLoading } = useOnboarding();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wait for onboarding to initialize
  if (!initialized && onboardingLoading) {
    return <LoadingScreen />;
  }

  // If onboarding is completed, redirect to dashboard
  if (initialized && isOnboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  // If payment is not completed, redirect to choose-plan
  if (initialized && currentStep === 'payment') {
    return <Navigate to="/choose-plan" replace />;
  }

  // If user is past integration steps, redirect to their current step
  if (initialized && currentStep) {
    const integrationSteps = ['crm_integration', 'email_integration', 'phone_setup', 'social_media'];
    if (!integrationSteps.includes(currentStep)) {
      const redirectTo = STEP_ROUTES[currentStep];
      if (redirectTo && redirectTo !== '/integration-hub') {
        return <Navigate to={redirectTo} replace />;
      }
    }
  }

  return children;
};

/**
 * OnboardingQuestionsRoute - For onboarding questionnaire page
 * Requires payment and integrations to be completed/skipped
 */
export const OnboardingQuestionsRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, loading: onboardingLoading } = useOnboarding();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wait for onboarding to initialize
  if (!initialized && onboardingLoading) {
    return <LoadingScreen />;
  }

  // If onboarding is completed, redirect to dashboard
  if (initialized && isOnboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  // If payment is not completed, redirect to choose-plan
  if (initialized && currentStep === 'payment') {
    return <Navigate to="/choose-plan" replace />;
  }

  // If user is still on integration steps, redirect to integration hub
  if (initialized && currentStep) {
    const integrationSteps = ['crm_integration', 'email_integration', 'phone_setup', 'social_media'];
    if (integrationSteps.includes(currentStep)) {
      return <Navigate to="/integration-hub" replace />;
    }
  }

  return children;
};

/**
 * DashboardRoute - For main dashboard
 * Requires full onboarding completion
 */
export const DashboardRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, loading: onboardingLoading } = useOnboarding();

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Wait for onboarding to initialize
  if (!initialized && onboardingLoading) {
    return <LoadingScreen />;
  }

  // If onboarding is not completed, redirect to current step
  if (initialized && !isOnboardingCompleted) {
    const redirectTo = STEP_ROUTES[currentStep] || '/choose-plan';
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default {
  ProtectedRoute,
  PublicRoute,
  PaymentFlowRoute,
  IntegrationRoute,
  OnboardingQuestionsRoute,
  DashboardRoute,
};