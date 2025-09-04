import React, { useState } from "react";

interface SettingModalProps {
  visible: boolean;
  onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({ visible, onClose }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-end bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full rounded-t-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">⚙️ Settings</h2>

        {/* Sound */}
        <div className="flex justify-between items-center mb-3">
          <span>Sound Effects</span>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={() => setSoundEnabled(!soundEnabled)}
            className="h-5 w-5"
          />
        </div>

        {/* Vibration */}
        <div className="flex justify-between items-center mb-3">
          <span>Vibration</span>
          <input
            type="checkbox"
            checked={vibrationEnabled}
            onChange={() => setVibrationEnabled(!vibrationEnabled)}
            className="h-5 w-5"
          />
        </div>

        {/* Dark Mode */}
        <div className="flex justify-between items-center mb-3">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-5 w-5"
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingModal;
