// pages/SalesAgentContent.jsx
import { useState, useEffect } from "react";
import { useB2BSearch } from "../context/B2BSearchContext";
import SearchFiltersPanel from "../components/sales/SearchFiltersPanel";
import SearchResultsView from "../components/sales/SearchResultsView";
import {
  SaveSearchModal,
  LoadSearchModal,
  SearchSavedModal,
  LoadingModal,
} from "../components/modals/Modals";
import { footerLinks } from "../data/salesAgentData";
import { getAgentConfig } from "../data/agentConfig";
import logo from "../assets/Logo -.png";
import logofooter from "../assets/Logo-footer.svg";
import { useSearch } from "../context/SearchContext";


const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export default function SalesAgentContent({ mode = "b2c" }) {
  // Get the appropriate context based on mode
  const b2cContext = useSearch();
  const b2bContext = useB2BSearch();
  const { hasSearched } = useSearch();
  const context = mode === "b2b" ? b2bContext : b2cContext;
  const config = getAgentConfig(mode);

  const {
    activeFilters,
    addFilter,
    removeFilter,
    clearFilters,
    loadSavedSearch,
    // hasSearched,
    setHasSearched,
  } = context;

  // Search type state - uses first option from config
  const [searchType, setSearchType] = useState(config.searchTypes[0].key);
  const [searchQuery, setSearchQuery] = useState("");
  

  // Reset search type when mode changes
useEffect(() => {
  setSearchType(config.searchTypes[0].key);
}, [mode, config.searchTypes]);

  // Modal states
  const [saveSearchModal, setSaveSearchModal] = useState(false);
  const [loadSearchModal, setLoadSearchModal] = useState(false);
  const [searchSavedModal, setSearchSavedModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  const handleSaveSearch = (searchName) => {
    if (context.saveCurrentSearch) {
      context.saveCurrentSearch(searchName);
    }
    setSaveSearchModal(false);
    setSearchSavedModal(true);
  };

  const handleLoadSearch = (savedSearch) => {
    setLoadingModal(true);
    setTimeout(() => {
      loadSavedSearch(savedSearch);
      setLoadingModal(false);
      setHasSearched(true);
    }, 1500);
  };

  const handleSearch = () => {
    if (searchQuery.trim() || activeFilters.length > 0) {
      setLoadingModal(true);
      setTimeout(() => {
        setLoadingModal(false);
        setHasSearched(true);
      }, 1500);
    }
  };
  

  return (
    <div className="pt-3 flex flex-col h-full overflow-scroll scrollbar-hide">
      <div className="flex flex-1 overflow-scroll scrollbar-hide gap-3">
        {/* Filter Panel */}
        <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-scroll scrollbar-hide">
          {/* Search Type Toggle */}
          <div className="p-4 border-b border-gray-100">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              {config.searchTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setSearchType(type.key)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    searchType === type.key
                      ? "bg-gray-900 text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <SearchFiltersPanel
            mode={mode}
            config={config}
            searchType={searchType}
            activeFilters={activeFilters}
            onAddFilter={addFilter}
            onRemoveFilter={removeFilter}
            onClearFilters={clearFilters}
            onSaveSearch={() => setSaveSearchModal(true)}
            onLoadSearch={() => setLoadSearchModal(true)}
            context={context}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col rounded shadow-sm overflow-auto">
          {hasSearched ? (
            <SearchResultsView mode={mode} config={config} context={context} />
          ) : (
            <>
              {/* Search Content */}
              <div className="flex-1 flex items-center bg-white justify-center p-8">
                <div className="text-center max-w-xl">
                  {/* Logo */}
                  <div className="flex items-center justify-center gap-3 mb-0">
                    <img src={logo} alt="Logo" className="w-72 h-32 object-contain" />
                    {/* <div className="text-left">
                      <div className="font-bold text-2xl text-gray-800">AI workforce</div>
                      <div className="text-gray-500">Create an AI employee</div>
                    </div> */}
                  </div>

                  {/* Heading */}
                  <h1 className="text-4xl font-bold text-gray-800 mb-8">
                    Tell us what you are looking for
                  </h1>

                  {/* Search Bar */}
                  <div className="flex items-center bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder='e.g. LinkedIn URL, Job Title, Location, Skills, Years of Experience, Company etc."'
                      className="flex-1 px-6 py-4 text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
                    />
                    <button
                      onClick={handleSearch}
                      className="bg-gray-900 text-white p-4 m-0.2 rounded hover:bg-gray-800 transition-colors"
                    >
                      <SearchIcon />
                    </button>
                  </div>
                </div>
              </div>

              
            </>
          )}
        </div>
        
      </div>
      {/* Footer */}
              <footer className="bg-white h-[24px] p-5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#000000]">
                  <img src={logofooter} alt="Logo" className="w-5 h-4  object-contain" />
                  <span>© 2025 aiworkforce.co.uk</span>
                </div>
                <nav className="flex items-center gap-6">
                  {footerLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sm text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </footer>

      {/* Modals */}
      <SaveSearchModal
        isOpen={saveSearchModal}
        onClose={() => setSaveSearchModal(false)}
        onSave={handleSaveSearch}
      />

      <LoadSearchModal
        isOpen={loadSearchModal}
        onClose={() => setLoadSearchModal(false)}
        onLoad={handleLoadSearch}
        savedSearches={config.savedSearches}
      />

      <SearchSavedModal
        isOpen={searchSavedModal}
        onClose={() => setSearchSavedModal(false)}
      />

      <LoadingModal
        isOpen={loadingModal}
        onClose={() => setLoadingModal(false)}
      />
    </div>
  );
}