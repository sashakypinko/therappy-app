import React, { ReactElement } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Card from '../card';
import { useFormikContext } from 'formik';
import { IProvider, ProviderAdditional } from '../../../../../../services/api/provider/dto/provider.dto';
import { TextField } from '../../../../../../common/ui/text-field';
import ServicesMultiselect from '../../../../../../common/components/services-multiselect';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../../../store/selectors';
import RadioGroup from '../../../../../../common/ui/radio-group';
import { PreferenceGenderLabels } from '../../../../../../enums/genders.enum';
import { ProviderAdditionalsEnum } from '../../../../../../enums/provider-additionals.enum';
import { Compass } from '../../../../../../common/ui/icon';

const ServicesAndLocation = ({ loading }: { loading: boolean }): ReactElement => {
  const { values, setFieldValue } = useFormikContext<IProvider>();
  const { services } = useSelector(selectServices);

  const handleAdditionalChange = (additionalType: number, checked: boolean) => {
    setFieldValue(`additionals.${additionalType}`, { file: null, checked });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card title="Working history">
          <TextField name="details.description" type="textarea" rows={5} maxLength={240} loading={loading} />
        </Card>
        <Card>
          <Box display="flex" alignItems="center">
            <Typography width={220}>Work with children</Typography>
            <RadioGroup
              row
              value={
                values.additionals &&
                (values.additionals[ProviderAdditionalsEnum.WORK_WITH_CHILDREN] as ProviderAdditional)?.checked
                  ? 1
                  : 0
              }
              options={{ 1: 'Yes', 0: 'No' }}
              onChange={(value) => handleAdditionalChange(ProviderAdditionalsEnum.WORK_WITH_CHILDREN, !!value)}
              loading={loading}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography width={220}>Overseas residency</Typography>
            <RadioGroup
              row
              value={
                values.additionals &&
                (values.additionals[ProviderAdditionalsEnum.OVERSEAS_RESIDENCY] as ProviderAdditional)?.checked
                  ? 1
                  : 0
              }
              options={{ 1: 'Yes', 0: 'No' }}
              onChange={(value) => handleAdditionalChange(ProviderAdditionalsEnum.OVERSEAS_RESIDENCY, !!value)}
              loading={loading}
            />
          </Box>
        </Card>
        <Card title="Services">
          <ServicesMultiselect
            optionKey="name"
            categoryValue={values.details.category_id || services[values.services[0]]?.category_id || 1}
            values={values.services as number[]}
            onChange={(newValues) => setFieldValue('services', newValues)}
            loading={loading}
          />
        </Card>
        <Card title="Client Gender">
          <RadioGroup
            row
            value={values.details.preferred_gender}
            options={PreferenceGenderLabels}
            onChange={(value) => setFieldValue('details.preferred_gender', value)}
            loading={loading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card title="Location">
          <TextField
            type="textarea"
            rows={3}
            name="details.address"
            startIcon={<Compass size={16} />}
            loading={loading}
            fullWidth
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default ServicesAndLocation;
