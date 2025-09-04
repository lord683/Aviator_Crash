import React from "react";

const TopLogoBar: React.FC = () => {
  return (
    <div className="w-full bg-gray-900 text-white flex items-center justify-between px-4 py-2 shadow-md">
      {/* Left logo */}
      <div className="flex items-center gap-2">
        <img
          src="/logo192.png"
          alt="Game Logo"
          className="w-8 h-8 object-contain"
        />
        <span className="font-bold text-lg tracking-wide">Aviator Game</span>
      </div>

      {/* Right menu */}
      <div className="flex gap-4">
        <button className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-sm font-medium">
          Play
        </button>
        <button className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-medium">
          Settings
        </button>
      </div>
    </div>
  );
};

export default TopLogoBar;
