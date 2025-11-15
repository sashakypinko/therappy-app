import React, { ReactElement, useState } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import Card from '../card';
import { colors } from '../../../../../../config/theme/colors';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../../../store/selectors';
import ServiceNotFoundModal from './service-not-found-modal';
import Button from '../../../../../../common/ui/button';
import CardSection from '../card-section';
import ServicesMultiselect from '../../../../../../common/components/services-multiselect';
import PreferredGenderRadioGroup from '../../../../../../common/components/preferred-gender-radio-group';

const StyledButton = styled(Button)(
  () => `
  padding-left: 0;
  text-decoration: underline;
`,
);

const ServicesCard = ({ loading }: { loading?: boolean }): ReactElement => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { values, isSubmitting, setFieldValue, errors, touched } = useFormikContext<IProvider>();
  const { services, loading: servicesLoading } = useSelector(selectServices);

  return (
    <Card title="Services you provide">
      <CardSection>
        <Grid sx={{ mt: 1 }} container>
          <Grid item md={12} xs={12}>
            <ServicesMultiselect
              optionKey="name"
              categoryValue={values.details.category_id || services[values.services[0]]?.category_id || 1}
              values={values.services as number[]}
              onChange={(newValues) => setFieldValue('services', newValues)}
              loading={servicesLoading || loading}
            />
            {errors.services && <Typography color={colors.error[70]}>{errors.services}</Typography>}
          </Grid>
          <Grid item md={12}>
            <StyledButton onClick={() => setOpenModal(true)}>Didn’t find your service? Click here</StyledButton>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
              Type of client you prefer to work with
            </Typography>
            <PreferredGenderRadioGroup
              value={values.details.preferred_gender}
              onChange={(value) => setFieldValue('details.preferred_gender', value)}
              loading={loading}
            />
          </Grid>
        </Grid>
      </CardSection>
      <ServiceNotFoundModal open={openModal} onClose={() => setOpenModal(false)} />
    </Card>
  );
};

export default ServicesCard;
