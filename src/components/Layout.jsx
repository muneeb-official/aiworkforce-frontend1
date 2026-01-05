// components/Layout.jsx
import { useState, useEffect, useRef } from "react";
import { navItems, userData, appInfo } from "../data/mockData";
import { salesAgentNavItems } from "../data/salesAgentData";
import logo from "../assets/Logo.png";
import backgroundImage from "../assets/Background.png";
import { useSearch } from "../context/SearchContext";
import { useB2BSearch } from "../context/B2BSearchContext";

import AnalyticsIcon from "../assets/icons/analytics.svg?react";
import SalesIcon from "../assets/icons/salesAgent.svg?react";
import MarketingIcon from "../assets/icons/marketing.svg?react";
import SupportIcon from "../assets/icons/support.svg?react";
import TrainIcon from "../assets/icons/train.svg?react";
import IntegrationIcon from "../assets/icons/integration.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import BellIcon from "../assets/icons/bell.svg?react";

import OrganicIcon from "../assets/icons/organic.svg?react";
import CampaignIcon from "../assets/icons/campaign.svg?react";
import CalendarIcon from "../assets/icons/calender.svg?react";
import InboxIcon from "../assets/icons/inbox1.svg?react";
import CallLogsIcon from "../assets/icons/call-logs.svg?react";

import CreditsPage from "../pages/CreditsPage";

const navIcons = {
    analytics: AnalyticsIcon,
    sales: SalesIcon,
    marketing: MarketingIcon,
    support: SupportIcon,
    train: TrainIcon,
    integration: IntegrationIcon,
    settings: SettingsIcon,
    bell: BellIcon,
};

const salesIconMap = {
    organic: <OrganicIcon />,
    campaign: <CampaignIcon />,
    calendar: <CalendarIcon />,
    inbox: <InboxIcon />,
    callLogs: <CallLogsIcon />,
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
    const [previousPage, setPreviousPage] = useState(null); // Track previous page for back navigation

    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get credits from both contexts
    const { credits: b2cCredits } = useSearch();
    const { credits: b2bCredits } = useB2BSearch();

    // Determine which credits to show based on active page
    const displayCredits = activePage === "b2b" ? b2bCredits : b2cCredits;

    // Check if we're in a sales agent view (B2C or B2B)
    const isInSalesAgent = activePage === "b2c" || activePage === "b2b";

    // Check if we're on credits page
    const isOnCreditsPage = activePage === "credits";

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Handle navigation to credits page
    const handleBuyCreditsClick = () => {
        setPreviousPage(activePage); // Store current page before navigating
        setActivePage("credits");
    };

    // Handle back from credits page
    const handleBackFromCredits = () => {
        setActivePage(previousPage || "b2c"); // Go back to previous page or default to b2c
    };

    return (
        <div
            className="h-screen w-screen flex flex-col overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Fixed Full-Width Header */}
            <header className="bg-gradient-to-b from-[#DFE3F5] to-[#DFE3F5] flex justify-between items-center px-4 py-2 h-[62px] flex-shrink-0 border-b border-[#DFE3F5] z-10">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setActivePage(previousPage || "b2c")}
                >
                    <img src={logo} alt="Logo" className="w-[148px] h-[46px] object-contain" />
                </div>

                {/* Right side */}
                <div className="flex items-center h-[42px] gap-4">
                    {/* Show "Get Credits now!" text on credits page */}
                    {isOnCreditsPage && (
                        <span className="text-sm text-gray-600">Get Credits now!</span>
                    )}

                    <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-900">
                        <span className="text-[14px] font-semibold italic text-gray-900 mr-3">
                            {displayCredits} Credits
                        </span>
                        <button
                            onClick={handleBuyCreditsClick}
                            className="bg-gray-900 text-white text-[14px] px-2.5 py-1 rounded-full hover:bg-white hover:text-blue-700 transition-colors"
                        >
                            Buy Credits
                        </button>
                    </div>
                    <button className="bg-white rounded-full p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
                        <Icon name="bell" />
                    </button>
                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setIsProfileOpen((prev) => !prev)}
                            className="w-10 h-10 rounded-full overflow-hidden focus:outline-none"
                        >
                            <img
                                src={userData.avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </button>

                        {/* Dropdown */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg border z-50">
                                <button
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        // navigate to profile
                                    }}
                                >
                                    Profile
                                </button>

                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        // logout logic
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
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
                    {/* Back Button - Show when in sales agent pages OR credits page */}
                    {(isInSalesAgent || isOnCreditsPage) && (
                        <button
                            onClick={() => {
                                if (isOnCreditsPage) {
                                    handleBackFromCredits();
                                } else {
                                    setActivePage("analytics");
                                }
                            }}
                            className="flex items-center px-2 py-1.5 transition-all duration-200 ease-in-out w-full group"
                        >
                            <span className="flex-shrink-0 w-[24px] h-[24px] rounded-full flex items-center justify-center text-gray-400 group-hover:transition-all duration-200">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                >
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </span>
                            {sidebarExpanded && (
                                <span className="text-[18px] font-bold text-gray-900 whitespace-nowrap px-2 py-1.5 rounded-full group-hover:border-gray-300 transition-all duration-200">
                                    {isOnCreditsPage
                                        ? "Credits"
                                        : activePage === "b2b"
                                            ? "B2B Agent"
                                            : "Sales Agent"}
                                </span>
                            )}
                        </button>
                    )}

                    {/* Navigation */}
                    <nav className="flex flex-col flex-1">
                        {isOnCreditsPage ? (
                            // Credits Page - Show minimal sidebar or same as sales
                            <>
                                {/* Divider */}
                                <div className="my-1.5 mx-2">
                                    <div className="h-px bg-gray-300"></div>
                                </div>
                                {/* B2C Button */}
                                <button
                                    onClick={() => setActivePage("b2c")}
                                    className="flex items-center gap-3 px-2 py-1 text-left transition-all duration-200 ease-in-out w-full group"
                                >
                                    <span className="flex-shrink-0 text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 bg-white text-gray-600 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100">
                                        B2C
                                    </span>
                                    {sidebarExpanded && (
                                        <span className="text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out bg-white text-gray-700 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100">
                                            B2C Agent
                                        </span>
                                    )}
                                </button>

                                {/* B2B Button */}
                                <button
                                    onClick={() => setActivePage("b2b")}
                                    className="flex items-center gap-3 px-2 py-1.5 text-left transition-all duration-200 ease-in-out w-full group"
                                >
                                    <span className="flex-shrink-0 text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 bg-white text-gray-600 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100">
                                        B2B
                                    </span>
                                    {sidebarExpanded && (
                                        <span className="text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out bg-white text-gray-700 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100">
                                            B2B Agent
                                        </span>
                                    )}
                                </button>

                                {/* Other Sales Nav Items */}
                                {salesAgentNavItems
                                    .filter((item) => item.key !== "b2c" && item.key !== "b2b")
                                    .map((item) => (
                                        <SalesNavItem
                                            key={item.key}
                                            item={item}
                                            isActive={false}
                                            onClick={() => { }}
                                            isExpanded={sidebarExpanded}
                                        />
                                    ))}
                            </>
                        ) : isInSalesAgent ? (
                            // Sales Agent Navigation (B2C/B2B)
                            <>
                                {/* Divider */}
                                <div className="my-1.5 mx-2">
                                    <div className="h-px bg-gray-300"></div>
                                </div>
                                {/* B2C Button */}
                                <button
                                    onClick={() => setActivePage("b2c")}
                                    className="flex items-center gap-3 px-2 py-1 text-left transition-all duration-200 ease-in-out w-full group"
                                >
                                    <span
                                        className={`flex-shrink-0 text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${activePage === "b2c"
                                            ? "bg-gray-900 text-white shadow-md"
                                            : "bg-white text-gray-600 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100"
                                            }`}
                                    >
                                        B2C
                                    </span>
                                    {sidebarExpanded && (
                                        <span
                                            className={`text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out ${activePage === "b2c"
                                                ? "bg-gray-900 text-white shadow-md"
                                                : "bg-white text-gray-700 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100"
                                                }`}
                                        >
                                            B2C Agent
                                        </span>
                                    )}
                                </button>

                                {/* B2B Button */}
                                <button
                                    onClick={() => setActivePage("b2b")}
                                    className="flex items-center gap-3 px-2 py-1.5 text-left transition-all duration-200 ease-in-out w-full group"
                                >
                                    <span
                                        className={`flex-shrink-0 text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${activePage === "b2b"
                                            ? "bg-gray-900 text-white shadow-md"
                                            : "bg-white text-gray-600 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100"
                                            }`}
                                    >
                                        B2B
                                    </span>
                                    {sidebarExpanded && (
                                        <span
                                            className={`text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out ${activePage === "b2b"
                                                ? "bg-gray-900 text-white shadow-md"
                                                : "bg-white text-gray-700 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100"
                                                }`}
                                        >
                                            B2B Agent
                                        </span>
                                    )}
                                </button>

                                {/* Other Sales Nav Items */}
                                {salesAgentNavItems
                                    .filter((item) => item.key !== "b2c" && item.key !== "b2b")
                                    .map((item) => (
                                        <SalesNavItem
                                            key={item.key}
                                            item={item}
                                            isActive={false}
                                            onClick={() => { }}
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
                                            marginTop: idx === navItems.length - 1 ? 0 : 0,
                                        }}
                                    >
                                        <NavItem
                                            item={item}
                                            isActive={activePage === item.key}
                                            onClick={() => {
                                                if (item.key === "sales") {
                                                    setActivePage("b2c");
                                                } else {
                                                    setActivePage(item.key);
                                                }
                                            }}
                                            isExpanded={sidebarExpanded}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 transition-all duration-300 ease-in-out py-0">
                    <div className="rounded-3xl h-full shadow-sm">
                        {isOnCreditsPage ? (
                            <CreditsPage userName={userData.name || "Max"} />
                        ) : (
                            children
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}