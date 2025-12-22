import { useState } from "react";
import {
  FilterSection,
  TextInput,
  SelectInput,
  ExpandableListItem,
  CheckboxListItem,
  RadiusSlider,
} from "../filters/FilterComponents";
import {
  locationData,
  departmentData,
  managementLevels,
  educationMajors,
  degreeTypes,
  preferredContactMethods,
} from "../../data/salesAgentData";

export default function SearchFiltersPanel({ searchType = "individual" }) {
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    description: "",
    preferredContact: "- Preferred Contact -",
    occupation: "",
    companyName: "",
    school: "",
    degree: "",
    major: "",
    jobTitle: "",
    department: "",
    radius: 0,
  });
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSelection = (setter, current, item) => {
    setter(current.includes(item) 
      ? current.filter(i => i !== item) 
      : [...current, item]
    );
  };

  const clearFilters = () => {
    setFilters({
      name: "", location: "", description: "", preferredContact: "- Preferred Contact -",
      occupation: "", companyName: "", school: "", degree: "", major: "", jobTitle: "", department: "", radius: 0,
    });
    setSelectedLocations([]);
    setSelectedDepartments([]);
    setSelectedLevels([]);
    setSelectedMajors([]);
    setSelectedDegrees([]);
  };

  const isIndividual = searchType === "individual";

  return (
    <div className="w-80 bg-white border-r border-gray-100 flex flex-col ">
      {/* Header */}
<div className="p-4">
  <div className="flex justify-between items-center">
    <h3 className="font-semibold text-gray-800">Search Filters</h3>
    <button 
      onClick={clearFilters}
      className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
    >
      Clear Filter
    </button>
  </div>
</div>

      {/* Scrollable Filters */}
      <div className="flex-1 overflow-auto px-4">
        {isIndividual ? (
          <>
            {/* Individual Search Filters */}
            <FilterSection title="Name" >
              <TextInput
                placeholder="Enter Name..."
                value={filters.name}
                onChange={(v) => handleFilterChange("name", v)}
              />
            </FilterSection>

            <FilterSection title="Location" >
              <TextInput
                placeholder="Enter Location..."
                value={filters.location}
                onChange={(v) => handleFilterChange("location", v)}
              />
              <div className="mt-3 max-h-64 overflow-auto space-y-1">
                {locationData.map((loc) => (
                  <ExpandableListItem
                    key={loc.name}
                    item={loc}
                    isSelected={selectedLocations.includes(loc.name)}
                    onToggle={(name) => toggleSelection(setSelectedLocations, selectedLocations, name)}
                  />
                ))}
              </div>
              <RadiusSlider
                value={filters.radius}
                onChange={(v) => handleFilterChange("radius", v)}
              />
            </FilterSection>

            <FilterSection title="Description">
              <TextInput
                placeholder="Enter LinkedIn Url or Keyword here.."
                value={filters.description}
                onChange={(v) => handleFilterChange("description", v)}
              />
            </FilterSection>
          </>
        ) : (
          <>
            {/* Bulk Search Filters */}
            <FilterSection title="Preffered Contact Method" >
              <SelectInput
                options={preferredContactMethods}
                value={filters.preferredContact}
                onChange={(v) => handleFilterChange("preferredContact", v)}
              />
            </FilterSection>

            <FilterSection title="Location">
              <TextInput
                placeholder="Enter Location..."
                value={filters.location}
                onChange={(v) => handleFilterChange("location", v)}
              />
              <div className="mt-3 max-h-48 overflow-auto space-y-1">
                {locationData.map((loc) => (
                  <ExpandableListItem
                    key={loc.name}
                    item={loc}
                    isSelected={selectedLocations.includes(loc.name)}
                    onToggle={(name) => toggleSelection(setSelectedLocations, selectedLocations, name)}
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Occupation">
              <FilterSection title="Role & Department" >
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Job Title</label>
                    <TextInput
                      placeholder="Enter Job Title..."
                      value={filters.jobTitle}
                      onChange={(v) => handleFilterChange("jobTitle", v)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Department</label>
                    <TextInput
                      placeholder="Enter Department..."
                      value={filters.department}
                      onChange={(v) => handleFilterChange("department", v)}
                    />
                  </div>
                  <div className="max-h-48 overflow-auto space-y-1">
                    {departmentData.map((dept) => (
                      <ExpandableListItem
                        key={dept.name}
                        item={dept}
                        isSelected={selectedDepartments.includes(dept.name)}
                        onToggle={(name) => toggleSelection(setSelectedDepartments, selectedDepartments, name)}
                      />
                    ))}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Management Levels</label>
                    <div className="space-y-1">
                      {managementLevels.map((level) => (
                        <CheckboxListItem
                          key={level.name}
                          item={level}
                          isSelected={selectedLevels.includes(level.name)}
                          onToggle={(name) => toggleSelection(setSelectedLevels, selectedLevels, name)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </FilterSection>
            </FilterSection>

            <FilterSection title="Company Name or Domain">
              <TextInput
                placeholder="Enter Company..."
                value={filters.companyName}
                onChange={(v) => handleFilterChange("companyName", v)}
              />
            </FilterSection>

            <FilterSection title="Education">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Major</label>
                  <TextInput
                    placeholder="Enter Major..."
                    value={filters.major}
                    onChange={(v) => handleFilterChange("major", v)}
                  />
                </div>
                <div className="space-y-1">
                  {educationMajors.map((major) => (
                    <CheckboxListItem
                      key={major.name}
                      item={major}
                      isSelected={selectedMajors.includes(major.name)}
                      onToggle={(name) => toggleSelection(setSelectedMajors, selectedMajors, name)}
                    />
                  ))}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">School</label>
                  <TextInput
                    placeholder="Enter School..."
                    value={filters.school}
                    onChange={(v) => handleFilterChange("school", v)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Degree</label>
                  <TextInput
                    placeholder="Enter Degree..."
                    value={filters.degree}
                    onChange={(v) => handleFilterChange("degree", v)}
                  />
                </div>
                <div className="space-y-1">
                  {degreeTypes.map((degree) => (
                    <CheckboxListItem
                      key={degree.name}
                      item={degree}
                      isSelected={selectedDegrees.includes(degree.name)}
                      onToggle={(name) => toggleSelection(setSelectedDegrees, selectedDegrees, name)}
                    />
                  ))}
                </div>
              </div>
            </FilterSection>

            <FilterSection title="Description">
              <TextInput
                placeholder="Enter LinkedIn Url or Keyword here.."
                value={filters.description}
                onChange={(v) => handleFilterChange("description", v)}
              />
            </FilterSection>
          </>
        )}
      </div>

      {/* Load Past Search Button */}
<div className="p-4">
  <button className="w-full bg-blue-500 text-white py-3 rounded-full font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm">
    Load Past Search
  </button>
</div>
    </div>
  );
}