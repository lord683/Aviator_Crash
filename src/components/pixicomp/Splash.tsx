// src/components/pixicomp/Splash.tsx
import React, { useEffect } from 'react';
import { useAviator } from '../../store/aviator';
import { playSound, stopSound } from '../../utils';

interface SplashProps {
  loaded: boolean;
  setOpenGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const Splash: React.FC<SplashProps> = ({ loaded, setOpenGame }) => {
  const { aviatorState } = useAviator();

  useEffect(() => {
    // Play background sound while splash is active
    if (loaded) playSound('bg');
    return () => stopSound('bg');
  }, [loaded]);

  const handleStartGame = () => {
    setOpenGame(true);
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-black text-white"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #1C1C1C 100%)' }}
    >
      <img
        src={`${process.env.REACT_APP_ASSETS_IMAGE_URL}/logo.png`}
        alt="SkyFly Crash"
        className="mb-8 w-40 sm:w-60"
      />
      <h1 className="text-3xl sm:text-5xl font-bold mb-4">SkyFly Crash</h1>
      <p className="mb-8 text-gray-300">Get ready to test your luck!</p>

      {aviatorState.auth ? (
        <button
          onClick={handleStartGame}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition duration-300"
        >
          Start Game
        </button>
      ) : (
        <p className="text-red-500 font-semibold">Access Denied: Invalid Token</p>
      )}

      {!loaded && <p className="mt-4 text-gray-400">Loading assets...</p>}
    </div>
  );
};

export default Splash;
