import React, { ReactElement } from 'react';
import { Grid, Typography } from '@mui/material';
import Card from '../card';
import { TextField } from '../../../../../../common/ui/text-field';
import { useFormikContext } from 'formik';
import { IProvider, ProviderAdditional } from '../../../../../../services/api/provider/dto/provider.dto';
import { colors } from '../../../../../../config/theme/colors';
import SelectField from '../../../../../../common/ui/select-field';
import { ParsedUserStatuses } from '../../../../../../enums/working-visa-types.enum';
import DocumentsLoader from '../../../../../../common/components/documents-loader';

const Documents = ({ loading }: { loading: boolean }): ReactElement => {
  const { values, setFieldValue, errors, touched } = useFormikContext<IProvider>();

  const addDocument = (id: number, value: any) => {
    setFieldValue(`additionals.${id}`, value);
  };

  const removeDocument = (id: number) => {
    setFieldValue(`additionals.${id}`, { file: null, checked: false });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card title="Uploaded Documents">
          {values.additionals && (
            <DocumentsLoader
              documents={values.additionals}
              loading={loading}
              errors={errors}
              touched={touched}
              onUpload={addDocument}
              onRemove={removeDocument}
            />
          )}
        </Card>
        <Card title="Working Visa">
          <SelectField
            sx={{ mt: 2 }}
            name="details.visa"
            options={Object.entries(ParsedUserStatuses).map(([value, label]) => ({ label, value }))}
            loading={loading}
            fullWidth
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card title="Australian Business Number (ABN)">
          <Typography sx={{ mb: 2 }} fontSize={14} color={colors.secondary[40]}>
            This must be an 11-digit ABN
          </Typography>
          <TextField name="details.abn" maxLength={11} loading={loading} fullWidth />
        </Card>
        <Card title="AHRPA registration number">
          <TextField name="details.ahrpa_number" loading={loading} fullWidth />
        </Card>
        <Card title="Remedial massage registration number">
          <TextField name="details.remedial_number" loading={loading} fullWidth />
        </Card>
        {/* <Card title="Other Professional Registrations"> */}

        {/* </Card> */}
      </Grid>
    </Grid>
  );
};

export default Documents;
