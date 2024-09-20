import * as Yup from 'yup';
import { FC, ReactElement } from 'react';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import AuthPage from '../../auth-page';
import { TextField } from '../../../../ui/text-field';
import Button from '../../../../ui/button';
import { useNavigate } from 'react-router-dom';
import { PasswordRecoveryProps, PasswordRecoverySteps, RecoveryStepProps } from '../pasword-recovery';
import AuthImageSlider from '../../auth-image-slider';

interface SendCodeForm {
  email: string;
}

const sendCodeValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(() => 'This email is invalid')
      .required(() => 'Please enter your email'),
  });

const sendCodeInitialValues: SendCodeForm = {
  email: '',
};

const FormContent = ({ signInLink }: PasswordRecoveryProps): ReactElement => {
  const { isSubmitting } = useFormikContext<SendCodeForm>();
  const navigate = useNavigate();

  return (
    <Form>
      <TextField label="Enter your email" name="email" fullWidth />
      <Button sx={{ mt: 4 }} type="submit" fullWidth variant="contained" disabled={isSubmitting} loading={isSubmitting}>
        Send verification code
      </Button>
      <Button sx={{ mt: 2 }} fullWidth variant="outlined" onClick={() => navigate(signInLink)} disabled={isSubmitting}>
        Back to log in
      </Button>
    </Form>
  );
};

const SendCode: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  onStepChange,
  ...props
}: PasswordRecoveryProps & RecoveryStepProps): ReactElement => {
  const handleSubmit = (values: SendCodeForm, { setSubmitting }: FormikHelpers<SendCodeForm>) => {
    props.sendCode(values.email).then(() => {
      setSubmitting(false);
    });
  };

  return (
    <AuthPage
      title="Forgot Password?"
      description="No worries, we’ll send you reset instructions"
      image={props.imageSrc}
      imageSlider={<AuthImageSlider />}
      paddingTop={30}
    >
      <Formik
        initialValues={sendCodeInitialValues}
        onSubmit={handleSubmit}
        validationSchema={sendCodeValidationSchema()}
        enableReinitialize
      >
        <FormContent {...props} />
      </Formik>
    </AuthPage>
  );
};

export default SendCode;
