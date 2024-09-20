import { type ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../../../store/actions/auth';
import * as Yup from 'yup';
import { Formik, type FormikHelpers } from 'formik';
import SignUpFormContent from './sign-up-form-content';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import AuthPage from '../../../../../common/layouts/auth/auth-page';
import { SignUpRequestDto } from '../../../../../services/api/auth/dto/sign-up-request.dto';
import { ClientRouteEnum } from '../../../routes/enums/route.enum';
import { AuthStorage } from '../../../../../services/storage/auth.storage';
import { defaultSignUpValue } from '../../../../../services/api/auth';
import AuthImageSlider from '../../../../../common/layouts/auth/auth-image-slider';
import { PublicRouteEnum } from "../../../../public/routes/enums/route.enum";
import { replaceParamsInReactUrl } from "../../../../../helpers/url.helper";

const validationSchema = () =>
  Yup.object().shape({
    first_name: Yup.string()
      .required(() => 'Please enter your first name')
      .min(3, () => 'Please enter minimum 3 characters'),
    last_name: Yup.string()
      .required(() => 'Please enter your last name')
      .min(3, () => 'Please enter minimum 3 characters'),
    email: Yup.string()
      .email(() => 'This email is invalid')
      .required(() => 'Please enter your email'),
    password: Yup.string()
      .required('Use at least 8 characters. Include both an uppercase, lowercase, number, and special character')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters with at least one of each: uppercase, lowercase, number, and special character',
      ),
  });

const SignUp = (): ReactElement => {
  const dispatch = useDispatch();
  const { errorSnackbar } = useSnackbar();

  const handleSubmit = (values: SignUpRequestDto, { setSubmitting, setErrors }: FormikHelpers<SignUpRequestDto>) => {
    dispatch(
      signUp(
        values,
        (user) => {
          window.location.href = replaceParamsInReactUrl(PublicRouteEnum.EMAIL_VERIFICATION, { id: user.id, code: '' });
        },
        (res = {}, status) => {
          if (status === 401) {
            setErrors({
              email: res.errors.email,
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
      title="Get Therappy. Sign up here"
      subtitle="Let’s create your Therappy account"
      description="By signing up to a Therappy account you’ll be able to book, view and change all your appointments in one place"
      image="/img/signup-client.jpg"
      imageSlider={<AuthImageSlider />}
    >
      <Formik initialValues={defaultSignUpValue} onSubmit={handleSubmit} validationSchema={validationSchema()}>
        <SignUpFormContent />
      </Formik>
    </AuthPage>
  );
};

export default SignUp;
