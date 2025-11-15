import { type ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { PasswordField, TextField } from '../../../../../../common/ui/text-field';
import Button from '../../../../../../common/ui/button';
import { Box, Divider, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors } from '../../../../../../config/theme/colors';
import { ClientRouteEnum } from '../../../../routes/enums/route.enum';
import { SignUpRequestDto } from '../../../../../../services/api/auth/dto/sign-up-request.dto';
import GoogleAuthButton from '../../../../../../common/layouts/auth/google-auth-button';
import { UserTypesEnum } from '../../../../../../enums/user-types.enum';
import { AppointmentStorage } from "../../../../../../services/storage/appointment.storage";
import { IAppointment } from "../../../../../../services/api/appointment/dto/appointment.dto";
import { createAppointment } from "../../../../../../store/actions/appointments";
import { BookingsTabs } from "../../../pages/bookings/bookings";
import { useDispatch } from "react-redux";
import { IUser } from "../../../../../../services/api/user/dto/user.dto";
import { UserStatusesEnum } from "../../../../../../enums/user-statuses.enum";
import { AuthStorage } from "../../../../../../services/storage/auth.storage";

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
  const dispatch = useDispatch();

  const handleCreateAppointment = (appointment: IAppointment) => {
    dispatch(
      createAppointment(appointment, ({ id }) => {
        AppointmentStorage.removeAppointment();
        window.location.href = `${ClientRouteEnum.BOOKINGS}?tab=${BookingsTabs.WAITING_FOR_PAYMENT}&openCartModal=1&selected=[${id}]`;
      }),
    );
  };

  const handleLogin = async (user: IUser) => {
    if (user.status === UserStatusesEnum.NEW) {
      AuthStorage.updateUser({
        withoutSidebar: true,
        redirect: ClientRouteEnum.SIGN_UP_LAST_STEP,
      });
      window.location.reload();
    } else {
      const storedAppointment = AppointmentStorage.getAppointment();

      if (storedAppointment) {
        handleCreateAppointment(storedAppointment as unknown as IAppointment);
      } else {
        window.location.href = ClientRouteEnum.BOOKINGS;
      }
    }
  };

  return (
    <Form>
      <TextField label="First Name" name="first_name" fullWidth />
      <TextField label="Last Name" name="last_name" fullWidth />
      <TextField label="Your Email" name="email" fullWidth />
      <PasswordField label="Create Password" name="password" fullWidth />
      <Divider sx={{ mt: 3 }}>Or with</Divider>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <GoogleAuthButton userType={UserTypesEnum.CLIENT} disabled={isSubmitting} onLogin={handleLogin} />
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
        <StyledLink to={ClientRouteEnum.SIGN_IN}> Log In</StyledLink>
      </Typography>
    </Form>
  );
};

export default SignUpFormContent;
