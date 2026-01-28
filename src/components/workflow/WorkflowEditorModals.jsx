// components/workflow/WorkflowEditorModals.jsx
import { useState } from "react";
import { X, Info, ChevronDown } from "lucide-react";

// Test Call Modal
export const TestCallModal = ({ isOpen, onClose, onStartCall }) => {
  const [callFrom, setCallFrom] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const phoneNumbers = [
    "+1 (555) 123-4567",
    "+1 (555) 987-6543",
    "+44 20 7946 0958",
  ];

  if (!isOpen) return null;

  const handleStartCall = () => {
    onStartCall({ callFrom, phoneNumber, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#1a1a1a]">Test Call</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Set dynamic values to test the call accurately
        </p>

        {/* Call From */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-[#1a1a1a]">Call From</label>
            <Info className="w-4 h-4 text-[#3C49F7]" />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg text-sm text-left"
            >
              <span className={callFrom ? "text-[#1a1a1a]" : "text-gray-400"}>
                {callFrom || "-- Select a phone number --"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {phoneNumbers.map((num) => (
                    <button
                      key={num}
                      onClick={() => { setCallFrom(num); setIsDropdownOpen(false); }}
                      className="w-full px-4 py-2 text-sm text-left text-[#1a1a1a] hover:bg-[#F2F2FF]"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="text-sm font-medium text-[#1a1a1a] mb-2 block">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3C49F7]"
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-sm font-medium text-[#1a1a1a]">Email</label>
            <Info className="w-4 h-4 text-[#3C49F7]" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3C49F7]"
          />
        </div>

        {/* Start Button */}
        <button
          onClick={handleStartCall}
          disabled={!phoneNumber}
          className={`w-full py-3 rounded-full text-sm font-medium transition-colors ${
            phoneNumber
              ? "bg-[#3C49F7] text-white hover:bg-[#2a35d4]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Start Phone Call
        </button>
      </div>
    </div>
  );
};

// Save Prompt Modal
export const SavePromptModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim()) {
      onSave(title);
      setTitle("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#1a1a1a]">Save your Prompt</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">Give you prompt a title</p>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Prompt title"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm mb-6 focus:outline-none focus:border-[#3C49F7]"
        />

        <button
          onClick={handleSave}
          disabled={!title.trim()}
          className={`w-full py-3 rounded-full text-sm font-medium transition-colors ${
            title.trim()
              ? "bg-[#3C49F7] text-white hover:bg-[#2a35d4]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Save Prompt
        </button>
      </div>
    </div>
  );
};

// Global Instructions Modal
export const GlobalInstructionsModal = ({ isOpen, onClose, instructions, onSave }) => {
  const [text, setText] = useState(instructions || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#1a1a1a]">Global Instructions</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Set global instructions that will apply to all steps in your workflow
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your global instructions here..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm mb-6 focus:outline-none focus:border-[#3C49F7] min-h-[150px] resize-none"
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(text); onClose(); }}
            className="flex-1 py-2.5 bg-[#3C49F7] text-white rounded-full text-sm font-medium hover:bg-[#2a35d4]"
          >
            Save Instructions
          </button>
        </div>
      </div>
    </div>
  );
};

// Save as Template Modal
export const SaveAsTemplateModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, description });
      setName("");
      setDescription("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#1a1a1a]">Save as Template</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-[#1a1a1a] mb-2 block">
            Template Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter template name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3C49F7]"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-[#1a1a1a] mb-2 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your template..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3C49F7] min-h-[80px] resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors ${
              name.trim()
                ? "bg-[#3C49F7] text-white hover:bg-[#2a35d4]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
};

// Delete Step Confirmation Modal
export const DeleteStepModal = ({ isOpen, onClose, onConfirm, stepName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">Delete Step?</h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete "{stepName || "this step"}"? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-2.5 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default {
  TestCallModal,
  SavePromptModal,
  GlobalInstructionsModal,
  SaveAsTemplateModal,
  DeleteStepModal,
};