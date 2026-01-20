// src/services/integrationService.js

const API_BASE = 'http://localhost:8000/api/platform';

// Popup configuration
const POPUP_CONFIG = {
  width: 600,
  height: 700,
};

// Helper to get popup position (centered)
const getPopupPosition = () => {
  const left = window.screenX + (window.outerWidth - POPUP_CONFIG.width) / 2;
  const top = window.screenY + (window.outerHeight - POPUP_CONFIG.height) / 2;
  return { left, top };
};

// Helper to get auth headers
const getAuthHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = localStorage.getItem('token');
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Store for active popup
let activePopup = null;
let popupCheckInterval = null;

export const integrationService = {
  // Get all integration statuses
  getIntegrations: async () => {
    try {
      const response = await fetch(`${API_BASE}/integrations`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch integrations: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching integrations:', error);
      throw error;
    }
  },

  // Check specific integration status
  getIntegrationStatus: async (integrationKey) => {
    try {
      const response = await fetch(`${API_BASE}/integrations/${integrationKey}/status`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to check status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error checking ${integrationKey} status:`, error);
      throw error;
    }
  },

  // Open OAuth popup for connection
connectOAuth: (integrationKey, integrationName) => {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      reject(new Error('Please login to connect integrations'));
      return;
    }

    try {
      // Step 1: Get OAuth URL from backend (backend stores session)
      const response = await fetch(`${API_BASE}/integrations/${integrationKey}/auth-url`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get authorization URL');
      }

      const { auth_url, state } = await response.json();

      const { left, top } = getPopupPosition();

      // Close any existing popup
      if (activePopup && !activePopup.closed) {
        activePopup.close();
      }
      if (popupCheckInterval) {
        clearInterval(popupCheckInterval);
      }

      // Step 2: Open popup with the auth URL (no token in URL)
      activePopup = window.open(
        auth_url,
        `${integrationName} Authorization`,
        `width=${POPUP_CONFIG.width},height=${POPUP_CONFIG.height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      if (!activePopup) {
        reject(new Error('Popup blocked. Please allow popups for this site.'));
        return;
      }

      activePopup.focus();

      // Poll for popup close
      popupCheckInterval = setInterval(async () => {
        if (activePopup && activePopup.closed) {
          clearInterval(popupCheckInterval);
          popupCheckInterval = null;
          activePopup = null;

          // Verify connection status with backend
          try {
            const status = await integrationService.getIntegrationStatus(integrationKey);
            if (status.connected) {
              resolve({ success: true, integration: integrationKey });
            } else {
              resolve({ success: false, integration: integrationKey, error: 'Connection not completed' });
            }
          } catch {
            resolve({ success: true, integration: integrationKey });
          }
        }
      }, 500);

    } catch (error) {
      reject(error);
    }
  });
},

  // Close active popup
  closePopup: () => {
    if (activePopup && !activePopup.closed) {
      activePopup.close();
    }
    if (popupCheckInterval) {
      clearInterval(popupCheckInterval);
      popupCheckInterval = null;
    }
    activePopup = null;
  },

  // Disconnect an integration
  disconnect: async (integrationKey) => {
    try {
      const response = await fetch(`${API_BASE}/integrations/${integrationKey}/disconnect`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to disconnect: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error disconnecting ${integrationKey}:`, error);
      throw error;
    }
  },

  // Connect Twilio with credentials
  connectTwilio: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE}/integrations/twilio/connect`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          throw new Error('Please login to connect Twilio');
        }
        
        throw new Error(errorData.detail || `Failed to connect Twilio: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error connecting Twilio:', error);
      throw error;
    }
  },

  // Connect Vonage with credentials
  connectVonage: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE}/integrations/vonage/connect`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          throw new Error('Please login to connect Vonage');
        }
        
        throw new Error(errorData.detail || `Failed to connect Vonage: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error connecting Vonage:', error);
      throw error;
    }
  },
};

export default integrationService;