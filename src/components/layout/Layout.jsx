// components/Layout.jsx
import { useState, useEffect, useRef } from "react";
import { navItems, userData, appInfo } from "../../data/mockData";
import { salesAgentNavItems } from "../../data/salesAgentData";
import backgroundImage from "../../assets/Background.png";
import Header from "./Header";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import AnalyticsIcon from "../../assets/icons/analytics.svg?react";
import SalesIcon from "../../assets/icons/salesAgent.svg?react";
import MarketingIcon from "../../assets/icons/marketing.svg?react";
import SupportIcon from "../../assets/icons/support.svg?react";
import TrainIcon from "../../assets/icons/train.svg?react";
import IntegrationIcon from "../../assets/icons/integration.svg?react";
import SettingsIcon from "../../assets/icons/settings.svg?react";
import BellIcon from "../../assets/icons/bell.svg?react";
import OrganicIcon from "../../assets/icons/organic.svg?react";
import CampaignIcon from "../../assets/icons/campaign.svg?react";
import CalendarIcon from "../../assets/icons/calender.svg?react";
import InboxIcon from "../../assets/icons/inbox1.svg?react";
import CallLogsIcon from "../../assets/icons/calll-logs.svg?react";
// Marketing Icons - Add these when you have them
// import SEOIcon from "../../assets/icons/seo.svg?react";
// import TemplateIcon from "../../assets/icons/template.svg?react";

import CreditsPage from "../../pages/CreditsPage";
import OrganicLeadBuilder from "../../pages/OrganicLeadBuilder";
import CampaignManager from "../../pages/CampaignManager";
import BlogContentEngine from "../../pages/BlogContentEngine";

const navIcons = {
    analytics: AnalyticsIcon,
    sales: SalesIcon,
    marketing: MarketingIcon,
    support: SupportIcon,
    calander: CalendarIcon,
    inbox: InboxIcon,
    callLogs: CallLogsIcon,
    train: TrainIcon,
    integration: IntegrationIcon,
    settings: SettingsIcon,
    bell: BellIcon,
};

const salesIconMap = {
    organic: <OrganicIcon />,
    campaign: <CampaignIcon />,
};

// Marketing icon map - update when you have actual icons
const marketingIconMap = {
    // seo: <SEOIcon />,
    // template: <TemplateIcon />,
};

const Icon = ({ name, className = "", isActive = false }) => {
    const IconComponent = navIcons[name];
    const activeFilter = isActive ? "brightness-0 invert" : "";

    return IconComponent ? (
        <span className={`${className} ${activeFilter}`}>
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
            <Icon name={item.key} isActive={isActive} />
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

// Marketing Agent Navigation Item
const MarketingNavItem = ({ item, isActive, onClick, isExpanded }) => {
    const hasShortName = item.shortName;
    const hasIcon = item.icon && marketingIconMap[item.icon];

    return (
        <button
            onClick={onClick}
            className="flex items-center gap-3 px-2 py-1.5 text-left transition-all duration-200 ease-in-out w-full group"
        >
            {hasShortName ? (
                <span
                    className={`flex-shrink-0 text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isActive
                        ? "bg-gray-900 text-white shadow-md"
                        : "bg-white text-gray-600 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100"
                        }`}
                >
                    {item.shortName}
                </span>
            ) : hasIcon ? (
                <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isActive
                        ? "bg-gray-900 text-white shadow-md"
                        : "bg-white text-gray-500 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100"
                        }`}
                >
                    {marketingIconMap[item.icon]}
                </span>
            ) : (
                <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${isActive
                        ? "bg-gray-900 text-white shadow-md"
                        : "bg-white text-gray-500 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100"
                        }`}
                >
                    {/* Placeholder icon - replace with actual icon */}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
                    </svg>
                </span>
            )}
            {isExpanded && (
                <span
                    className={`text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-all duration-200 ease-in-out ${isActive
                        ? "bg-gray-900 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 group-hover:border-gray-300 group-hover:bg-gray-100"
                        }`}
                >
                    {item.name}
                </span>
            )}
        </button>
    );
};

export default function Layout({ children, activePage, setActivePage, credits }) {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [previousPage, setPreviousPage] = useState(null);

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

    const displayCredits = credits ?? 0;

    // Check if we're in a sales agent view (B2C, B2B, or Organic)
    const isInSalesAgent = activePage === "b2c" || activePage === "b2b" || activePage === "organic" || activePage === "campaign";

    // Check if we're in marketing agent view
    const isInMarketingAgent = activePage === "seo" || activePage === "template";

    // Check if we're on credits page
    const isOnCreditsPage = activePage === "credits";

    // Check if we're on organic lead builder page
    const isOnOrganicPage = activePage === "organic";

    // Check if we're on SEO/Blog page
    const isOnSEOPage = activePage === "seo";

    // Add this check for Campaign Manager page
    const isOnCampaignPage = activePage === "campaign";

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const navigate = useNavigate();
    const { logout } = useAuth();

    // Handle navigation to credits page
    const handleBuyCreditsClick = () => {
        setPreviousPage(activePage);
        setActivePage("credits");
    };

    // Handle back from credits page
    const handleBackFromCredits = () => {
        setActivePage(previousPage || "b2c");
    };

    // Get sidebar title based on active page
    const getSidebarTitle = () => {
        if (isOnCreditsPage) return "Credits";
        if (isInMarketingAgent) return "Marketing Agent";
        if (isOnOrganicPage) return "Sales Agent";
        if (activePage === "b2b") return "Sales Agent";
        return "Sales Agent";
    };

    // Handle back navigation
    const handleBackClick = () => {
        if (isOnCreditsPage) {
            handleBackFromCredits();
        } else {
            setActivePage("analytics");
        }
    };

    // Handle logout function
    const handleLogout = async () => {
        setIsProfileOpen(false);
        await logout();
        navigate('/login');
    };

    return (
        <div
            className="h-screen w-screen flex flex-col overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Fixed Full-Width Header */}
            <Header
                variant="full"
                credits={displayCredits}
                onBuyCredits={handleBuyCreditsClick}
                onLogoClick={() => setActivePage(previousPage || "b2c")}
                showGetCredits={isOnCreditsPage || displayCredits <= 0}
                userData={userData}
            />

            {/* Content Area Below Navbar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Fixed Sidebar */}
                <div
                    className="bg-gradient-to-b from-[#DFE3F5] to-[#DFE3F5] flex flex-col py-4 px-3 border-r border-gray-100 flex-shrink-0 transition-all duration-300 ease-in-out"
                    onMouseEnter={() => setSidebarExpanded(true)}
                    onMouseLeave={() => setSidebarExpanded(false)}
                    style={{ width: sidebarExpanded ? "280px" : "72px" }}
                >
                    {/* Back Button - Show when in sales agent, marketing agent, or credits page */}
                    {(isInSalesAgent || isInMarketingAgent || isOnCreditsPage) && (
                        <button
                            onClick={handleBackClick}
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
                                    {getSidebarTitle()}
                                </span>
                            )}
                        </button>
                    )}

                    {/* Navigation */}
                    <nav className="flex flex-col flex-1">
                        {isOnCreditsPage ? (
                            // Credits Page Navigation
                            <>
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
                                            B2C Lead Builder Agent
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
                                            B2B Lead Builder Agent
                                        </span>
                                    )}
                                </button>

                                {/* Organic Lead Builder */}
                                <SalesNavItem
                                    item={{ key: "organic", name: "Organic Lead Builder Agent", icon: "organic" }}
                                    isActive={false}
                                    onClick={() => setActivePage("organic")}
                                    isExpanded={sidebarExpanded}
                                />
                            </>
                        ) : isInMarketingAgent ? (
                            // Marketing Agent Navigation
                            <>
                                <div className="my-1.5 mx-2">
                                    <div className="h-px bg-gray-300"></div>
                                </div>

                                {/* SEO - Blog & Content Engine */}
                                <MarketingNavItem
                                    item={{ key: "seo", name: "Blog & Content Engine", shortName: "SEO" }}
                                    isActive={activePage === "seo"}
                                    onClick={() => setActivePage("seo")}
                                    isExpanded={sidebarExpanded}
                                />

                                {/* Template/Brochure Agent */}
                                <MarketingNavItem
                                    item={{ key: "template", name: "Template/ Brochure Agent", icon: "template" }}
                                    isActive={activePage === "template"}
                                    onClick={() => setActivePage("template")}
                                    isExpanded={sidebarExpanded}
                                />
                            </>
                        ) : isInSalesAgent ? (
                            // Sales Agent Navigation (B2C/B2B/Organic)
                            <>
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
                                            B2C Lead Builder Agent
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
                                            B2B Lead Builder Agent
                                        </span>
                                    )}
                                </button>

                                {/* Organic Lead Builder */}
                                <SalesNavItem
                                    item={{ key: "organic", name: "Organic Lead Builder Agent", icon: "organic" }}
                                    isActive={activePage === "organic"}
                                    onClick={() => setActivePage("organic")}
                                    isExpanded={sidebarExpanded}
                                />

                                {/* Campaign Manager */}
                                <SalesNavItem
                                    item={{ key: "campaign", name: "Campaign Manager", icon: "campaign" }}
                                    isActive={activePage === "campaign"}
                                    onClick={() => setActivePage("campaign")}
                                    isExpanded={sidebarExpanded}
                                />
                            </>
                        ) : (
                            // Main Navigation
                            <>
                                {navItems.map((item, idx) => (
                                    <div key={item.key}>
                                        <NavItem
                                            item={item}
                                            isActive={activePage === item.key}
                                            onClick={() => {
                                                if (item.key === "sales") {
                                                    setActivePage("b2c");
                                                } else if (item.key === "marketing") {
                                                    setActivePage("seo");
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
                {/* Main Content */}
                <div className="flex-1 transition-all duration-300 ease-in-out py-0">
                    <div className="rounded-3xl h-full shadow-sm">
                        {isOnCreditsPage ? (
                            <CreditsPage userName={userData.name || "Max"} />
                        ) : isOnOrganicPage ? (
                            <OrganicLeadBuilder />
                        ) : isOnCampaignPage ? (
                            <CampaignManager />
                        ) : isOnSEOPage ? (
                            <BlogContentEngine />
                        ) : activePage === "template" ? (
                            // Placeholder for Template/Brochure Agent
                            <div className="flex items-center justify-center h-full bg-white/50">
                                <div className="text-center">
                                    <h2 className="text-2xl font-semibold text-gray-700">Template/ Brochure Agent</h2>
                                    <p className="text-gray-500 mt-2">Coming Soon</p>
                                </div>
                            </div>
                        ) : (
                            children
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}