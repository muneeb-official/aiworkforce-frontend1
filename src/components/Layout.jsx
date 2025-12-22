// components/Layout.jsx
import { useState } from "react";
import { navItems, userData, appInfo } from "../data/mockData";
import { salesAgentNavItems } from "../data/salesAgentData";
import logo from "../assets/Logo.png";
import backgroundImage from "../assets/AI Workforce background.png"

// Main Navigation Icons - Exact match to reference
const navIcons = {
    analytics: () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    ),
    sales: () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <path
                d="M6 12h2v6H6zM10 9h2v9h-2zM14 11h2v7h-2zM18 7h2v11h-2z"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    ),
    marketing: () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M19 7v10c0 1-1 2-3 2H8c-2 0-3-1-3-2V7c0-1 1-2 3-2h8c2 0 3 1 3 2z" />
            <path d="M5 10l-2 1v4l2 1" />
            <path d="M19 10l2 1v4l-2 1" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    support: () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
    ),
    train: () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeWidth="2" />
        </svg>
    ),
    integration: () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
            <path d="M10 7h4M7 10v4M17 10v4M10 17h4" />
        </svg>
    ),
    settings: () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
    ),
    bell: () => (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    ),
};

// Sales Agent Icon Map
const salesIconMap = {
    organic: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="9" cy="9" r="6" />
            <path d="M15 9a6 6 0 0 1 6 6v0a6 6 0 0 1-6 6" />
            <path d="M9 15v6" />
        </svg>
    ),
    campaign: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="9" cy="8" r="4" />
            <path d="M15 8a4 4 0 0 1 4 4v0" />
            <path d="M3 20v-1a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v1" />
        </svg>
    ),
    calendar: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
            <rect x="7" y="14" width="3" height="3" rx="0.5" fill="currentColor" />
        </svg>
    ),
    inbox: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 6L2 7" />
        </svg>
    ),
    callLogs: (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
};

const Icon = ({ name, className = "" }) => {
    const IconComponent = navIcons[name];
    return IconComponent ? (
        <span className={className}>
            <IconComponent />
        </span>
    ) : null;
};

// Main Navigation Item - With circular background
const NavItem = ({ item, isActive, onClick, isExpanded }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-3 px-2 py-1.5 text-left transition-all duration-200 ease-in-out w-full group"
    >
        <span
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isActive
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-200"
                }`}
        >
            <Icon name={item.key} />
        </span>
        {isExpanded && (
            <span
                className={`text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out ${isActive
                        ? "bg-gray-900 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-200"
                    }`}
            >
                {item.name}
            </span>
        )}
    </button>
);

// Sales Agent Navigation Item
const SalesNavItem = ({ item, isActive, onClick, isExpanded }) => {
    const hasShortName = item.shortName;

    return (
        <button
            onClick={onClick}
            className="flex items-center gap-3 px-2 py-1.5 text-left transition-all duration-200 ease-in-out w-full group"
        >
            {hasShortName ? (
                <span
                    className={`flex-shrink-0 text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isActive
                            ? "bg-gray-900 text-white shadow-md"
                            : "bg-white text-gray-600 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100 border-none"
                        }`}
                >
                    {item.shortName}
                </span>
            ) : (
                <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isActive
                            ? "bg-gray-900 text-white shadow-md"
                            : "bg-white text-gray-500 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100 border-none"
                        }`}
                >
                    {salesIconMap[item.icon]}
                </span>
            )}
            {isExpanded && (
                <span
                    className={`text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out ${isActive
                            ? "bg-gray-900 text-white shadow-md"
                            : "bg-white text-gray-700 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100 border-none"
                        }`}
                >
                    {item.name}
                </span>
            )}
        </button>
    );
};

export default function Layout({ children, activePage, setActivePage }) {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [activeSalesTab, setActiveSalesTab] = useState("b2c");

    return (
        // <div className="h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-yellow-100 flex flex-col overflow-hidden">
        <div
            className="h-screen flex flex-col overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >

            {/* Fixed Full-Width Header */}
            <header className="bg-gradient-to-b from-[#DFE3F5] to-[#DFE3F5] flex justify-between items-center px-6 py-3 flex-shrink-0 border-b border-[#DFE3F5] z-10">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                    <div>
                        <div className="font-semibold text-sm text-gray-800">
                            {appInfo.name}
                        </div>
                        <div className="text-xs text-gray-500">{appInfo.tagline}</div>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-900">
                        <span className="text-sm font-semibold text-gray-600 mr-3">
                            {userData.credits} Credits
                        </span>
                        <button className="bg-gray-900 text-white text-sm px-4 py-1.5 rounded-full font-medium hover:bg-gray-800 transition-colors">
                            Buy Credits
                        </button>
                    </div>
                    <button className="bg-white rounded-full p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
                        <Icon name="bell" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                        <img
                            src={userData.avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header>

            {/* Content Area Below Navbar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Fixed Sidebar */}
                <div
                    className="bg-gradient-to-b from-[#DFE3F5] to-[#DFE3F5] flex flex-col py-4 px-3 border-r border-gray-100 flex-shrink-0 transition-all duration-300 ease-in-out"
                    onMouseEnter={() => setSidebarExpanded(true)}
                    onMouseLeave={() => setSidebarExpanded(false)}
                    style={{ width: sidebarExpanded ? "280px" : "72px" }}
                >
                    {/* Back Button - Only show when in sub-pages like Sales */}
                    {activePage === "sales" && (
                        <button
                            onClick={() => setActivePage("analytics")}
                            className="flex items-center px-2 py-1.5 mb-4 transition-all duration-200 ease-in-out w-full group"
                        >
                            <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 group-hover:transition-all duration-200">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </span>
                            {sidebarExpanded && (
                                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap px-0 py-1.5 rounded-full  group-hover:border-gray-300 transition-all duration-200">
                                    Sales Agent
                                </span>
                            )}
                        </button>
                    )}

                    {/* Navigation */}
                    <nav className="flex flex-col gap-1 flex-1">
                        {activePage === "sales" ? (
                            // Sales Agent Navigation
                            <>
                                {salesAgentNavItems.map((item) => (
                                    <SalesNavItem
                                        key={item.key}
                                        item={item}
                                        isActive={activeSalesTab === item.key}
                                        onClick={() => setActiveSalesTab(item.key)}
                                        isExpanded={sidebarExpanded}
                                    />
                                ))}
                            </>
                        ) : (
                            // Main Navigation
                            <>
                                {navItems.map((item, idx) => (
                                    <div
                                        key={item.key}
                                        style={{
                                            marginTop: idx === navItems.length - 1 ? "auto" : 0,
                                        }}
                                    >
                                        <NavItem
                                            item={item}
                                            isActive={activePage === item.key}
                                            onClick={() => setActivePage(item.key)}
                                            isExpanded={sidebarExpanded}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto transition-all duration-300 ease-in-out py-4">
                    <div className="rounded-3xl h-full shadow-sm">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
