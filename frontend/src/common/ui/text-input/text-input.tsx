import React, { ChangeEvent, ReactNode } from 'react';
import type { ReactElement } from 'react';
import { BaseTextFieldProps, Box, styled, Theme, Typography } from '@mui/material';
import { colors } from '../../../config/theme/colors';
import { CircleError } from '../icon';

const InputContainer = styled(Box)(
  () => `
  position: relative;
  display: flex;
`,
);

const inputStyles = (theme: Theme, className: string | undefined) => `
  width: 100%;
  padding: 7px 16px;
  border-radius: 8px;
  border: 0.5px solid #D8D9DF;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px; 
  font-family: 'Inter';
  
   &:active {
     border: 0.5px solid #D8D9DF;
   }
   
   &::placeholder {
      color: ${colors.secondary[40]};
   }
   
   ${(className || '').includes('error') ? `border: 0.5px solid ${theme.palette.error.main};` : ''}
   ${(className || '').includes('with-start-icon') ? 'padding-left: 40px;' : ''}
`;

const Input = styled('input')(
  ({ theme, className }) => `
    ${inputStyles(theme, className)}
    height: 40px;
`,
);

const Textarea = styled('textarea')(
  ({ theme, className }) => `
    ${inputStyles(theme, className)}
    
    &::placeholder {
      color: ${colors.secondary[70]};
    }
`,
);

const StartIcon = styled('span')(
  () => `
    position: absolute;
    left: 15px;
    line-height: 0;
`,
);

const EndIcon = styled('span')(
  () => `
  margin: -50px;
  display: flex;
  align-items: center;
`,
);

const ErrorIcon = styled(CircleError)(
  () => `
  position: relative;
  margin: -39px;
`,
);

const MaxLengthLabel = styled(Typography)(
  () => `
    position: absolute;
    right: 12px;
    bottom: 2px;
    font-size: 14px;
    background: rgb(255, 255, 255, 0.8);
    padding: 4px;
    border-radius: 4px;
`,
);

interface Props extends BaseTextFieldProps {
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: boolean;
  onClick?: () => void;
  rows?: number;
  maxLength?: number;
}

const TextInput = ({
  value,
  type = 'text',
  placeholder = '',
  onChange,
  disabled,
  startIcon,
  endIcon,
  error = false,
  sx,
  className,
  name,
  onClick,
  rows,
  maxLength,
  onBlur,
  autoFocus,
}: Props): ReactElement => {
  const InputComponent = type === 'textarea' ? Textarea : Input;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) {
      return;
    }
    onChange && onChange(e);
  };

  const valueLength = (typeof value === 'number' ? value.toString() : value || '').length;

  return (
    <InputContainer sx={{ alignItems: type === 'textarea' ? 'start' : 'center' }}>
      {startIcon && <StartIcon sx={{ mt: type === 'textarea' ? 1.2 : 0 }}>{startIcon}</StartIcon>}
      <InputComponent
        className={`${className} ${error ? 'error' : ''} ${startIcon ? 'with-start-icon' : ''}`}
        name={name}
        sx={sx}
        value={value}
        type={type}
        placeholder={placeholder}
        onClick={() => onClick && onClick()}
        disabled={disabled}
        rows={rows}
        onChange={handleChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
      {error && <ErrorIcon sx={type === 'textarea' ? { top: 50 } : {}} />}
      {endIcon && !error && <EndIcon>{endIcon}</EndIcon>}
      {maxLength && type === 'textarea' && (
        <MaxLengthLabel color={maxLength === valueLength ? colors.error[60] : colors.secondary[40]}>
          {valueLength}/{maxLength}
        </MaxLengthLabel>
      )}
    </InputContainer>
  );
};

export default TextInput;
