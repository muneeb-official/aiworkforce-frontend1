// components/sales/SearchFiltersPanel.jsx
import { useState, useRef, useEffect } from "react";
import { FilterTag } from "../common/CommonComponents";

// Icons
// const ChevronRight = ({ className = "" }) => (
//   <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M9 18l6-6-6-6" />
//   </svg>
// );
const ChevronLeft = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);


const ChevronDown = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const FilterIcon = ({ className = "" }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="8" x2="20" y2="8" />
    <line x1="4" y1="16" x2="20" y2="16" />
    <circle cx="8" cy="8" r="2" fill="none" />
    <circle cx="16" cy="16" r="2" fill="none" />
  </svg>
);

// Filter Section Component
const FilterSection = ({ title, count, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-1 text-left hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-800">{title}</span>
          {count > 0 && (
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        <span className={`transition-transform duration-200 text-blue-500 ${isOpen ? "-rotate-90" : ""}`}>
          <ChevronLeft />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
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
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
                className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                    isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"
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

              {/* Modifier Button */}
              {hasModifier && isSelected && (
                <div className="relative" ref={modifierRef}>
                  <button
                    onClick={() => setShowModifierDropdown(showModifierDropdown === option.id ? null : option.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FilterIcon />
                  </button>

                  {showModifierDropdown === option.id && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase">
                        Apply Modifier
                      </div>
                      <button
                        onClick={() => {
                          onUpdateModifier(selectedFilter.id, "exact");
                          setShowModifierDropdown(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span>Exact</span>
                        {selectedFilter?.modifier === "exact" && (
                          <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          onUpdateModifier(selectedFilter.id, "not");
                          setShowModifierDropdown(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span>Not</span>
                        {selectedFilter?.modifier === "not" && (
                          <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!isSelected && (
                <button className="p-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FilterIcon />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Location Filter with Expandable List (for B2C)
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

  const handleLocationSelect = (locationName) => {
    const isSelected = selectedLocations.includes(locationName);
    if (isSelected) {
      setSelectedLocations((prev) => prev.filter((l) => l !== locationName));
      const filter = activeFilters.find((f) => f.type === filterKey && f.value === locationName);
      if (filter) onRemoveFilter(filter.id);
    } else {
      setSelectedLocations((prev) => [...prev, locationName]);
      onAddFilter({ type: filterKey, value: locationName, icon: "location" });
    }
  };

  const toggleExpand = (name) => {
    setExpandedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleModifierSelect = (locationName, modifier) => {
    const filter = activeFilters.find((f) => f.type === filterKey && f.value === locationName);
    if (filter && onUpdateModifier) {
      onUpdateModifier(filter.id, modifier);
    }
    setShowModifierDropdown(null);
  };

  const marks = [0, 25, 50, 75, 100];

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-all duration-200"
      />
      <div className="mt-3 max-h-64 overflow-auto space-y-1">
        {options
          .filter((loc) => loc.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((loc) => {
            const isSelected = selectedLocations.includes(loc.name);
            const selectedFilter = activeFilters.find(
              (f) => f.type === filterKey && f.value === loc.name
            );

            return (
              <div key={loc.name}>
                <div className="flex items-center gap-2 py-1.5 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-150 group">
                  <button
                    onClick={() => toggleExpand(loc.name)}
                    className="p-0.5 hover:bg-gray-100 rounded transition-colors duration-150"
                  >
                    <ChevronLeft
                      className={`text-gray-400 transition-transform duration-200 ${
                        expandedItems[loc.name] ? "-rotate-90" : ""
                      }`}
                    />
                  </button>
                  <label className="flex items-center gap-2 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleLocationSelect(loc.name)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      {loc.name} {loc.count && <span className="text-gray-400">({loc.count})</span>}
                    </span>
                  </label>
                  
                  {/* Filter/Modifier Button */}
                  <div className="relative" ref={isSelected ? modifierRef : null}>
                    <button 
                      onClick={() => {
                        if (isSelected) {
                          setShowModifierDropdown(showModifierDropdown === loc.name ? null : loc.name);
                        }
                      }}
                      className={`p-1 rounded transition-colors duration-150 ${
                        isSelected 
                          ? "hover:bg-gray-100 text-gray-500" 
                          : "text-gray-300 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <FilterIcon className="w-4 h-4" />
                    </button>

                    {/* Modifier Dropdown */}
                    {isSelected && showModifierDropdown === loc.name && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase">
                          Apply Modifier
                        </div>
                        <button
                          onClick={() => handleModifierSelect(loc.name, "exact")}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <span>Exact</span>
                          {selectedFilter?.modifier === "exact" && (
                            <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleModifierSelect(loc.name, "not")}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <span>Not</span>
                          {selectedFilter?.modifier === "not" && (
                            <svg className="w-4 h-4 text-blue-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Children */}
                {expandedItems[loc.name] && loc.children && (
                  <div className="ml-8 mt-1 space-y-1">
                    {loc.children.map((child, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={() => onAddFilter({ type: filterKey, value: child, icon: "location" })}
                        />
                        <span className="text-sm text-gray-600">{child}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Radius Slider - Only show if hasRadius is true */}
      {hasRadius && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Radius (mi)</span>
            <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-400 cursor-help">
              ?
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1">
            {marks.map((mark) => (
              <span key={mark} className="text-xs text-blue-500 font-medium">
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

  // Get filters for current search type
  const currentFilters = config.filters[searchType] || [];
  const getFilterCount = (type) => activeFilters.filter((f) => f.type === type).length;

  // Get updateFilterModifier from context if available (B2B)
  const updateFilterModifier = context?.updateFilterModifier || (() => {});

  return (
    <div className="w-80 bg-white flex flex-col h-full rounded-b-2xl">
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
      <div className="flex-1 overflow-auto px-4">
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

      {/* Action Buttons */}
      <div className="p-4 space-y-3 border-t border-gray-100">
        <button
          onClick={onSaveSearch}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-all duration-200"
        >
          Save This Search
        </button>
        <button
          onClick={onLoadSearch}
          className="w-full bg-white text-gray-700 py-3 rounded-full font-medium border border-gray-200 hover:border-gray-300 transition-all duration-200"
        >
          Load Past Search
        </button>
      </div>
    </div>
  );
}