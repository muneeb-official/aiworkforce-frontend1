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
 * PublicRoute - For login page ONLY
 * Shows login page if not authenticated
 * Redirects authenticated users to their appropriate step
 */
export const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, status, loading: onboardingLoading } = useOnboarding();
  const [timedOut, setTimedOut] = useState(false);

  // Timeout effect - MUST be before any returns
  useEffect(() => {
    let timer;
    if (isAuthenticated && !initialized && onboardingLoading) {
      timer = setTimeout(() => {
        setTimedOut(true);
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAuthenticated, initialized, onboardingLoading]);

  // Debug logging
  useEffect(() => {
    console.log('[PublicRoute] State:', {
      isAuthenticated,
      authLoading,
      initialized,
      isOnboardingCompleted,
      currentStep,
      onboardingLoading,
      timedOut
    });
  }, [isAuthenticated, authLoading, initialized, isOnboardingCompleted, currentStep, onboardingLoading, timedOut]);

  // 1. If auth is still loading, show loading screen
  if (authLoading) {
    return <LoadingScreen />;
  }

  // 2. If NOT authenticated, show the login page (children)
  if (!isAuthenticated) {
    console.log('[PublicRoute] Not authenticated, showing login page');
    return children;
  }

  // 3. User IS authenticated - need to redirect them somewhere
  
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
      redirectTo = '/choose-plan';
    }
  } else if (timedOut || !onboardingLoading) {
    if (isOnboardingCompleted) {
      redirectTo = '/dashboard';
    } else {
      redirectTo = '/choose-plan';
    }
  }

  console.log('[PublicRoute] Authenticated, redirecting to:', redirectTo);
  return <Navigate to={redirectTo} replace />;
};

/**
 * PaymentFlowRoute - For payment-related pages (choose-plan, cart)
 */
export const PaymentFlowRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, loading: onboardingLoading } = useOnboarding();

  // Debug logging
  useEffect(() => {
    console.log('[PaymentFlowRoute] State:', {
      isAuthenticated,
      authLoading,
      initialized,
      isOnboardingCompleted,
      currentStep,
      onboardingLoading
    });
  }, [isAuthenticated, authLoading, initialized, isOnboardingCompleted, currentStep, onboardingLoading]);

  if (authLoading) {
    return <LoadingScreen />;
  }

  // NOT authenticated - redirect to login
  if (!isAuthenticated) {
    console.log('[PaymentFlowRoute] Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Wait for onboarding to initialize
  if (!initialized && onboardingLoading) {
    return <LoadingScreen />;
  }

  // If onboarding is completed, redirect to dashboard
  if (initialized && isOnboardingCompleted) {
    console.log('[PaymentFlowRoute] Onboarding completed, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // If user is NOT on payment step, redirect them to their current step
  if (initialized && currentStep && currentStep !== 'payment') {
    const redirectTo = STEP_ROUTES[currentStep];
    if (redirectTo) {
      console.log('[PaymentFlowRoute] Not on payment step, redirecting to:', redirectTo);
      return <Navigate to={redirectTo} replace />;
    }
  }

  // Allow access to payment flow pages
  console.log('[PaymentFlowRoute] Allowing access to payment flow');
  return children;
};

/**
 * IntegrationRoute - For integration hub page
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

  if (!initialized && onboardingLoading) {
    return <LoadingScreen />;
  }

  if (initialized && isOnboardingCompleted) {
    return <Navigate to="/dashboard" replace />;
  }

  if (initialized && currentStep === 'payment') {
    return <Navigate to="/choose-plan" replace />;
  }

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
 */
export const OnboardingQuestionsRoute = ({ children }) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { initialized, isOnboardingCompleted, currentStep, loading: onboardingLoading } = useOnboarding();

  // Debug logging
  useEffect(() => {
    console.log('[OnboardingQuestionsRoute] State:', {
      isAuthenticated,
      authLoading,
      initialized,
      isOnboardingCompleted,
      currentStep,
      onboardingLoading
    });
  }, [isAuthenticated, authLoading, initialized, isOnboardingCompleted, currentStep, onboardingLoading]);

  if (authLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!initialized && onboardingLoading) {
    return <LoadingScreen />;
  }

  // FIX: Allow access to onboarding page even if status shows completed
  // This allows the thank you screen to be shown
  if (initialized && isOnboardingCompleted) {
    console.log('[OnboardingQuestionsRoute] Onboarding completed, but allowing access for thank you screen');
    // Don't redirect immediately - let the page handle showing thank you or redirecting
    return children;
  }

  if (initialized && currentStep === 'payment') {
    return <Navigate to="/choose-plan" replace />;
  }

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
  const { initialized, isOnboardingCompleted, currentStep, loading: onboardingLoading, fetchStatus } = useOnboarding();
  const [checking, setChecking] = useState(true);

  // Debug logging
  useEffect(() => {
    console.log('[DashboardRoute] State:', {
      isAuthenticated,
      authLoading,
      initialized,
      isOnboardingCompleted,
      currentStep,
      onboardingLoading,
      checking
    });
  }, [isAuthenticated, authLoading, initialized, isOnboardingCompleted, currentStep, onboardingLoading, checking]);

  // Force refresh onboarding status when accessing dashboard
  useEffect(() => {
    const checkStatus = async () => {
      if (isAuthenticated && !authLoading) {
        try {
          // Force refresh the status
          await fetchStatus(true);
        } catch (err) {
          console.error('[DashboardRoute] Error fetching status:', err);
        } finally {
          setChecking(false);
        }
      }
    };
    
    checkStatus();
  }, [isAuthenticated, authLoading]);

  if (authLoading || (checking && !initialized)) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    console.log('[DashboardRoute] Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Wait for onboarding status if still loading
  if (!initialized && onboardingLoading) {
    return <LoadingScreen />;
  }

  // FIX: Be more lenient about allowing dashboard access
  // If we've completed checking and user is authenticated, allow access
  // unless we're absolutely sure onboarding is not complete
  if (initialized && !isOnboardingCompleted && currentStep) {
    const redirectTo = STEP_ROUTES[currentStep] || '/choose-plan';
    console.log('[DashboardRoute] Onboarding not complete, redirecting to:', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  console.log('[DashboardRoute] Allowing access to dashboard');
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