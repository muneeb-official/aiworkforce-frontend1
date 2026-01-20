// src/pages/auth/index.js


// Export all auth pages for easy imports
// export { default as LoginPage } from './LoginPage';
// export { default as SignUpPage } from './SignUpPage';

// src/components/auth/index.js
// Export all auth components
// export { default as AuthLayout } from './AuthLayout';

// src/context/index.js
// Export all contexts
// export { AuthProvider, useAuth } from './AuthContext';

// src/services/index.js
// Export all services
// export { authService } from './authService';

// ============================================
// Usage Example:
// ============================================
// import { LoginPage, SignUpPage } from './pages/auth';
// import { AuthLayout } from './components/auth';
// import { AuthProvider, useAuth } from './context';
// import { authService } from './services';

// src/pages/auth/index.js
// Export all auth pages for easy imports
export { default as LoginPage } from './LoginPage';
export { default as SignUpPage } from './SignUpPage';
export { default as ChoosePlanPage } from './ChoosePlanPage';
export { default as CartPage } from './CartPage';
export { default as WelcomePage } from './WelcomePage';
export { default as OnboardingPage } from './OnboardingPage';
export { default as IntegrationHubPage } from './IntegrationHubPage';
export { default as PaymentSuccessPage } from './PaymentSuccessPage';
export { default as PaymentCancelPage } from './PaymentCancelPage';