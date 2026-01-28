// components/workflow/WorkflowBuilderModals.jsx
import { Check } from "lucide-react";

// Loading Modal - "Give us few seconds for setup the workflow"
export const WorkflowLoadingModal = ({ isOpen, message = "Give us few seconds for setup the workflow" }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-6">{message}</h3>
        <div className="flex justify-center gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: "#1a1a1a",
              animationDelay: "0ms",
              animationDuration: "1s"
            }} 
          />
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: "#9ca3af",
              animationDelay: "200ms",
              animationDuration: "1s"
            }} 
          />
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: "#9ca3af",
              animationDelay: "400ms",
              animationDuration: "1s"
            }} 
          />
        </div>
      </div>
    </div>
  );
};

// Success Modal - "We have Successfully pulled all the leads!"
export const WorkflowSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-[#F2F2FF] rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-[#3C49F7]" />
        </div>
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
          We have Successfully pulled all the leads!
        </h3>
        <p className="text-gray-600">
          Now you can create the workflow for these leads.
        </p>
      </div>
    </div>
  );
};

// Exit Confirmation Modal
export const ExitConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-[#F2F2FF] rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-[#3C49F7]" />
        </div>
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Are you sure?</h3>
        <p className="text-gray-600 mb-6">
          Your data will get lost if you proceed. Are you sure
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50"
          >
            Yes, Proceed
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#3C49F7] text-white rounded-full font-medium hover:bg-[#2a35d4]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Workflow Saved Successfully Modal
export const WorkflowSavedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
          Workflow Saved Successfully!
        </h3>
        <p className="text-gray-600 mb-6">
          Your workflow has been saved and is ready to use.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#3C49F7] text-white rounded-full font-medium hover:bg-[#2a35d4]"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// No Leads Available Modal
export const NoLeadsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
          No Leads Available
        </h3>
        <p className="text-gray-600 mb-6">
          Please select a campaign with leads or upload a CSV file.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#3C49F7] text-white rounded-full font-medium hover:bg-[#2a35d4]"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

// Invalid File Format Modal
export const InvalidFileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
          Invalid File Format
        </h3>
        <p className="text-gray-600 mb-6">
          Please upload a valid CSV file to continue.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-[#3C49F7] text-white rounded-full font-medium hover:bg-[#2a35d4]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default {
  WorkflowLoadingModal,
  WorkflowSuccessModal,
  ExitConfirmationModal,
  WorkflowSavedModal,
  NoLeadsModal,
  InvalidFileModal,
};