import { type ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { TextField, PasswordField } from '../../../../../../common/ui/text-field';
import { SignInRequestDto } from '../../../../../../services/api/auth/dto/sign-in-request.dto';
import Button from '../../../../../../common/ui/button';
import { Box, Divider, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors } from '../../../../../../config/theme/colors';
import { ProviderRouteEnum } from '../../../../routes/enums/route.enum';
import { UserTypesEnum } from '../../../../../../enums/user-types.enum';
import GoogleAuthButton from '../../../../../../common/layouts/auth/google-auth-button';

const StyledLink = styled(Link)(
  () => `
  margin-top: 4px;
  text-decoration: none;
  color: ${colors.primary[60]};
  font-size: 14px;
`,
);

const SignInFormContent = (): ReactElement => {
  const { isSubmitting } = useFormikContext<SignInRequestDto>();

  return (
    <Form>
      <TextField label="Email" name="email" fullWidth />
      <PasswordField label="Password" name="password" fullWidth />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <StyledLink to={ProviderRouteEnum.PASSWORD_RECOVERY}>Forgot password?</StyledLink>
      </Box>
      <Divider sx={{ mt: 3 }}>Or with</Divider>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleAuthButton userType={UserTypesEnum.PROVIDER} disabled={isSubmitting} />
      </Box>
      <Button
        sx={{ mt: 6, mb: 3 }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Continue
      </Button>
      <Typography sx={{ textAlign: 'center', mb: 10 }}>
        Don&apos;t have an account yet?
        <StyledLink to={ProviderRouteEnum.SIGN_UP}> Sign Up</StyledLink>
      </Typography>
    </Form>
  );
};

export default SignInFormContent;
