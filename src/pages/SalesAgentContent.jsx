// pages/SalesAgentContent.jsx
import { useState } from "react";
import SearchFiltersPanel from "../components/sales/SearchFiltersPanel";
import { footerLinks } from "../data/salesAgentData";
import logo from "../assets/Logo.png";

const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
    </svg>
);

export default function SalesAgentContent() {
    const [searchType, setSearchType] = useState("individual");
    const [searchQuery, setSearchQuery] = useState("");

    return (
    <div className="relative flex flex-col bg-transparent h-full">
        <div className="absolute w-full h-full flex flex-1 overflow-hidden gap-2">
            {/* Filter Panel */}
            <div className="flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm">
                {/* Search Type Toggle */}
                <div className="p-4">
                    <div className="inline-flex bg-gray-100 rounded-full p-1">
                        <button
                            onClick={() => setSearchType("individual")}
                            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${searchType === "individual"
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            Individual Search
                        </button>
                        <button
                            onClick={() => setSearchType("bulk")}
                            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${searchType === "bulk"
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "text-gray-600 hover:text-gray-800"
                                }`}
                        >
                            Bulk Search
                        </button>
                    </div>
                </div>

                <SearchFiltersPanel searchType={searchType} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm">
                {/* Search Content */}
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center max-w-xl">
                        {/* Logo - Same as header */}
                        <div className="flex items-center justify-center gap-0 mb-6">
                            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
                            <div className="text-left">
                                <div className="font-bold text-2xl text-gray-800">AI workforce</div>
                                <div className="text-gray-500">Create an AI employee</div>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-bold text-gray-800 mb-8">
                            Tell us what you are looking for
                        </h1>

                        {/* Search Bar */}
                        <div className="flex items-center bg-white rounded shadow-sm border border-gray-900 overflow-hidden">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='e.g. LinkedIn URL, Job Title, Location, Skills, Years of Experience, Company etc."'
                                className="flex-1 px-6 py-4 text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
                            />
                            <button className="bg-gray-900 text-white px-5 py-4 m-0 rounded hover:bg-gray-800 transition-colors">
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-gray-100 px-6 py-4 flex items-center justify-between rounded-b-2xl">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
                        <span>© 2025 aiworkforce.co.uk</span>
                    </div>
                    <nav className="flex items-center gap-6">
                        {footerLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>
                </footer>
            </div>
        </div>
    </div>
);
}
