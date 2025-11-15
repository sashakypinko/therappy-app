import { FC, ReactElement } from 'react';
import AuthPage from '../../auth-page';
import { PasswordRecoveryProps, PasswordRecoverySteps, RecoveryStepProps } from '../pasword-recovery';
import AuthImageSlider from '../../auth-image-slider';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from '../../../../ui/text-field';
import Button from '../../../../ui/button';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { AuthApi } from '../../../../../services/api/auth';

interface SetPasswordForm {
  password: string;
  confirm_password: string;
}

const setPasswordValidationSchema = () =>
  Yup.object().shape({
    password: Yup.string()
      .required('Use at least 8 characters. Include both an uppercase, lowercase, number, and special character')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters with at least one of each: uppercase, lowercase, number, and special character',
      ),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required(() => 'Please confirm new password'),
  });

const setPasswordInitialValues: SetPasswordForm = {
  password: '',
  confirm_password: '',
};

const FormContent = ({ signInLink }: PasswordRecoveryProps): ReactElement => {
  const { isSubmitting } = useFormikContext<SetPasswordForm>();
  const navigate = useNavigate();

  return (
    <Form>
      <PasswordField label="New Password" name="password" fullWidth />
      <PasswordField label="Confirm Password" name="confirm_password" fullWidth />
      <Button sx={{ mt: 4 }} type="submit" fullWidth variant="contained" disabled={isSubmitting} loading={isSubmitting}>
        Reset password
      </Button>
      <Button sx={{ mt: 2 }} fullWidth variant="outlined" onClick={() => navigate(signInLink)} disabled={isSubmitting}>
        Back to log in
      </Button>
    </Form>
  );
};

const SetPassword: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  onStepChange,
  email,
  token,
  ...props
}: RecoveryStepProps & PasswordRecoveryProps): ReactElement => {
  const { errorSnackbar } = useSnackbar();

  const handleSubmit = async (values: SetPasswordForm, { setSubmitting }: FormikHelpers<SetPasswordForm>) => {
    if (email && token) {
      try {
        await AuthApi.resetPassword({ ...values, email, reset_password_token: token });
        onStepChange(PasswordRecoverySteps.DONE);
      } catch (e) {
        errorSnackbar('Error while updating your password');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <AuthPage
      title="Set new passord"
      description="Must be at least 8 characters"
      image={props.imageSrc}
      imageSlider={<AuthImageSlider />}
      paddingTop={30}
    >
      <Formik
        initialValues={setPasswordInitialValues}
        onSubmit={handleSubmit}
        validationSchema={setPasswordValidationSchema()}
        enableReinitialize
      >
        <FormContent {...props} />
      </Formik>
    </AuthPage>
  );
};

export default SetPassword;
