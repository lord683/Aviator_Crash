import React, { useState } from 'react';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, onSuccess }) => {
  const [processing, setProcessing] = useState(false);

  if (!open) return null;

  const handlePurchase = () => {
    setProcessing(true);

    // Open Gumroad checkout
    const gumroadUrl = "https://gumroad.com/l/YOUR_PRODUCT_ID"; // replace YOUR_PRODUCT_ID
    const popup = window.open(gumroadUrl, "_blank", "width=600,height=700");

    // Simple local check: when user returns, mark premium unlocked
    const checkInterval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkInterval);
        // Set local flag
        localStorage.setItem('premium', 'true');
        setProcessing(false);
        onSuccess();
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg text-white w-80">
        <h2 className="text-xl mb-4">Unlock Full Game</h2>
        <p className="mb-4">Pay once to unlock SkyFly Crash fully.</p>
        <button
          onClick={handlePurchase}
          disabled={processing}
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
        >
          {processing ? "Processing..." : "Buy Now"}
        </button>
        <button
          onClick={onClose}
          className="ml-4 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
