// src/context/OnboardingContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { onboardingService, STEP_ROUTES, ONBOARDING_SUBSTEPS } from '../services/onboardingService';
import { useAuth } from './AuthContext';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch onboarding status
  const fetchStatus = useCallback(async () => {
    if (!isAuthenticated) {
      setStatus(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await onboardingService.getStatus();
      setStatus(data);
    } catch (err) {
      console.error('Failed to fetch onboarding status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch status when auth changes
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Get redirect URL based on current status
  const getRedirectUrl = useCallback(async () => {
    try {
      const redirect = await onboardingService.getRedirect();
      
      if (redirect.is_onboarding_completed) {
        return '/dashboard';
      }
      
      // Use redirect_to from API if available
      if (redirect.redirect_to) {
        return redirect.redirect_to;
      }
      
      // Fallback: map current_step to route
      return STEP_ROUTES[redirect.current_step] || '/choose-plan';
    } catch (err) {
      console.error('Failed to get redirect:', err);
      // Fallback to status-based redirect
      if (status?.is_onboarding_completed) {
        return '/dashboard';
      }
      return STEP_ROUTES[status?.current_step] || '/choose-plan';
    }
  }, [status]);

  // Complete a step
  const completeStep = useCallback(async (stepName, metadata = {}) => {
    try {
      const result = await onboardingService.completeStep(stepName, metadata);
      
      // Refresh status after completing a step
      await fetchStatus();
      
      return {
        success: true,
        nextStep: result.next_step,
        isCompleted: result.is_onboarding_completed,
        message: result.message,
      };
    } catch (err) {
      console.error(`Failed to complete step ${stepName}:`, err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, [fetchStatus]);

  // Skip a step
  const skipStep = useCallback(async (stepName) => {
    try {
      const result = await onboardingService.skipStep(stepName);
      
      // Refresh status after skipping
      await fetchStatus();
      
      return {
        success: true,
        nextStep: result.next_step,
        isCompleted: result.is_onboarding_completed,
      };
    } catch (err) {
      console.error(`Failed to skip step ${stepName}:`, err);
      return {
        success: false,
        error: err.message,
      };
    }
  }, [fetchStatus]);

  // Skip all integration steps
  const skipAllIntegrations = useCallback(async () => {
    try {
      await onboardingService.skipAllIntegrations();
      await fetchStatus();
      return { success: true };
    } catch (err) {
      console.error('Failed to skip integrations:', err);
      return { success: false, error: err.message };
    }
  }, [fetchStatus]);

  // Check if onboarding is completed
  const isOnboardingCompleted = status?.is_onboarding_completed ?? false;

  // Get current step name
  const currentStep = status?.current_step ?? null;

  // Get all steps
  const steps = status?.steps ?? [];

  // Check if a specific step is completed
  const isStepCompleted = useCallback((stepName) => {
    const step = steps.find(s => s.step_name === stepName);
    return step?.status === 'completed';
  }, [steps]);

  // Check if a specific step is the current step
  const isCurrentStep = useCallback((stepName) => {
    return currentStep === stepName;
  }, [currentStep]);

  // Get step status
  const getStepStatus = useCallback((stepName) => {
    const step = steps.find(s => s.step_name === stepName);
    return step?.status ?? 'pending';
  }, [steps]);

  // Check if user can access a route
  const canAccessRoute = useCallback((route) => {
    if (!status) return false;
    if (status.is_onboarding_completed) return true;

    // Map route to required steps
    const routeStepMap = {
      '/choose-plan': true, // Always accessible after signup
      '/cart': true, // Always accessible if on payment step
      '/payment/success': true, // Stripe redirect
      '/payment/cancel': true, // Stripe redirect
      '/integration-hub': isStepCompleted('payment'),
      '/onboarding': isStepCompleted('payment'), // Can access after payment
      '/welcome': status.is_onboarding_completed,
      '/dashboard': status.is_onboarding_completed,
    };

    return routeStepMap[route] ?? false;
  }, [status, isStepCompleted]);

  // Get the current onboarding substep (for OnboardingPage)
  const getCurrentOnboardingSubstep = useCallback(() => {
    return onboardingService.getCurrentOnboardingSubstep(status);
  }, [status]);

  // Complete onboarding substep
  const completeOnboardingSubstep = useCallback(async (substepIndex) => {
    const stepName = ONBOARDING_SUBSTEPS[substepIndex];
    if (!stepName) {
      console.error('Invalid substep index:', substepIndex);
      return { success: false, error: 'Invalid substep' };
    }
    return await completeStep(stepName);
  }, [completeStep]);

  const value = {
    // State
    status,
    loading,
    error,
    isOnboardingCompleted,
    currentStep,
    steps,

    // Actions
    fetchStatus,
    getRedirectUrl,
    completeStep,
    skipStep,
    skipAllIntegrations,

    // Helpers
    isStepCompleted,
    isCurrentStep,
    getStepStatus,
    canAccessRoute,
    getCurrentOnboardingSubstep,
    completeOnboardingSubstep,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;