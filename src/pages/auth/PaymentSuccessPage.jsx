// src/pages/auth/PaymentSuccessPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import backgroundImage from '../../assets/Background.png';
import { useOnboarding } from '../../context/OnboardingContext';
import { onboardingService } from '../../services/onboardingService';

// Success Icon
const SuccessIcon = () => (
  <div className="w-20 h-20 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-6">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </div>
);

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5] mb-4"></div>
    <p className="text-gray-600">Processing your payment...</p>
  </div>
);

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeStep, fetchStatus } = useOnboarding();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processPaymentSuccess = async () => {
      try {
        // Get session_id from URL (Stripe redirect)
        const sessionId = searchParams.get('session_id');
        
        if (sessionId) {
          console.log('Payment successful, session:', sessionId);
        }

        // Mark payment step as complete
        const result = await completeStep('payment', { 
          stripe_session_id: sessionId,
          completed_at: new Date().toISOString(),
        });

        if (!result.success) {
          console.error('Failed to mark payment as complete:', result.error);
          // Don't block the user, just log the error
        }

        // Refresh onboarding status
        await fetchStatus();
        
        setIsProcessing(false);
      } catch (err) {
        console.error('Error processing payment success:', err);
        setError(err.message);
        setIsProcessing(false);
      }
    };

    processPaymentSuccess();
  }, [searchParams, completeStep, fetchStatus]);

  const handleContinue = () => {
    // Navigate to integration hub (next step after payment)
    navigate('/integration-hub');
  };

  if (isProcessing) {
    return (
      <div 
        className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header variant="simple" />
        <main className="max-w-2xl mx-auto px-6 py-16 mt-6">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <LoadingSpinner />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header variant="simple" />
        <main className="max-w-2xl mx-auto px-6 py-16 mt-6">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-8">
              {error}
            </p>
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-[#4F46E5] text-white font-medium rounded-full hover:bg-[#4338CA] transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header variant="simple" />

      <main className="max-w-2xl mx-auto px-6 py-16 mt-6">
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <SuccessIcon />
          
          <h1 
            className="text-3xl font-semibold text-gray-900 mb-4"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Payment Successful!
          </h1>
          
          <p 
            className="text-gray-600 mb-8 max-w-md mx-auto"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Thank you for your purchase. Your subscription is now active.
            Let's continue setting up your account.
          </p>

          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-[#4F46E5] text-white font-medium rounded-full hover:bg-[#4338CA] transition-colors"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Continue to Integrations
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccessPage;