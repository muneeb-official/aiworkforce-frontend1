// components/modals/Modals.jsx
import { useState } from "react";
import { useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import { Modal, LoadingSpinner, SuccessIcon } from "../common/CommonComponents";
import { savedSearches, projects } from "../../data/profilesData";
import { X, Check, Sparkles } from "lucide-react";
// Save Search Modal
export const SaveSearchModal = ({ isOpen, onClose, onSave }) => {
  const [searchName, setSearchName] = useState("");

  const handleSave = () => {
    if (searchName.trim()) {
      onSave(searchName);
      setSearchName("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <h2 className="text-xl font-bold text-[#000000] mb-1">Save your search</h2>
      <p className="text-[#000000] text-sm mb-6">Fill details for new project</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-[#000000] mb-2">
          Search Name
        </label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter Search Name"
          className="w-full px-4 py-3 border border-gray-400 rounded-lg hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={!searchName.trim()}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Search
      </button>
    </Modal>
  );
};

// Credit Card Icon for the modal
const CreditCardIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="12" width="36" height="24" rx="3" stroke="#3C49F7" strokeWidth="2" fill="none"/>
    <line x1="6" y1="20" x2="42" y2="20" stroke="#3C49F7" strokeWidth="2"/>
    <line x1="12" y1="28" x2="24" y2="28" stroke="#3C49F7" strokeWidth="2"/>
    <circle cx="36" cy="12" r="8" fill="#EEF0FF" stroke="#3C49F7" strokeWidth="2"/>
    <line x1="36" y1="8" x2="36" y2="16" stroke="#3C49F7" strokeWidth="2"/>
    <line x1="32" y1="12" x2="40" y2="12" stroke="#3C49F7" strokeWidth="2"/>
  </svg>
);

// Out of Credits Modal Component
export const OutOfCreditsModal = ({ isOpen, onClose, onGetCredits }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#EEF0FF] rounded-full flex items-center justify-center">
            <CreditCardIcon />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          It seems you ran out<br />of credits!
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8">
          Do not worry, we got you covered.
        </p>

        {/* Button */}
        <button
          onClick={() => {
            onClose();
            onGetCredits();
          }}
          className="w-full bg-[#3C49F7] text-white py-4 rounded-full font-medium text-lg hover:bg-[#2D3AD9] transition-colors"
        >
          Get more credits
        </button>
      </div>
    </div>
  );
};

// Load Search Modal
// ============================================
// LOAD SEARCH MODAL
// ============================================
export const LoadSearchModal = ({
  isOpen,
  onClose,
  savedSearches = [],
  onLoadSearch,
}) => {
  const [selectedSearch, setSelectedSearch] = useState(null);

  const handleLoad = () => {
    if (!selectedSearch) return;

    onLoadSearch?.(selectedSearch);
    setSelectedSearch(null);
  };

  const handleClose = () => {
    setSelectedSearch(null);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedSearch(null);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <h2 className="text-xl font-bold mb-1">Select Saved Search</h2>
      <p className="text-gray-500 text-sm mb-6">
        Load a saved search list.
      </p>

      <div className="space-y-3 mb-6">
        {savedSearches.map((search) => (
          <button
            key={search.id}
            onClick={() => setSelectedSearch(search)}
            className={`w-full p-4 text-left rounded-lg border ${
              selectedSearch?.id === search.id
                ? "border-blue-600 bg-[#F2F2FF]"
                : "border-white hover:border-blue-600 hover:bg-[#F2F2FF]"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedSearch?.id === search.id}
                readOnly
                className="appearance-none
    w-[18px] h-[18px]
    rounded-[6px]
    border border-gray-300
    bg-white
    hover:border-blue-600
    focus:outline-none focus:ring-2 focus:ring-blue-500/30
    cursor-pointer

    checked:bg-blue-600 checked:border-blue-600
    checked:after:content-['']
    checked:after:block
    checked:after:w-[6px] checked:after:h-[10px]
    checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white
    checked:after:rotate-45
    checked:after:translate-x-[5px] checked:after:translate-y-[1px]
  "
              />
              <span className="font-medium">{search.name}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleLoad}
        disabled={!selectedSearch}
        className="w-full bg-blue-500 text-white py-3 rounded-full disabled:opacity-50"
      >
        Load Search
      </button>
    </Modal>
  );
};
// Add to Project Modal
// Add this updated AddToProjectModal to your Modals.jsx file
// It handles both B2C (profiles) and B2B (companies)

export const AddToProjectModal = ({
  isOpen,
  onClose,
  profile,
  company,
  onAddToProject,
  mode = "b2c",
  context
}) => {
  // Get projects from context
  const projects = context?.projects || [];
  const addProject = context?.addProject;
  const addToProject = context?.addToProject;
  const fetchProjects = context?.fetchProjects;
  const isLoadingProjects = context?.isLoadingProjects || false;

  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Fetch projects when modal opens
  useEffect(() => {
    if (isOpen && fetchProjects) {
      fetchProjects();
    }
  }, [isOpen, fetchProjects]);

  // Get the item (profile or company)
  const item = mode === "b2b" ? company : profile;

  const handleAdd = () => {
    if (selectedProject && item) {
      if (addToProject) {
        addToProject(selectedProject.id, [item.id]);
      }
      setSuccessType("added");
      setShowSuccess(true);
    }
  };

  const handleCreateProject = async () => {
    if (newProjectName.trim() && addProject) {
      setIsCreatingProject(true);
      const result = await addProject(newProjectName, newProjectDescription);
      setIsCreatingProject(false);
      // Close modal regardless of result, project was attempted
      setSelectedProject(null);
      setShowCreateProject(false);
      setShowSuccess(false);
      setSuccessType("");
      setNewProjectName("");
      setNewProjectDescription("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedProject(null);
    setShowCreateProject(false);
    setShowSuccess(false);
    setSuccessType("");
    setNewProjectName("");
    setNewProjectDescription("");
    onClose();
  };

  const handleGoBackToProfiles = () => {
    if (selectedProject && onAddToProject) {
      onAddToProject(selectedProject.name);
    }
    handleClose();
  };

  const handleGoBackToForm = () => {
    setShowSuccess(false);
    setSuccessType("");
    setShowCreateProject(false);
    // Refresh projects list
    if (fetchProjects) {
      fetchProjects();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Success Modal - Added to Project */}
      {showSuccess && successType === "added" && (
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Successfully added!</h2>
          <p className="text-gray-500 mb-8">
            Lead added to "{selectedProject?.name}" successfully
          </p>

          <button
            onClick={handleGoBackToProfiles}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base"
          >
            Go Back to {mode === "b2b" ? "Companies" : "Profiles"}
          </button>
        </div>
      )}

      {/* Success Modal - Project Created */}
      {showSuccess && successType === "created" && (
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Project added successfully</h2>

          <button
            onClick={handleGoBackToForm}
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-base"
          >
            Go Back to Projects
          </button>
        </div>
      )}

      {/* Create New Project Modal */}
      {!showSuccess && showCreateProject && (
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-semibold text-gray-900">Create a new project</h2>
            <button
              onClick={() => setShowCreateProject(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-6">Fill details for new project</p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter Project Name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Description
            </label>
            <textarea
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              placeholder="Enter here..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={handleCreateProject}
            disabled={!newProjectName.trim() || isCreatingProject}
            className={`px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${newProjectName.trim() && !isCreatingProject
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            {isCreatingProject && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {isCreatingProject ? "Creating..." : "Create Project"}
          </button>
        </div>
      )}

      {/* Select Project Modal */}
      {!showSuccess && !showCreateProject && (
        <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-semibold text-gray-900">Select a Project</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-gray-500 text-sm mb-6">Where you want to move the {mode === "b2b" ? "company" : "profile"}</p>

          <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
            {isLoadingProjects ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-500">Loading projects...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No projects found. Create a new project to get started.
              </div>
            ) : (
              projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${selectedProject?.id === project.id
                      ? "bg-[#F2F2FF] border border-blue-600"
                      : "bg-white hover:bg-[#F2F2FF] hover:border hover:border-blue-600"
                    }`}
                >
                  <div
                    className={`w-5 h-5  border-2 flex items-center justify-center transition-all ${selectedProject?.id === project.id
                        ? "border-blue-500 rounded bg-blue-500"
                        : "border-gray-300 rounded-full bg-white"
                      }`}
                  >
                    {selectedProject?.id === project.id && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900 font-medium">{project.name}</span>
                </button>
              ))
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowCreateProject(true)}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Create New Project
            </button>

            <button
              onClick={handleAdd}
              disabled={!selectedProject}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${selectedProject
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              Add to Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// Loading Modal
// Loading Modal
export const LoadingModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Loading your Search</h2>
          <p className="text-gray-500 text-sm">
            Do not close the window, we are fetching the information
          </p>
        </div>
        {/* <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}
      </div>

      {/* 3 Dots Loading Animation */}
      {/* 3 Dots Loading Animation */}
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:0.6s]"></div>
        </div>
      </div>
    </Modal>
  );
};
// Success Modal - Search Saved
export const SearchSavedModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center py-4">
        <SuccessIcon />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your search is saved!
        </h2>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Search for more profiles
        </button>
      </div>
    </Modal>
  );
};

// Success Modal - Added to Project
export const AddedToProjectModal = ({ isOpen, onClose, projectName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center py-4">
        <SuccessIcon />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Successfully added!
        </h2>
        <p className="text-gray-500 mb-6">
          Lead added to "{projectName}" successfully
        </p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Go Back to Form
        </button>
      </div>
    </Modal>
  );
};

// Add this to your components/modals/Modals.jsx file

export const ExportLeadsModal = ({ isOpen, onClose, onExport }) => {
  const [selectedOption, setSelectedOption] = useState("csv");

  const exportOptions = [
    { id: "csv", label: "Export as .CSV" },
    { id: "odoo", label: "Export as Odoo" },
    { id: "hubspot", label: "Export as Hubspot" },
    { id: "salesforce", label: "Export as Salesforce" },
    { id: "bullhorn", label: "Export as Bullhorn" },
    { id: "pipedrive", label: "Export as Pipedrive" },
  ];

  const handleExport = () => {
    if (onExport) {
      onExport(selectedOption);
    }
    onClose();
  };

  const handleClose = () => {
    setSelectedOption("csv"); // Reset to default
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Export Leads</h2>
      <p className="text-gray-500 text-sm mb-6">Pick a way to export leads</p>

      <div className="space-y-1 mb-6">
        {exportOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOption(option.id)}
            className={`w-full p-2 text-left rounded-lg transition-all hover:border-blue-600 duration-200 ${
              selectedOption === option.id
                ? "border-blue-600 bg-[#F2F2FF]"
                : "border border-white hover:border-blue-600 hover:bg-[#F2F2FF]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-[18px] h-[18px] rounded flex items-center justify-center border-2 transition-colors ${
                  selectedOption === option.id
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {selectedOption === option.id && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="font-medium text-sm text-[#000000]">{option.label}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleExport}
        className="bg-gray-300 text-white py-2 px-5 rounded-full font-medium hover:bg-blue-600 transition-colors"
      >
        Export Leads
      </button>
    </Modal>
  );
};

// ============================================
// INTEGRATION HUB MODALS
// ============================================

// Reusable Success Icon Component (Badge style with checkmark)
export const BadgeSuccessIcon = () => (
  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#EEF0FF] flex items-center justify-center">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.09 4.26L17 3.34L17.34 6.41L20.24 7.47L19.13 10.27L21.19 12.64L18.88 14.56L19.13 17.64L16.13 18.03L14.85 20.82L12 19.52L9.15 20.82L7.87 18.03L4.87 17.64L5.12 14.56L2.81 12.64L4.87 10.27L3.76 7.47L6.66 6.41L7 3.34L9.91 4.26L12 2Z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// Reusable Error Icon Component
export const BadgeErrorIcon = () => (
  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FEE2E2] flex items-center justify-center">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="1.5"/>
      <path d="M15 9L9 15M9 9L15 15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  </div>
);

// Generic Connecting/Loading Modal (Reusable)
export const ConnectingModal = ({ 
  isOpen, 
  onClose, 
  title = "Connecting and importing...",
  message = "We are importing your contact. Please wait and do not close this window."
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-8">{message}</p>
        
        {/* Loading Dots */}
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-gray-800 rounded-full animate-pulse"></div>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-pulse [animation-delay:0.4s]"></div>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full animate-pulse [animation-delay:0.6s]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generic Success Modal (Reusable for all integrations)
export const IntegrationSuccessModal = ({ 
  isOpen, 
  onClose, 
  title = "Successfully Imported!",
  message = "We have successfully imported all of your contacts.",
  buttonText = "Cancel",
  onButtonClick
}) => {
  if (!isOpen) return null;

  const handleClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-xl">
        <BadgeSuccessIcon />
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500 mb-8">{message}</p>
        
        <button
          onClick={handleClick}
          className="px-12 py-3 bg-[#4F46E5] text-white rounded-full font-medium hover:bg-[#4338CA] transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// Generic Error/Failed Modal (Reusable)
export const IntegrationErrorModal = ({ 
  isOpen, 
  onClose, 
  title = "Failed to import",
  message = "Please ensure that you have filled correct info.",
  buttonText = "Retry Importing",
  onRetry
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-xl">
        <BadgeErrorIcon />
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-500 mb-8">{message}</p>
        
        <button
          onClick={onRetry || onClose}
          className="px-12 py-3 bg-[#4F46E5] text-white rounded-full font-medium hover:bg-[#4338CA] transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// Twilio Number Modal (Specific integration form)
export const TwilioNumberModal = ({ 
  isOpen, 
  onClose, 
  onImport,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    accountSid: '',
    authToken: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.number && formData.accountSid && formData.authToken) {
      onImport(formData);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', number: '', accountSid: '', authToken: '' });
    onClose();
  };

  const isFormValid = formData.name && formData.number && formData.accountSid && formData.authToken;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-xl">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-2xl font-bold text-gray-900">Add your Twilio Number</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-6">Please fill your details.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Name <span className="text-[#4F46E5]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter name"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Number <span className="text-[#4F46E5]">*</span>
            </label>
            <input
              type="text"
              value={formData.number}
              onChange={(e) => handleChange('number', e.target.value)}
              placeholder="Enter number"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Account SID <span className="text-[#4F46E5]">*</span>
            </label>
            <input
              type="text"
              value={formData.accountSid}
              onChange={(e) => handleChange('accountSid', e.target.value)}
              placeholder="Enter Account SID"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Auth Token <span className="text-[#4F46E5]">*</span>
            </label>
            <input
              type="text"
              value={formData.authToken}
              onChange={(e) => handleChange('authToken', e.target.value)}
              placeholder="Enter Auth Token"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`mt-6 px-10 py-3 rounded-full font-medium transition-colors ${
            isFormValid && !isLoading
              ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Importing...' : 'Import'}
        </button>
      </div>
    </div>
  );
};

// Vonage Number Modal (Similar to Twilio)
export const VonageNumberModal = ({ 
  isOpen, 
  onClose, 
  onImport,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    apiKey: '',
    apiSecret: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.number && formData.apiKey && formData.apiSecret) {
      onImport(formData);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', number: '', apiKey: '', apiSecret: '' });
    onClose();
  };

  const isFormValid = formData.name && formData.number && formData.apiKey && formData.apiSecret;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-xl">
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-2xl font-bold text-gray-900">Add your Vonage Number</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-6">Please fill your details.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Name <span className="text-[#4F46E5]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter name"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              Number <span className="text-[#4F46E5]">*</span>
            </label>
            <input
              type="text"
              value={formData.number}
              onChange={(e) => handleChange('number', e.target.value)}
              placeholder="Enter number"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              API Key <span className="text-[#4F46E5]">*</span>
            </label>
            <input
              type="text"
              value={formData.apiKey}
              onChange={(e) => handleChange('apiKey', e.target.value)}
              placeholder="Enter API Key"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-2">
              API Secret <span className="text-[#4F46E5]">*</span>
            </label>
            <input
              type="text"
              value={formData.apiSecret}
              onChange={(e) => handleChange('apiSecret', e.target.value)}
              placeholder="Enter API Secret"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] outline-none transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`mt-6 px-10 py-3 rounded-full font-medium transition-colors ${
            isFormValid && !isLoading
              ? 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Importing...' : 'Import'}
        </button>
      </div>
    </div>
  );
};

// Check Icon
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Upgrade SEO Modal

export const UpgradeSEOModal = ({ isOpen, onClose, onSelect }) => {
	  const [selectedTier, setSelectedTier] = useState(null);
	  const tiers = [
	    { id: 1, name: 'Tier - 1', price: 15, words: '15,000 Words.' },
	    { id: 2, name: 'Tier - 2', price: 29, words: '15,000 Words.' },
	    { id: 3, name: 'Tier - 3', price: 49, words: '15,000 Words.' },
	  ];
	
	  if (!isOpen) return null;
	
	  return (
	    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
	      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
	        <div className="flex justify-between items-start mb-4">
	          <div>
	            <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>Book a Consultation</h3>
	            <p className="text-gray-500" style={{ fontFamily: 'DM Sans, sans-serif' }}>Please fill your details.</p>
	          </div>
	          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
	            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
	          </button>
	        </div>
	
	        <div className="space-y-3 mb-6">
	          {tiers.map(tier => (
	            <button
	              key={tier.id}
	              onClick={() => setSelectedTier(tier.id)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedTier === tier.id ? 'border-[#4F46E5] bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
	            >
	              <div className="flex items-center gap-3">
	                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedTier === tier.id ? 'border-[#4F46E5]' : 'border-gray-300'}`}>
	                  {selectedTier === tier.id && <div className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]"/>}
	                </div>
	                <span className="font-medium text-gray-900">{tier.name}</span>
	              </div>
	              <div className="ml-8 mt-1">
	                <span className="text-2xl font-bold text-[#4F46E5]">£{tier.price}</span>
	                <span className="text-gray-500">/ month</span>
	              </div>
	              <div className="ml-8 mt-1 flex items-center gap-2 text-sm text-gray-600">
	                <CheckIcon /> {tier.words}
	              </div>
	            </button>
	          ))}
        </div>
	
	        <button
	          onClick={() => { onSelect(selectedTier); onClose(); }}
	          disabled={!selectedTier}
	          className="px-8 py-3 bg-[#4F46E5] text-white rounded-full font-medium hover:bg-[#4338CA] transition-colors disabled:opacity-50"
	        >
	          Switch Plan
	        </button>
	      </div>
	    </div>
	  );
	};


// Generic OAuth Connect Modal (For CRM, Email, Social integrations)
// This simulates OAuth flow - in real app, it would redirect to provider
export const OAuthConnectModal = ({
  isOpen,
  onClose,
  provider, // 'salesforce', 'google', 'linkedin', etc.
  providerName,
  onConnect,
  isConnecting = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          {/* Provider icon would go here */}
          <span className="text-2xl font-bold text-gray-600">{providerName?.charAt(0)}</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">Connect to {providerName}</h2>
        <p className="text-gray-500 text-sm mb-6">
          You will be redirected to {providerName} to authorize the connection.
        </p>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConnect(provider)}
            disabled={isConnecting}
            className="px-6 py-3 bg-[#4F46E5] text-white rounded-full font-medium hover:bg-[#4338CA] transition-colors disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
};
// Add these exports to your Modals.jsx file

// Template Loading Modal (full screen with gradient background)
export const TemplateLoadingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full mx-4 shadow-xl text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Please wait for a moment.
        </h3>
        <p className="text-gray-600 mb-8">We are generating your pitch Deck</p>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "450ms" }} />
        </div>
      </div>
    </div>
  );
};

// Template Success Modal
export const TemplateSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center shadow-xl">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Template successfully saved</h3>
        <p className="text-gray-600 mb-6">Your template is saved,</p>
        <button onClick={onClose} className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
          Close
        </button>
      </div>
    </div>
  );
};

// AI Prompt Modal for slide editing
export const AIPromptModal = ({ isOpen, onClose, onSubmit }) => {
  const [prompt, setPrompt] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-center z-50 pt-20">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Write your prompt here.</h3>
          <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here... (e.g., Change the title coor to blue', 'Add a border to the image', etc...)"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none mb-4"
        />
        <button
          onClick={() => { onSubmit?.(prompt); setPrompt(""); onClose(); }}
          className="px-8 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};