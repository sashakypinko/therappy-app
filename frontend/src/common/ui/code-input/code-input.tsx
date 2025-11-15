import React, {
  ChangeEvent, Fragment,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Skeleton, styled, Typography } from "@mui/material";
import { colors } from '../../../config/theme/colors';

const InputContainer = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    justify-content: space-around;
`,
);

const Input = styled('input')(
  () => `
    margin: 0px 4px;
    width: 100%;
    border-radius: 6px;
    border: 1px solid ${colors.secondary[40]}; 
    text-align: center;
`,
);

const Label = styled(Typography)(
  () => `
  font-size: 14px;
  margin: 4px 2px;
  color: ${colors.secondary[60]};
`,
);

const ErrorText = styled(Typography)(
  () => `
  fontSize: 14px;
  margin: 10px 2px;
`,
);

interface Props {
  label?: string;
  length: number;
  height?: number;
  type?: 'text' | 'number' | 'password';
  dividerAfter?: number;
  value: string;
  error?: string;
  loading?: boolean;
  onChange: (newValue: string) => void;
}

const CodeInput = ({
  label,
  length,
  type = 'text',
  height = 94,
  dividerAfter,
  error,
  value,
  onChange,
  loading,
}: Props): ReactElement => {
  const [init, setInit] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<number>(0);
  const inputRef = useRef<any[]>([]);

  useEffect(() => {
    inputRef.current[activeInput]?.focus();
  }, [activeInput]);

  useEffect(() => {
    if (!init && value.length) {
      setActiveInput(value.length > 0 ? value.length - 1 : 0);
      setInit(true);
    }
  }, [value]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const arrayOfValue = value.split('');
    arrayOfValue[index] = e.target.value;
    const newValue = arrayOfValue.join('');

    if (newValue.length > length) {
      return;
    }

    onChange(newValue);
    setActiveInput(newValue.length < length - 1 ? newValue.length : length - 1);
  };

  const handleClear: KeyboardEventHandler<HTMLInputElement> = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace') {
      onChange(value.slice(0, -1));
      setActiveInput(activeInput ? activeInput - 1 : 0);
    }
  };

  return (
    <Box>
      {label && <Label>{label}</Label>}
      <InputContainer>
        {loading ? (
          <Skeleton sx={{ borderRadius: '8px', mb: 2 }} variant="rectangular" width="100%" height={40} />
        ) : (
          <>
            {Array.from(Array(length).keys()).map((index) => (
              <Fragment key={index}>
                <Input
                  type={type}
                  sx={{ height, fontSize: height / 2, borderColor: error ? colors.error[60] : colors.secondary[40] }}
                  value={value[index] || ''}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={handleClear}
                  disabled={activeInput !== index}
                  ref={(input) => (inputRef.current[index] = input)}
                  autoFocus={index === 0}
                />
                {dividerAfter === index && <Typography fontSize={32}>-</Typography>}
              </Fragment>
            ))}
          </>
        )}
      </InputContainer>
      {error && <ErrorText color="error">{error}</ErrorText>}
    </Box>
  );
};

export default CodeInput;
