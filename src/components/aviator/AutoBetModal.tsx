import React, { useState } from "react";

interface AutoBetModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (settings: { betAmount: number; rounds: number }) => void;
}

const AutoBetModal: React.FC<AutoBetModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [betAmount, setBetAmount] = useState(10);
  const [rounds, setRounds] = useState(5);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">🎯 Auto Bet Settings</h2>

        {/* Bet Amount */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Bet Amount
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
          />
        </div>

        {/* Rounds */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Number of Rounds
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={rounds}
            onChange={(e) => setRounds(Number(e.target.value))}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm({ betAmount, rounds })}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AutoBetModal;
