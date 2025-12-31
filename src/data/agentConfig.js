// data/agentConfig.js
import { locationData } from "./salesAgentData";
import { basicSearchFilters, advancedSearchFilters, b2bCompaniesData, b2bSavedSearches, b2bProjects } from "./b2bData";
import { profilesData, savedSearches, projects } from "./profilesData";

// B2C Configuration
export const b2cConfig = {
  mode: "b2c",
  title: "Sales Agent",
  searchTypes: [
    { key: "individual", label: "Individual Search" },
    { key: "bulk", label: "Bulk Search" },
  ],
  filters: {
    individual: [
      {
        key: "name",
        title: "Name",
        type: "text",
        placeholder: "Enter Name...",
        icon: "user",
      },
      {
        key: "location",
        title: "Location",
        type: "location",
        placeholder: "Enter Location...",
        icon: "location",
        hasRadius: true,
        options: locationData,
      },
      {
        key: "description",
        title: "Description",
        type: "text",
        placeholder: "Enter LinkedIn Url or Keyword here..",
        icon: "description",
      },
    ],
    bulk: [
      {
        key: "contact",
        title: "Preferred Contact Method",
        type: "select",
        placeholder: "- Preferred Contact -",
        icon: "contact",
        options: ["- Preferred Contact -", "Email", "Phone", "LinkedIn", "Twitter"],
      },
      {
        key: "location",
        title: "Location",
        type: "location",
        placeholder: "Enter Location...",
        icon: "location",
        options: locationData,
      },
      {
        key: "occupation",
        title: "Occupation",
        type: "text",
        placeholder: "Enter Job Title...",
        icon: "briefcase",
      },
      {
  key: "role",
  title: "Role & Department",
  type: "role-department",
  icon: "building",
  sections: {
    jobTitle: {
      label: "Job Title",
      type: "text",
      placeholder: "Enter Job Title...",
    },
    department: {
      label: "Department",
      type: "text-with-options",
      placeholder: "Enter Department...",
      options: [
        { id: 1, label: "C-Suite", count: 23, hasChildren: true },
        { id: 2, label: "Product & Engineering", count: 23, hasChildren: true },
        { id: 3, label: "Finance", count: 23, hasChildren: true },
        { id: 4, label: "HR", count: 23, hasChildren: true },
        { id: 5, label: "Legal", count: 23, hasChildren: true },
        { id: 6, label: "Marketing", count: 23, hasChildren: true },
        { id: 7, label: "Health", count: 23, hasChildren: true },
        { id: 8, label: "Operations", count: 23, hasChildren: true },
        { id: 9, label: "Sales", count: 23, hasChildren: true },
        { id: 10, label: "Education", count: 23, hasChildren: true },
      ],
    },
    managementLevels: {
      label: "Management Levels",
      type: "checkbox-list",
      options: [
        { id: 1, label: "Founder/Owner" },
        { id: 2, label: "C-Level" },
        { id: 3, label: "Vice President" },
        { id: 4, label: "Head" },
        { id: 5, label: "Director" },
        { id: 6, label: "Manager" },
        { id: 7, label: "Senior" },
        { id: 8, label: "Individual Contributor" },
        { id: 9, label: "Entry" },
        { id: 10, label: "Intern" },
        { id: 11, label: "Volunteer" },
      ],
    },
    changedJobsWithin: {
      label: "Changed Jobs Within",
      type: "select",
      placeholder: "Select one...",
      options: ["Select one...", "30 days", "60 days", "90 days", "6 months", "1 year"],
    },
  },
},
      {
        key: "skills",
        title: "Skills",
        type: "text",
        placeholder: "Enter Company...",
        icon: "building",
      },
      {
        key: "experience",
        title: "Years Of Experience",
        type: "text",
        placeholder: "Enter Company...",
        icon: "building",
      },
      {
        key: "company",
        title: "Company Name or Domain",
        type: "text",
        placeholder: "Enter Company...",
        icon: "building",
      },
       {
  key: "education",
  title: "Education",
  type: "education",
  icon: "education",
  sections: {
    major: {
      label: "Major",
      type: "text-with-options",
      placeholder: "Enter Major...",
      options: [
        { id: 1, label: "Computer Science" },
        { id: 2, label: "Business Administration" },
        { id: 3, label: "Management" },
        { id: 4, label: "Marketing" },
        { id: 5, label: "Accounting" },
      ],
    },
    school: {
      label: "School",
      type: "text",
      placeholder: "Enter School...",
    },
    degree: {
      label: "Degree",
      type: "text-with-options",
      placeholder: "Enter Degree...",
      options: [
        { id: 1, label: "Bachelors" },
        { id: 2, label: "Masters" },
        { id: 3, label: "Associates" },
        { id: 4, label: "Doctorates" },
        { id: 5, label: "High school" },
      ],
    },
  },
},
      {
        key: "description",
        title: "Description",
        type: "text",
        placeholder: "Enter LinkedIn Url or Keyword here..",
        icon: "description",
      },
    ],
  },
  resultCard: "profile", // Use ProfileCard
  hasEnrichment: true,
  savedSearches: savedSearches,
  projects: projects,
  data: profilesData,
};

// B2B Configuration
export const b2bConfig = {
  mode: "b2b",
  title: "B2B Agent",
  searchTypes: [
    { key: "basic", label: "Basic Search" },
    { key: "advanced", label: "Advance Search" },
  ],
  filters: {
    basic: [
      {
        key: "businessType",
        title: "Business Type",
        type: "checkbox-list",
        placeholder: "What business are you looking for?",
        icon: "building",
        options: basicSearchFilters.businessType.options,
        hasModifier: true,
      },
      {
        key: "location",
        title: "Location",
        type: "checkbox-list",
        placeholder: "Type Location",
        icon: "location",
        options: basicSearchFilters.location.options,
        hasModifier: true,
      },
    ],
    advanced: [
      {
        key: "sicCode",
        title: "SIC Code",
        type: "checkbox-list",
        placeholder: "Enter SIC Code",
        icon: "code",
        options: advancedSearchFilters.sicCode.options,
        hasModifier: true,
      },
      {
        key: "location",
        title: "Location",
        type: "checkbox-list",
        placeholder: "Type Location",
        icon: "location",
        options: advancedSearchFilters.location.options,
        hasModifier: true,
      },
      {
        key: "companyName",
        title: "Company Name (*includes)",
        type: "checkbox-list",
        placeholder: "Enter Company Name",
        icon: "company",
        options: advancedSearchFilters.companyName.options,
        hasModifier: true,
      },
      {
        key: "companyStatus",
        title: "Company Status",
        type: "checkbox-list",
        placeholder: "Select Status",
        icon: "status",
        options: advancedSearchFilters.companyStatus.options,
        hasModifier: true,
      },
      {
        key: "companyType",
        title: "Company Type",
        type: "checkbox-list",
        placeholder: "Select Type",
        icon: "type",
        options: advancedSearchFilters.companyType.options,
        hasModifier: true,
      },
      {
        key: "incorporatedDate",
        title: "Incorporated Date",
        type: "checkbox-list",
        placeholder: "Select Date Range",
        icon: "calendar",
        options: advancedSearchFilters.incorporatedDate.options,
        hasModifier: true,
      },
    ],
  },
  resultCard: "company", // Use CompanyCard
  hasEnrichment: false,
  savedSearches: b2bSavedSearches,
  projects: b2bProjects,
  data: b2bCompaniesData,
};

export const getAgentConfig = (mode) => {
  return mode === "b2b" ? b2bConfig : b2cConfig;
};