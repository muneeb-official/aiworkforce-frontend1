// src/pages/auth/IntegrationHubPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ConnectingModal,
  IntegrationSuccessModal,
  IntegrationErrorModal,
  TwilioNumberModal,
  VonageNumberModal
} from '../../components/modals/Modals';
import Header from '../../components/layout/Header';
import { integrationService } from '../../services/IntegrationService';
import backgroundImage from '../../assets/Background.png';
import Sales from '../../assets/IntegrationIcons/salesforce.png';
import pipe from '../../assets/IntegrationIcons/Pipedrive.png';
import hub from '../../assets/IntegrationIcons/hubspot.png';
import zoho from '../../assets/IntegrationIcons/zoho.png';
import odoo from '../../assets/IntegrationIcons/odoo.png';
import outlook from '../../assets/IntegrationIcons/outlook.png';
import google from '../../assets/IntegrationIcons/google.png';
import calendly from '../../assets/IntegrationIcons/calendly.png';
import LinkedIn from '../../assets/IntegrationIcons/linkedin.png';
import whatsapp from '../../assets/IntegrationIcons/whatsapp.png';
import telegram from '../../assets/IntegrationIcons/telegram.png';
import twilio from '../../assets/IntegrationIcons/twilio.png';
import vonage from '../../assets/IntegrationIcons/vonage.png';

// Integration Icons
const SalesforceIcon = () => <img src={Sales} alt="" />;
const PipedriveIcon = () => <img src={pipe} alt="" />;
const HubspotIcon = () => <img src={hub} alt="" />;
const ZohoIcon = () => <img src={zoho} alt="" />;
const OdooIcon = () => <img src={odoo} alt="" />;
const OutlookIcon = () => <img src={outlook} alt="" />;
const GoogleIcon = () => <img src={google} alt="" />;
const CalendlyIcon = () => <img src={calendly} alt="" />;
const LinkedInIcon = () => <img src={LinkedIn} alt="" />;
const WhatsAppIcon = () => <img src={whatsapp} alt="" />;
const TelegramIcon = () => <img src={telegram} alt="" />;
const TwilioIcon = () => <img src={twilio} alt="" />;
const VonageIcon = () => <img src={vonage} alt="" />;

// Integration Item Component
const IntegrationItem = ({ icon, name, status, onConnect, onRetry, disabled = false }) => {
  const getStatusDisplay = () => {
    switch (status) {
      case 'connected':
        return <span className="text-[#10B981] font-medium text-sm">Connected</span>;
      case 'failed':
        return (
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
              Failed to connect
            </span>
            <button
              onClick={onRetry}
              className="text-[#4F46E5] font-medium text-sm hover:text-[#4338CA] transition-colors"
            >
              Retry Connecting
            </button>
          </div>
        );
      default:
        return (
          <button
            onClick={onConnect}
            disabled={disabled}
            className={`font-medium text-[16px] transition-colors ${
              disabled ? 'text-gray-400 cursor-not-allowed' : 'text-[#4F46E5] hover:text-[#4338CA]'
            }`}
          >
            Connect
          </button>
        );
    }
  };

  return (
    <div className={`flex items-center justify-between p-8 bg-white border border-gray-100 rounded-xl ${
      disabled ? 'opacity-50' : ''
    }`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className={`font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>{name}</span>
      </div>
      {getStatusDisplay()}
    </div>
  );
};

// Main Integration Hub Page
const IntegrationHubPage = () => {
  const navigate = useNavigate();

  const [integrations, setIntegrations] = useState({
    salesforce: 'not_connected',
    pipedrive: 'not_connected',
    hubspot: 'not_connected',
    zoho: 'not_connected',
    odoo: 'not_connected',
    outlook: 'not_connected',
    gmail: 'not_connected',
    calendly: 'not_connected',
    linkedin: 'not_connected',
    whatsapp: 'not_connected',
    telegram: 'not_connected',
    twilio: 'not_connected',
    vonage: 'not_connected',
  });

  const [showConnecting, setShowConnecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showTwilioModal, setShowTwilioModal] = useState(false);
  const [showVonageModal, setShowVonageModal] = useState(false);
  const [currentIntegration, setCurrentIntegration] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch integration statuses on mount
  useEffect(() => {
    fetchIntegrationStatuses();
  }, []);

  const fetchIntegrationStatuses = async () => {
    try {
      const statuses = await integrationService.getIntegrations();
      if (statuses && typeof statuses === 'object') {
        setIntegrations(prev => ({ ...prev, ...statuses }));
      }
    } catch (error) {
      console.log('Could not fetch integration statuses:', error);
    }
  };

  const connectedCRM = Object.entries(integrations).find(
    ([key, value]) =>
      ['salesforce', 'pipedrive', 'hubspot', 'zoho', 'odoo'].includes(key) && value === 'connected'
  );

  const hasAnyConnection = Object.values(integrations).some(status => status === 'connected');

  // Handle OAuth connection
  const handleConnect = async (integrationKey, integrationName) => {
    setCurrentIntegration({ key: integrationKey, name: integrationName });
    setShowConnecting(true);

    try {
      const result = await integrationService.connectOAuth(integrationKey, integrationName);

      setShowConnecting(false);

      if (result.success) {
        setIntegrations(prev => ({ ...prev, [integrationKey]: 'connected' }));
        setSuccessMessage(`We have successfully connected your ${integrationName} account.`);
        setShowSuccess(true);
      } else {
        setIntegrations(prev => ({ ...prev, [integrationKey]: 'failed' }));
        setErrorMessage(result.error || 'Please ensure that you have authorized the connection correctly.');
        setShowError(true);
      }
    } catch (error) {
      setShowConnecting(false);
      setIntegrations(prev => ({ ...prev, [integrationKey]: 'failed' }));
      setErrorMessage(error.message || 'Failed to connect. Please try again.');
      setShowError(true);
    }
  };

  // Handle Twilio import
  const handleTwilioImport = async (formData) => {
    setShowTwilioModal(false);
    setCurrentIntegration({ key: 'twilio', name: 'Twilio' });
    setShowConnecting(true);

    try {
      await integrationService.connectTwilio(formData);
      setShowConnecting(false);
      setIntegrations(prev => ({ ...prev, twilio: 'connected' }));
      setSuccessMessage('We have successfully connected your Twilio account.');
      setShowSuccess(true);
    } catch (error) {
      setShowConnecting(false);
      setIntegrations(prev => ({ ...prev, twilio: 'failed' }));
      setErrorMessage(error.message || 'Failed to connect Twilio.');
      setShowError(true);
    }
  };

  // Handle Vonage import
  const handleVonageImport = async (formData) => {
    setShowVonageModal(false);
    setCurrentIntegration({ key: 'vonage', name: 'Vonage' });
    setShowConnecting(true);

    try {
      await integrationService.connectVonage(formData);
      setShowConnecting(false);
      setIntegrations(prev => ({ ...prev, vonage: 'connected' }));
      setSuccessMessage('We have successfully connected your Vonage account.');
      setShowSuccess(true);
    } catch (error) {
      setShowConnecting(false);
      setIntegrations(prev => ({ ...prev, vonage: 'failed' }));
      setErrorMessage(error.message || 'Failed to connect Vonage.');
      setShowError(true);
    }
  };

  const handleRetry = (integrationKey, integrationName) => {
    setIntegrations(prev => ({ ...prev, [integrationKey]: 'not_connected' }));
    if (integrationKey === 'twilio') {
      setShowTwilioModal(true);
    } else if (integrationKey === 'vonage') {
      setShowVonageModal(true);
    } else {
      handleConnect(integrationKey, integrationName);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setCurrentIntegration(null);
    setSuccessMessage('');
  };

  const handleErrorRetry = () => {
    setShowError(false);
    if (currentIntegration) {
      handleRetry(currentIntegration.key, currentIntegration.name);
    }
  };

  const handleErrorClose = () => {
    setShowError(false);
    setErrorMessage('');
  };

  return (
    <div
      className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header variant="simple" />

      <main className="max-w-full bg-white mx-auto px-16 py-8 mt-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-[32px] font-semibold text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Integration Hub
          </h1>
          {hasAnyConnection ? (
            <button
              onClick={() => navigate('/onboarding')}
              className="px-6 py-2 bg-[#4F46E5] text-white rounded-lg font-medium hover:bg-[#4338CA] transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={() => navigate('/onboarding')}
              className="text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors"
            >
              Skip For Now
            </button>
          )}
        </div>

        {/* Connect your CRM */}
        <section className="mb-8">
          <h2 className="text-[20px] font-semibold text-gray-900 mb-2">Connect your CRM</h2>
          <div className="space-y-2">
            <IntegrationItem
              icon={<SalesforceIcon />}
              name="Connect your Salesforce account"
              status={integrations.salesforce}
              onConnect={() => handleConnect('salesforce', 'Salesforce')}
              onRetry={() => handleRetry('salesforce', 'Salesforce')}
              disabled={connectedCRM && connectedCRM[0] !== 'salesforce'}
            />
            <IntegrationItem
              icon={<PipedriveIcon />}
              name="Connect your Pipedrive account"
              status={integrations.pipedrive}
              onConnect={() => handleConnect('pipedrive', 'Pipedrive')}
              onRetry={() => handleRetry('pipedrive', 'Pipedrive')}
              disabled={connectedCRM && connectedCRM[0] !== 'pipedrive'}
            />
            <IntegrationItem
              icon={<HubspotIcon />}
              name="Connect your Hubspot account"
              status={integrations.hubspot}
              onConnect={() => handleConnect('hubspot', 'Hubspot')}
              onRetry={() => handleRetry('hubspot', 'Hubspot')}
              disabled={connectedCRM && connectedCRM[0] !== 'hubspot'}
            />
            <IntegrationItem
              icon={<ZohoIcon />}
              name="Connect your Zoho account"
              status={integrations.zoho}
              onConnect={() => handleConnect('zoho', 'Zoho')}
              onRetry={() => handleRetry('zoho', 'Zoho')}
              disabled={connectedCRM && connectedCRM[0] !== 'zoho'}
            />
            <IntegrationItem
              icon={<OdooIcon />}
              name="Connect your Oddo account"
              status={integrations.odoo}
              onConnect={() => handleConnect('odoo', 'Odoo')}
              onRetry={() => handleRetry('odoo', 'Odoo')}
              disabled={connectedCRM && connectedCRM[0] !== 'odoo'}
            />
          </div>
        </section>

        {/* Connect your Email & Calendar */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Connect your Email & Calendar</h2>
          <div className="space-y-3">
            <IntegrationItem
              icon={<OutlookIcon />}
              name="Connect your Outlook account"
              status={integrations.outlook}
              onConnect={() => handleConnect('outlook', 'Outlook')}
              onRetry={() => handleRetry('outlook', 'Outlook')}
            />
            <IntegrationItem
              icon={<GoogleIcon />}
              name="Connect your Google account"
              status={integrations.gmail}
              onConnect={() => handleConnect('gmail', 'Gmail')}
              onRetry={() => handleRetry('gmail', 'Gmail')}
            />
            <IntegrationItem
              icon={<CalendlyIcon />}
              name="Connect your Calendly"
              status={integrations.calendly}
              onConnect={() => handleConnect('calendly', 'Calendly')}
              onRetry={() => handleRetry('calendly', 'Calendly')}
            />
          </div>
        </section>

        {/* Connect your Social Media Account */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Connect your Social Media Account</h2>
          <div className="space-y-3">
            <IntegrationItem
              icon={<LinkedInIcon />}
              name="Connect your LinkedIn account"
              status={integrations.linkedin}
              onConnect={() => handleConnect('linkedin', 'LinkedIn')}
              onRetry={() => handleRetry('linkedin', 'LinkedIn')}
            />
            <IntegrationItem
              icon={<WhatsAppIcon />}
              name="Connect your WhatsApp account"
              status={integrations.whatsapp}
              onConnect={() => handleConnect('whatsapp', 'WhatsApp')}
              onRetry={() => handleRetry('whatsapp', 'WhatsApp')}
            />
            <IntegrationItem
              icon={<TelegramIcon />}
              name="Connect your Telegram account"
              status={integrations.telegram}
              onConnect={() => handleConnect('telegram', 'Telegram')}
              onRetry={() => handleRetry('telegram', 'Telegram')}
            />
          </div>
        </section>

        {/* Add your Phone number */}
        <section className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Add your Phone number</h2>
          <div className="space-y-3">
            <IntegrationItem
              icon={<TwilioIcon />}
              name="Add your Twilio Number"
              status={integrations.twilio}
              onConnect={() => setShowTwilioModal(true)}
              onRetry={() => handleRetry('twilio', 'Twilio')}
            />
            <IntegrationItem
              icon={<VonageIcon />}
              name="Add your Vonage Number"
              status={integrations.vonage}
              onConnect={() => setShowVonageModal(true)}
              onRetry={() => handleRetry('vonage', 'Vonage')}
            />
          </div>
        </section>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/onboarding')}
            className="px-8 py-3 bg-[#4F46E5] text-white font-medium rounded-xl hover:bg-[#4338CA] transition-colors"
          >
            Continue to Onboarding
          </button>
        </div>
      </main>

      {/* Modals */}
      <ConnectingModal
        isOpen={showConnecting}
        onClose={() => {
          setShowConnecting(false);
          integrationService.closePopup();
        }}
        title="Connecting and importing..."
        message="We are connecting your account. Please complete the authorization in the popup window."
      />

      <IntegrationSuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Successfully Connected!"
        message={successMessage}
        buttonText="Done"
      />

      <IntegrationErrorModal
        isOpen={showError}
        onClose={handleErrorClose}
        title="Failed to connect"
        message={errorMessage}
        buttonText="Retry Connecting"
        onRetry={handleErrorRetry}
      />

      <TwilioNumberModal
        isOpen={showTwilioModal}
        onClose={() => setShowTwilioModal(false)}
        onImport={handleTwilioImport}
      />

      <VonageNumberModal
        isOpen={showVonageModal}
        onClose={() => setShowVonageModal(false)}
        onImport={handleVonageImport}
      />
    </div>
  );
};

export default IntegrationHubPage;