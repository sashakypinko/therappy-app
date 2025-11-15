import { type ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { Formik, type FormikHelpers } from 'formik';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import AuthPage from '../../../../../common/layouts/auth/auth-page';
import SignUpLastStepFormContent from './sign-up-last-step-form-content';
import { ProviderRouteEnum } from '../../../routes/enums/route.enum';
import { updateProvider } from '../../../../../store/actions/providers';
import { logout } from '../../../../../store/actions/auth';
import { useAuthUser } from '../../../../../hooks';
import { IProvider } from '../../../../../services/api/provider/dto/provider.dto';
import { defaultProviderValue, ProviderApi } from '../../../../../services/api/provider';
import { defaultProviderDetailsValue } from '../../../../../services/api/provider/default-provider-value';
import AuthImageSlider from '../../../../../common/layouts/auth/auth-image-slider';
import { getDocumentValidationRules } from "../../../../../services/api/provider/validations/provider-validation-schema";
import { IAdditional } from "../../../../../services/api/additional/dto/additional.dto";
import { selectUsers } from "../../../../../store/selectors";

const validationSchema = (additionalList: IAdditional[]) =>
  Yup.object().shape({
    additionals: Yup.object().shape(getDocumentValidationRules(additionalList)),
    details: Yup.object().shape({
      visa: Yup.number().required('Please select a type of visa'),
      abn: Yup.string().required('Please enter your business number'),
      ahrpa_number: Yup.string().required('Please enter AHRPA registration number'),
      remedial_number: Yup.string().required('Please enter remedial massage registration number'),
    }),
  });

const SignUpLastStep = (): ReactElement => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const dispatch = useDispatch();
  const { errorSnackbar } = useSnackbar();
  const user = useAuthUser();
  const { additionalList } = useSelector(selectUsers);

  const getProvider = async (id: number) => {
    try {
      const provider = await ProviderApi.getById(id);
      setProvider({
        ...provider,
        additionals: {},
        details: provider.details || defaultProviderDetailsValue,
      });
    } catch (e) {
      errorSnackbar("Something went wrong. Can't get user data.");
    }
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    getProvider(user.id);
  }, [user]);

  const handleSubmit = (values: IProvider, { resetForm, setSubmitting }: FormikHelpers<IProvider>) => {
    if (user) {
      dispatch(
        updateProvider(
          values,
          ProviderRouteEnum.ACCOUNT_VERIFICATION,
          () => {
            resetForm();
            window.location.reload();
          },
          () => {
            errorSnackbar("Can't login. Please try later");
            setSubmitting(false);
          },
        ),
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthPage title="Sign Up" image="/img/signup-therapist.jpg" imageSlider={<AuthImageSlider />}>
      <Formik
        initialValues={provider || defaultProviderValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema(additionalList)}
        enableReinitialize
      >
        <SignUpLastStepFormContent onBackClick={handleLogout} />
      </Formik>
    </AuthPage>
  );
};

export default SignUpLastStep;
