// components/workflow/WorkflowEditor.jsx
import { useState } from "react";
import { AddNewButton, ViewToggle, MoreOptionsMenu, StepItem, BranchConnector } from "./WorkflowEditorComponents";
import { RightPanel } from "./WorkflowEditorPanels";
import { TestCallModal, SavePromptModal, GlobalInstructionsModal, SaveAsTemplateModal, DeleteStepModal } from "./WorkflowEditorModals";

const WorkflowEditor = ({ onBack, workflowName, workflowDate, onSave, onSaveAndContinue, initialSteps = [] }) => {
  // View state
  const [view, setView] = useState("list");
  
  // Steps state
  const [steps, setSteps] = useState(initialSteps);
  const [selectedStepId, setSelectedStepId] = useState(null);
  
  // Configuration state
  const [stepConfigs, setStepConfigs] = useState({});
  
  // Global settings
  const [sendEmailsInThread, setSendEmailsInThread] = useState(true);
  const [globalInstructions, setGlobalInstructions] = useState("");
  
  // Modal states
  const [showTestCallModal, setShowTestCallModal] = useState(false);
  const [showSavePromptModal, setShowSavePromptModal] = useState(false);
  const [showGlobalInstructionsModal, setShowGlobalInstructionsModal] = useState(false);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stepToDelete, setStepToDelete] = useState(null);

  // Get selected step
  const selectedStep = steps.find(s => s.id === selectedStepId);

  // Add new step handler
  const handleAddStep = (type, subAction = null, branch = null) => {
    const newStep = {
      id: Date.now(),
      type,
      subAction,
      delay: 3,
      branch,
      config: {},
    };
    setSteps([...steps, newStep]);
    setSelectedStepId(newStep.id);
    
    setStepConfigs({
      ...stepConfigs,
      [newStep.id]: getDefaultConfig(type),
    });
  };

  // Get default config based on step type
  const getDefaultConfig = (type) => {
    switch (type) {
      case "call":
        return {
          voice: "eric",
          language: "English",
          backgroundAudio: "Office",
          waitForGreetings: true,
          noiseCancellation: true,
          blockInterruption: true,
          retryUnanswered: true,
          retryAttempts: "1",
          retryAfter: 3,
          retryUnit: "Hours",
          voicemailBehaviour: "hangup",
        };
      case "email":
        return { subject: "", body: "" };
      case "linkedin":
        return { message: "" };
      default:
        return {};
    }
  };

  // Delete step handler
  const handleDeleteStep = (stepId) => {
    const step = steps.find(s => s.id === stepId);
    setStepToDelete(step);
    setShowDeleteModal(true);
  };

  const confirmDeleteStep = () => {
    if (stepToDelete) {
      setSteps(steps.filter(s => s.id !== stepToDelete.id));
      if (selectedStepId === stepToDelete.id) {
        setSelectedStepId(null);
      }
      const newConfigs = { ...stepConfigs };
      delete newConfigs[stepToDelete.id];
      setStepConfigs(newConfigs);
      setStepToDelete(null);
    }
    setShowDeleteModal(false);
  };

  // Update step delay
  const handleUpdateDelay = (stepId, delay) => {
    setSteps(steps.map(s => s.id === stepId ? { ...s, delay } : s));
  };

  // Update step config
  const handleConfigChange = (config) => {
    if (selectedStepId) {
      setStepConfigs({
        ...stepConfigs,
        [selectedStepId]: config,
      });
    }
  };

  // Test call handler
  const handleTestCall = (data) => {
    console.log("Starting test call:", data);
  };

  // Save prompt handler
  const handleSavePrompt = (title) => {
    console.log("Saving prompt:", title);
  };

  // Save as template handler
  const handleSaveAsTemplate = (data) => {
    console.log("Saving as template:", data);
  };

  // Check if step has conditions
  const stepHasConditions = (step) => {
    return step.type === "call" || step.type === "linkedin";
  };

  // Get steps by branch
  const getMainSteps = () => steps.filter(s => !s.branch);
  const getAcceptedBranchSteps = () => steps.filter(s => s.branch === "accepted");
  const getPendingBranchSteps = () => steps.filter(s => s.branch === "pending");

  return (
    <div className="flex flex-col h-full bg-[#F8F9FC]">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex items-center gap-3">
          <ViewToggle view={view} onViewChange={setView} />
          <MoreOptionsMenu
            onSaveAsTemplate={() => setShowSaveTemplateModal(true)}
            onGlobalInstructions={() => setShowGlobalInstructionsModal(true)}
            sendEmailsInThread={sendEmailsInThread}
            onToggleThread={() => setSendEmailsInThread(!sendEmailsInThread)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 px-6 pb-6 overflow-hidden">
        {/* Left Side - Workflow Steps */}
        <div className="flex-1 overflow-y-auto">
          {view === "list" ? (
            <div className="space-y-3">
              <AddNewButton onSelect={handleAddStep} position="left" />

              {getMainSteps().map((step, index) => (
                <div key={step.id}>
                  <StepItem
                    step={step}
                    index={index}
                    isSelected={selectedStepId === step.id}
                    onSelect={setSelectedStepId}
                    onDelete={handleDeleteStep}
                    onUpdateDelay={handleUpdateDelay}
                  />
                  
                  {/* Show branch connectors after call/linkedin steps */}
                  {stepHasConditions(step) && index === getMainSteps().length - 1 && (
                    <div className="mt-4 space-y-4">
                      {/* Accepted Branch */}
                      <BranchConnector
                        isAccepted={true}
                        onAddNew={(type, sub, branch) => handleAddStep(type, sub, branch)}
                      />
                      {getAcceptedBranchSteps().map((branchStep, bIndex) => (
                        <StepItem
                          key={branchStep.id}
                          step={branchStep}
                          index={bIndex}
                          isSelected={selectedStepId === branchStep.id}
                          onSelect={setSelectedStepId}
                          onDelete={handleDeleteStep}
                          onUpdateDelay={handleUpdateDelay}
                        />
                      ))}

                      {/* Pending Branch */}
                      <BranchConnector
                        isAccepted={false}
                        onAddNew={(type, sub, branch) => handleAddStep(type, sub, branch)}
                      />
                      {getPendingBranchSteps().map((branchStep, bIndex) => (
                        <StepItem
                          key={branchStep.id}
                          step={branchStep}
                          index={bIndex}
                          isSelected={selectedStepId === branchStep.id}
                          onSelect={setSelectedStepId}
                          onDelete={handleDeleteStep}
                          onUpdateDelay={handleUpdateDelay}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {steps.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                  <p className="text-lg mb-2">No steps added yet</p>
                  <p className="text-sm">Click "Add New" to start building your workflow</p>
                </div>
              )}
            </div>
          ) : (
            // Tree View (Grid/Canvas)
            <div className="h-full flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <AddNewButton onSelect={handleAddStep} position="center" />
                
                {steps.length > 0 && (
                  <div className="flex flex-col items-center gap-2">
                    {/* Vertical connector */}
                    <div className="w-0.5 h-8 bg-gray-300" />
                    
                    {/* Steps in tree view */}
                    {getMainSteps().map((step, index) => (
                      <div key={step.id} className="flex flex-col items-center">
                        <StepItem
                          step={step}
                          index={index}
                          isSelected={selectedStepId === step.id}
                          onSelect={setSelectedStepId}
                          onDelete={handleDeleteStep}
                          onUpdateDelay={handleUpdateDelay}
                          isTreeView
                        />
                        
                        {index < getMainSteps().length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-300" />
                        )}
                        
                        {/* Branches for conditional steps */}
                        {stepHasConditions(step) && index === getMainSteps().length - 1 && (
                          <div className="flex gap-16 mt-4">
                            {/* Accepted Branch */}
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-green-600 font-medium mb-2">Accepted</div>
                              <AddNewButton
                                onSelect={(type, sub) => handleAddStep(type, sub, "accepted")}
                                position="center"
                              />
                            </div>
                            
                            {/* Pending Branch */}
                            <div className="flex flex-col items-center">
                              <div className="text-xs text-orange-500 font-medium mb-2">Pending</div>
                              <AddNewButton
                                onSelect={(type, sub) => handleAddStep(type, sub, "pending")}
                                position="center"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Configuration Panel */}
        <div className="w-[40%] flex-shrink-0 overflow-scroll">
          <RightPanel
            selectedStep={selectedStep}
            config={selectedStepId ? stepConfigs[selectedStepId] : null}
            onConfigChange={handleConfigChange}
            onTestCall={() => setShowTestCallModal(true)}
            onSavePrompt={() => setShowSavePromptModal(true)}
            workflowName={workflowName}
            workflowDate={workflowDate}
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
        <button
          onClick={onSave}
          className="px-6 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Save
        </button>
        <button
          onClick={onSaveAndContinue}
          className="px-6 py-2.5 bg-[#3C49F7] text-white rounded-full text-sm font-medium hover:bg-[#2a35d4]"
        >
          Save and continue
        </button>
      </div>

      {/* Modals */}
      <TestCallModal
        isOpen={showTestCallModal}
        onClose={() => setShowTestCallModal(false)}
        onSubmit={handleTestCall}
      />

      <SavePromptModal
        isOpen={showSavePromptModal}
        onClose={() => setShowSavePromptModal(false)}
        onSave={handleSavePrompt}
      />

      <GlobalInstructionsModal
        isOpen={showGlobalInstructionsModal}
        onClose={() => setShowGlobalInstructionsModal(false)}
        instructions={globalInstructions}
        onSave={(instructions) => {
          setGlobalInstructions(instructions);
          setShowGlobalInstructionsModal(false);
        }}
      />

      <SaveAsTemplateModal
        isOpen={showSaveTemplateModal}
        onClose={() => setShowSaveTemplateModal(false)}
        onSave={handleSaveAsTemplate}
      />

      <DeleteStepModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setStepToDelete(null);
        }}
        onConfirm={confirmDeleteStep}
        stepType={stepToDelete?.type}
      />
    </div>
  );
};

export default WorkflowEditor;