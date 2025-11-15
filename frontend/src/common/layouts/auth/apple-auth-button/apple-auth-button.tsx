import { ReactElement, useEffect } from 'react';
import { styled } from '@mui/material';
import { Apple } from '@mui/icons-material';
import Button from '../../../ui/button';
import { colors } from '../../../../config/theme/colors';

declare let AppleID: any;

const clientId = 'com.test.client';
const scope = 'name email';
const redirectURI = 'test';
const state = 'origin:web';

const AppleButton = styled(Button)(
  () => `
    width: 154px;
    height: 50px;
    color: black !important;
    border: 1px solid ${colors.secondary[20]};
`,
);

interface Props {
  disabled: boolean;
}

const AppleAuthButton = ({ disabled }: Props): ReactElement => {
  useEffect(() => {
    AppleID.auth.init({
      clientId,
      scope,
      redirectURI,
      state,
      usePopup: true,
    });

    document.addEventListener('AppleIDSignInOnSuccess', (event) => {
      console.log('Success ', event);
    });

    document.addEventListener('AppleIDSignInOnFailure', (event) => {
      console.log('Error ', event);
    });
  }, []);

  // return (
  //   <div
  //     id="appleid-signin"
  //     className="signin-button"
  //     data-color="black"
  //     data-border="true"
  //     data-type="sign-in"
  //   ></div>
  // )

  return (
    <AppleButton id="appleid-signin" sx={{ mt: 3 }} disabled={disabled}>
      <Apple color="inherit" fontSize="large" />
    </AppleButton>
  );
};

export default AppleAuthButton;
