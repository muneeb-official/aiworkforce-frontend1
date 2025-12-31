// components/profiles/ProfileComponents.jsx
import { useState } from "react";
import { Checkbox, } from "../common/CommonComponents";
import LinkedInIcon from "../../assets/icons/LinkedIn.png";

// Replace the entire ProfileCard component with this:

export const ProfileCard = ({ profile, isSelected, onSelect, onEnrich, onAddToProject }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRowClick = (e) => {
    if (e.target.closest('button') || e.target.closest('input[type="checkbox"]')) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`rounded-md transition-all duration-200 ${
        isSelected 
          ? "bg-white " 
          : isExpanded 
            ? "bg-white border border-blue-600" 
            : "bg-white hover:bg-[#F2F2FF] hover:shadow-md"
      }`}
    >
      {/* Main Row - Clickable */}
      <div
        className="p-2 cursor-pointer z-[100]"
        onClick={handleRowClick}
      >
        <div className="flex items-center gap-4">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(profile.id)}
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
            onClick={(e) => e.stopPropagation()}
          />
{/* <input
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
/> */}
          {/* Avatar */}
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-[70px] h-[70px] rounded-full object-cover border-2 border-gray-100"
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#000000] text-lg">{profile.name}</h3>
            <p className="text-[#000000] font-semibold text-sm">{profile.title}</p>
            <p className="text-[#000000] text-sm">
              {profile.location} • {profile.industry}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* LinkedIn Icon */}
            <a
              href={profile.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 text-white rounded flex items-center justify-center transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={LinkedInIcon} alt="linkedin" className="w-5 h-5" />
            </a>

            {profile.isEnriched ? (
              <div className="flex items-center gap-2 text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Enriched Contact</span>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEnrich(profile.id);
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Enrich Profile
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToProject(profile);
              }}
              className="px-4 py-2 border-2 border-blue-700 text-blue-700 text-sm font-medium rounded-full hover:border-blue-600 hover:bg-gray-50 transition-colors"
            >
              Add to Project
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="mt-2 ml-4 space-y-2">
            {/* Current Position */}
            <div className="flex border-b border-gray-200 pb-3 pl-2 -mb-3">
              <span className="w-24 text-gray-900 text-sm font-bold">Current</span>
              <div className="flex-1 ml-0">
                <p className="text-gray-900 text-sm">
                  • {profile.currentPosition || profile.title} @ {profile.company} 
                  <span className="text-gray-900 ml-2 italic">2022 - Current</span>
                </p>
              </div>
            </div>

            {/* Past Positions */}
            <div className="flex border-b border-gray-200 p-3">
              <span className="w-24 text-gray-900 text-sm font-bold ml-4">Past</span>
              <div className="flex-1 -ml-5">
                {(profile.pastPositions || [
                  { title: "Operating Partner", company: "SCF Partners", years: "2020 - 2022" },
                  { title: "President and CEO", company: "Valaris Limited", years: "2014 - 2020" },
                  { title: "Investment Professional", company: "Apollo Global Management, Inc.", years: "2014 - 2020" }
                ]).map((pos, idx) => (
                  <p key={idx} className="text-gray-800 text-sm">
                    • {pos.title} @ {pos.company}
                    <span className="text-gray-500 ml-2 italic">{pos.years}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="flex border-b border-gray-200 pb-5">
              <span className="w-24 text-gray-900 text-sm font-bold -ml-1.5">Education</span>
              <div className="flex-1 ml-4 ">
                {(profile.education || [
                  { school: "University of Oxford", years: "2010-2013" },
                  { school: "University of Cambridge", years: "2007-2010" },
                  { school: "Lauriston Boys' School", years: "2003-2007" }
                ]).map((edu, idx) => (
                  <p key={idx} className="text-gray-900 text-sm">
                    • {edu.school}
                    <span className="text-gray-500 ml-2 italic">{edu.years}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex ml-2">
              <span className="w-24 text-gray-900 text-sm font-bold">Contact<br></br> Info</span>
              <div className="flex-1 ml-1">
                {profile.isEnriched ? (
                  <>
                    {/* Website */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span className="text-gray-800 text-sm">@ {profile.website || "chchelicopter.com"}</span>
                    </div>
                    {/* Phone */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-800 text-sm">
                        {profile.phones?.join(" , ") || "+44 - 123 34 123 , +44 - 123 34 123 , +44 - 123 34 123 , +44 - 123 34 123"}
                      </span>
                    </div>
                    {/* Email */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div className="flex items-center gap-2">
                        {(profile.emails || ["radio@helicopter.com", "radio@helicopter.com"]).map((email, idx) => (
                          <a key={idx} href={`mailto:${email}`} className="text-blue-600 hover:underline text-sm">
                            {email}{idx < (profile.emails?.length || 2) - 1 ? " ," : ""}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Hidden Website */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <span className="text-gray-800 text-sm">@ chchelicopter.com</span>
                    </div>
                    {/* Hidden Phone */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-800 text-sm">
                        +44 - 123 <span className="text-blue-400 italic">XX XXX</span>
                        <span className="text-blue-500 ml-2 text-xs">+ 3 more</span>
                      </span>
                    </div>
                    {/* Hidden Email */}
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-800 text-sm">
                        xxxxx<span className="text-gray-800">@helicopter.com</span>
                        <span className="text-blue-500 ml-2 text-xs">+ 2 personal emails</span>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* View Less & Credit Info */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setIsExpanded(false)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Less
              </button>
              <span className={`text-sm font-medium ${profile.isEnriched ? 'text-gray-600' : 'text-[#000000]'}`}>
                {profile.isEnriched ? "1 Credit Used" : "1 Credit"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Profile Details Component (Expanded View)
export const ProfileDetails = ({ profile, onCollapse }) => {
  return (
    <div className="space-y-4">
      {/* Current Position */}
      <div className="flex gap-4">
        <span className="text-sm text-gray-500 w-20 flex-shrink-0">Current</span>
        <p className="text-sm text-gray-800">• {profile.current}</p>
      </div>

      {/* Past Positions */}
      <div className="flex gap-4">
        <span className="text-sm text-gray-500 w-20 flex-shrink-0">Past</span>
        <div className="space-y-1">
          {profile.past.map((position, idx) => (
            <p key={idx} className="text-sm text-gray-800">• {position}</p>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="flex gap-4">
        <span className="text-sm text-gray-500 w-20 flex-shrink-0">Education</span>
        <div className="space-y-1">
          {profile.education.map((edu, idx) => (
            <p key={idx} className="text-sm text-gray-800">• {edu}</p>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex gap-4">
        <span className="text-sm text-gray-500 w-20 flex-shrink-0">Contact Info</span>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
            <span className="text-sm text-gray-800">@ {profile.contact.website}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-sm text-gray-800">{profile.contact.phones.join(" , ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 6L2 7" />
            </svg>
            <span className="text-sm text-blue-600">
              {profile.contact.emails.map((email, idx) => (
                <span key={idx}>
                  <a href={`mailto:${email}`} className="hover:underline">{email}</a>
                  {idx < profile.contact.emails.length - 1 && " , "}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Credit Used */}
      <div className="flex justify-end">
        <span className="text-sm text-blue-600 font-medium">1 Credit Used</span>
      </div>
    </div>
  );
};

// Profile List Header
export const ProfileListHeader = ({
  totalResults,
  currentPage,
  itemsPerPage,
  selectedCount,
  isAllSelected,
  onSelectAll,
  excludeInProject,
  onExcludeChange,
  onEnrichAll,
  onAddAllToProject,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <span className="text-[14px] text-[#000000]">
          {startIndex} - {endIndex} of about {totalResults.toLocaleString()} results.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={excludeInProject}
          onChange={(e) => onExcludeChange(e.target.checked)}
          label="Exclude profiles already in project."
        />
      </div>
    </div>
  );
};

// Select All Row
export const SelectAllRow = ({
  isAllSelected,
  selectedCount,
  onSelectAll,
  onEnrichAll,
  onAddAllToProject,
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-lg mb-4">
      <div className="flex items-center gap-3">
        <Checkbox checked={isAllSelected} onChange={onSelectAll} />
        <span className="text-sm text-gray-700">
          Select All
          {selectedCount > 0 && (
            <span className="text-gray-500 ml-2">
              {selectedCount} Selected from this list
            </span>
          )}
        </span>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center gap-3">
          <button
            onClick={onEnrichAll}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Enrich Profile
          </button>
          <button
            onClick={onAddAllToProject}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            Add to Project
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};