import { Box, FormControlLabel, Grid, Radio, RadioGroup, styled, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import Button from '../../../../../common/ui/button';
import { colors } from '../../../../../config/theme/colors';
import { UserApi } from '../../../../../services/api/user';
import useSnackbar from '../../../../../hooks/use-snackbar.hook';
import useIsMobile from '../../../../../hooks/use-is-mobile.hook';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../../../../../common/ui/text-field';

enum UserTypes {
  CLIENT = 1,
  THERAPIST,
}

const ImageContainer = styled(Grid)(
  () => `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
);

const FormContainer = styled(Grid)(
  () => `
    background: #fff;
    padding: 48px;
  `,
);

const Image = styled('img')(
  ({ theme }) => `
   width: 100%;
   
   @media (min-width: ${theme.breakpoints.values.md}px) {
    width: auto;
   }
`,
);

const Logo = styled('img')(
  () => `
  margin-top: 24px;
`,
);

const Title = styled(Typography)(
  () => `
  color: ${colors.secondary[90]};
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
`,
);

const InputLabel = styled(Typography)(
  () => `
  color: ${colors.secondary[90]};
`,
);

const InputGroup = styled(Box)(
  () => `
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
`,
);

interface SubscribeForm {
  type: UserTypes;
  email: string;
}

const initialValues: SubscribeForm = {
  type: UserTypes.CLIENT,
  email: '',
};

const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(() => 'Please enter correct email')
      .required(() => 'Please enter your email to subscribe'),
  });

const EmailForm = (): ReactElement => {
  const { values, isSubmitting, setFieldValue } = useFormikContext<SubscribeForm>();
  const isMobile = useIsMobile();

  return (
    <Form>
      <RadioGroup sx={{ mt: 2 }}>
        <FormControlLabel
          checked={values.type === UserTypes.CLIENT}
          control={<Radio />}
          onChange={() => setFieldValue('type', UserTypes.CLIENT)}
          label="I am a client wanting in home or mobile therapy"
        />
        <FormControlLabel
          checked={values.type === UserTypes.THERAPIST}
          control={<Radio />}
          onChange={() => setFieldValue('type', UserTypes.THERAPIST)}
          label="I am a therapist or business owner keen to learn more"
        />
      </RadioGroup>
      <InputLabel variant="h4" sx={{ mt: 3 }}>
        Don’t miss the launch
      </InputLabel>
      <InputGroup>
        <TextField name="email" placeholder="Enter your email" sx={{ width: '100%' }} />
        <Button type="submit" sx={{ ml: isMobile ? 1 : 10, width: 140 }} variant="contained" disabled={isSubmitting}>
          Subscribe
        </Button>
      </InputGroup>
    </Form>
  );
};

const TemporaryWelcomeSection = () => {
  const { errorSnackbar, successSnackbar } = useSnackbar();
  const isMobile = useIsMobile();

  const handleSubscribe = async (values: SubscribeForm, { resetForm, setSubmitting }: FormikHelpers<SubscribeForm>) => {
    try {
      await UserApi.subscribeOnLaunch(values);
      successSnackbar('You have been subscribed successfully.');
      resetForm();
      setSubmitting(false);
    } catch (e) {
      errorSnackbar('Something went wrong. Please try again');
    }
  };

  return (
    <Grid sx={{ minHeight: '100vh' }} container>
      {!isMobile && (
        <ImageContainer item md={6} sm={12}>
          <Image src="/img/maintenance.svg" />
        </ImageContainer>
      )}
      <FormContainer item md={6} sm={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Logo src="/img/logo.svg" />
        </Box>
        {isMobile && (
          <ImageContainer sx={{ mt: 6 }} item md={6} sm={12}>
            <Image src="/img/maintenance.svg" />
          </ImageContainer>
        )}
        <Title sx={{ mt: 10 }}>Therapy to you is coming soon!</Title>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Our passion is making therapy easier. Easier for you and easier for therapists. Join us on our journey as we
          plan to make yours better.
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubscribe}
          validationSchema={validationSchema()}
          enableReinitialize
        >
          <EmailForm />
        </Formik>
      </FormContainer>
    </Grid>
  );
};

export default TemporaryWelcomeSection;
