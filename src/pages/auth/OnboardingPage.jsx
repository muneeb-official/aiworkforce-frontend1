// src/pages/auth/OnboardingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import step1Image from '../../assets/step-1.png';
import step2Image from '../../assets/step-2.png';
import step3Image from '../../assets/step-3.png';

// Logo Component
// const Logo = () => (
//   <div className="flex items-center gap-3">
//     <img 
//       src="/images/logo.png" 
//       alt="AI Workforce" 
//       className="h-10"
//       onError={(e) => {
//         e.target.onerror = null;
//         e.target.parentElement.innerHTML = `
//           <div class="flex items-center gap-2">
//             <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
//               <span class="text-indigo-600 font-bold text-sm">AI</span>
//             </div>
//             <div>
//               <p class="text-sm font-semibold text-gray-900">AI workforce</p>
//               <p class="text-xs text-gray-500">Create an AI employee</p>
//             </div>
//           </div>
//         `;
//       }}
//     />
//   </div>
// );

// Step images configuration - Add your images to public/images/
const stepImages = {
  0: step1Image,  // Pond, Fish, Catch
  1: step2Image,  // Elevator Pitch
  2: step3Image,  // Objections
};

// Step background colors
const stepBgColors = {
  0: 'bg-[#E8E4F3]', // Light purple
  1: 'bg-[#FDF4E7]', // Light peach/cream
  2: 'bg-[#FBC847]', // Yellow/gold
};

// Steps configuration
const stepsConfig = [
  {
    id: 'pond-fish-catch',
    title: 'Pond, Fish, Catch',
    fields: [
      {
        id: 'pond',
        question: "What's your Pond?",
        subtext: "Describe the market or industry you operate in.",
        placeholder: "Enter here...",
        required: true,
      },
      {
        id: 'fish',
        question: "What's your Fish?",
        subtext: "Who are your ideal companies or customer types?",
        placeholder: "Enter here...",
        required: true,
      },
      {
        id: 'catch',
        question: "What's your Catch?",
        subtext: "What seniority or roles are you targeting within those companies?",
        placeholder: "Enter here...",
        required: true,
      },
    ],
  },
  {
    id: 'elevator-pitch',
    title: 'Elevator Pitch WWWBHR',
    fields: [
      {
        id: 'who',
        question: "Who are you?",
        subtext: "Include your name, company, and location.",
        placeholder: "Enter here...",
        required: true,
      },
      {
        id: 'specialise',
        question: "What do you specialise in?",
        subtext: "What sector are you in, and what problem do you solve?",
        placeholder: "Enter here...",
        required: true,
      },
      {
        id: 'workWith',
        question: "Who do you work with?",
        subtext: "Describe your typical clients (size, industries, names if possible)",
        placeholder: "Enter here...",
        required: true,
      },
      {
        id: 'backstory',
        question: "What's your backstory?",
        subtext: "Share company/founder credentials or any unique narrative.",
        placeholder: "Enter here...",
        required: true,
      },
      {
        id: 'different',
        question: "How are you different?",
        subtext: "Explain your unique approach, process, or features.",
        placeholder: "Enter here...",
        required: true,
      },
    ],
  },
  {
    id: 'objections',
    title: 'Objections',
    isDynamic: true, // Can add more objection sets
    fields: [
      {
        id: 'objection',
        question: "What objections do you frequently hear?",
        subtext: "(cost, timing, switching vendors, etc.)",
        placeholder: "Enter here...",
        required: true,
      },
      {
        id: 'handle',
        question: "How do you usually handle these objections?",
        subtext: "Give examples of how you overcome doubts.",
        placeholder: "Enter here...",
        required: true,
      },
    ],
  },
];

// Progress Indicator Component
const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step Label */}
          <button
            className={`text-sm font-medium transition-colors ${
              index === currentStep
                ? 'text-[#4F46E5]'
                : index < currentStep
                ? 'text-[#4F46E5]'
                : 'text-gray-400'
            }`}
          >
            {step.title}
          </button>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="flex items-center gap-1">
              <div 
                className={`w-16 lg:w-24 h-0.5 ${
                  index < currentStep ? 'bg-[#4F46E5]' : 'bg-gray-200'
                }`}
              />
              <div 
                className={`w-2 h-2 rounded-full ${
                  index < currentStep ? 'bg-[#4F46E5]' : 'bg-gray-200'
                }`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Form Field Component
const FormField = ({ field, value, onChange, index }) => {
  return (
    <div className="mb-6">
      <label className="block text-base font-medium text-gray-900 mb-1">
        {field.question} {field.required && <span className="text-red-500">*</span>}
      </label>
      <p className="text-sm text-gray-500 mb-2">{field.subtext}</p>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(field.id, e.target.value, index)}
        placeholder={field.placeholder}
        className="w-full h-12 px-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      />
    </div>
  );
};

// Objection Card Component (for dynamic objections)
const ObjectionCard = ({ index, data, onChange, onRemove, canRemove }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 mb-4 bg-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-sm font-medium">
          {index + 1}
        </div>
        {canRemove && (
          <button 
            onClick={() => onRemove(index)}
            className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-base font-medium text-gray-900 mb-1">
          What objections do you frequently hear? <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-2">(cost, timing, switching vendors, etc.)</p>
        <input
          type="text"
          value={data.objection || ''}
          onChange={(e) => onChange(index, 'objection', e.target.value)}
          placeholder="Enter here..."
          className="w-full h-12 px-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
        />
      </div>
      
      <div>
        <label className="block text-base font-medium text-gray-900 mb-1">
          How do you usually handle these objections? <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-2">Give examples of how you overcome doubts.</p>
        <input
          type="text"
          value={data.handle || ''}
          onChange={(e) => onChange(index, 'handle', e.target.value)}
          placeholder="Enter here..."
          className="w-full h-12 px-4 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
        />
      </div>
    </div>
  );
};

// Main Onboarding Page
const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Pond, Fish, Catch
    pond: '',
    fish: '',
    catch: '',
    // Step 2: Elevator Pitch
    who: '',
    specialise: '',
    workWith: '',
    backstory: '',
    different: '',
    // Step 3: Objections (dynamic array)
    objections: [{ objection: '', handle: '' }],
  });

  // Handle field change for regular fields
  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  // Handle objection change
  const handleObjectionChange = (index, field, value) => {
    setFormData(prev => {
      const newObjections = [...prev.objections];
      newObjections[index] = { ...newObjections[index], [field]: value };
      return { ...prev, objections: newObjections };
    });
  };

  // Add new objection
  const handleAddObjection = () => {
    setFormData(prev => ({
      ...prev,
      objections: [...prev.objections, { objection: '', handle: '' }],
    }));
  };

  // Remove objection
  const handleRemoveObjection = (index) => {
    setFormData(prev => ({
      ...prev,
      objections: prev.objections.filter((_, i) => i !== index),
    }));
  };

  // Check if current step is valid
  const isStepValid = () => {
    const step = stepsConfig[currentStep];
    
    if (step.isDynamic) {
      // Check objections
      return formData.objections.every(obj => obj.objection && obj.handle);
    }
    
    return step.fields.every(field => {
      if (!field.required) return true;
      return formData[field.id]?.trim();
    });
  };

const handleNext = () => {
  if (currentStep < stepsConfig.length - 1) {
    setCurrentStep(prev => prev + 1);
  } else {
    // Final step - save onboarding data
    console.log('Onboarding data:', formData);
    
    // Get user ID from token or localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode JWT to get user_id
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user_id;
        
        // Store onboarding complete per user
        localStorage.setItem(`onboarding_${userId}`, 'true');
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }
    
    // Navigate to dashboard
    navigate('/dashboard');
  }
};

  // Handle Back
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepConfig = stepsConfig[currentStep];

  // localStorage.setItem('onboarding_complete', 'true');
  // navigate('/dashboard');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header variant="simple" />

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-73px)] p-5">
        {/* Left Side - Form */}
        <div className="w-full lg:w-[50%] px-6 lg:px-12 py-8 overflow-hidden">
          <h1 
            className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            Onboarding to AI-Workforce
          </h1>

          {/* Progress Indicator */}
          <ProgressIndicator 
            currentStep={currentStep} 
            totalSteps={stepsConfig.length}
            steps={stepsConfig}
          />

          {/* Form Content */}
          <div className="max-w-xl">
            {/* Regular Steps (Pond/Fish/Catch & Elevator Pitch) */}
            {!currentStepConfig.isDynamic && (
              <div>
                {currentStepConfig.fields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    value={formData[field.id]}
                    onChange={handleFieldChange}
                  />
                ))}
              </div>
            )}

            {/* Dynamic Step (Objections) */}
            {currentStepConfig.isDynamic && (
              <div>
                {formData.objections.map((objData, index) => (
                  <ObjectionCard
                    key={index}
                    index={index}
                    data={objData}
                    onChange={handleObjectionChange}
                    onRemove={handleRemoveObjection}
                    canRemove={formData.objections.length > 1}
                  />
                ))}
                
                <button
                  onClick={handleAddObjection}
                  className="text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors"
                >
                  Add Another Objection
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 mt-8">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Back
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-8 py-3 font-medium rounded-full transition-colors ${
                isStepValid()
                  ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className={`hidden lg:flex w-[50%] ${stepBgColors[currentStep]} items-center justify-center`}>
          <img 
            src={stepImages[currentStep]} 
            alt={currentStepConfig.title}
            className="w-full h-auto object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="%23E5E7EB" width="400" height="400" rx="20"/><text x="200" y="190" text-anchor="middle" fill="%236B7280" font-size="14">Add image:</text><text x="200" y="210" text-anchor="middle" fill="%236B7280" font-size="12">${stepImages[currentStep]}</text></svg>`;
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage;