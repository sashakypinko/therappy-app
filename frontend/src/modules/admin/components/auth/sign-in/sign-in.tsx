import { type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { type SignInRequestDto } from '../../../../../services/api/auth/dto/sign-in-request.dto';
import { signIn } from '../../../../../store/actions/auth';
import * as Yup from 'yup';
import { Formik, type FormikHelpers, useFormikContext } from 'formik';
import SignInFormContent from './sign-in-form-content';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { HttpStatusCode } from 'axios';
import AuthPage from '../../../../../common/layouts/auth/auth-page';
import { defaultSignInValue } from '../../../../../services/api/auth';
import { userLoginHandler } from '../../../../../helpers/auth.helper';

const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(() => 'This email is invalid')
      .required(() => 'Please enter your email'),
    password: Yup.string().required(
      () => 'Please enter your password',
    ),
  });

const SignIn = (): ReactElement => {
  const dispatch = useDispatch();
  const { errorSnackbar } = useSnackbar();

  const handleSubmit = (
    values: SignInRequestDto,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<SignInRequestDto>,
  ) => {
    dispatch(
      signIn(
        values,
        (user) => {
          userLoginHandler(user);
        },
        ({ statusCode, error } = {}) => {
          if (statusCode === HttpStatusCode.BadRequest) {
            setErrors({
              email: `validation.${error}`,
            });
          }
          setSubmitting(false);
          errorSnackbar("Can't login. Please try later");
        },
      ),
    );
  };

  return (
    <AuthPage
      title="Sign In"
      subtitle="Welcome to Therappy!"
      description="Please, put your login credentials below to start using our platform"
      image="/img/signin.jpg"
    >
      <Formik initialValues={defaultSignInValue} onSubmit={handleSubmit} validationSchema={validationSchema()}>
        <SignInFormContent />
      </Formik>
    </AuthPage>
  );
};

export default SignIn;
