// src/components/aviator/BetAutoSwitch.tsx
import React, { useState, useEffect } from 'react';
import { useAviator } from '../../store/aviator';
import { Game_Global_Vars } from '../../utils';

interface BetAutoSwitchProps {
  onClose?: () => void;
}

const BetAutoSwitch: React.FC<BetAutoSwitchProps> = ({ onClose }) => {
  const { aviatorState, setAviatorState } = useAviator();
  const [active, setActive] = useState(false);
  const [betValue, setBetValue] = useState(Game_Global_Vars.betValue[0]);
  const [multiplier, setMultiplier] = useState(1);
  const [stopOnWin, setStopOnWin] = useState(false);
  const [stopOnLoss, setStopOnLoss] = useState(false);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      if (!aviatorState.socket) return;

      // Place bet automatically
      aviatorState.socket.emit('place_bet', {
        amount: betValue,
        multiplier: multiplier,
      });

      // Logic for stopping auto-bet
      const balance = aviatorState.balance;
      if ((stopOnLoss && balance < betValue) || (stopOnWin && balance > betValue * multiplier)) {
        setActive(false);
      }
    }, 3000); // every 3 seconds, adjust as needed

    return () => clearInterval(interval);
  }, [active, betValue, multiplier, stopOnWin, stopOnLoss, aviatorState.socket]);

  const toggleActive = () => setActive(prev => !prev);

  return (
    <div className="absolute bottom-5 right-5 p-4 bg-[#1B1C1D] text-white rounded-md shadow-md w-64 z-50">
      <h3 className="font-bold mb-2">Auto Bet</h3>

      <div className="flex justify-between items-center mb-2">
        <span>Active:</span>
        <button onClick={toggleActive} className={`px-3 py-1 rounded ${active ? 'bg-green-500' : 'bg-gray-500'}`}>
          {active ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="mb-2">
        <label>Bet Value:</label>
        <input
          type="number"
          value={betValue}
          onChange={(e) => setBetValue(parseFloat(e.target.value))}
          className="w-full p-1 rounded text-black mt-1"
        />
      </div>

      <div className="mb-2">
        <label>Multiplier:</label>
        <input
          type="number"
          value={multiplier}
          onChange={(e) => setMultiplier(parseFloat(e.target.value))}
          className="w-full p-1 rounded text-black mt-1"
        />
      </div>

      <div className="mb-2 flex justify-between">
        <label>
          <input type="checkbox" checked={stopOnWin} onChange={() => setStopOnWin(prev => !prev)} />
          Stop on Win
        </label>
        <label>
          <input type="checkbox" checked={stopOnLoss} onChange={() => setStopOnLoss(prev => !prev)} />
          Stop on Loss
        </label>
      </div>

      {onClose && (
        <button onClick={onClose} className="mt-2 w-full bg-red-500 px-2 py-1 rounded">
          Close
        </button>
      )}
    </div>
  );
};

export default BetAutoSwitch;
