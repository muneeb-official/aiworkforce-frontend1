// components/sales/SearchFiltersPanel.jsx
import { useState, useRef, useEffect } from "react";
import { FilterTag } from "../common/CommonComponents";
import { useSearch } from "../../context/SearchContext";

// Icons
const ChevronRight = ({ className = "" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronLeft = ({ className = "" }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronDown = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// Import FilterIcon from assets
import FilterIcon from "../../assets/icons/FilterIcon.svg";

// Filter Section Component
const FilterSection = ({ title, count, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-[#F4F5FB] border-2 rounded-lg border-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-3 text-left hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-[]#000000">{title}</span>
          {count > 0 && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        <span className={`transition-transform duration-200 text-[#3C49F7] ${isOpen ? "-rotate-90" : ""}`}>
          <ChevronLeft />
        </span>
      </button>
      <div
        className={`overflow-hidden overflow-scroll scrollbar-hide transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-1 pb-4 pt-1">{children}</div>
      </div>
    </div>
  );
};

// Text Input Filter
const TextFilterInput = ({ placeholder, value, onChange, onKeyDown }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={onKeyDown}
    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all duration-200"
  />
);

// Select Input Filter
const SelectFilterInput = ({ options, value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white pr-8 transition-all duration-200"
    >
      {options.map((opt, idx) => (
        <option key={idx} value={typeof opt === "string" ? opt : opt.label}>
          {typeof opt === "string" ? opt : opt.label}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none" />
  </div>
);

// Checkbox List Filter (for B2B)
const CheckboxListFilter = ({
  filterKey,
  placeholder,
  options,
  selectedValues,
  onSelect,
  hasModifier,
  onUpdateModifier,
  activeFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModifierDropdown, setShowModifierDropdown] = useState(null);
  const modifierRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modifierRef.current && !modifierRef.current.contains(event.target)) {
        setShowModifierDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle modifier selection - auto-select checkbox if "Exact" is chosen
  const handleModifierClick = (option, modifier) => {
    const isSelected = selectedValues.some(
      (v) => v.type === filterKey && v.value === option.label
    );

    // If not selected and clicking a modifier, auto-select the checkbox first
    if (!isSelected) {
      onSelect(filterKey, option.label);
    }

    // Then apply the modifier
    setTimeout(() => {
      const filter = activeFilters.find(
        (v) => v.type === filterKey && v.value === option.label
      );
      if (filter) {
        onUpdateModifier(filter.id, modifier);
      }
    }, 0);

    setShowModifierDropdown(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all duration-200 mb-3"
      />
      <div className="space-y-1 max-h-60 overflow-y-auto">
        {filteredOptions.map((option) => {
          const isSelected = selectedValues.some(
            (v) => v.type === filterKey && v.value === option.label
          );
          const selectedFilter = activeFilters.find(
            (v) => v.type === filterKey && v.value === option.label
          );

          return (
            <div key={option.id} className="flex items-center justify-between group">
              <button
                onClick={() => onSelect(filterKey, option.label)}
                className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"
                    }`}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${isSelected ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                  {option.label}
                </span>
              </button>

              {/* Modifier Button - Always visible, clickable anytime */}
              {hasModifier && (
                <div className="relative" ref={modifierRef}>
                  <button
                    onClick={() => setShowModifierDropdown(showModifierDropdown === option.id ? null : option.id)}
                    className={`p-2 rounded-lg transition-colors ${isSelected
                      ? "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                      : "text-gray-300 opacity-100 group-hover:opacity-100 hover:text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    <img src={FilterIcon} alt="filter" className="w-4 h-4" />
                  </button>

                  {showModifierDropdown === option.id && (
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
                        Apply Modifier
                      </div>
                      <button
                        onClick={() => handleModifierClick(option, "exact")}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${selectedFilter?.modifier === "exact" ? "text-blue-600 font-medium" : "text-gray-700"
                          }`}
                      >
                        <span>Exact</span>
                        {selectedFilter?.modifier === "exact" && (
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleModifierClick(option, "not")}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${selectedFilter?.modifier === "not" ? "text-blue-600 font-medium" : "text-gray-700"
                          }`}
                      >
                        <span>Not</span>
                        {selectedFilter?.modifier === "not" && (
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Location Filter with Expandable List (for B2C)
const LocationFilter = ({
  filterKey = "location",
  placeholder,
  options,
  activeFilters,
  onAddFilter,
  onRemoveFilter,
  onUpdateModifier,
  hasRadius = true
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]); // Track selected children
  const [expandedItems, setExpandedItems] = useState({});
  const [radius, setRadius] = useState(0);
  const [showModifierDropdown, setShowModifierDropdown] = useState(null);
  const modifierRef = useRef(null);

  // Close modifier dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modifierRef.current && !modifierRef.current.contains(event.target)) {
        setShowModifierDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle parent location select - auto-select all children
  const handleLocationSelect = (location) => {
    const isSelected = selectedLocations.includes(location.name);

    if (isSelected) {
      // Deselect parent and all children
      setSelectedLocations((prev) => prev.filter((l) => l !== location.name));
      const filter = activeFilters.find((f) => f.type === filterKey && f.value === location.name);
      if (filter) onRemoveFilter(filter.id);

      // Remove all children
      if (location.children) {
        location.children.forEach((child) => {
          setSelectedChildren((prev) => prev.filter((c) => c !== child));
          const childFilter = activeFilters.find((f) => f.type === filterKey && f.value === child);
          if (childFilter) onRemoveFilter(childFilter.id);
        });
      }
    } else {
      // Select parent
      setSelectedLocations((prev) => [...prev, location.name]);
      onAddFilter({ type: filterKey, value: location.name, icon: "location" });

      // Auto-select all children
      if (location.children) {
        location.children.forEach((child) => {
          if (!selectedChildren.includes(child)) {
            setSelectedChildren((prev) => [...prev, child]);
            onAddFilter({ type: filterKey, value: child, icon: "location" });
          }
        });
      }
    }
  };

  // Handle child location select
  const handleChildSelect = (parentLocation, childName) => {
    const isChildSelected = selectedChildren.includes(childName);

    if (isChildSelected) {
      setSelectedChildren((prev) => prev.filter((c) => c !== childName));
      const filter = activeFilters.find((f) => f.type === filterKey && f.value === childName);
      if (filter) onRemoveFilter(filter.id);

      // If all children are deselected, deselect parent too
      const remainingChildren = selectedChildren.filter((c) =>
        c !== childName && parentLocation.children?.includes(c)
      );
      if (remainingChildren.length === 0 && selectedLocations.includes(parentLocation.name)) {
        setSelectedLocations((prev) => prev.filter((l) => l !== parentLocation.name));
        const parentFilter = activeFilters.find((f) => f.type === filterKey && f.value === parentLocation.name);
        if (parentFilter) onRemoveFilter(parentFilter.id);
      }
    } else {
      setSelectedChildren((prev) => [...prev, childName]);
      onAddFilter({ type: filterKey, value: childName, icon: "location" });
    }
  };

  const toggleExpand = (name) => {
    setExpandedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Handle modifier selection - auto-select if not selected
  const handleModifierSelect = (location, modifier) => {
    const isSelected = selectedLocations.includes(location.name);

    // If not selected, select it first
    if (!isSelected) {
      setSelectedLocations((prev) => [...prev, location.name]);
      onAddFilter({ type: filterKey, value: location.name, icon: "location" });

      // Auto-select all children
      if (location.children) {
        location.children.forEach((child) => {
          if (!selectedChildren.includes(child)) {
            setSelectedChildren((prev) => [...prev, child]);
            onAddFilter({ type: filterKey, value: child, icon: "location" });
          }
        });
      }
    }

    // Apply modifier after a brief delay to ensure filter is added
    setTimeout(() => {
      const filter = activeFilters.find((f) => f.type === filterKey && f.value === location.name);
      if (filter && onUpdateModifier) {
        onUpdateModifier(filter.id, modifier);
      }
    }, 0);

    setShowModifierDropdown(null);
  };

  // Handle modifier selection from search input
  const handleSearchInputModifier = (modifier) => {
    if (searchTerm.trim()) {
      // Add filter with the search term and modifier
      onAddFilter({
        type: filterKey,
        value: searchTerm.trim(),
        icon: "location",
        modifier: modifier
      });
      setSearchTerm(""); // Clear search input after adding
    }
    setShowModifierDropdown(null);
  };

  const marks = [0, 25, 50, 75, 100];

  return (
    <div>
      {/* Search Input with Filter Icon */}
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all duration-200"
        />

        {/* Filter Icon - appears when typing */}
        {searchTerm.trim() && (
          <div className="relative" ref={showModifierDropdown === "search-input" ? modifierRef : null}>
            <button
              onClick={() => setShowModifierDropdown(showModifierDropdown === "search-input" ? null : "search-input")}
              className="p-1.5 rounded hover:bg-blue-100 transition-colors duration-150"
            >
              <img src={FilterIcon} alt="filter" className="w-5 h-5" />
            </button>

            {/* Modifier Dropdown for Search Input */}
            {showModifierDropdown === "search-input" && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-3 py-2 text-sm font-semibold text-[#000000] border-b border-gray-100">
                  Apply Modifier
                </div>
                <button
                  onClick={() => handleSearchInputModifier("exact")}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 text-gray-700"
                >
                  <span>Exact</span>
                </button>
                <button
                  onClick={() => handleSearchInputModifier("not")}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 text-gray-700"
                >
                  <span>Not</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-3 max-h-64 overflow-scroll scrollbar-hide space-y-1">
        {options
          .filter((loc) => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((loc) => {
            const isSelected = selectedLocations.includes(loc.name);
            const selectedFilter = activeFilters.find(
              (f) => f.type === filterKey && f.value === loc.name
            );

            return (
              <div key={loc.name}>
                <div className="flex items-center gap-2 py-1.5 hover:bg-blue-100 rounded px-2 transition-colors duration-150 group">
                  <button
                    onClick={() => toggleExpand(loc.name)}
                    className="p-0.5 hover:bg-blue-100 rounded transition-colors duration-150"
                  >
                    <ChevronRight
                      className={`text-[#3C49F7] transition-transform duration-200 ${expandedItems[loc.name] ? "rotate-90" : ""
                        }`}
                    />
                  </button>
                  <label className="flex items-center gap-2 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleLocationSelect(loc)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {loc.name} {loc.count && <span className="text-gray-400">({loc.count})</span>}
                    </span>
                  </label>

                  {/* Filter/Modifier Button - Always clickable */}
                  <div className="relative" ref={showModifierDropdown === loc.name ? modifierRef : null}>
                    <button
                      onClick={() => setShowModifierDropdown(showModifierDropdown === loc.name ? null : loc.name)}
                      className={`p-1 rounded transition-colors duration-150 ${isSelected
                        ? "hover:bg-gray-100 text-gray-500"
                        : "text-gray-300 opacity-100 group-hover:opacity-100 hover:text-gray-500 hover:bg-blue-100"
                        }`}
                    >
                      <img src={FilterIcon} alt="filter" className="w-5 h-5" />
                    </button>

                    {/* Modifier Dropdown - Matches design */}
                    {showModifierDropdown === loc.name && (
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <div className="px-3 py-2 text-sm font-semibold text-[#000000] border-b border-gray-100">
                          Apply Modifier
                        </div>
                        <button
                          onClick={() => handleModifierSelect(loc, "exact")}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 ${selectedFilter?.modifier === "exact" ? "text-blue-600 font-medium" : "text-gray-700"
                            }`}
                        >
                          <span>Exact</span>
                          {selectedFilter?.modifier === "exact" && (
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleModifierSelect(loc, "not")}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 ${selectedFilter?.modifier === "not" ? "text-blue-600 font-medium" : "text-gray-700"
                            }`}
                        >
                          <span>Not</span>
                          {selectedFilter?.modifier === "not" && (
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Children */}
                {/* Expanded Children */}
                {expandedItems[loc.name] && loc.children && (
                  <div className="ml-8 mt-1 space-y-1">
                    {loc.children.map((child, idx) => {
                      const isChildSelected = selectedChildren.includes(child);
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50 rounded-lg transition-colors duration-150 group"
                        >
                          <label className="flex items-center gap-2 flex-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isChildSelected}
                              onChange={() => handleChildSelect(loc, child)}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">{child}</span>
                          </label>

                          {/* Filter Icon for Children */}
                          <button
                            className={`p-1 rounded transition-colors duration-150 ${isChildSelected
                              ? "hover:bg-gray-100 text-gray-500"
                              : "text-gray-300 opacity-100 group-hover:opacity-100 hover:text-gray-500 hover:bg-gray-100"
                              }`}
                          >
                            <img src={FilterIcon} alt="filter" className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Radius Slider - Only show if hasRadius is true */}
      {/* Radius Slider - Only show if hasRadius is true */}
      {hasRadius && (
        <div className="mt-6 px-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-semibold text-gray-800">Radius (mi)</span>
            <span className="w-5 h-5 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-medium cursor-help">
              ?
            </span>
          </div>

          {/* Custom Slider Track */}
          <div className="relative">
            {/* Track Background */}
            <div className="h-1 bg-gray-300 rounded-full relative">
              {/* Tick Marks */}
              {marks.map((mark, index) => (
                <div
                  key={mark}
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-gray-400"
                  style={{ left: `${(index / (marks.length - 1)) * 100}%` }}
                />
              ))}
            </div>

            {/* Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer"
            />
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-3">
            {marks.map((mark, index) => (
              <span
                key={mark}
                className={`text-sm font-semibold ${index === 0 ? 'text-blue-600' : 'text-gray-700'}`}
              >
                {mark}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Component
export default function SearchFiltersPanel({
  mode = "b2c",
  config,
  searchType,
  activeFilters = [],
  onAddFilter,
  onRemoveFilter,
  onClearFilters,
  onSaveSearch,
  onLoadSearch,
  context,
}) {

  // Multi-Section Filter (for Role & Department, Education, etc.)
  const MultiSectionFilter = ({
    filterKey,
    sections,
    activeFilters,
    onAddFilter,
    onRemoveFilter,
    onUpdateModifier,
  }) => {
    const [inputValues, setInputValues] = useState({});
    const [expandedItems, setExpandedItems] = useState({});
    const [showModifierDropdown, setShowModifierDropdown] = useState(null);
    const modifierRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modifierRef.current && !modifierRef.current.contains(event.target)) {
          setShowModifierDropdown(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (sectionKey, value) => {
      setInputValues((prev) => ({ ...prev, [sectionKey]: value }));
    };

    const handleInputModifier = (sectionKey, modifier) => {
      const value = inputValues[sectionKey]?.trim();
      if (value) {
        onAddFilter({
          type: `${filterKey}.${sectionKey}`,
          value: value,
          icon: filterKey,
          modifier: modifier,
        });
        setInputValues((prev) => ({ ...prev, [sectionKey]: "" }));
      }
      setShowModifierDropdown(null);
    };

    const handleCheckboxSelect = (sectionKey, option) => {
      const filterType = `${filterKey}.${sectionKey}`;
      const exists = activeFilters.some(
        (f) => f.type === filterType && f.value === option.label
      );

      if (exists) {
        const filter = activeFilters.find(
          (f) => f.type === filterType && f.value === option.label
        );
        onRemoveFilter(filter.id);
      } else {
        onAddFilter({
          type: filterType,
          value: option.label,
          icon: filterKey,
        });
      }
    };

    const handleOptionModifier = (sectionKey, option, modifier) => {
      const filterType = `${filterKey}.${sectionKey}`;
      const exists = activeFilters.some(
        (f) => f.type === filterType && f.value === option.label
      );

      if (!exists) {
        onAddFilter({
          type: filterType,
          value: option.label,
          icon: filterKey,
          modifier: modifier,
        });
      } else {
        const filter = activeFilters.find(
          (f) => f.type === filterType && f.value === option.label
        );
        if (filter && onUpdateModifier) {
          onUpdateModifier(filter.id, modifier);
        }
      }
      setShowModifierDropdown(null);
    };

    const toggleExpand = (itemKey) => {
      setExpandedItems((prev) => ({ ...prev, [itemKey]: !prev[itemKey] }));
    };

    const renderSection = (sectionKey, section) => {
      const inputValue = inputValues[sectionKey] || "";

      return (
        <div key={sectionKey} className="mb-4">
          <div className="text-sm font-semibold text-gray-800 mb-2">{section.label}</div>

          {/* Text Input with Filter Icon */}
          {(section.type === "text" || section.type === "text-with-options") && (
            <div className="relative flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder={section.placeholder}
                value={inputValue}
                onChange={(e) => handleInputChange(sectionKey, e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all duration-200"
              />

              {inputValue.trim() && (
                <div className="relative" ref={showModifierDropdown === `input-${sectionKey}` ? modifierRef : null}>
                  <button
                    onClick={() =>
                      setShowModifierDropdown(
                        showModifierDropdown === `input-${sectionKey}` ? null : `input-${sectionKey}`
                      )
                    }
                    className="p-1.5 rounded hover:bg-blue-100 transition-colors duration-150"
                  >
                    <img src={FilterIcon} alt="filter" className="w-5 h-5" />
                  </button>

                  {showModifierDropdown === `input-${sectionKey}` && (
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <div className="px-3 py-2 text-sm font-semibold text-[#000000] border-b border-gray-100">
                        Apply Modifier
                      </div>
                      <button
                        onClick={() => handleInputModifier(sectionKey, "exact")}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 text-gray-700"
                      >
                        <span>Exact</span>
                      </button>
                      <button
                        onClick={() => handleInputModifier(sectionKey, "not")}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 text-gray-700"
                      >
                        <span>Not</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Options with Expandable Items */}
          {section.type === "text-with-options" && section.options && (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {section.options.map((option) => {
                const filterType = `${filterKey}.${sectionKey}`;
                const isSelected = activeFilters.some(
                  (f) => f.type === filterType && f.value === option.label
                );
                const selectedFilter = activeFilters.find(
                  (f) => f.type === filterType && f.value === option.label
                );

                return (
                  <div key={option.id}>
                    <div className="flex items-center justify-between py-1.5 px-2 hover:bg-blue-50 rounded-lg transition-colors duration-150 group">
                      {option.hasChildren && (
                        <button
                          onClick={() => toggleExpand(`${sectionKey}-${option.id}`)}
                          className="p-0.5 hover:bg-blue-100 rounded transition-colors duration-150"
                        >
                          <ChevronRight
                            className={`text-[#3C49F7] transition-transform duration-200 ${expandedItems[`${sectionKey}-${option.id}`] ? "rotate-90" : ""
                              }`}
                          />
                        </button>
                      )}

                      <label className="flex items-center gap-2 flex-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCheckboxSelect(sectionKey, option)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {option.label}
                          {option.count && <span className="text-gray-400 ml-1">({option.count})</span>}
                        </span>
                      </label>

                      <div className="relative" ref={showModifierDropdown === `option-${sectionKey}-${option.id}` ? modifierRef : null}>
                        <button
                          onClick={() =>
                            setShowModifierDropdown(
                              showModifierDropdown === `option-${sectionKey}-${option.id}`
                                ? null
                                : `option-${sectionKey}-${option.id}`
                            )
                          }
                          className={`p-1 rounded transition-colors duration-150 ${isSelected
                              ? "hover:bg-gray-100 text-gray-500"
                              : "text-gray-300 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                          <img src={FilterIcon} alt="filter" className="w-4 h-4" />
                        </button>

                        {showModifierDropdown === `option-${sectionKey}-${option.id}` && (
                          <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            <div className="px-3 py-2 text-sm font-semibold text-[#000000] border-b border-gray-100">
                              Apply Modifier
                            </div>
                            <button
                              onClick={() => handleOptionModifier(sectionKey, option, "exact")}
                              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 ${selectedFilter?.modifier === "exact" ? "text-blue-600" : "text-gray-700"
                                }`}
                            >
                              <span>Exact</span>
                              {selectedFilter?.modifier === "exact" && (
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            <button
                              onClick={() => handleOptionModifier(sectionKey, option, "not")}
                              className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 ${selectedFilter?.modifier === "not" ? "text-blue-600" : "text-gray-700"
                                }`}
                            >
                              <span>Not</span>
                              {selectedFilter?.modifier === "not" && (
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Simple Checkbox List */}
          {section.type === "checkbox-list" && section.options && (
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {section.options.map((option) => {
                const filterType = `${filterKey}.${sectionKey}`;
                const isSelected = activeFilters.some(
                  (f) => f.type === filterType && f.value === option.label
                );
                const selectedFilter = activeFilters.find(
                  (f) => f.type === filterType && f.value === option.label
                );

                return (
                  <div
                    key={option.id}
                    className="flex items-center justify-between py-1.5 px-2 hover:bg-blue-50 rounded-lg transition-colors duration-150 group"
                  >
                    <label className="flex items-center gap-2 flex-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCheckboxSelect(sectionKey, option)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>

                    <div className="relative" ref={showModifierDropdown === `cb-${sectionKey}-${option.id}` ? modifierRef : null}>
                      <button
                        onClick={() =>
                          setShowModifierDropdown(
                            showModifierDropdown === `cb-${sectionKey}-${option.id}`
                              ? null
                              : `cb-${sectionKey}-${option.id}`
                          )
                        }
                        className={`p-1 rounded transition-colors duration-150 ${isSelected
                            ? "hover:bg-gray-100 text-gray-500"
                            : "text-gray-300 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:bg-gray-100"
                          }`}
                      >
                        <img src={FilterIcon} alt="filter" className="w-4 h-4" />
                      </button>

                      {showModifierDropdown === `cb-${sectionKey}-${option.id}` && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                          <div className="px-3 py-2 text-sm font-semibold text-[#000000] border-b border-gray-100">
                            Apply Modifier
                          </div>
                          <button
                            onClick={() => handleOptionModifier(sectionKey, option, "exact")}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 ${selectedFilter?.modifier === "exact" ? "text-blue-600" : "text-gray-700"
                              }`}
                          >
                            <span>Exact</span>
                            {selectedFilter?.modifier === "exact" && (
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <button
                            onClick={() => handleOptionModifier(sectionKey, option, "not")}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm font-semibold hover:text-blue-600 ${selectedFilter?.modifier === "not" ? "text-blue-600" : "text-gray-700"
                              }`}
                          >
                            <span>Not</span>
                            {selectedFilter?.modifier === "not" && (
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Select Dropdown */}
          {section.type === "select" && (
            <div className="relative">
              <select
                value={inputValues[sectionKey] || section.placeholder}
                onChange={(e) => {
                  handleInputChange(sectionKey, e.target.value);
                  if (e.target.value !== section.placeholder) {
                    onAddFilter({
                      type: `${filterKey}.${sectionKey}`,
                      value: e.target.value,
                      icon: filterKey,
                    });
                  }
                }}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white pr-8 transition-all duration-200"
              >
                {section.options.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
            </div>
          )}
        </div>
      );
    };

    return (
      <div>
        {Object.entries(sections).map(([sectionKey, section]) =>
          renderSection(sectionKey, section)
        )}
      </div>
    );
  };

  const [filterValues, setFilterValues] = useState({});

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputKeyDown = (e, type, icon) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onAddFilter({ type, value: e.target.value.trim(), icon });
      handleFilterChange(type, "");
    }
  };

  const handleCheckboxSelect = (type, value) => {
    const exists = activeFilters.some((f) => f.type === type && f.value === value);
    if (exists) {
      const filter = activeFilters.find((f) => f.type === type && f.value === value);
      onRemoveFilter(filter.id);
    } else {
      onAddFilter({ type, value, icon: type });
    }
  };

  const { hasSearched } = useSearch();

  // Get filters for current search type
  const currentFilters = config.filters[searchType] || [];
  const getFilterCount = (type) => activeFilters.filter((f) => f.type === type).length;

  // Get updateFilterModifier from context if available (B2B)
  const updateFilterModifier = context?.updateFilterModifier || (() => { });

  return (
    <div className="w-80 bg-white flex flex-col gap-1 rounded-b-2xl">
      {/* Header */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Search Filters</h3>
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Clear Filter
          </button>
        </div>

        {/* Active Filter Tags */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((filter) => (
              <FilterTag key={filter.id} filter={filter} onRemove={onRemoveFilter} />
            ))}
          </div>
        )}
      </div>

      {/* Scrollable Filters */}
      <div className="flex-1 flex-col overflow-auto px-4">
        {currentFilters.map((filterConfig) => (
          <FilterSection
            key={filterConfig.key}
            title={filterConfig.title}
            count={getFilterCount(filterConfig.key)}
          >
            {filterConfig.type === "text" && (
              <TextFilterInput
                placeholder={filterConfig.placeholder}
                value={filterValues[filterConfig.key] || ""}
                onChange={(v) => handleFilterChange(filterConfig.key, v)}
                onKeyDown={(e) => handleInputKeyDown(e, filterConfig.key, filterConfig.icon)}
              />
            )}

            {filterConfig.type === "select" && (
              <SelectFilterInput
                options={filterConfig.options}
                value={filterValues[filterConfig.key] || filterConfig.placeholder}
                onChange={(v) => {
                  handleFilterChange(filterConfig.key, v);
                  if (v !== filterConfig.placeholder) {
                    onAddFilter({ type: filterConfig.key, value: v, icon: filterConfig.icon });
                  }
                }}
              />
            )}

            {filterConfig.type === "location" && (
              <LocationFilter
                filterKey={filterConfig.key}
                placeholder={filterConfig.placeholder}
                options={filterConfig.options}
                activeFilters={activeFilters}
                onAddFilter={onAddFilter}
                onRemoveFilter={onRemoveFilter}
                onUpdateModifier={updateFilterModifier}
                hasRadius={filterConfig.hasRadius}
              />

            )}
            {(filterConfig.type === "role-department" || filterConfig.type === "education") && (
              <MultiSectionFilter
                filterKey={filterConfig.key}
                sections={filterConfig.sections}
                activeFilters={activeFilters}
                onAddFilter={onAddFilter}
                onRemoveFilter={onRemoveFilter}
                onUpdateModifier={updateFilterModifier}
              />
            )}

            {filterConfig.type === "checkbox-list" && (
              <CheckboxListFilter
                filterKey={filterConfig.key}
                placeholder={filterConfig.placeholder}
                options={filterConfig.options}
                selectedValues={activeFilters}
                onSelect={handleCheckboxSelect}
                hasModifier={filterConfig.hasModifier}
                onUpdateModifier={updateFilterModifier}
                activeFilters={activeFilters}
              />
            )}
          </FilterSection>
        ))}
      </div>

      <div className="sticky bottom-0 bg-white p-4 space-y-3 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {hasSearched ? (
          <>
            <button
              onClick={onSaveSearch}
              className="w-full bg-blue-600 text-white py-2 rounded-full font-medium hover:bg-blue-700 transition-all duration-200"
            >
              Save This Search
            </button>
            <button
              onClick={onLoadSearch}
              className="w-full bg-white text-blue-700 py-1.5 rounded-full font-medium border-2 border-blue-700 hover:border-blue-800 transition-all duration-200"
            >
              Load Past Search
            </button>
          </>
        ) : (
          <button
            onClick={onLoadSearch}
            className="w-full bg-blue-600 text-white py-2 rounded-full font-medium hover:bg-blue-700 transition-all duration-200"
          >
            Load Past Search
          </button>
        )}
      </div>
    </div>
  );
}