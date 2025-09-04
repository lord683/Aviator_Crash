import React, { useEffect, useState } from "react";

interface BetAutoSwitchProps {
  stopOnLoss: boolean;
  stopOnWin: boolean;
  betValue: number | string;
  multiplier: number;
  aviatorState: {
    balance: number | string;
  };
  setActive: (active: boolean) => void;
}

const BetAutoSwitch: React.FC<BetAutoSwitchProps> = ({
  stopOnLoss,
  stopOnWin,
  betValue,
  multiplier,
  aviatorState,
  setActive,
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const balanceNum = Number(aviatorState.balance);
      const betValueNum = Number(betValue);

      if ((stopOnLoss && balanceNum < betValueNum) || (stopOnWin && balanceNum > betValueNum * multiplier)) {
        setActive(false);
      }
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [stopOnLoss, stopOnWin, betValue, multiplier, aviatorState, setActive]);

  return <></>;
};

export default BetAutoSwitch;
