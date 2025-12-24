// components/modals/Modals.jsx
import { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { Modal, LoadingSpinner, SuccessIcon } from "../common/CommonComponents";
import { savedSearches, projects } from "../../data/profilesData";

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
      <h2 className="text-xl font-bold text-gray-800 mb-1">Save your search</h2>
      <p className="text-gray-500 text-sm mb-6">Fill details for new project</p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Name
        </label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter Search Name"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
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

// Load Search Modal
export const LoadSearchModal = ({ isOpen, onClose, onLoad }) => {
  const [selectedSearch, setSelectedSearch] = useState(null);

  const handleLoad = () => {
    if (selectedSearch) {
      onLoad(selectedSearch);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Select Saved Search</h2>
      <p className="text-gray-500 text-sm mb-6">Load a saved search list.</p>

      <div className="space-y-3 mb-6">
        {savedSearches.map((search) => (
          <button
            key={search.id}
            onClick={() => setSelectedSearch(search)}
            className={`w-full p-4 text-left transition-all duration-200 ${
              selectedSearch?.id === search.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedSearch?.id === search.id
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedSearch?.id === search.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium text-gray-800">{search.name}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleLoad}
        disabled={!selectedSearch}
        className="w-full bg-gray-200 text-gray-600 py-3 rounded-full font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Load Search
      </button>
    </Modal>
  );
};

// Add to Project Modal
export const AddToProjectModal = ({ isOpen, onClose, profile, onAddToProject }) => {
  const { projects, addProject, addToProject } = useSearch();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successType, setSuccessType] = useState(""); // "added" or "created"
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [createdProjectName, setCreatedProjectName] = useState("");

  const handleAdd = () => {
    if (selectedProject && profile) {
      addToProject(selectedProject.id, [profile.id]);
      setSuccessType("added");
      setShowSuccess(true);
      if (onAddToProject) {
        onAddToProject(selectedProject.id);
      }
    }
  };

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      addProject(newProjectName, newProjectDescription);
      setCreatedProjectName(newProjectName);
      setNewProjectName("");
      setNewProjectDescription("");
      setShowCreateProject(false);
      setSuccessType("created");
      setShowSuccess(true);
    }
  };

  const handleClose = () => {
    setSelectedProject(null);
    setShowCreateProject(false);
    setShowSuccess(false);
    setSuccessType("");
    setNewProjectName("");
    setNewProjectDescription("");
    setCreatedProjectName("");
    onClose();
  };

  // Go back to profiles (close modal completely)
  const handleGoBackToProfiles = () => {
    handleClose();
  };

  // Go back to select project form after creating project
  const handleGoBackToForm = () => {
    setShowSuccess(false);
    setSuccessType("");
    setCreatedProjectName("");
    // Stay on select project view
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Success Modal - Added to Project */}
      {showSuccess && successType === "added" && (
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
          {/* Success Icon */}
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
            Go Back to Profiles
          </button>
        </div>
      )}

      {/* Success Modal - Project Created */}
      {showSuccess && successType === "created" && (
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl text-center">
          {/* Success Icon */}
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
            Go Back to Form
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

          {/* Project Name */}
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

          {/* Project Description */}
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

          {/* Create Button */}
          <button
            onClick={handleCreateProject}
            disabled={!newProjectName.trim()}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              newProjectName.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Create Project
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

          <p className="text-gray-500 text-sm mb-6">Where you want to move the profile</p>

          {/* Project List */}
          <div className="space-y-2 mb-6">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  selectedProject?.id === project.id
                    ? "bg-blue-50 border-2 border-blue-500"
                    : "bg-white hover:bg-gray-50 border-2 border-transparent"
                }`}
              >
                {/* Radio Button */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedProject?.id === project.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 bg-white"
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
            ))}
          </div>

          {/* Footer */}
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
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                selectedProject
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
export const LoadingModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <h2 className="text-lg font-bold text-gray-800 mb-1">Loading your Search</h2>
      <p className="text-gray-500 text-sm mb-8">
        Do not close the window, we are fetching the information
      </p>
      <div className="py-4">
        <LoadingSpinner />
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