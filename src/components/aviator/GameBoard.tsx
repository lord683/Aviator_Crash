// src/components/aviator/GameBoard.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useAviator } from '../../store/aviator';
import { Game_Global_Vars, playSound } from '../../utils';
import AutoBetModal from './AutoBetModal';

interface GameBoardProps {
  bet6: string[];
}

const GameBoard: React.FC<GameBoardProps> = ({ bet6 }) => {
  const { aviatorState, setAviatorState } = useAviator();
  const [multiplier, setMultiplier] = useState(1);
  const [currentRound, setCurrentRound] = useState('');
  const [userBet, setUserBet] = useState<number | null>(null);
  const [isBettingOpen, setIsBettingOpen] = useState(true);
  const [crashValue, setCrashValue] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [autoBetOpen, setAutoBetOpen] = useState(false);

  useEffect(() => {
    if (!aviatorState.socket) return;

    const socket = aviatorState.socket;

    socket.on('round_start', (data: { round: string }) => {
      setCurrentRound(data.round);
      setMultiplier(1);
      setCrashValue(null);
      setIsBettingOpen(true);
    });

    socket.on('tick', (data: { multiplier: number }) => {
      setMultiplier(data.multiplier);
    });

    socket.on('round_end', (data: { crash: number }) => {
      setCrashValue(data.crash);
      setIsBettingOpen(false);
      if (userBet && data.crash >= userBet) {
        // Player won
        setAviatorState(prev => ({
          ...prev,
          balance: prev.balance + userBet * data.crash
        }));
        playSound('win');
      } else {
        // Player lost
        setAviatorState(prev => ({
          ...prev,
          balance: prev.balance - (userBet || 0)
        }));
        playSound('lose');
      }
    });

    return () => {
      socket.off('round_start');
      socket.off('tick');
      socket.off('round_end');
    };
  }, [aviatorState.socket, userBet]);

  const placeBet = (value: number) => {
    if (!isBettingOpen) return;
    setUserBet(value);
    aviatorState.socket?.emit('place_bet', { amount: value });
  };

  return (
    <div className="gameboard-container w-full h-full flex flex-col items-center justify-center text-white">
      <div className="mb-4 flex flex-col items-center">
        <span className="text-lg font-bold">Round: {currentRound}</span>
        <span className="text-xl mt-1">Multiplier: x{multiplier.toFixed(2)}</span>
        {crashValue && <span className="text-red-500 mt-1">Crashed at x{crashValue.toFixed(2)}</span>}
      </div>

      <canvas ref={canvasRef} className="w-full max-w-xl h-64 bg-[#1B1C1D] rounded-md mb-4" />

      <div className="flex gap-2 mb-4">
        {bet6.map((bet, idx) => (
          <button
            key={idx}
            onClick={() => placeBet(Number(bet))}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black font-bold"
          >
            {bet}
          </button>
        ))}
      </div>

      <button
        onClick={() => setAutoBetOpen(true)}
        className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
      >
        Auto Bet
      </button>

      {autoBetOpen && <AutoBetModal open={autoBetOpen} setOpen={setAutoBetOpen} bet6={bet6} />}
    </div>
  );
};

export default GameBoard;
