// src/components/aviator/BetBoard.tsx
import React, { useState, useEffect } from 'react';
import { useAviator } from '../../store/aviator';
import { Game_Global_Vars } from '../../utils';

interface BetBoardProps {
  bet6: string[];
}

const BetBoard: React.FC<BetBoardProps> = ({ bet6 }) => {
  const { aviatorState, setAviatorState } = useAviator();
  const [selectedChip, setSelectedChip] = useState(bet6[0]);
  const [betAmount, setBetAmount] = useState<number>(parseFloat(selectedChip));
  const [totalBet, setTotalBet] = useState<number>(0);

  useEffect(() => {
    setBetAmount(parseFloat(selectedChip));
  }, [selectedChip]);

  const placeBet = () => {
    if (!aviatorState.socket) return;

    // Emit bet to server
    aviatorState.socket.emit('place_bet', { amount: betAmount, multiplier: 1 });
    setTotalBet(prev => prev + betAmount);

    // Deduct from balance locally
    setAviatorState(prev => ({
      ...prev,
      balance: prev.balance - betAmount
    }));
  };

  return (
    <div className="bg-[#1C1C1C] p-4 rounded-md w-full flex flex-col gap-4">
      <h2 className="text-white font-bold mb-2">Place Your Bet</h2>

      <div className="flex gap-2 flex-wrap">
        {bet6.map((chip, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded ${selectedChip === chip ? 'bg-yellow-500' : 'bg-gray-600'}`}
            onClick={() => setSelectedChip(chip)}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-white">Bet Amount:</span>
        <input
          type="number"
          className="p-1 rounded text-black w-20"
          value={betAmount}
          onChange={(e) => setBetAmount(parseFloat(e.target.value))}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={placeBet}
          className="bg-green-500 px-3 py-1 rounded text-white"
        >
          Place Bet
        </button>
        <button
          onClick={() => setTotalBet(0)}
          className="bg-red-500 px-3 py-1 rounded text-white"
        >
          Reset
        </button>
      </div>

      <div className="text-white mt-2">
        <div>Balance: {aviatorState.balance.toLocaleString()}</div>
        <div>Total Bet This Round: {totalBet.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default BetBoard;
