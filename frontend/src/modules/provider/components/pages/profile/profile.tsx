import { FC, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';

import PageContainer from '../../../../../common/ui/page-container';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import PersonalDetails from './personal-details';
import ServicesAndLocation from './services-and-location';
import WorkingTime from './working-time';
import { IProvider } from '../../../../../services/api/provider/dto/provider.dto';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { updateProvider } from '../../../../../store/actions/providers';
import { useDispatch, useSelector } from "react-redux";
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import { useAuthUser, useConfirmation } from '../../../../../hooks';
import { defaultProviderValue, ProviderApi } from '../../../../../services/api/provider';
import providerValidationSchema from '../../../../../services/api/provider/validations/provider-validation-schema';
import { getAuthUser } from '../../../../../store/actions/auth';
import { prepareEditableProvider } from '../../../../../helpers/provider.helper';
import { selectUsers } from "../../../../../store/selectors";

export enum Tabs {
  PERSONAL_DETAILS,
  SERVICES_AND_LOCATION,
  WORKING_TIME,
}

const tabComponents: { [key: number]: FC<{ loading: boolean }> } = {
  [Tabs.PERSONAL_DETAILS]: PersonalDetails,
  [Tabs.SERVICES_AND_LOCATION]: ServicesAndLocation,
  [Tabs.WORKING_TIME]: WorkingTime,
};

const Profile = (): ReactElement => {
  const [activeTab, setActiveTab] = useState<number>(Tabs.PERSONAL_DETAILS);
  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const formRef: MutableRefObject<FormikProps<IProvider> | null> = useRef<FormikProps<IProvider> | null>(null);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const { errorSnackbar, successSnackbar } = useSnackbar();
  const user = useAuthUser();
  const { Confirmation, showConfirmation } = useConfirmation();
  const { additionalList } = useSelector(selectUsers);

  const getProvider = async (id: number) => {
    setLoading(true);
    try {
      const provider = await ProviderApi.getById(id);
      setProvider(
        prepareEditableProvider({
          ...provider,
          details: {
            ...provider.details,
            has_bank_details: true,
          },
        }),
      );
    } catch (e) {
      errorSnackbar("Something went wrong. Can't get therapist data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    getProvider(user.id);
  }, [user]);

  const saveChanges = (data: IProvider, callback: () => void) => {
    setLoading(true);

    dispatch(
      updateProvider(
        data,
        false,
        () => {
          successSnackbar('Your changes saved successfully');
          dispatch(getAuthUser());
          getProvider(data.id);
          callback();
          setLoading(false);
        },
        () => {
          errorSnackbar("Can't save. Please try later");
          setLoading(false);
          callback();
        },
      ),
    );
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

  const handleSubmit = (values: IProvider, { setSubmitting }: FormikHelpers<IProvider>) => {
    saveChanges(values, () => setSubmitting(false));
  };

  const handleReset = (values: IProvider, { setValues }: FormikHelpers<IProvider>) => {
    if (provider) {
      setValues(provider);
    }
  };

  const TabComponent: FC<{ loading: boolean }> = tabComponents[activeTab];

  return (
    <PageContainer
      title={!isMobile ? 'Settings' : undefined}
      tabs={[
        { label: 'Personal Details', id: Tabs.PERSONAL_DETAILS },
        { label: 'Services & Location', id: Tabs.SERVICES_AND_LOCATION },
        { label: 'Working Time', id: Tabs.WORKING_TIME },
      ]}
      activeTab={activeTab}
      onTabChange={handleChangeTab}
    >
      {Confirmation}
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
    </PageContainer>
  );
};

export default Profile;
