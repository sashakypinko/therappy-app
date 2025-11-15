import React, { MouseEvent, ReactNode, useState, KeyboardEvent, ChangeEvent, useEffect, FocusEvent } from 'react';
import type { ReactElement } from 'react';
import { useField } from 'formik';
import { Box, IconButton, Skeleton, styled, Theme, Typography } from '@mui/material';

import { CircleError, InvisibleEye, VisibleEye } from '../icon';
import { SxProps } from '@mui/system/styleFunctionSx';
import { colors } from '../../../config/theme/colors';
import TextInput from '../text-input';

const Label = styled(Typography)(
  () => `
  font-size: 14px;
  margin: 4px 2px;
  color: ${colors.secondary[60]};
`,
);

const InputContainer = styled('div')(
  () => `
  position: relative;
  display: flex;
  align-items: center;
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

const ErrorIcon = styled(CircleError)(
  () => `
  margin: -39px;
`,
);

const ErrorText = styled(Typography)(
  () => `
  fontSize: 14px;
  margin: 10px 2px;
`,
);

const StyledIconButton = styled(IconButton)(
  () => `
  margin: -45px;
`,
);

interface Props {
  name?: string;
  label?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  type?: 'text' | 'number' | 'textarea';
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean | undefined;
  fullWidth?: boolean | undefined;
  defaultValue?: string | number;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  rows?: number;
  sx?: SxProps;
  inputStyle?: SxProps;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement>) => void;
  maxLength?: number;
  onOwnValueChange?: (value: string | number) => void;
}

export const TextField = ({
  name,
  label,
  className: additionalClassName,
  startIcon,
  endIcon,
  sx,
  inputStyle = {},
  value,
  onChange,
  onOwnValueChange,
  fullWidth,
  loading,
  ...props
}: Props): ReactElement => {
  const [ownValue, setOwnValue] = useState<string | number>('');
  const [field, meta] = useField<string>(name || 'default');
  const error = !!(meta.error && meta.touched);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOwnValue(e.target.value);
  };

  const handleBlur = (e: FocusEvent<any>) => {
    onOwnValueChange && onOwnValueChange(ownValue);
    field.onBlur(e);
  };

  useEffect(() => {
    if (onOwnValueChange) {
      setOwnValue(value || field.value);
    }
  }, [value]);

  return (
    <Box sx={sx || { mb: 2, width: fullWidth ? '100%' : 'auto' }}>
      {label && <Label>{label}</Label>}
      {loading ? (
        <Skeleton
          sx={{ borderRadius: '8px' }}
          variant="rectangular"
          width="100%"
          height={props.rows ? 30 * props.rows : 40}
        />
      ) : (
        <TextInput
          {...props}
          sx={inputStyle}
          id={name}
          className={additionalClassName}
          name={name}
          value={onOwnValueChange ? ownValue : value || field.value}
          onChange={onOwnValueChange ? handleChange : onChange || field.onChange}
          onBlur={onOwnValueChange ? handleBlur : field.onBlur}
          error={error}
          startIcon={startIcon}
          endIcon={endIcon}
          {...(props.type === 'textarea' ? {} : { type: props.type })}
        />
      )}
      {error && <ErrorText color="error">{meta.error}</ErrorText>}
    </Box>
  );
};

export const PasswordField = ({ name, label, className: additionalClassName, ...props }: Props): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [field, meta] = useField<string>(name || 'default');
  const error = meta.error && meta.touched;

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ mb: 2 }}>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <Input
          {...props}
          id={name}
          className={`${additionalClassName} ${error ? 'error' : ''}`}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
        {!error && (
          <StyledIconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
            {showPassword ? <VisibleEye /> : <InvisibleEye />}
          </StyledIconButton>
        )}
        {error && <ErrorIcon />}
      </InputContainer>
      {error && <ErrorText color="error">{meta.error}</ErrorText>}
    </Box>
  );
};
