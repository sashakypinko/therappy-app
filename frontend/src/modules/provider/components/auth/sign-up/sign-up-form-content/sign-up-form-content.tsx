import { type ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { TextField, PasswordField } from '../../../../../../common/ui/text-field';
import Button from '../../../../../../common/ui/button';
import { Box, Divider, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors } from '../../../../../../config/theme/colors';
import { ProviderRouteEnum } from '../../../../routes/enums/route.enum';
import { SignUpRequestDto } from '../../../../../../services/api/auth/dto/sign-up-request.dto';
import GoogleAuthButton from '../../../../../../common/layouts/auth/google-auth-button';
import { UserTypesEnum } from '../../../../../../enums/user-types.enum';

const StyledLink = styled(Link)(
  () => `
  margin-top: 4px;
  text-decoration: none;
  color: ${colors.primary[60]};
  font-size: 14px;
`,
);

const SignUpFormContent = (): ReactElement => {
  const { isSubmitting } = useFormikContext<SignUpRequestDto>();

  return (
    <Form>
      <TextField label="First Name" name="first_name" fullWidth />
      <TextField label="Last Name" name="last_name" fullWidth />
      <TextField label="Your Email" name="email" fullWidth />
      <PasswordField label="Create Password" name="password" fullWidth />
      <Divider sx={{ mt: 3 }}>Or with</Divider>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleAuthButton userType={UserTypesEnum.PROVIDER} disabled={isSubmitting} />
      </Box>
      <Button
        sx={{ mt: 3, mb: 3 }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Continue
      </Button>
      <Typography sx={{ textAlign: 'center', mb: 10 }}>
        Already have an account?
        <StyledLink to={ProviderRouteEnum.SIGN_IN}> Log In</StyledLink>
      </Typography>
    </Form>
  );
};

export default SignUpFormContent;
