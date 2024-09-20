import { Container, Grid, styled, Typography } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { colors } from '../../../../../config/theme/colors';
import BasicDetailsCard from '../../layouts/profile-cards/basic-details-card';
import ScheduleCard from '../../layouts/profile-cards/schedule-card';
import ServicesCard from '../../layouts/profile-cards/services-card';
import LocationCard from '../../layouts/profile-cards/location-card';
import { Form, Formik, FormikHelpers } from 'formik';
import { IProvider } from '../../../../../services/api/provider/dto/provider.dto';
import Button from '../../../../../common/ui/button';
import { AuthStorage } from '../../../../../services/storage/auth.storage';
import { useDispatch, useSelector } from "react-redux";
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { updateProvider } from '../../../../../store/actions/providers';
import { useAuthUser } from '../../../../../hooks';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import { DaysEnum } from '../../../../../enums/days.enum';
import useWorkingHours from '../../../../../hooks/use-working-hours.hook';
import { defaultProviderValue } from '../../../../../services/api/provider';
import { ProviderApi } from '../../../../../services/api/provider';
import { ProviderRouteEnum } from '../../../routes/enums/route.enum';
import providerValidationSchema from '../../../../../services/api/provider/validations/provider-validation-schema';
import { IService } from '../../../../../services/api/service/dto/service.dto';
import { ServiceCategoriesEnum } from '../../../../../enums/service-categories.enum';
import { prepareEditableProvider } from "../../../../../helpers/provider.helper";
import { selectUsers } from "../../../../../store/selectors";

const Title = styled(Typography)(
  () => `
    font-size: 44px;
    font-weight: 500;
    line-height: 50px
`,
);

const Subtitle = styled(Typography)(
  () => `
    color: ${colors.secondary[60]};
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
`,
);

const hours = useWorkingHours();
const defaultTimeRange = { start: hours[0], end: hours[hours.length - 1] };

const defaultSchedule = {
  [DaysEnum.MON]: [defaultTimeRange],
  [DaysEnum.TUE]: [defaultTimeRange],
  [DaysEnum.WED]: [defaultTimeRange],
  [DaysEnum.THU]: [defaultTimeRange],
  [DaysEnum.FRI]: [defaultTimeRange],
};

const SetupAccount = (): ReactElement => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { errorSnackbar } = useSnackbar();
  const user = useAuthUser();
  const isMobile = useIsMobile();
  const { additionalList } = useSelector(selectUsers);

  const getProvider = async (id: number) => {
    try {
      const provider = await ProviderApi.getById(id);
      setProvider({
        ...prepareEditableProvider(provider),
        schedule: defaultSchedule,
        details: {
          ...provider.details,
          category_id: (provider.services[0] as IService)?.category_id || ServiceCategoriesEnum.PHYSIOTHERAPY,
          has_bank_details: false,
        },
      });
      setLoading(false);
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

  const handleSubmit = (values: IProvider, { setSubmitting }: FormikHelpers<IProvider>) => {
    if (!user) {
      return;
    }
    const requestData = { ...values };
    delete requestData.additionals;
    setSaving(true);
    dispatch(
      updateProvider(
        requestData,
        false,
        () => {
          AuthStorage.updateUser({
            withoutSidebar: false,
          });
          window.location.href = ProviderRouteEnum.APPOINTMENTS;
        },
        () => {
          errorSnackbar("Can't save. Please try later");
          setSubmitting(false);
          setSaving(false);
        },
      ),
    );
  };

  return (
    <Container component="main" maxWidth="lg">
      {!isMobile && (
        <Grid container>
          <Grid sx={{ ml: 2 }} item sm={12} md={6} lg={4}>
            <Title sx={{ mb: 3, mt: 8 }}>Set up your account</Title>
            <Subtitle sx={{ mt: 5, mb: 4 }}>
              At Therappy we will use your personal information to match you to clients
            </Subtitle>
          </Grid>
        </Grid>
      )}
      <Formik
        initialValues={provider || defaultProviderValue}
        onSubmit={handleSubmit}
        validationSchema={providerValidationSchema(additionalList)}
        enableReinitialize
      >
        <Form>
          <Grid container>
            <Grid item sm={12} md={7}>
              <BasicDetailsCard loading={loading} />
              <ScheduleCard loading={loading} />
            </Grid>
            <Grid item sm={12} md={5}>
              <ServicesCard loading={loading} />
              <LocationCard loading={loading} />
            </Grid>
            <Grid sx={{ display: 'flex', justifyContent: 'end', pr: 2, mb: 6, mt: 3 }} item md={12} xs={12}>
              <Button
                sx={{ width: 100, height: 48 }}
                variant="contained"
                type="submit"
                loading={saving}
                disabled={saving}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default SetupAccount;
