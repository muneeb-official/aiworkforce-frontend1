// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount (handles page refresh/Stripe redirect)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Failed to parse saved user:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(email, password);
      
      console.log('[AuthContext] Login result:', result);
      
      if (result.success) {
        // Build user object with all data from login response
        const userData = {
          ...result.user,
          organization_id: result.organization?.id,
          organization: result.organization,
          seat_id: result.seatId,
          service_ids: result.serviceIds,
          hasSubscription: result.hasSubscription,
        };
        
        // Save token and user to localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Also store organization_id separately for easy access
        if (result.organization?.id) {
          localStorage.setItem('organization_id', result.organization.id);
        }
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Return full result INCLUDING onboarding data for redirect logic
        return {
          success: true,
          user: userData,
          hasSubscription: result.hasSubscription,
          serviceIds: result.serviceIds,
          onboarding: result.onboarding, // IMPORTANT: This contains redirect_to, current_step, is_onboarding_completed
        };
      }
      
      return result;
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signUp(userData);
      if (response.success) {
        // Store organization_id and user_id from signup response
        if (response.organization_id) {
          localStorage.setItem('organization_id', response.organization_id);
        }
        if (response.user_id) {
          localStorage.setItem('user_id', response.user_id);
        }
        return { success: true, message: response.message, ...response };
      }
      return response;
    } catch (err) {
      setError(err.message || 'Sign up failed');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear ALL user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('organization_id');
      localStorage.removeItem('user_id');
      
      // Clear any onboarding-related data
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('onboarding_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Update user data (useful after onboarding steps)
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        signUp,
        logout,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;