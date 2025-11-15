import { ChangeEvent, MutableRefObject, ReactElement, ReactNode, RefCallback, useRef } from 'react';
import Button from '../button';
import { Upload } from '../icon';
import { ButtonProps } from '@mui/material/Button/Button';

interface Props {
  children?: ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  ButtonProps?: ButtonProps;
  onChange: (file: File) => void;
  fileFieldRef?: MutableRefObject<any>;
  disabled?: boolean;
}

const FileField = ({ ButtonProps, onChange, fileFieldRef, variant, disabled, children }: Props): ReactElement => {
  const inputRef = fileFieldRef || useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (inputRef?.current?.click) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;

    if (files) {
      onChange(files[0]);
    }
  };

  return (
    <>
      <Button {...ButtonProps} onClick={handleClick} variant={variant || 'contained'} disabled={disabled}>
        {children || <Upload />}
      </Button>
      <input hidden multiple ref={inputRef} type="file" onChange={handleFileChange} />
    </>
  );
};

export default FileField;
