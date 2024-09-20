import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { CircularProgress, styled, Typography } from '@mui/material';
import { PasswordRecoveryProps, PasswordRecoverySteps, RecoveryStepProps } from '../pasword-recovery';
import AuthImageSlider from '../../auth-image-slider';
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../../../config/theme/colors';
import CodeInput from '../../../../ui/code-input';
import Button from '../../../../ui/button';
import AuthPage from '../../auth-page';
import { AuthApi } from '../../../../../services/api/auth';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import dayjs from 'dayjs';
import { AuthStorage } from '../../../../../services/storage/auth.storage';
import { Circle } from '@mui/icons-material';

const StyledLink = styled('a')(
  () => `
  margin-top: 4px;
  text-decoration: none;
  color: ${colors.primary[60]};
  font-size: 14px;
  cursor: pointer;
`,
);

interface EnterCodeForm {
  code: string;
}

const enterCodeValidationSchema = () =>
  Yup.object().shape({
    code: Yup.string()
      .min(4, 'Please enter your code')
      .required(() => 'Please enter your code'),
  });

const enterCodeInitialValues: EnterCodeForm = {
  code: '',
};

const FormContent = ({ signInLink, email, sendCode }: PasswordRecoveryProps): ReactElement => {
  const [timer, setTimer] = useState<number>(0);
  const { values, setFieldValue, isSubmitting, errors } = useFormikContext<EnterCodeForm>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const updateTimer = (timerValue: number) => {
    if (timerValue >= 0) {
      setTimer(timerValue);
      setTimeout(() => {
        updateTimer(timerValue - 1);
      }, 1000);
    }
  };

  const handleResend = useCallback(() => {
    setLoading(true);
    email &&
      sendCode(email).then(() => {
        updateTimer(100);
        AuthStorage.storeLastCodeSendTime(dayjs(new Date()).unix());
        setLoading(false);
      });
  }, [email, sendCode]);

  useEffect(() => {
    updateTimer(100 - (dayjs(new Date()).unix() - (AuthStorage.getLastCodeSendTime() || 0)) || 0);
  }, []);

  return (
    <Form>
      <CodeInput length={4} value={values.code} onChange={(code) => setFieldValue('code', code)} />
      <Button
        sx={{ mt: 4 }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={isSubmitting || !!errors.code}
        loading={isSubmitting}
      >
        Continue
      </Button>
      <Button
        sx={{ mt: 2, mb: 2 }}
        fullWidth
        variant="outlined"
        onClick={() => navigate(signInLink)}
        disabled={isSubmitting}
      >
        Back to log in
      </Button>
      <Typography sx={{ textAlign: 'center', mb: 10 }}>
        Didn&apos;t receive the email?
        {timer > 0 ? (
          ` resend in ${timer} sec`
        ) : !loading ? (
          <StyledLink onClick={handleResend}>{` Click to resend`}</StyledLink>
        ) : (
          <CircularProgress sx={{ ml: 3 }} size={18} />
        )}
      </Typography>
    </Form>
  );
};

const EnterCode: FC<RecoveryStepProps & PasswordRecoveryProps> = ({
  onStepChange,
  setToken,
  ...props
}: PasswordRecoveryProps & RecoveryStepProps): ReactElement => {
  const { errorSnackbar } = useSnackbar();

  const handleSubmit = async (values: EnterCodeForm, { setSubmitting }: FormikHelpers<EnterCodeForm>) => {
    try {
      const { token } = await AuthApi.applyResetPasswordCode({ ...values, email: props.email });
      setToken && setToken(token);
      onStepChange(PasswordRecoverySteps.SET_PASSWORD);
    } catch (e) {
      errorSnackbar('This code is not valid!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPage
      title="Password reset"
      description={`We sent a code to ${props.email}`}
      image={props.imageSrc}
      imageSlider={<AuthImageSlider />}
      paddingTop={30}
    >
      <Formik
        initialValues={enterCodeInitialValues}
        onSubmit={handleSubmit}
        validationSchema={enterCodeValidationSchema()}
        enableReinitialize
      >
        <FormContent {...props} />
      </Formik>
    </AuthPage>
  );
};

export default EnterCode;
