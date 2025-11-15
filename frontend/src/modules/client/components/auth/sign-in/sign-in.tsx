import { type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { type SignInRequestDto } from '../../../../../services/api/auth/dto/sign-in-request.dto';
import { signIn } from '../../../../../store/actions/auth';
import * as Yup from 'yup';
import { Formik, type FormikHelpers } from 'formik';
import SignInFormContent from './sign-in-form-content';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import AuthPage from '../../../../../common/layouts/auth/auth-page';
import { AuthStorage } from '../../../../../services/storage/auth.storage';
import { ClientRouteEnum } from '../../../routes/enums/route.enum';
import { UserStatusesEnum } from '../../../../../enums/user-statuses.enum';
import { defaultSignInValue } from '../../../../../services/api/auth';
import AuthImageSlider from '../../../../../common/layouts/auth/auth-image-slider';
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
        (res = {}, status) => {
          if (status === 401) {
            setErrors({
              email: 'Wrong login credentials',
            });
          } else {
            errorSnackbar("Can't login. Please try later");
          }
          setSubmitting(false);
        },
      ),
    );
  };

  return (
    <AuthPage
      title="Sign In"
      subtitle="Welcome to Therappy!"
      description="Sign up below so we can get you going with one of our hand picked therapists"
      image="/img/signup-client.jpg"
      imageSlider={<AuthImageSlider />}
    >
      <Formik initialValues={defaultSignInValue} onSubmit={handleSubmit} validationSchema={validationSchema()}>
        <SignInFormContent />
      </Formik>
    </AuthPage>
  );
};

export default SignIn;
