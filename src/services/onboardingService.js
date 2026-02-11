// src/services/onboardingService.js

// Use the same environment variable as authService
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE = `${API_BASE_URL}/platform/onboarding`;

// Step name to route mapping
export const STEP_ROUTES = {
  payment: '/choose-plan',
  crm_integration: '/integration-hub',
  email_integration: '/integration-hub',
  phone_setup: '/integration-hub',
  social_media: '/integration-hub',
  onboarding_1: '/onboarding',
  onboarding_2: '/onboarding',
  onboarding_3: '/onboarding',
  knowledge_base: '/onboarding',
  completed: '/dashboard',
};

// Onboarding sub-step mapping (for OnboardingPage internal steps)
export const ONBOARDING_SUBSTEPS = {
  0: 'onboarding_1', // Pond, Fish, Catch
  1: 'onboarding_2', // Elevator Pitch
  2: 'onboarding_3', // Objections
  3: 'knowledge_base', // Knowledge Files
};

// Get auth headers
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const onboardingService = {
  /**
   * Get full onboarding status for current user
   */
  getStatus: async () => {
    try {
      const response = await fetch(`${API_BASE}/status`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error(`Failed to get onboarding status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[OnboardingService] Error getting status:', error);
      throw error;
    }
  },

  /**
   * Get redirect destination after login
   */
  getRedirect: async () => {
    try {
      const response = await fetch(`${API_BASE}/redirect`, {
        method: 'GET',
        headers: getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error(`Failed to get redirect: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('[OnboardingService] Error getting redirect:', error);
      throw error;
    }
  },

  /**
   * Mark a step as complete
   * @param {string} stepName - The step to mark as complete
   * @param {object} metadata - Optional metadata to store with the step
   */
  completeStep: async (stepName, metadata = {}) => {
    const url = `${API_BASE}/steps/${stepName}/complete`;
    console.log('[OnboardingService] Completing step:', stepName, 'URL:', url);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ metadata }),
      });

      console.log('[OnboardingService] Complete step response:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[OnboardingService] Complete step failed:', errorText);
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error(errorText || `Failed to complete step: ${response.status}`);
      }

      const data = await response.json();
      console.log('[OnboardingService] Step completed:', data);
      return data;
    } catch (error) {
      console.error(`[OnboardingService] Error completing step ${stepName}:`, error);
      throw error;
    }
  },

  /**
   * Skip a step (for non-mandatory steps)
   * @param {string} stepName - The step to skip
   */
  skipStep: async (stepName) => {
    const url = `${API_BASE}/steps/${stepName}/skip`;
    console.log('[OnboardingService] Skipping step:', stepName);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ metadata: {} }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[OnboardingService] Skip step failed:', errorText);
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error(errorText || `Failed to skip step: ${response.status}`);
      }

      const data = await response.json();
      console.log('[OnboardingService] Step skipped:', data);
      return data;
    } catch (error) {
      console.error(`[OnboardingService] Error skipping step ${stepName}:`, error);
      throw error;
    }
  },

  /**
   * Skip all integration steps at once
   */
  skipAllIntegrations: async () => {
    const integrationSteps = ['crm_integration', 'email_integration', 'phone_setup', 'social_media'];
    console.log('[OnboardingService] Skipping all integrations');
    
    const results = await Promise.allSettled(
      integrationSteps.map(step => onboardingService.skipStep(step))
    );
    
    return results;
  },

  /**
   * Get the frontend route for a given step name
   */
  getRouteForStep: (stepName) => {
    return STEP_ROUTES[stepName] || '/dashboard';
  },

  /**
   * Check if a step is an integration step
   */
  isIntegrationStep: (stepName) => {
    return ['crm_integration', 'email_integration', 'phone_setup', 'social_media'].includes(stepName);
  },

  /**
   * Check if a step is an onboarding questionnaire step
   */
  isOnboardingStep: (stepName) => {
    return ['onboarding_1', 'onboarding_2', 'onboarding_3', 'knowledge_base'].includes(stepName);
  },

  /**
   * Get the onboarding sub-step index for a given step name
   */
  getOnboardingSubstepIndex: (stepName) => {
    const entries = Object.entries(ONBOARDING_SUBSTEPS);
    const found = entries.find(([_, name]) => name === stepName);
    return found ? parseInt(found[0]) : -1;
  },

  /**
   * Get current onboarding sub-step from status
   */
  getCurrentOnboardingSubstep: (status) => {
    if (!status || !status.steps) return 0;
    
    const onboardingSteps = ['onboarding_1', 'onboarding_2', 'onboarding_3', 'knowledge_base'];
    
    for (let i = 0; i < onboardingSteps.length; i++) {
      const step = status.steps.find(s => s.step_name === onboardingSteps[i]);
      if (step && (step.status === 'pending' || step.is_current)) {
        return i;
      }
    }
    
    return 0;
  },
};

export default onboardingService;