import { ReactElement, SyntheticEvent } from 'react';
import { FormControlLabel, styled, SwitchProps, Switch as MuiSwitch, SxProps } from '@mui/material';

type ColorType = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

const CustomSwitch = styled((props: SwitchProps) => (
  <MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, color }) => ({
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
        backgroundColor: theme.palette[(color as ColorType) || 'success'].light,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.success.light,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

interface Props {
  sx?: SxProps;
  label?: string;
  color?: ColorType;
  checked: boolean;
  onChange: (e: SyntheticEvent<Element, Event>, checked: boolean) => void;
}

const Switch = ({ label, checked, onChange, color, ...props }: Props): ReactElement => {
  return (
    <FormControlLabel
      {...props}
      control={<CustomSwitch sx={{ m: 1 }} color={color} defaultChecked />}
      label={label || ''}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Switch;
