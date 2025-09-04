import React from "react";

interface TopLogoBarProps {
  title: string;
}

const TopLogoBar: React.FC<TopLogoBarProps> = ({ title }) => {
  return (
    <div className="top-logo-bar">
      <h1>{title}</h1>
    </div>
  );
};

export default TopLogoBar;
