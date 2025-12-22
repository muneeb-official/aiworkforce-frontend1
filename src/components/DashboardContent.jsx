// components/DashboardContent.jsx
import {
  statsCards,
  creditCards,
  todayMeetings,
  weekMeetings,
  userData,
} from "../data/mockData";
import backgroundImage from "../assets/AI Workforce background.png"

// Icon Components for Stats
const icons = {
  envelope: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  ),
  inbox: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 14h6l2 2h4l2-2h6" />
    </svg>
  ),
  percent: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      <circle cx="15" cy="15" r="1.5" fill="currentColor" />
      <path d="M16 8l-8 8" />
    </svg>
  ),
  phone: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  duration: () => (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
};

const Icon = ({ name }) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent /> : null;
};

const StatCard = ({ value, label, iconType }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm">
    <div className="text-amber-500">
      <Icon name={iconType} />
    </div>
    <div className="mt-3">
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-400 mt-1">{label}</div>
    </div>
  </div>
);

const CreditCard = ({ title, used, total }) => (
  <div className="bg-white rounded-xl p-5 border-2 border-blue-100">
    <div className="text-gray-600 font-medium mb-3">{title}</div>
    <div className="flex items-baseline">
      <span className="text-5xl font-bold text-gray-800">{used}</span>
      <span className="text-gray-400 text-lg ml-1">/{total}</span>
    </div>
  </div>
);

const MeetingCard = ({ meeting }) => (
  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex justify-between items-start">
    <div className="flex-1">
      <h3 className="font-semibold text-gray-800">
        {meeting.company}
        {meeting.title && ` – ${meeting.title}`}
      </h3>
      {meeting.description && (
        <p className="text-sm text-gray-500 mt-0.5">{meeting.description}</p>
      )}
      <p className="text-sm text-gray-400 mt-1">{meeting.time}</p>
    </div>
    <button className="text-blue-600 font-medium text-sm border border-transparent hover:border-blue-500 py-2 px-4 rounded-full whitespace-nowrap ml-4 transition-all duration-200">
      {meeting.actionType === "join" ? "Join Meeting" : "Notify Me"}
    </button>
  </div>
);

export default function DashboardContent() {
  return (
    <div
      className="px-8 py-6 h-full overflow-auto bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Hello {userData.name}, below are your insights
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {statsCards.map((card, idx) => (
          <StatCard key={idx} {...card} />
        ))}
      </div>

      {/* Credits Section */}
      <div className="bg-white backdrop-blur-sm rounded-3xl p-6 mb-8">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Your Credits Usage summary, So far!
            </h2>
            <p className="text-sm text-gray-600 font-medium mt-1">
              You have used {userData.creditsUsedPercentage}% of Credits, so
              far!
            </p>
          </div>
          <button className="text-blue-600 font-medium text-sm border border-transparent hover:border-blue-500 py-2 px-4 rounded-full transition-all duration-200">
            Get More Credits
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {creditCards.map((card, idx) => (
            <CreditCard key={idx} {...card} />
          ))}
        </div>
      </div>

      {/* Meetings Today */}
      <div className="bg-white backdrop-blur-sm rounded-3xl p-6 mb-8">
        <div className="flex gap-8">
          <div className="w-1/3">
            <h2 className="text-2xl font-semibold text-gray-800">
              {todayMeetings.length} Meetings Schedule Today
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Here is a list for this week meetings.
            </p>
          </div>
          <div className="flex-1 space-y-3">
            {todayMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
      </div>

      {/* Meetings This Week */}
      <div className="bg-white backdrop-blur-sm rounded-3xl p-6 mb-4">
        <div className="flex gap-8">
          <div className="w-1/3">
            <h2 className="text-2xl font-semibold text-gray-800">
              Meetings Schedule This Week
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Here is a list for this week meetings.
            </p>
          </div>
          <div className="flex-1 space-y-3">
            {weekMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
            View Calendar
          </button>
        </div>
      </div>
    </div>
  );
}