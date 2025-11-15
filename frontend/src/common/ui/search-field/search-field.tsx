import type { ReactElement } from 'react';
import React, { ChangeEvent } from 'react';
import { styled } from '@mui/material';

import Search from '../icon/search';

const InputContainer = styled('div')(
  () => `
  display: flex;
  align-items: center;
`,
);

const Input = styled('input')(
  ({ theme, className }) => `
  width: 100%;
  height: 40px;
  padding: 7px 46px;
  font-size: 18px;
  border-radius: 8px;
  border: 0.5px solid #D8D9DF;
  
   &:active {
     border: 0.5px solid #D8D9DF;
   }
   
   ${(className || '').includes('error') ? `border: 0.5px solid ${theme.palette.error.main}` : ''}
`,
);

const SearchIcon = styled(Search)(
  () => `
    margin-right: -30px;
    z-index: 1;
`,
);

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  autoFocus?: boolean | undefined;
  fullWidth?: boolean | undefined;
}

const SearchField = (props: Props): ReactElement => {
  return (
    <InputContainer>
      <SearchIcon size={16} />
      <Input placeholder="Search..." {...props} />
    </InputContainer>
  );
};

export default SearchField;
