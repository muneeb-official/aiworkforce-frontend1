// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // After successful login, check user status and redirect accordingly
const login = async (email, password) => {
  const result = await authService.login(email, password);
  
  if (result.success) {
    localStorage.setItem('token', result.token);
    setUser(result.user);
    setIsAuthenticated(true);
    
    // Check onboarding status
    const onboardingComplete = result.user?.onboarding_complete || localStorage.getItem('onboarding_complete');
    
    if (!onboardingComplete) {
      // New user - go through onboarding flow
      return { ...result, redirectTo: '/integration-hub' };
    } else {
      // Existing user - go to dashboard
      return { ...result, redirectTo: '/dashboard' };
    }
  }
  
  return result;
};

  const signUp = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.signUp(userData);
      if (response.success) {
        // Don't set isAuthenticated here - user needs to complete plan selection first
        return { success: true, message: response.message };
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
    // Clear all user data
    localStorage.removeItem('token');
    localStorage.removeItem('plan_selected');
    localStorage.removeItem('onboarding_complete');
    
    setUser(null);
    setIsAuthenticated(false);
  }
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