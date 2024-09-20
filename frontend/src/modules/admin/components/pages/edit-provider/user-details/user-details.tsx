import React, { ReactElement, ReactNode, useState } from 'react';
import { Box, Grid, Skeleton, styled, Typography } from '@mui/material';
import Card from '../card';
import { TextField } from '../../../../../../common/ui/text-field';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import RadioGroup from '../../../../../../common/ui/radio-group';
import { PersonalGenderLabels } from '../../../../../../enums/genders.enum';
import { colors } from '../../../../../../config/theme/colors';
import Button from '../../../../../../common/ui/button';
import { Card as CardIcon } from '../../../../../../common/ui/icon-v2';
import { ProviderContactTypesEnum } from '../../../../../../services/api/provider/enums/provider-contact-types.enum';
import AddBankDetailsModal from '../../../../../../common/components/modals/add-bank-details-modal';

const RadioButtonBox = styled(Box)(
  () => `
    width: 100%;
    padding-left: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid ${colors.secondary[30]};
  `,
);

interface UserDetailsFieldProps {
  label: string;
  children: ReactNode;
}

const UserDetailsField = ({ label, children }: UserDetailsFieldProps): ReactElement => {
  return (
    <Box display="flex">
      <Typography sx={{ mt: 1 }} width={220}>
        {label}
      </Typography>
      {children}
    </Box>
  );
};

const UserDetails = ({ loading }: { loading: boolean }): ReactElement => {
  const [openBankDetailsModal, setOpenBankDetailsModal] = useState<boolean>(false);
  const { values, setFieldValue } = useFormikContext<IProvider>();

  const handleChangeContact = (type: ProviderContactTypesEnum, field: 'name' | 'phone', value: string) => {
    setFieldValue(`details.contacts.${type}`, { ...values.details.contacts[type], [field]: value });
  };

  const emergencyContact = values.details.contacts[ProviderContactTypesEnum.EMERGENCY];
  const referenceContact = values.details.contacts[ProviderContactTypesEnum.REFERENCE];
  const secondReferenceContact = values.details.contacts[ProviderContactTypesEnum.SECOND_REFERENCE];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card title="User Details">
          <UserDetailsField label="First Name">
            <TextField name="first_name" loading={loading} fullWidth />
          </UserDetailsField>
          <UserDetailsField label="Last Name">
            <TextField name="last_name" loading={loading} fullWidth />
          </UserDetailsField>
          <UserDetailsField label="User’s Gender">
            <RadioButtonBox>
              <RadioGroup
                row
                value={values.details.gender}
                options={PersonalGenderLabels}
                onChange={(value) => setFieldValue('details.gender', value)}
                loading={loading}
              />
            </RadioButtonBox>
          </UserDetailsField>
          <UserDetailsField label="Email Address">
            <TextField name="email" loading={loading} fullWidth />
          </UserDetailsField>
          <UserDetailsField label="Phone Number">
            <TextField name="details.phone" loading={loading} fullWidth />
          </UserDetailsField>
          <UserDetailsField label="Bank Details">
            {loading ? (
              <Skeleton sx={{ borderRadius: '8px', mb: 2 }} variant="rectangular" width="100%" height={40} />
            ) : (
              <Button sx={{ ml: -9 }} color="inherit" onClick={() => setOpenBankDetailsModal(true)}>
                <CardIcon sx={{ mr: 1 }} /> Change EFT info
              </Button>
            )}
          </UserDetailsField>
        </Card>
        <Card title="Emergency contact">
          <TextField
            label="Emergency contact name"
            value={emergencyContact?.name || ''}
            onChange={(e) => handleChangeContact(ProviderContactTypesEnum.EMERGENCY, 'name', e.target.value)}
            loading={loading}
            fullWidth
          />
          <TextField
            label="Emergency contact phone"
            value={emergencyContact?.phone || ''}
            onChange={(e) => handleChangeContact(ProviderContactTypesEnum.EMERGENCY, 'phone', e.target.value)}
            loading={loading}
            fullWidth
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card title="References">
          <TextField
            label="First referee name"
            value={referenceContact?.name || ''}
            onChange={(e) => handleChangeContact(ProviderContactTypesEnum.REFERENCE, 'name', e.target.value)}
            loading={loading}
            fullWidth
          />
          <TextField
            label="First referee phone"
            value={referenceContact?.phone || ''}
            onChange={(e) => handleChangeContact(ProviderContactTypesEnum.REFERENCE, 'phone', e.target.value)}
            loading={loading}
            fullWidth
          />
          <TextField
            label="Second referee name"
            value={secondReferenceContact?.name || ''}
            onChange={(e) => handleChangeContact(ProviderContactTypesEnum.SECOND_REFERENCE, 'name', e.target.value)}
            loading={loading}
            fullWidth
          />
          <TextField
            label="Second referee phone"
            value={secondReferenceContact?.phone || ''}
            onChange={(e) => handleChangeContact(ProviderContactTypesEnum.SECOND_REFERENCE, 'phone', e.target.value)}
            loading={loading}
            fullWidth
          />
        </Card>
      </Grid>
      {
        !!values.id && (
          <AddBankDetailsModal
            open={openBankDetailsModal}
            providerId={values.id}
            onClose={() => setOpenBankDetailsModal(false)}
          />
        )
      }
    </Grid>
  );
};

export default UserDetails;
