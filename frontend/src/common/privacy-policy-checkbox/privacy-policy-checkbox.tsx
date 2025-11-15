import React, { ReactElement } from 'react';
import { styled } from '@mui/material';
import { colors } from '../../config/theme/colors';
import CheckboxGroup from '../ui/checkbox-group';

const Link = styled('a')(
  () => `
    color: ${colors.primary[70]};
    text-decoration: none;
`,
);

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const PrivacyPolicyCheckbox = ({ checked, onChange }: Props): ReactElement => {
  return (
    <CheckboxGroup
      sx={{ mb: 3 }}
      label={
        <>
          I have read and agree to the{' '}
          <Link target="_blank" href="">
            Cancellation Policy
          </Link>
        </>
      }
      checked={checked}
      onChange={onChange}
    />
  );
};

export default PrivacyPolicyCheckbox;
