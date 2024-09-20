import { type ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik, type FormikHelpers } from 'formik';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import AuthPage from '../../../../../common/layouts/auth/auth-page';
import SignUpLastStepFormContent from './sign-up-last-step-form-content';
import { logout } from '../../../../../store/actions/auth';
import { useAuthUser } from '../../../../../hooks';
import { IClient } from '../../../../../services/api/client/dto/client.dto';
import { defaultClientValue } from '../../../../../services/api/client';
import AuthImageSlider from '../../../../../common/layouts/auth/auth-image-slider';
import { ClientApi } from '../../../../../services/api/client/client.api';
import { UserStatusesEnum } from '../../../../../enums/user-statuses.enum';
import { defaultClientDetailsValue } from '../../../../../services/api/client/default-client-value';
import { updateClient } from '../../../../../store/actions/clients';
import { ClientRouteEnum } from '../../../routes/enums/route.enum';
import { AuthStorage } from '../../../../../services/storage/auth.storage';
import { AppointmentStorage } from '../../../../../services/storage/appointment.storage';
import { createAppointment } from '../../../../../store/actions/appointments';
import { IAppointment } from '../../../../../services/api/appointment/dto/appointment.dto';
import { Navigate } from 'react-router-dom';
import { BookingsTabs } from '../../pages/bookings/bookings';

const validationSchema = () =>
  Yup.object().shape({
    first_name: Yup.string()
      .required(() => 'Please enter your first name')
      .min(3, () => 'Please enter minimum 3 characters'),
    last_name: Yup.string()
      .required(() => 'Please enter your last name')
      .min(3, () => 'Please enter minimum 3 characters'),
    details: Yup.object().shape({
      phone: Yup.string().required(() => 'Please enter your phone number'),
    }),
  });

const SignUpLastStep = (): ReactElement | null => {
  const [client, setClient] = useState<IClient | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasDetails, setHasDetails] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { errorSnackbar } = useSnackbar();
  const user = useAuthUser();

  const getClient = async (id: number) => {
    setLoading(true);
    try {
      const client = await ClientApi.getById(id);
      setHasDetails(!!client.details);
      setClient({
        ...client,
        status: UserStatusesEnum.ACTIVE,
        details: defaultClientDetailsValue,
      });
      setLoading(false);
    } catch (e) {
      errorSnackbar("Something went wrong. Can't get user data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    getClient(user.id);
  }, [user]);

  const handleCreateAppointment = (appointment: IAppointment) => {
    dispatch(
      createAppointment(appointment, ({ id }) => {
        AppointmentStorage.removeAppointment();
        window.location.href = `${ClientRouteEnum.BOOKINGS}?tab=${BookingsTabs.WAITING_FOR_PAYMENT}&openCartModal=1&selected=[${id}]`;
      }),
    );
  };

  const handleSubmit = (values: IClient, { setSubmitting }: FormikHelpers<IClient>) => {
    if (user) {
      dispatch(
        updateClient(
          values,
          false,
          () => {
            const storedAppointment = AppointmentStorage.getAppointment();

            AuthStorage.updateUser({
              withoutSidebar: false,
            });

            if (storedAppointment) {
              handleCreateAppointment(storedAppointment as unknown as IAppointment);
            } else {
              window.location.href = ClientRouteEnum.BOOKINGS;
            }
          },
          () => {
            errorSnackbar("Can't save user details. Please try later");
            setSubmitting(false);
          },
        ),
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return null;
  }

  if (hasDetails) {
    AuthStorage.updateUser({
      withoutSidebar: false,
      redirect: false,
    });
    return <Navigate to={ClientRouteEnum.BOOKINGS} />;
  }

  return (
    <AuthPage
      title="Get Therappy. Sign up here"
      subtitle="Let’s create your Therappy account"
      description="By signing up to a Therappy account you’ll be able to book, view and change all your appointments in one place"
      image="/img/signup-client.jpg"
      imageSlider={<AuthImageSlider />}
    >
      <Formik
        initialValues={client || defaultClientValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema()}
        enableReinitialize
      >
        <SignUpLastStepFormContent onBackClick={handleLogout} />
      </Formik>
    </AuthPage>
  );
};

export default SignUpLastStep;
