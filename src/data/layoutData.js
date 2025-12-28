// data/layoutData.js
import { ReactComponent as AnalyticsIcon } from "../assets/icons/analytics.svg";
import { ReactComponent as SalesAgent } from "../assets/icons/salesAgent.svg";
import { ReactComponent as MarketingIcon } from "../assets/icons/marketing.svg";
import { ReactComponent as SupportIcon } from "../assets/icons/support.svg";
import { ReactComponent as TrainIcon } from "../assets/icons/train.svg";
import { ReactComponent as IntegrationIcon } from "../assets/icons/integration.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
// import { ReactComponent as BellIcon } from "../assets/icons/bell.svg";

// Sales Agent Icons
import { ReactComponent as OrganicIcon } from "../assets/icons/organic.svg";
import { ReactComponent as CampaignIcon } from "../assets/icons/campaign.svg";
import { ReactComponent as CalendarIcon } from "../assets/icons/calender.svg";
import { ReactComponent as InboxIcon } from "../assets/icons/inbox1.svg";
import { ReactComponent as CallLogsIcon } from "../assets/icons/call logs.svg";

// Main Navigation Icons Map
export const navIcons = {
  analytics: AnalyticsIcon,
  sales: SalesAgent,
  marketing: MarketingIcon,
  support: SupportIcon,
  train: TrainIcon,
  integration: IntegrationIcon,
  settings: SettingsIcon,
  // bell: BellIcon,
  back: () => (
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
  ),
};

// Sales Agent Icon Map
export const salesIconMap = {
  organic: OrganicIcon,
  campaign: CampaignIcon,
  calendar: CalendarIcon,
  inbox: InboxIcon,
  callLogs: CallLogsIcon,
};

// Icon Component Helper
export const Icon = ({ name, className = "" }) => {
  const IconComponent = navIcons[name];
  
  if (!IconComponent) return null;
  
  // Handle inline SVG (like back button)
  if (typeof IconComponent === 'function') {
    return <span className={className}>{IconComponent()}</span>;
  }
  
  // Handle imported SVG components
  return (
    <span className={className}>
      <IconComponent width="20" height="20" />
    </span>
  );
};

// Sales Icon Component Helper
export const SalesIcon = ({ name, className = "" }) => {
  const IconComponent = salesIconMap[name];
  
  if (!IconComponent) return null;
  
  return (
    <span className={className}>
      <IconComponent width="20" height="20" />
    </span>
  );
};