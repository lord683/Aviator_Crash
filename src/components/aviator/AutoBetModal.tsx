import React, { useState } from "react";

interface AutoBetModalProps {
  visible: boolean;
  onClose: () => void;
}

const AutoBetModal: React.FC<AutoBetModalProps> = ({ visible, onClose }) => {
  const [autoBetEnabled, setAutoBetEnabled] = useState(false);

  if (!visible) return null;

  return (
    <div className="auto-bet-modal">
      <h2>Auto Bet</h2>
      <label>
        <input
          type="checkbox"
          checked={autoBetEnabled}
          onChange={() => setAutoBetEnabled(!autoBetEnabled)}
        />
        Enable Auto Bet
      </label>

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AutoBetModal;
