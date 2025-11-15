import { type ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { TextField, PasswordField } from '../../../../../../common/ui/text-field';
import { SignInRequestDto } from '../../../../../../services/api/auth/dto/sign-in-request.dto';
import Button from '../../../../../../common/ui/button';

const SignInFormContent = (): ReactElement => {
  const { isSubmitting } = useFormikContext<SignInRequestDto>();

  return (
    <Form>
      <TextField label="Email" name="email" fullWidth />
      <PasswordField label="Password" name="password" fullWidth />
      <Button sx={{ mt: 6 }} type="submit" fullWidth variant="contained" disabled={isSubmitting} loading={isSubmitting}>
        Continue
      </Button>
    </Form>
  );
};

export default SignInFormContent;
