// components/workflow/WorkflowEditorPanels.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight, Play, Info, Plus } from "lucide-react";

// Voice options for call configuration
const VOICE_OPTIONS = [
  { id: "eric", label: "Eric (American English)" },
  { id: "max", label: "Max (American English)" },
  { id: "anna", label: "Anna (American English)" },
  { id: "steve", label: "Steve (Australia)" },
  { id: "kyilye", label: "Kyilye (Australia)" },
  { id: "lily", label: "Lily (British English)" },
];

const LANGUAGE_OPTIONS = ["English", "Spanish", "French", "German"];
const BACKGROUND_AUDIO_OPTIONS = ["Office", "Cafe", "Silent", "Street"];

// Toggle Switch Component
const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`w-11 h-6 rounded-full transition-colors ${enabled ? "bg-[#3C49F7]" : "bg-gray-300"}`}
  >
    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? "translate-x-5" : "translate-x-0.5"}`} />
  </button>
);

// Info Button Component
const InfoButton = ({ tooltip }) => (
  <button className="text-[#3C49F7] hover:text-[#2a35d4]" title={tooltip}>
    <Info className="w-4 h-4" />
  </button>
);

// Collapsible Section
const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <h3 className="text-lg font-semibold text-[#1a1a1a]">{title}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

// Expandable Section (with arrow)
const ExpandableSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <h3 className="text-lg font-semibold text-[#1a1a1a]">{title}</h3>
        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

// Select Dropdown Component
const SelectDropdown = ({ value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-sm text-left bg-white"
      >
        <span className={value ? "text-[#1a1a1a]" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <button
                key={typeof option === "string" ? option : option.id}
                onClick={() => { onChange(typeof option === "string" ? option : option.id); setIsOpen(false); }}
                className="w-full px-3 py-2 text-sm text-left text-[#1a1a1a] hover:bg-[#F2F2FF]"
              >
                {typeof option === "string" ? option : option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Call Flow Panel
export const CallFlowPanel = ({ config, onChange }) => {
  return (
    <div className="p-6">
      <p className="text-sm text-gray-600 mb-6">
        Let's design the perfect call! Write a prompt to tell me how you want me to approach your prospect - what to say, what to ask, and what vibe you want. I'll handle the rest!
      </p>

      {/* Opening Line */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-sm font-medium text-[#1a1a1a]">Opening Line</label>
          <InfoButton tooltip="The first thing the AI will say" />
        </div>
        <input
          type="text"
          value={config?.openingLine || ""}
          onChange={(e) => onChange({ ...config, openingLine: e.target.value })}
          placeholder="Type your message content here."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3C49F7]"
        />
      </div>

      {/* Website URL */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-sm font-medium text-[#1a1a1a]">Website URL</label>
          <InfoButton tooltip="Your website for reference" />
        </div>
        <div className="flex gap-2">
          <input
            type="url"
            value={config?.websiteUrl || ""}
            onChange={(e) => onChange({ ...config, websiteUrl: e.target.value })}
            placeholder="https://www.example.com"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3C49F7]"
          />
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-[#1a1a1a] hover:bg-gray-50">
            Generate Prompt
          </button>
        </div>
      </div>

      {/* Call Prompt */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <label className="text-sm font-medium text-[#1a1a1a]">Call Prompt</label>
          <InfoButton tooltip="Instructions for the AI caller" />
        </div>
        <textarea
          value={config?.callPrompt || ""}
          onChange={(e) => onChange({ ...config, callPrompt: e.target.value })}
          placeholder="Type your prompt here."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3C49F7] min-h-[120px] resize-none"
        />
        <div className="flex items-center gap-3 mt-3">
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-[#1a1a1a] hover:bg-gray-50">
            <Plus className="w-4 h-4" />
            Add Variables
          </button>
          <button className="text-sm text-[#3C49F7] hover:underline">
            Rewrite Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

// Configurations Panel
export const ConfigurationsPanel = ({ config, onChange }) => {
  return (
    <div className="p-6">
      {/* Caller Configuration */}
      <CollapsibleSection title="Caller Configuration">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Voice */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Voice</label>
            <div className="flex gap-2">
              <SelectDropdown
                value={config?.voice}
                options={VOICE_OPTIONS}
                onChange={(v) => onChange({ ...config, voice: v })}
                placeholder="Select voice"
              />
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Play className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Language */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Language</label>
            <SelectDropdown
              value={config?.language}
              options={LANGUAGE_OPTIONS}
              onChange={(v) => onChange({ ...config, language: v })}
              placeholder="Select language"
            />
          </div>
          
          {/* Background Audio */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Background audio</label>
            <SelectDropdown
              value={config?.backgroundAudio}
              options={BACKGROUND_AUDIO_OPTIONS}
              onChange={(v) => onChange({ ...config, backgroundAudio: v })}
              placeholder="Select audio"
            />
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#1a1a1a]">Wait for Greetings</span>
              <InfoButton tooltip="Wait for the prospect to greet first" />
            </div>
            <ToggleSwitch
              enabled={config?.waitForGreetings ?? true}
              onChange={(v) => onChange({ ...config, waitForGreetings: v })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#1a1a1a]">Noise Cancellation</span>
              <InfoButton tooltip="Reduce background noise" />
            </div>
            <ToggleSwitch
              enabled={config?.noiseCancellation ?? true}
              onChange={(v) => onChange({ ...config, noiseCancellation: v })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#1a1a1a]">Block Interruption</span>
              <InfoButton tooltip="Prevent interruptions during speech" />
            </div>
            <ToggleSwitch
              enabled={config?.blockInterruption ?? true}
              onChange={(v) => onChange({ ...config, blockInterruption: v })}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Retry Conditions */}
      <CollapsibleSection title="Retry Conditions">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#1a1a1a]">Unanswered calls</span>
            <InfoButton tooltip="Retry unanswered calls" />
          </div>
          <ToggleSwitch
            enabled={config?.retryUnanswered ?? true}
            onChange={(v) => onChange({ ...config, retryUnanswered: v })}
          />
        </div>
        <p className="text-sm text-gray-600 mb-3">Maximum retry attempts for unanswered call</p>
        <div className="flex items-center gap-3">
          <SelectDropdown
            value={config?.retryAttempts || "1"}
            options={["1", "2", "3", "4", "5"]}
            onChange={(v) => onChange({ ...config, retryAttempts: v })}
            placeholder="1"
          />
          <span className="text-sm text-gray-600">times, after</span>
          <input
            type="number"
            value={config?.retryAfter || 3}
            onChange={(e) => onChange({ ...config, retryAfter: parseInt(e.target.value) })}
            className="w-16 px-3 py-2 border border-gray-200 rounded-lg text-sm text-center"
          />
          <SelectDropdown
            value={config?.retryUnit || "Hours"}
            options={["Minutes", "Hours", "Days"]}
            onChange={(v) => onChange({ ...config, retryUnit: v })}
            placeholder="Hours"
          />
        </div>
      </CollapsibleSection>

      {/* Voicemail Behaviour */}
      <ExpandableSection title="Voicemail Behaviour">
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="voicemail"
              checked={config?.voicemailBehaviour === "hangup"}
              onChange={() => onChange({ ...config, voicemailBehaviour: "hangup" })}
              className="w-4 h-4 text-[#3C49F7]"
            />
            <span className="text-sm text-[#1a1a1a]">Hangup</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="voicemail"
              checked={config?.voicemailBehaviour === "leaveMessage"}
              onChange={() => onChange({ ...config, voicemailBehaviour: "leaveMessage" })}
              className="w-4 h-4 text-[#3C49F7]"
            />
            <span className="text-sm text-[#1a1a1a]">Leave Message</span>
          </label>
          
          {config?.voicemailBehaviour === "leaveMessage" && (
            <div className="mt-4">
              <label className="text-sm text-[#1a1a1a] mb-2 block">Voicemail message</label>
              <textarea
                value={config?.voicemailMessage || ""}
                onChange={(e) => onChange({ ...config, voicemailMessage: e.target.value })}
                placeholder="Hey, this is Alex from AI Workforce. Just following up..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#3C49F7] min-h-[80px] resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                When the agent reaches a voicemail, it will leave this message after the beep and then hang up
              </p>
              <button className="mt-3 px-4 py-2 border border-gray-200 rounded-lg text-sm text-[#1a1a1a] hover:bg-gray-50">
                Reset to Default
              </button>
            </div>
          )}
        </div>
      </ExpandableSection>
    </div>
  );
};

// Disposition Panel (placeholder)
export const DispositionPanel = ({ config, onChange }) => {
  return (
    <div className="p-6">
      <p className="text-sm text-gray-500">Disposition settings coming soon...</p>
    </div>
  );
};

// Right Panel Container
export const RightPanel = ({ selectedStep, config, onConfigChange, onTestCall, onSavePrompt }) => {
  const [activeTab, setActiveTab] = useState("callFlow");

  if (!selectedStep) return null;

  const tabs = selectedStep.type === "call" 
    ? [
        { id: "callFlow", label: "Call Flow" },
        { id: "configurations", label: "Configurations" },
        { id: "disposition", label: "Disposition" },
      ]
    : [
        { id: "content", label: "Content" },
        { id: "settings", label: "Settings" },
      ];

  return (
    <div className="w-full bg-gradient-to-b from-[#C1BEFF] to-[#C1BEFF] rounded-2xl overflow-hidden flex flex-col">
      {/* Tab Header */}
      <div className="flex items-center justify-between p-4 bg-white/50">
        <div className="flex items-center gap-1 bg-white rounded-full p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeTab === tab.id ? "bg-[#1a1a1a] text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onTestCall}
            className="px-4 py-1.5 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-white"
          >
            Test Call
          </button>
          <button
            onClick={onSavePrompt}
            className="px-4 py-1.5 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-white"
          >
            Save Prompt
          </button>
          <button className="p-1.5 hover:bg-white rounded-full">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-white/80 m-2 rounded-xl">
        {activeTab === "callFlow" && <CallFlowPanel config={config} onChange={onConfigChange} />}
        {activeTab === "configurations" && <ConfigurationsPanel config={config} onChange={onConfigChange} />}
        {activeTab === "disposition" && <DispositionPanel config={config} onChange={onConfigChange} />}
      </div>
    </div>
  );
};

export default { RightPanel, CallFlowPanel, ConfigurationsPanel, DispositionPanel };