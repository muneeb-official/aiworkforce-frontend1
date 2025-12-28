// context/SearchContext.jsx
import { createContext, useContext, useState, useCallback } from "react";
import { profilesData } from "../data/profilesData";

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  // Credits state
  const [credits, setCredits] = useState(3000);

  // Active filters state
  const [activeFilters, setActiveFilters] = useState([]);

  // Search results state
  const [profiles, setProfiles] = useState(profilesData);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [expandedProfile, setExpandedProfile] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  // UI state
  const [hasSearched, setHasSearched] = useState(false);
  const [excludeInProject, setExcludeInProject] = useState(false);

  // Projects state
const [projects, setProjects] = useState([
  { id: 1, name: "Tech Leaders Q1", description: "Q1 tech leadership prospects", profileCount: 45 },
  { id: 2, name: "Sales Prospects", description: "Sales team targets", profileCount: 128 },
  { id: 3, name: "Marketing Contacts", description: "Marketing outreach list", profileCount: 67 },
]);

  // Add filter
  const addFilter = useCallback((filter) => {
    setActiveFilters((prev) => {
      const exists = prev.some(
        (f) => f.type === filter.type && f.value === filter.value
      );
      if (exists) return prev;
      return [...prev, { ...filter, id: Date.now() }];
    });
  }, []);

  // Remove filter
  const removeFilter = useCallback((filterId) => {
    setActiveFilters((prev) => prev.filter((f) => f.id !== filterId));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setActiveFilters([]);
    setHasSearched(false);
    setSelectedProfiles([]);
  }, []);

  // Update filter modifier
const updateFilterModifier = useCallback((filterId, modifier) => {
  setActiveFilters((prev) =>
    prev.map((f) =>
      f.id === filterId ? { ...f, modifier } : f
    )
  );
}, []);

  // Load saved search
  const loadSavedSearch = useCallback((savedSearch) => {
    const filters = [];
    if (savedSearch.filters.name) {
      filters.push({ id: Date.now(), type: "name", value: savedSearch.filters.name, icon: "user" });
    }
    if (savedSearch.filters.location) {
      filters.push({ id: Date.now() + 1, type: "location", value: savedSearch.filters.location, icon: "location" });
    }
    if (savedSearch.filters.industry) {
      filters.push({ id: Date.now() + 2, type: "industry", value: savedSearch.filters.industry, icon: "building" });
    }
    if (savedSearch.filters.title) {
      filters.push({ id: Date.now() + 3, type: "title", value: savedSearch.filters.title, icon: "briefcase" });
    }
    setActiveFilters(filters);
    setHasSearched(true);
  }, []);

  // Toggle profile selection
  const toggleProfileSelection = useCallback((profileId) => {
    setSelectedProfiles((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : [...prev, profileId]
    );
  }, []);

  // Select all profiles
  const selectAllProfiles = useCallback(() => {
    const currentProfiles = profiles.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    const allSelected = currentProfiles.every((p) =>
      selectedProfiles.includes(p.id)
    );
    if (allSelected) {
      setSelectedProfiles([]);
    } else {
      setSelectedProfiles(currentProfiles.map((p) => p.id));
    }
  }, [profiles, currentPage, itemsPerPage, selectedProfiles]);

  // Enrich profile
  const enrichProfile = useCallback((profileId) => {
    if (credits < 1) return false;
    setCredits((prev) => prev - 1);
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, isEnriched: true } : p))
    );
    return true;
  }, [credits]);

  // Enrich multiple profiles
  const enrichMultipleProfiles = useCallback((profileIds) => {
    const cost = profileIds.length;
    if (credits < cost) return false;
    setCredits((prev) => prev - cost);
    setProfiles((prev) =>
      prev.map((p) =>
        profileIds.includes(p.id) ? { ...p, isEnriched: true } : p
      )
    );
    return true;
  }, [credits]);

  // Add new project
const addProject = useCallback((name, description) => {
  const newProject = {
    id: Date.now(),
    name,
    description,
    profileCount: 0,
  };
  setProjects((prev) => [...prev, newProject]);
  return newProject;
}, []);

// Add profile to project
const addToProject = useCallback((projectId, profileIds) => {
  setProjects((prev) =>
    prev.map((project) =>
      project.id === projectId
        ? { ...project, profileCount: project.profileCount + profileIds.length }
        : project
    )
  );
}, []);

  // Toggle expanded profile
  const toggleExpandedProfile = useCallback((profileId) => {
    setExpandedProfile((prev) => (prev === profileId ? null : profileId));
  }, []);

  // Get paginated profiles
  const getPaginatedProfiles = useCallback(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return profiles.slice(start, end);
  }, [profiles, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(profiles.length / itemsPerPage);
  const totalResults = profiles.length;

  const value = {
    // Credits
    credits,
    setCredits,

    // Filters
    activeFilters,
    addFilter,
    removeFilter,
    updateFilterModifier,
    clearFilters,
    loadSavedSearch,

    // Profiles
    profiles,
    selectedProfiles,
    toggleProfileSelection,
    selectAllProfiles,
    expandedProfile,
    toggleExpandedProfile,
    enrichProfile,
    enrichMultipleProfiles,
    getPaginatedProfiles,

    // Pagination
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    totalResults,

    // UI State
hasSearched,
setHasSearched,
excludeInProject,
setExcludeInProject,

// Projects
projects,
setProjects,
addProject,
addToProject,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;