// components/sales/SearchResultsView.jsx
import { useState, useEffect, useRef } from "react";
import { ProfileCard } from "../profiles/ProfileComponents";
import { CompanyCard } from "../profiles/CompanyCard";
import { Pagination } from "../common/CommonComponents";
import { AddToProjectModal } from "../modals/Modals";
import { footerLinks } from "../../data/salesAgentData";
import logofooter from "../../assets/Logo-Only.png";

export default function SearchResultsView({ mode = "b2c", config, context }) {
  const {
    selectedProfiles,
    toggleProfileSelection,
    selectAllProfiles,
    enrichProfile,
    enrichMultipleProfiles,
    getPaginatedProfiles,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    totalResults,
    excludeInProject,
    setExcludeInProject,
    // B2B specific
    selectedCompanies,
    toggleCompanySelection,
    selectAllCompanies,
    getPaginatedCompanies,
  } = context;

  // Determine which data to use based on mode
  const isB2B = mode === "b2b";
  const selectedItems = isB2B ? (selectedCompanies || []) : (selectedProfiles || []);
  const toggleSelection = isB2B ? toggleCompanySelection : toggleProfileSelection;
  const selectAll = isB2B ? selectAllCompanies : selectAllProfiles;
  const getPaginatedItems = isB2B ? getPaginatedCompanies : getPaginatedProfiles;

  const [addToProjectModal, setAddToProjectModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [targetItemId, setTargetItemId] = useState(null);
  const [targetItem, setTargetItem] = useState(null);

  const paginatedItems = getPaginatedItems ? getPaginatedItems() : [];
  const isAllSelected =
    paginatedItems.length > 0 &&
    paginatedItems.every((item) => selectedItems.includes(item.id));

  const handleEnrich = (itemId) => {
    if (enrichProfile) {
      enrichProfile(itemId);
    }
  };

  const handleEnrichAll = () => {
    if (enrichMultipleProfiles && !isB2B) {
      const unenrichedSelected = selectedItems.filter(
        (id) => !paginatedItems.find((p) => p.id === id)?.isEnriched
      );
      enrichMultipleProfiles(unenrichedSelected);
    }
  };

  const handleAddToProject = (item) => {
    setTargetItem(item);
    setTargetItemId(item.id);
    setAddToProjectModal(true);
  };

  const handleAddAllToProject = () => {
    setTargetItem(null);
    setTargetItemId(null);
    setAddToProjectModal(true);
  };

  const handleProjectSelected = (projectName) => {
    setSelectedProjectName(projectName);
    setAddToProjectModal(false);
    setSuccessModal(true);
  };

  // Export Dropdown Component (B2C only)
  const ExportDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleExport = (type) => {
      console.log(`Exporting as ${type}...`);
      // Add your export logic here
      setIsOpen(false);
    };

    return (
      <div className="relative " ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            <button
              onClick={() => handleExport("csv")}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export as .CSV
            </button>
            <button
              onClick={() => handleExport("Odoo")}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export to Odoo
            </button>
            <button
              onClick={() => handleExport("hubspot")}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export to hubspot
            </button>
            <button
              onClick={() => handleExport("salesforce")}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export to Salesforce
            </button>
            <button
              onClick={() => handleExport("Bullhorn")}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export to Bullhorn 
            </button>
            <button
              onClick={() => handleExport("salesforce")}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export to Pipedrive
            </button>
          </div>
        )}
      </div>
    );
  };

  // Calculate display range
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults || paginatedItems.length);

  return (
    <div className="flex-1 flex flex-col h-full gap-1.5 overflow-y-scroll">
      {/* Header */}
      <div className="p-4 border overflow-hidden rounded bg-white border-gray-100">
        {/* Results Info Row */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-4">
            <span className="text-[14px] text-[#000000]">
              {startIndex} - {endIndex} of about {(totalResults || 234124).toLocaleString()} results.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={excludeInProject || false}
              onChange={(e) => setExcludeInProject && setExcludeInProject(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm text-gray-600">Exclude profiles already in project.</span>
          </div>
        </div>

        {/* Select All Row */}
        <div className="flex items-center justify-between py-3 px-4 rounded-lg">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={selectAll}
              className="
    appearance-none
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

            <span className="text-sm text-gray-700">
              Select All
              {selectedItems.length > 0 && (
                <span className="text-gray-500 ml-2">
                  {selectedItems.length} Selected from this list
                </span>
              )}
            </span>
          </div>

          {selectedItems.length > 0 && (
            <div className="flex items-center gap-3">
              {/* Only show Enrich button for B2C */}
              {!isB2B && config.hasEnrichment && (
                <button
                  onClick={handleEnrichAll}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Enrich Profile
                </button>
              )}
              <button
                onClick={handleAddAllToProject}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Add to Project
              </button>

              {/* Three Dots Menu - Only for B2C */}
              {!isB2B && (
                <ExportDropdown />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 h-5 z-[0]">
        <div className="space-y-1">
          {paginatedItems.map((item) => (
            isB2B ? (
              <CompanyCard
                key={item.id}
                company={item}
                isSelected={selectedItems.includes(item.id)}
                onSelect={toggleSelection}
                onAddToProject={handleAddToProject}
              />
            ) : (
              <ProfileCard
                key={item.id}
                profile={item}
                isSelected={selectedItems.includes(item.id)}
                onSelect={toggleSelection}
                onEnrich={handleEnrich}
                onAddToProject={handleAddToProject}
              />
              //           <ProfileCard
              //   key={profile.id}
              //   profile={profile}
              //   isSelected={selectedProfiles.includes(profile.id)}
              //   onSelect={handleSelectProfile}
              //   onEnrich={handleEnrichProfile}
              //   onAddToProject={handleAddToProject}
              // />
            )
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages || Math.ceil(paginatedItems.length / itemsPerPage)}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Add to Project Modal */}
      <AddToProjectModal
        isOpen={addToProjectModal}
        onClose={() => setAddToProjectModal(false)}
        profile={targetItem}
        company={targetItem}
        onAddToProject={handleProjectSelected}
        mode={mode}
        context={context}
      />

      
    </div>
  );
}