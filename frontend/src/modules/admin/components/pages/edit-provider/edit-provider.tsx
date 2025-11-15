import { Box, Container, Grid, IconButton, Skeleton, styled, Typography, useTheme } from '@mui/material';
import React, { FC, MutableRefObject, type ReactElement, useEffect, useRef, useState } from 'react';
import { KeyboardBackspaceRounded } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminRouteEnum } from '../../../routes/enums/route.enum';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { defaultProviderValue, ProviderApi } from '../../../../../services/api/provider';
import providerValidationSchema from '../../../../../services/api/provider/validations/provider-validation-schema';
import { useConfirmation } from '../../../../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { IProvider, ProviderAdditional } from '../../../../../services/api/provider/dto/provider.dto';
import { getServiceCategories, prepareEditableProvider } from '../../../../../helpers/provider.helper';
import UserDetails from './user-details';
import { updateProvider } from '../../../../../store/actions/providers';
import ServicesAndLocation from './services-and-location';
import MobilePageTabs from '../../../../../common/ui/page-container/mobile-page-tabs';
import DesktopPageTabs from '../../../../../common/ui/page-container/desktop=page-tabs';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import Button from '../../../../../common/ui/button';
import { colors } from '../../../../../config/theme/colors';
import { getImagePath } from '../../../../../helpers/image.helper';
import UserDetailsCard from '../../../../../common/components/user-details-card';
import Documents from './documents';
import Schedule from './schedule';
import { ProviderAdditionalsEnum } from '../../../../../enums/provider-additionals.enum';
import { ImageSizesEnum } from '../../../../../enums/image-sizes.enum';
import { selectUsers } from '../../../../../store/selectors';
import { defaultProviderDetailsValue } from '../../../../../services/api/provider/default-provider-value';

const UserDataContainer = styled(Grid)(
  ({ theme }) => `
   padding: 8px 32px;
   border-radius: 12px;
   border: 1px solid ${colors.secondary[30]};
   background: ${colors.background.BG_1};
  
   @media (max-width: ${theme.breakpoints.values.md}px) {
     margin-left: 0 !important;
     padding-right: 0 !important;
   }
`,
);

const UserDetailsSkeleton = () => {
  return (
    <Box display="flex">
      <Skeleton sx={{ borderRadius: 1 }} variant="rectangular" width={64} height={64} />
      <Box>
        <Skeleton sx={{ ml: 2 }} variant="text" width={200} height={34} />
        <Skeleton sx={{ ml: 2 }} variant="text" width={140} height={28} />
      </Box>
    </Box>
  );
};

export enum Tabs {
  USER_DETAILS,
  SERVICES_AND_LOCATION,
  DOCUMENTS,
  SCHEDULE,
}

const tabComponents: { [key: number]: FC<{ loading: boolean }> } = {
  [Tabs.USER_DETAILS]: UserDetails,
  [Tabs.SERVICES_AND_LOCATION]: ServicesAndLocation,
  [Tabs.DOCUMENTS]: Documents,
  [Tabs.SCHEDULE]: Schedule,
};

const EditProvider = (): ReactElement | null => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<number>(Tabs.USER_DETAILS);
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [categories, setCategories] = useState<string>('');
  const formRef: MutableRefObject<FormikProps<IProvider> | null> = useRef<FormikProps<IProvider> | null>(null);
  const theme = useTheme();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Confirmation, showConfirmation } = useConfirmation();
  const { errorSnackbar, successSnackbar } = useSnackbar();
  const { additionalList } = useSelector(selectUsers);

  const getProvider = async () => {
    setLoading(true);
    try {
      const provider = await ProviderApi.getById(parseInt(id || ''));
      setProvider({
        ...prepareEditableProvider(provider),
        details: provider.details || defaultProviderDetailsValue,
      });
      setCategories(getServiceCategories(provider));
    } catch (e) {
      errorSnackbar("Something went wrong. Can't get therapist data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProvider();
  }, []);

  const saveChanges = (data: IProvider, callback: () => void) => {
    setLoading(true);

    dispatch(
      updateProvider(
        data,
        false,
        () => {
          successSnackbar('Your changes saved successfully');
          getProvider();
          callback();
        },
        () => {
          errorSnackbar("Can't save. Please try later");
          setLoading(false);
          callback();
        },
      ),
    );
  };

  const handleSubmit = (values: IProvider, { setSubmitting }: FormikHelpers<IProvider>) => {
    saveChanges(values, () => setSubmitting(false));
  };

  const handleReset = (values: IProvider, { setValues }: FormikHelpers<IProvider>) => {
    if (provider) {
      setValues(provider);
    }
  };

  const handleChangeTab = (tab: Tabs) => {
    if (formRef.current && formRef.current?.dirty && provider) {
      showConfirmation({
        text: 'Save your changes and switch?',
        description: 'When you switch to another tab, all changes are saved',
        onConfirm: () => {
          if (formRef.current) {
            saveChanges(formRef.current.values, () => {
              formRef.current?.setSubmitting(false);
              setActiveTab(tab);
            });
          }
        },
      });
    } else {
      setActiveTab(tab);
    }
  };

  const TabComponent: FC<{ loading: boolean }> = tabComponents[activeTab];
  const PageTabs = isMobile ? MobilePageTabs : DesktopPageTabs;

  return (
    <Container maxWidth="xl">
      {Confirmation}
      <Grid sx={{ pt: 6 }} container spacing={2} maxWidth={theme.breakpoints.values.xl}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => navigate(AdminRouteEnum.PROVIDERS)}>
              <KeyboardBackspaceRounded />
            </IconButton>
            <Typography variant="h6">SP Management</Typography>
          </Box>
        </Grid>
      </Grid>
      <UserDataContainer sx={{ mt: 3, mb: 3 }} container>
        <Grid item md={6} xs={12}>
          {loading || !provider ? (
            <UserDetailsSkeleton />
          ) : (
            <UserDetailsCard
              image={getImagePath(provider.image_id || 0, ImageSizesEnum.SMALL)}
              name={`${provider.first_name} ${provider.last_name}`}
              status={provider.status}
              workWithChildren={
                provider.additionals &&
                (provider.additionals[ProviderAdditionalsEnum.WORK_WITH_CHILDREN] as ProviderAdditional)?.checked
              }
              subtitle={
                <Typography variant="body2" color={colors.secondary[60]}>
                  {categories}
                </Typography>
              }
            />
          )}
        </Grid>
        <Grid item display="flex" justifyContent="end" alignItems="center" md={6} xs={12}>
          <Box>
            <Button sx={{ mr: 2 }} onClick={() => formRef.current?.resetForm()} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => formRef.current?.submitForm()}
              loading={loading}
              disabled={loading}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </UserDataContainer>
      <PageTabs
        tabs={[
          { label: 'User Details & Contacts', id: Tabs.USER_DETAILS },
          { label: 'Services & Location', id: Tabs.SERVICES_AND_LOCATION },
          { label: 'Documents', id: Tabs.DOCUMENTS },
          { label: "Therapist's Roster", id: Tabs.SCHEDULE },
        ]}
        activeTab={activeTab || Tabs.USER_DETAILS}
        onChange={handleChangeTab}
      />
      <Formik
        initialValues={provider || defaultProviderValue}
        onSubmit={handleSubmit}
        onReset={handleReset}
        validationSchema={providerValidationSchema(additionalList)}
        innerRef={formRef}
        enableReinitialize
      >
        <Form>
          <TabComponent loading={loading} />
        </Form>
      </Formik>
    </Container>
  );
};

export default EditProvider;
