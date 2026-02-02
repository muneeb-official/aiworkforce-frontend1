// pages/CampaignManager.jsx
import { useState } from "react";
import { ProfileCard } from "../../components/profiles/ProfileComponents";
import CampaignManagerModals from "../../components/campaigns/CampaignManagerModals";
import WorkflowBuilder from "../../components/workflow/WorkflowBuilder";

// Sample campaigns data
const SAMPLE_CAMPAIGNS = {
  active: [
    { id: 1, name: "New Campaign", prospects: "12/73,98,12,123", progress: 2, engaged: 0, replied: 0, status: "running", source: "B2C", createdAt: "23 December, 2025" },
    { id: 2, name: "New Campaign", prospects: "12/73,98,12,123", progress: 2, engaged: 0, replied: 0, status: "paused", source: "B2B", createdAt: "23 December, 2025" },
    { id: 3, name: "Project Manager in UK", prospects: null, progress: null, engaged: null, replied: null, status: "draft", source: "B2C", createdAt: "23 December, 2025" },
    { id: 4, name: "Potential candidates", prospects: null, progress: null, engaged: null, replied: null, status: "draft", source: "organic", createdAt: "23 December, 2025" },
  ],
  completed: [
    { id: 5, name: "New Campaign", prospects: "498/498", progress: 100, engaged: 15, replied: 8, status: "done", source: "B2C", createdAt: "20 October, 2025", leadsGenerated: 498 },
    { id: 6, name: "New Campaign", prospects: "498/498", progress: 100, engaged: 12, replied: 5, status: "done", source: "B2B", createdAt: "20 September, 2025", leadsGenerated: 498 },
    { id: 7, name: "New Campaign", prospects: "498/498", progress: 100, engaged: 20, replied: 10, status: "done", source: "organic", createdAt: "20 August, 2025", leadsGenerated: 498 },
    { id: 8, name: "New Campaign", prospects: "498/498", progress: 100, engaged: 18, replied: 7, status: "done", source: "B2C", createdAt: "20 July, 2025", leadsGenerated: 498 },
    { id: 9, name: "New Campaign", prospects: "498/498", progress: 100, engaged: 22, replied: 12, status: "done", source: "B2B", createdAt: "20 June, 2025", leadsGenerated: 498 },
  ],
};

// Sample leads for campaign details
const SAMPLE_LEADS = [
  { id: 1, name: "Beatriz Strickland", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123", "+44 - 456 78 901"], emails: ["radio@helicopter.com"], isEnriched: true },
  { id: 2, name: "Sylvester Matthews", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: true },
  { id: 3, name: "Louella Mullins", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: false },
  { id: 4, name: "Michael Burke", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: true },
  { id: 5, name: "Donna Prince", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: true },
  { id: 6, name: "Thomas Burke", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: false },
  { id: 7, name: "Hank Terrell", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: false },
  { id: 8, name: "Shirley Burke", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: true },
  { id: 9, name: "Maribel Poole", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: false },
  { id: 10, name: "Will Black", title: "Accountant", company: "CHC Helicopter", location: "Greater New York City Area", industry: "Marketing & Advertising", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face", website: "chchelicopter.com", phones: ["+44 - 123 34 123"], emails: ["radio@helicopter.com"], isEnriched: false },
];

// Source Badge Component
const SourceBadge = ({ source }) => {
  if (source === "organic") {
    return (
      <div className="w-8 h-8 bg-[#F2F2FF] rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-[#3C49F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
    );
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${source === "B2C" ? "bg-[#1a1a1a]" : "bg-[#1a1a1a]"}`}>
      {source}
    </span>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    running: "text-[#1a1a1a]",
    paused: "text-orange-500",
    draft: "bg-gray-100 text-gray-600 px-4 py-1 rounded-full",
    done: "text-green-600",
  };
  const labels = { running: "In Progress", paused: "Paused", draft: "Draft", done: "Completed" };
  return <span className={`text-sm font-medium ${styles[status]}`}>{labels[status]}</span>;
};

// User Avatar Component
const UserAvatar = ({ initials = "JS" }) => (
  <div className="w-8 h-8 bg-[#3C49F7] rounded-full flex items-center justify-center text-white text-xs font-semibold">
    {initials}
  </div>
);

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState(SAMPLE_CAMPAIGNS);
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);

  // View states
  const [viewingCampaign, setViewingCampaign] = useState(null);
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [selectedLeads, setSelectedLeads] = useState([]);

  // Modal states
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [showEnrichConfirm, setShowEnrichConfirm] = useState(false);
  const [showEnrichingModal, setShowEnrichingModal] = useState(false);
  const [showCannotStartModal, setShowCannotStartModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Tooltip states
  const [showEngagedTooltip, setShowEngagedTooltip] = useState(false);
  const [showRepliedTooltip, setShowRepliedTooltip] = useState(false);

  // Workflow Builder states
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [workflowCampaign, setWorkflowCampaign] = useState(null);

  const currentCampaigns = campaigns[activeTab] || [];
  const unenrichedCount = leads.filter(l => !l.isEnriched).length;

  // Handlers
  const handleCampaignClick = (campaign) => {
    // For running or paused campaigns - do nothing
    if (campaign.status === "running" || campaign.status === "paused") {
      return;
    }

    // For completed and draft campaigns - open leads view
    setViewingCampaign(campaign);
    setSelectedLeads([]);
  };

  const handleBackFromCampaign = () => {
    setViewingCampaign(null);
    setSelectedLeads([]);
  };

  const handleMenuAction = (action, campaign) => {
    setOpenMenuId(null);
    switch (action) {
      case "duplicate":
        const newCampaign = { ...campaign, id: Date.now(), name: `${campaign.name} (Copy)` };
        setCampaigns(prev => ({ ...prev, active: [...prev.active, newCampaign] }));
        break;
      case "pause":
        setCampaigns(prev => ({
          ...prev,
          active: prev.active.map(c => c.id === campaign.id ? { ...c, status: c.status === "paused" ? "running" : "paused" } : c)
        }));
        break;
      case "delete":
        setCampaigns(prev => ({
          ...prev,
          active: prev.active.filter(c => c.id !== campaign.id),
          completed: prev.completed.filter(c => c.id !== campaign.id)
        }));
        break;
      case "share":
        console.log("Share campaign:", campaign);
        break;
    }
  };

  const handleSelectLead = (id) => {
    setSelectedLeads(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleRemoveLead = (lead) => {
    setSelectedLead(lead);
    setShowRemoveConfirm(true);
  };

  const handleConfirmRemove = () => {
    setLeads(prev => prev.filter(l => l.id !== selectedLead.id));
    setShowRemoveConfirm(false);
    setShowRemoveSuccess(true);
  };

  const handleEnrichAll = () => {
    setShowEnrichConfirm(true);
  };

  const handleConfirmEnrichAll = () => {
    setShowEnrichConfirm(false);
    setShowEnrichingModal(true);
    setTimeout(() => {
      setLeads(prev => prev.map(l => ({ ...l, isEnriched: true })));
      setShowEnrichingModal(false);
    }, 2000);
  };

  const handleEnrichLead = (id) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, isEnriched: true } : l));
  };

  // Workflow Builder handler
  const handleStartWorkflow = (campaign = null) => {
  // Check if there are unenriched leads
  const hasUnenriched = leads.some(l => !l.isEnriched);
  if (hasUnenriched) {
    setShowCannotStartModal(true);
    return;
  }
  
  setWorkflowCampaign(campaign || viewingCampaign);
  setShowWorkflowBuilder(true);
};

  // Campaign Details View (Only for completed campaigns)
  if (viewingCampaign) {
    const isCompleted = viewingCampaign.status === "done";
    const totalLeads = viewingCampaign.leadsGenerated || leads.length;

    return (
      <div className="flex-1 min-h-full p-8 overflow-y-auto bg-[#F8F9FC]">
        {/* Back Button */}
        <button onClick={handleBackFromCampaign} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-[32px] font-normal text-[#1a1a1a] font-['DM_Sans']">{viewingCampaign.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-gray-500 text-sm">{viewingCampaign.createdAt}</span>
              {viewingCampaign.status === "done" && (
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  Campaign Ended – 100% Done
                </span>
              )}
              {viewingCampaign.status === "draft" && (
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                  Draft
                </span>
              )}
              <SourceBadge source={viewingCampaign.source} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Leads generated</p>
            <p className="text-[48px] font-semibold text-[#1a1a1a] leading-none">{totalLeads}</p>
          </div>
        </div>

        {/* Results Count & Actions */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">1 - 10 of about {leads.length} results.</p>
          <div className="flex items-center gap-3">
            <button className="text-[#3C49F7] text-sm font-medium hover:underline">Export Leads</button>
            {unenrichedCount > 0 && (
              <button onClick={handleEnrichAll} className="border border-[#3C49F7] text-[#3C49F7] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#F2F2FF]">
                Enrich All {unenrichedCount} Leads
              </button>
            )}
            <button
              onClick={() => handleStartWorkflow()}
              className="bg-[#3C49F7] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#2a35d4]"
            >
              Start Workflow Builder
            </button>
          </div>
        </div>

        {/* Select All */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            className="appearance-none w-[18px] h-[18px] rounded-[6px] border border-gray-300 bg-white hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer checked:bg-blue-600 checked:border-blue-600 checked:after:content-[''] checked:after:block checked:after:w-[6px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white checked:after:rotate-45 checked:after:translate-x-[5px] checked:after:translate-y-[1px]"
            onChange={(e) => setSelectedLeads(e.target.checked ? leads.map(l => l.id) : [])}
            checked={selectedLeads.length === leads.length && leads.length > 0}
          />
          <span className="text-sm text-gray-700">Select All</span>
        </div>

        {/* Leads List */}
        <div className="space-y-2">
          {leads.map(lead => (
            <ProfileCard
              key={lead.id}
              profile={lead}
              isSelected={selectedLeads.includes(lead.id)}
              onSelect={handleSelectLead}
              onEnrich={handleEnrichLead}
              onAddToProject={() => handleRemoveLead(lead)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded hover:bg-gray-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(page => (
              <button key={page} className={`w-8 h-8 rounded text-sm font-medium ${page === 1 ? "bg-[#1a1a1a] text-white" : "text-gray-600 hover:bg-gray-100"}`}>{page}</button>
            ))}
            <button className="p-2 rounded hover:bg-gray-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modals */}
        <CampaignManagerModals
          showRemoveConfirm={showRemoveConfirm}
          setShowRemoveConfirm={setShowRemoveConfirm}
          showRemoveSuccess={showRemoveSuccess}
          setShowRemoveSuccess={setShowRemoveSuccess}
          showEnrichConfirm={showEnrichConfirm}
          setShowEnrichConfirm={setShowEnrichConfirm}
          showEnrichingModal={showEnrichingModal}
          showCannotStartModal={showCannotStartModal}
          setShowCannotStartModal={setShowCannotStartModal}
          onConfirmRemove={handleConfirmRemove}
          onConfirmEnrichAll={handleConfirmEnrichAll}
          leadCount={unenrichedCount}
        />

        {/* Workflow Builder */}
        {showWorkflowBuilder && (
          <WorkflowBuilder
            isOpen={showWorkflowBuilder}
            onClose={() => {
              setShowWorkflowBuilder(false);
              setWorkflowCampaign(null);
            }}
            campaignName={workflowCampaign?.name || viewingCampaign?.name || "New Campaign"}
            entrySource="campaign"
          />
        )}
      </div>
    );
  }

  // Main Campaign List View
  return (
    <div className="flex-1 min-h-full p-8 overflow-y-auto bg-[#F8F9FC]">
      <h1 className="text-[32px] font-normal text-[#1a1a1a] mb-6 font-['DM_Sans']">Campaigns</h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "active" ? "bg-[#1a1a1a] text-white" : "bg-white text-[#1a1a1a] border border-gray-200"
            }`}
        >
          Active ({campaigns.active.length})
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "completed" ? "bg-[#1a1a1a] text-white" : "bg-white text-[#1a1a1a] border border-gray-200"
            }`}
        >
          Completed ({campaigns.completed.length})
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-[#3C49F7]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            Main View
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="bg-[#3C49F7] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#2a35d4]">
            Create Campaign
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-white rounded-t-xl border-b border-gray-100">
        <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm text-gray-500 font-medium">
          <div className="col-span-1 flex items-center">
            <input type="checkbox" className="w-[18px] h-[18px] rounded border border-gray-300" />
          </div>
          <div className="col-span-3">Name</div>
          <div className="col-span-1 relative flex items-center gap-1">
            Engaged
            <button
              onMouseEnter={() => setShowEngagedTooltip(true)}
              onMouseLeave={() => setShowEngagedTooltip(false)}
              className="text-[#3C49F7]"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
            {showEngagedTooltip && (
              <div className="absolute top-full left-0 mt-1 bg-[#1a1a1a] text-white text-xs p-2 rounded-lg w-48 z-10">
                Contacted prospects who interacted with your outreach, such as opening emails, clicking links or accepting your connection request
              </div>
            )}
          </div>
          <div className="col-span-1 relative flex items-center gap-1">
            Replied
            <button
              onMouseEnter={() => setShowRepliedTooltip(true)}
              onMouseLeave={() => setShowRepliedTooltip(false)}
              className="text-[#3C49F7]"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
            {showRepliedTooltip && (
              <div className="absolute top-full left-0 mt-1 bg-[#1a1a1a] text-white text-xs p-2 rounded-lg w-48 z-10">
                Contacted prospects who replied to your outreach via email or LinkedIn
              </div>
            )}
          </div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Source</div>
          <div className="col-span-2">Created At</div>
          <div className="col-span-1"></div>
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-white rounded-b-xl">
        {currentCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className={`grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-50 items-center ${campaign.status === "done" || campaign.status === "draft" ? "hover:bg-gray-50 cursor-pointer" : ""
              }`}
            onClick={() => handleCampaignClick(campaign)}
          >
            <div className="col-span-1" onClick={(e) => e.stopPropagation()}>
              <input type="checkbox" className="w-[18px] h-[18px] rounded border border-gray-300" />
            </div>
            <div className="col-span-3">
              <div className="flex items-center gap-2">
                {campaign.status === "running" && (
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="font-medium text-[#1a1a1a] truncate">{campaign.name}</span>
                {campaign.prospects && <span className="text-gray-500 text-sm">Prospects: {campaign.prospects}</span>}
              </div>
              {campaign.progress !== null && (
                <div className="mt-2">
                  <div className="h-1.5 bg-gray-200 rounded-full w-48 overflow-hidden">
                    <div className="h-full bg-[#3C49F7] rounded-full" style={{ width: `${campaign.progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{campaign.progress}% – {campaign.status === "done" ? "Completed" : "In Progress"}</p>
                </div>
              )}
            </div>
            <div className="col-span-1 text-sm">
              {campaign.engaged !== null ? (
                <span>{campaign.engaged}% <span className="text-orange-500">{campaign.engaged}</span></span>
              ) : null}
            </div>
            <div className="col-span-1 text-sm">
              {campaign.replied !== null ? (
                <span>{campaign.replied}% <span className="text-orange-500">{campaign.replied}</span></span>
              ) : null}
            </div>
            <div className="col-span-1 flex items-center gap-2">
              <StatusBadge status={campaign.status} />
              {(campaign.status === "done" || campaign.status === "draft") && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewingCampaign(campaign);
                    setSelectedLeads([]);
                  }}
                  className="text-[#3C49F7] text-xs font-medium hover:underline"
                >
                
                </button>
              )}
            </div>
            <div className="col-span-1">
              <SourceBadge source={campaign.source} />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <UserAvatar />
              <span className="text-sm text-gray-600">{campaign.createdAt}</span>
            </div>
            <div className="col-span-1 relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setOpenMenuId(openMenuId === campaign.id ? null : campaign.id)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              {openMenuId === campaign.id && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[140px]">
                  <button onClick={() => handleMenuAction("duplicate", campaign)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Duplicate
                  </button>
                  <button onClick={() => handleMenuAction("share", campaign)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    Share
                  </button>
                  {campaign.status !== "draft" && campaign.status !== "done" && (
                    <button onClick={() => handleMenuAction("pause", campaign)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {campaign.status === "paused" ? "Resume" : "Pause"}
                    </button>
                  )}
                  <button onClick={() => handleMenuAction("delete", campaign)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modals for main view */}
      <CampaignManagerModals
        showRemoveConfirm={showRemoveConfirm}
        setShowRemoveConfirm={setShowRemoveConfirm}
        showRemoveSuccess={showRemoveSuccess}
        setShowRemoveSuccess={setShowRemoveSuccess}
        showEnrichConfirm={showEnrichConfirm}
        setShowEnrichConfirm={setShowEnrichConfirm}
        showEnrichingModal={showEnrichingModal}
        showCannotStartModal={showCannotStartModal}
        setShowCannotStartModal={setShowCannotStartModal}
        onConfirmRemove={handleConfirmRemove}
        onConfirmEnrichAll={handleConfirmEnrichAll}
        leadCount={unenrichedCount}
      />

      {/* Workflow Builder */}
      {showWorkflowBuilder && (
        <WorkflowBuilder
          isOpen={showWorkflowBuilder}
          onClose={() => {
            setShowWorkflowBuilder(false);
            setWorkflowCampaign(null);
          }}
          campaignName={workflowCampaign?.name || "New Campaign"}
          entrySource="campaign"
        />
      )}
    </div>
  );
};

export default CampaignManager;