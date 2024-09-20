import type { ReactElement, ReactNode } from 'react';
import { Button as MuiButton, CircularProgress, styled, Typography } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';

const StyledButton = styled(MuiButton)(
  () => `
  text-transform: none;
  box-shadow: unset;
  border-radius: 8px;
  height: 40px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  padding: 13px 24px;
  text-wrap: nowrap;
  
  &:hover {
     box-shadow: unset;
   }
`,
);

interface Props extends ButtonProps {
  startIcon?: ReactNode;
  loading?: boolean;
}

const Button = ({ loading, startIcon, children, ...props }: Props): ReactElement => {
  return (
    <StyledButton {...props}>
      {startIcon && (
        <Typography sx={{ mt: '2px', mr: 0.5 }} component="span">
          {startIcon}
        </Typography>
      )}
      {loading ? <CircularProgress color="inherit" size={20} /> : children}
    </StyledButton>
  );
};

export default Button;
