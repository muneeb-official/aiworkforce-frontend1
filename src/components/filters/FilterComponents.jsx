import { useState } from "react";

// Chevron Icons
const ChevronRight = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronDown = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const SettingsIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Collapsible Filter Section - Styled like reference
export const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="rounded-lg mb-3 overflow-hidden bg-[#F4F5FB]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:transition-all duration-200"
      >
        <span className="font-medium text-gray-800">{title}</span>
        <span className={`transition-transform duration-200 text-blue-500 ${isOpen ? "rotate-90" : "rotate-180"}`}>
          <ChevronRight />
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-1">
          {children}
        </div>
      </div>
    </div>
  );
};
// Text Input Filter
export const TextInput = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
  />
);

// Select Dropdown
export const SelectInput = ({ options, value, onChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white pr-8 transition-all duration-200"
    >
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>
);

// Expandable List Item with Checkbox
export const ExpandableListItem = ({ item, onToggle, isSelected }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div>
      <div className="flex items-center gap-1 py-1.5 bg-[#F4F5FB]  hover:bg-gray-50 rounded-lg px-2 transition-colors duration-150">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0.5 bg-[#F4F5FB] hover:bg-gray-100 rounded transition-colors duration-150"
        >
          <ChevronRight className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
        </button>
        <label className="flex items-center gap-2 flex-1 cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(item.name)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors duration-150"
          />
          <span className="text-sm text-gray-700">
            {item.name} {item.count && <span className="text-gray-400">({item.count})</span>}
          </span>
        </label>
        <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-150">
          <SettingsIcon className="text-gray-400" />
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
        isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        {item.children && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children.map((child, idx) => (
              <label key={idx} className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">{child}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Checkbox List Item
export const CheckboxListItem = ({ item, onToggle, isSelected }) => (
  <div className="flex items-center gap-2 py-1.5 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-150">
    <label className="flex items-center gap-2 flex-1 cursor-pointer">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(item.name)}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{item.name}</span>
    </label>
    <button className="p-1 hover:bg-gray-100 rounded transition-colors duration-150">
      <SettingsIcon className="text-gray-400" />
    </button>
  </div>
);

// Radius Slider
export const RadiusSlider = ({ value, onChange }) => {
  const marks = [0, 25, 50, 75, 100];
  
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-gray-700">Radius (mi)</span>
        <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-400 cursor-help">?</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between mt-1">
        {marks.map((mark) => (
          <span key={mark} className="text-xs text-blue-500 font-medium">{mark}</span>
        ))}
      </div>
    </div>
  );
};