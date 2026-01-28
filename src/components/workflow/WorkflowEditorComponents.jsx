// components/workflow/WorkflowEditorComponents.jsx
import { useState } from "react";
import { ChevronRight, Plus, Mail, Phone, MessageSquare, Send, ThumbsUp, Repeat, MessageCircle } from "lucide-react";

// Action types configuration
export const ACTION_TYPES = {
  email: { id: "email", label: "Email", icon: Mail, color: "#3C49F7" },
  linkedin: { id: "linkedin", label: "LinkedIn", icon: MessageSquare, color: "#0077B5", hasSubmenu: true },
  whatsapp: { id: "whatsapp", label: "Whatsapp", icon: MessageSquare, color: "#25D366" },
  telegram: { id: "telegram", label: "Telegram", icon: Send, color: "#0088cc" },
  call: { id: "call", label: "Call", icon: Phone, color: "#1a1a1a" },
  condition: { id: "condition", label: "Condition", icon: null, color: "#6B7280" },
};

// LinkedIn sub-actions
export const LINKEDIN_ACTIONS = {
  message: { id: "message", label: "Message", icon: MessageSquare },
  likePost: { id: "likePost", label: "Like a Post", icon: ThumbsUp },
  repost: { id: "repost", label: "Repost", icon: Repeat },
  comment: { id: "comment", label: "Comment on a Post", icon: MessageCircle },
};

// Add New Button with Dropdown
export const AddNewButton = ({ onSelect, position = "left" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLinkedInSubmenu, setShowLinkedInSubmenu] = useState(false);

  const handleActionSelect = (actionType, subAction = null) => {
    onSelect(actionType, subAction);
    setIsOpen(false);
    setShowLinkedInSubmenu(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-[#1a1a1a] hover:bg-gray-50"
      >
        <Plus className="w-4 h-4" />
        Add New
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setIsOpen(false); setShowLinkedInSubmenu(false); }} />
          <div className={`absolute ${position === "center" ? "left-1/2 -translate-x-1/2" : "left-0"} top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[180px]`}>
            {/* Actions Section */}
            <div className="p-2">
              <p className="text-xs text-gray-500 px-2 py-1">Actions</p>
              
              {/* Email */}
              <button
                onClick={() => handleActionSelect("email")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF] rounded-md"
              >
                <Mail className="w-4 h-4 text-gray-600" />
                Email
              </button>

              {/* LinkedIn with submenu */}
              <div
                className="relative"
                onMouseEnter={() => setShowLinkedInSubmenu(true)}
                onMouseLeave={() => setShowLinkedInSubmenu(false)}
              >
                <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF] rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-[#0077B5] rounded flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">in</span>
                    </div>
                    LinkedIn
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                {/* LinkedIn Submenu */}
                {showLinkedInSubmenu && (
                  <div className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px]">
                    <button
                      onClick={() => handleActionSelect("linkedin", "message")}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF] rounded-t-md"
                    >
                      <div className="w-4 h-4 bg-[#0077B5] rounded flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">in</span>
                      </div>
                      Message
                    </button>
                    <button
                      onClick={() => handleActionSelect("linkedin", "likePost")}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF]"
                    >
                      <ThumbsUp className="w-4 h-4 text-gray-600" />
                      Like a Post
                    </button>
                    <button
                      onClick={() => handleActionSelect("linkedin", "repost")}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF]"
                    >
                      <Repeat className="w-4 h-4 text-gray-600" />
                      Repost
                    </button>
                    <button
                      onClick={() => handleActionSelect("linkedin", "comment")}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF] rounded-b-md"
                    >
                      <MessageCircle className="w-4 h-4 text-gray-600" />
                      Comment on a Post
                    </button>
                  </div>
                )}
              </div>

              {/* Whatsapp */}
              <button
                onClick={() => handleActionSelect("whatsapp")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF] rounded-md"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                Whatsapp
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleActionSelect("telegram")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF] rounded-md"
              >
                <Send className="w-4 h-4 text-[#0088cc]" />
                Telegram
              </button>

              {/* Call */}
              <button
                onClick={() => handleActionSelect("call")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF] rounded-md"
              >
                <Phone className="w-4 h-4 text-gray-600" />
                Call
              </button>
            </div>

            {/* Conditions Section */}
            <div className="border-t border-gray-100 p-2">
              <p className="text-xs text-gray-500 px-2 py-1">Conditions</p>
              <button
                onClick={() => handleActionSelect("condition")}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-[#F2F2FF] rounded-md"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
                Condition
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// View Toggle (List/Tree)
export const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center bg-white rounded-full border border-gray-200">
      <button
        onClick={() => onViewChange("list")}
        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
          view === "list" ? "bg-[#1a1a1a] text-white" : "text-gray-600 hover:text-gray-900"
        }`}
      >
        List
      </button>
      <button
        onClick={() => onViewChange("tree")}
        className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
          view === "tree" ? "bg-[#1a1a1a] text-white" : "text-gray-600 hover:text-gray-900"
        }`}
      >
        Tree
      </button>
    </div>
  );
};

// More Options Menu
export const MoreOptionsMenu = ({ onSaveAsTemplate, onGlobalInstructions, sendEmailsInThread, onToggleThread }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[220px] p-2">
            <button
              onClick={() => { onSaveAsTemplate?.(); setIsOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-[#1a1a1a] hover:bg-gray-50 rounded-md"
            >
              Save as Templates
            </button>
            <button
              onClick={() => { onGlobalInstructions?.(); setIsOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#1a1a1a] hover:bg-gray-50 rounded-md"
            >
              Global Instructions
              <svg className="w-4 h-4 text-[#3C49F7]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#1a1a1a]">Send Emails in one thread</span>
                <svg className="w-4 h-4 text-[#3C49F7]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <button
                onClick={() => onToggleThread?.()}
                className={`w-10 h-6 rounded-full transition-colors ${sendEmailsInThread ? "bg-[#3C49F7]" : "bg-gray-300"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${sendEmailsInThread ? "translate-x-5" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Step Item Component (for List View)
export const StepItem = ({ step, index, isSelected, onSelect, onDelete, onUpdateDelay }) => {
  const getIcon = () => {
    switch (step.type) {
      case "call":
        return <Phone className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "linkedin":
        return (
          <div className="w-4 h-4 bg-[#0077B5] rounded flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">in</span>
          </div>
        );
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getLabel = () => {
    if (step.type === "linkedin" && step.subAction) {
      return LINKEDIN_ACTIONS[step.subAction]?.label || "LinkedIn";
    }
    return ACTION_TYPES[step.type]?.label || step.type;
  };

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected ? "border-[#3C49F7] bg-[#F8F9FC]" : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => onSelect(step.id)}
    >
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 w-6">{index + 1}</span>
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className="text-sm font-medium text-[#1a1a1a]">{getLabel()}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Send after</span>
          <input
            type="number"
            value={step.delay || 3}
            onChange={(e) => onUpdateDelay(step.id, parseInt(e.target.value))}
            onClick={(e) => e.stopPropagation()}
            className="w-12 px-2 py-1 border border-gray-300 rounded text-center"
            min={1}
          />
          <span>days</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(step.id); }}
          className="p-1 text-gray-400 hover:text-red-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Branch connector for conditions (Accepted/Pending)
export const BranchConnector = ({ type, onAddNew }) => {
  const isAccepted = type === "accepted";
  
  return (
    <div className="flex items-center gap-3 ml-8 my-2">
      <div className="flex items-center">
        <span className={`text-sm font-medium ${isAccepted ? "text-green-600" : "text-orange-500"}`}>
          {isAccepted ? "Accepted" : "Pending"}
        </span>
        <div className={`w-16 border-t-2 border-dashed mx-2 ${isAccepted ? "border-green-400" : "border-orange-400"}`} />
        <ChevronRight className={`w-4 h-4 ${isAccepted ? "text-green-400" : "text-orange-400"}`} />
      </div>
      <AddNewButton onSelect={(type, sub) => onAddNew(type, sub, isAccepted ? "accepted" : "pending")} />
      {!isAccepted && (
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Switch to tree view
        </button>
      )}
    </div>
  );
};

export default {
  AddNewButton,
  ViewToggle,
  MoreOptionsMenu,
  StepItem,
  BranchConnector,
  ACTION_TYPES,
  LINKEDIN_ACTIONS,
};