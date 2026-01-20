// // components/filters/FilterComponents.jsx
// import { useState } from "react";

// // ✅ Updated Icons: Slightly thinner stroke for elegance
// // const ChevronRight = ({ className = "" }) => (
// //   <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
// //     <path d="M9 18l6-6-6-6" />
// //   </svg>
// // );
// const ChevronLeft = ({ className = "" }) => (
//   <svg
//     className={className}
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path d="M15 18l-6-6 6-6" />
//   </svg>
// );

// const ChevronDown = ({ className = "" }) => (
//   <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M6 9l6 6 6-6" />
//   </svg>
// );

// const SettingsIcon = ({ className = "" }) => (
//   <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );

// // ✅ FILTER SECTION — Now matches prototype background & spacing
// export const FilterSection = ({ title, children, defaultOpen = false }) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);

//   return (
//     <div className="rounded-xl mb-4 overflow-hidden bg-white border border-[#E2E4F0] shadow-sm">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-[#F4F5FB] transition-colors duration-150"
//       >
//         <span className="font-medium text-[#333333]">{title}</span>
//         <span className={`transition-transform duration-200 text-[#6C63FF] ${isOpen ? "-rotate-90" : "rotate-180"}`}>
//           <ChevronLeft />
//         </span>
//       </button>
//       <div
//         className={`overflow-hidden transition-all duration-250 ease-in-out ${
//           isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="px-4 pb-4 pt-2">{children}</div>
//       </div>
//     </div>
//   );
// };

// // ✅ TEXT INPUT — Updated border, focus ring, radius
// export const TextInput = ({ placeholder, value, onChange, onKeyDown }) => (
//   <input
//     type="text"
//     placeholder={placeholder}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     onKeyDown={onKeyDown}
//     className="w-full px-3 py-2.5 border border-[#D1D5DB] rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#6C63FF] focus:border-[#6C63FF] transition-colors"
//   />
// );

// // ✅ SELECT INPUT
// export const SelectInput = ({ options, value, onChange }) => (
//   <div className="relative">
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-full px-3 py-2.5 pr-8 border border-[#D1D5DB] rounded-lg text-sm text-[#333333] focus:outline-none focus:ring-1 focus:ring-[#6C63FF] focus:border-[#6C63FF] appearance-none bg-white transition-colors"
//     >
//       {options.map((opt, idx) => (
//         <option key={idx} value={opt}>{opt}</option>
//       ))}
//     </select>
//     <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
//   </div>
// );

// // ✅ EXPANDABLE LIST ITEM — Clean hover, consistent bg
// export const ExpandableListItem = ({ item, onToggle, isSelected }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div>
//       <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-[#F4F5FB] transition-colors">
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="p-0.5 rounded hover:bg-white transition-colors"
//         >
//           <ChevronLeft className={`text-[#94A3B8] transition-transform ${isExpanded ? "-rotate-90" : ""}`} />
//         </button>
//         <label className="flex items-center gap-2 flex-1 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={isSelected}
//             onChange={() => onToggle(item.name)}
//             className="w-4 h-4 rounded border-[#D1D5DB] text-[#6C63FF] focus:ring-[#6C63FF]"
//           />
//           <span className="text-sm text-[#333333]">
//             {item.name} {item.count && <span className="text-[#94A3B8]">({item.count})</span>}
//           </span>
//         </label>
//         <button className="p-1 rounded hover:bg-white transition-colors">
//           <SettingsIcon className="text-[#94A3B8]" />
//         </button>
//       </div>
//       <div className={`overflow-hidden transition-all duration-200 ${
//         isExpanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
//       }`}>
//         {item.children && (
//           <div className="ml-8 space-y-1">
//             {item.children.map((child, idx) => (
//               <label key={idx} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-[#F4F5FB] cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 rounded border-[#D1D5DB] text-[#6C63FF] focus:ring-[#6C63FF]"
//                 />
//                 <span className="text-sm text-[#475569]">{child}</span>
//               </label>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ✅ CHECKBOX LIST ITEM
// export const CheckboxListItem = ({ item, onToggle, isSelected }) => (
//   <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-[#F4F5FB] transition-colors">
//     <label className="flex items-center gap-2 flex-1 cursor-pointer">
//       <input
//         type="checkbox"
//         checked={isSelected}
//         onChange={() => onToggle(item.name)}
//         className="w-4 h-4 rounded border-[#D1D5DB] text-[#6C63FF] focus:ring-[#6C63FF]"
//       />
//       <span className="text-sm text-[#333333]">{item.name}</span>
//     </label>
//     <button className="p-1 rounded hover:bg-white transition-colors">
//       <SettingsIcon className="text-[#94A3B8]" />
//     </button>
//   </div>
// );

// // ✅ RADIUS SLIDER — Updated track & thumb
// export const RadiusSlider = ({ value, onChange }) => {
//   const marks = [0, 25, 50, 75, 100];

//   return (
//     <div className="mt-4">
//       <div className="flex items-center gap-2 mb-2">
//         <span className="text-sm font-medium text-[#333333]">Radius (mi)</span>
//         <span className="w-4 h-4 rounded-full border border-[#D1D5DB] flex items-center justify-center text-xs text-[#94A3B8] cursor-help">?</span>
//       </div>
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={value}
//         onChange={(e) => onChange(Number(e.target.value))}
//         className="w-full h-1.5 bg-[#E2E4F0] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#6C63FF]"
//       />
//       <div className="flex justify-between mt-1">
//         {marks.map((mark) => (
//           <span key={mark} className="text-xs text-[#6C63FF] font-medium">{mark}</span>
//         ))}
//       </div>
//     </div>
//   );
// };