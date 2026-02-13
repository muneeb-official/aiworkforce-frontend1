// src/pages/auth/CartPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { useSubscription } from "../../services/SubscriptionContext";
import backgroundImage from "../../assets/Background.png";

// Icons
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10B981"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10B981"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckmarkIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4F46E5"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex justify-center">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
  </div>
);

// Terms & Conditions Modal
const TermsModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Terms & Conditions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What is Lorem Ipsum
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What is Lorem Ipsum
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What is Lorem Ipsum
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and scrambled it to
                make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onAccept}
            className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-full hover:bg-[#4338CA] transition-colors"
          >
            I, Understood
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty Cart State
const EmptyCartState = ({ onBrowsePlans }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center">
    <div className="text-center">
      <svg
        className="w-20 h-20 mx-auto mb-4 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <h2
        className="text-2xl font-semibold text-gray-900 mb-2"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Browse our plans and find the perfect fit for you.
      </p>
      <button
        onClick={onBrowsePlans}
        className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-xl hover:bg-[#4338CA] transition-colors"
      >
        Browse Plans
      </button>
    </div>
  </div>
);

const CartPage = () => {
  const navigate = useNavigate();
  const {
    selectedPlan,
    selectedSEO,
    selectedAgent,
    calculateTotal,
    proceedToCheckout,
    checkoutLoading,
    checkoutError,
    clearCart,
  } = useSubscription();

  const [currency, setCurrency] = useState("GBP");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromos, setAppliedPromos] = useState([]);

  const currencies = ["GBP", "USD", "EUR"];

  // Check if cart is empty
  if (!selectedPlan) {
    return (
      <div
        className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Header variant="simple" />
        <main className="w-full bg-white mt-6">
          <div className="max-w-6xl mx-auto px-6 py-8 mt-6">
            <EmptyCartState onBrowsePlans={() => navigate("/choose-plan")} />
          </div>
        </main>
      </div>
    );
  }

  // Calculate prices (monthly only)
  const basePrice = selectedPlan.price + (selectedSEO?.price || 0);
  const planCost = basePrice;
  const vat = Math.round(planCost * 0.2); // 20% VAT
  const discount = appliedPromos.length > 0 ? Math.round(planCost * 0.1) : 0; // 10% discount if promo applied
  const total = planCost + vat - discount;

  const isPremium = selectedPlan?.bothAgents;

  const handleApplyPromo = () => {
    if (promoCode.trim() && !appliedPromos.includes(promoCode.trim())) {
      setAppliedPromos([...appliedPromos, promoCode.trim()]);
      setPromoCode("");
    }
  };

  const handleRemovePromo = (code) => {
    setAppliedPromos(appliedPromos.filter((p) => p !== code));
  };

  const handleTermsAccept = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
  };

  const handleProceedToPay = async () => {
    if (!termsAccepted) {
      return;
    }
    await proceedToCheckout();
  };

  return (
    <div
      className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header variant="simple" />

      <main className="w-full bg-white mt-6">
        <div className="max-w-6xl mx-auto px-6 py-8 mt-6">
          <h1
            className="text-3xl font-semibold text-gray-900 mb-8"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            In your Cart
          </h1>

          <div className="grid lg:grid-cols-[1fr,380px] gap-8">
            {/* Left Column - Plan Details */}
            <div className="space-y-6">
              {/* Main Plan Card */}
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    {selectedPlan.name}
                  </h3>
                  {selectedPlan.isBestseller && (
                    <span className="px-3 py-1 bg-[#4F46E5] text-white text-xs rounded-md font-medium">
                      BESTSELLER
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    £{selectedPlan.price}
                  </span>
                  <span className="text-gray-500">/ month per seat</span>
                </div>

                {isPremium && (
                  <div className="bg-[#F0FDF4] rounded-lg p-3 mb-6 text-sm text-gray-700 italic border border-[#BBF7D0]">
                    Both <span className="font-semibold">B2C Lead Builder Agent</span> & <span className="font-semibold">B2B Lead Builder Agent</span>{" "}
                    <span className="italic">will be included in this plan</span>
                  </div>
                )}

                {!isPremium && (
                  <p className="text-gray-700 mb-4">
                    <span className="text-[#10B981] font-medium">
                      Agent Type:
                    </span>{" "}
                    {selectedAgent} Lead Builder
                  </p>
                )}

                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-3">You will get</p>
                  <ul className="space-y-2">
                    {selectedPlan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <CheckIcon /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Credits & Setup Section */}
                {selectedPlan.credits && (
                  <div className="mt-6">
                    <p className="font-semibold text-gray-900 mb-3">Credits & Setup</p>
                    <ul className="space-y-2">
                      {selectedPlan.credits.map((credit, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <CheckIcon /> {credit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end">
                  <button
                    onClick={() => navigate("/choose-plan")}
                    className="flex items-center gap-1 text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors"
                  >
                    Change Plan <ArrowIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Summary */}
            <div className="space-y-4">
              {/* Currency Selector */}
              <div className="flex justify-end">
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowCurrencyDropdown(!showCurrencyDropdown)
                    }
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="text-gray-500">Currency</span>
                    <span className="font-medium">{currency}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {showCurrencyDropdown && (
                    <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                      {currencies.map((curr) => (
                        <button
                          key={curr}
                          onClick={() => {
                            setCurrency(curr);
                            setShowCurrencyDropdown(false);
                          }}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Monthly Payment Option */}
              <div className="w-full p-4 rounded-xl border-2 border-[#4F46E5] bg-white flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Pay monthly</p>
                  <p className="text-xl font-bold text-gray-900">
                    £{planCost}/month
                  </p>
                </div>
                <CheckmarkIcon />
              </div>

              {/* Security Note */}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <LockIcon />
                <span>Secured from with UIB Banking</span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-gray-600">
                  <span>Plan Cost</span>
                  <span>£{planCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT</span>
                  <span>£{vat.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      Discount
                      <span className="text-xs bg-[#10B981] text-white px-2 py-0.5 rounded">
                        10% OFF
                      </span>
                    </span>
                    <span>£{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    termsAccepted
                      ? "bg-[#4F46E5] border-[#4F46E5]"
                      : "border-gray-300"
                  }`}
                >
                  {termsAccepted && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <span className="text-gray-600 text-sm">
                  You agree to all the{" "}
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="text-[#4F46E5] font-medium hover:underline"
                  >
                    Terms & Conditions
                  </button>
                </span>
              </div>

              {/* Promo Code Section */}
              <div className="pt-2">
                <p className="text-gray-700 font-medium mb-2">Apply Promo Code</p>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                  placeholder="Enter Code Here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#4F46E5]"
                />
                
                {/* Applied Promo Codes */}
                {appliedPromos.map((code) => (
                  <div
                    key={code}
                    className="mt-2 flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <span className="text-gray-700 font-medium">{code}</span>
                    <button
                      onClick={() => handleRemovePromo(code)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Error Message */}
              {checkoutError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{checkoutError}</p>
                  {checkoutError.includes("login") && (
                    <button
                      onClick={() =>
                        navigate("/login", { state: { returnTo: "/cart" } })
                      }
                      className="mt-2 text-[#4F46E5] text-sm font-medium hover:underline"
                    >
                      Click here to login
                    </button>
                  )}
                </div>
              )}

              {/* Terms Note */}
              <p className="text-gray-400 text-sm">
                By clicking "Proceed To Pay", you agree to be charged £{planCost} every month, unless you cancel.
              </p>

              {/* Pay Button */}
              <button
                onClick={handleProceedToPay}
                disabled={checkoutLoading || !termsAccepted}
                className="w-full h-12 bg-[#4F46E5] hover:bg-[#4338CA] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center"
              >
                {checkoutLoading ? <LoadingSpinner /> : "Proceed To Pay"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Terms Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={handleTermsAccept}
      />
    </div>
  );
};

export default CartPage;