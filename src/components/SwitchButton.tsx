// src/components/SwitchButton.tsx
import * as React from 'react';
import { Switch } from '@mui/material';

interface SwitchButtonProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ checked, onChange, disabled = false }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      sx={{
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: '#EFAC01',
              opacity: 1,
              border: 0,
            },
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: '#3E3E43',
          opacity: 1,
          transition: 'background-color 300ms',
        },
      }}
    />
  );
};

export default SwitchButton;
