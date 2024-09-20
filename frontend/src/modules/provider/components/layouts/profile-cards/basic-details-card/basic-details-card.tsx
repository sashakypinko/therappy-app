import React, { ReactElement, useState } from 'react';
import Card from '../card';
import { Box, Checkbox, FormControlLabel, Grid, Skeleton, styled, Typography } from '@mui/material';
import Button from '../../../../../../common/ui/button';
import { colors } from '../../../../../../config/theme/colors';
import { TextField } from '../../../../../../common/ui/text-field';
import { useFormikContext } from 'formik';
import { IProvider, ProviderAdditional } from '../../../../../../services/api/provider/dto/provider.dto';
import CardSection from '../card-section';
import { CardPrimary } from '../../../../../../common/ui/icon-v2';
import AddBankDetailsModal from '../../../../../../common/components/modals/add-bank-details-modal';
import { ProviderContactTypesEnum } from '../../../../../../services/api/provider/enums/provider-contact-types.enum';
import OwnGenderRadioGroup from '../../../../../../common/components/own-gender-radio-group';
import UserImage from '../../../../../../common/components/user-image';
import DocumentsLoader from "../../../../../../common/components/documents-loader";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../../../../store/selectors";

const FieldDescription = styled(Typography)(
  () => `
    color: ${colors.secondary[50]};
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 12px;
`,
);

const FieldsGroupContainer = styled(Box)(
  () => `
    border-radius: 8px;
    border: 1px solid #D8D9DF;
    padding: 10px 12px 14px 12px;
`,
);

interface Props {
  fullInfo?: boolean;
  withoutImage?: boolean;
  loading?: boolean;
}

const BasicDetailsCard = ({ fullInfo, withoutImage, loading }: Props): ReactElement => {
  const { values, setFieldValue, errors, touched } = useFormikContext<IProvider>();
  const [openBankDetailsModal, setOpenBankDetailsModal] = useState<boolean>(false);
  const { additionalList } = useSelector(selectUsers);

  const handleChangeContact = (type: ProviderContactTypesEnum, field: 'name' | 'phone', value: string) => {
    setFieldValue(`details.contacts.${type}`, { ...values.details.contacts[type], [field]: value });
  };

  const addAdditional = (id: number, value: ProviderAdditional) => {
    setFieldValue(`additionals.${id}`, value);
  };

  const addDocument = (id: number, value: any) => {
    setFieldValue(`additionals.${id}`, value);
  };

  const removeDocument = (id: number) => {
    setFieldValue(`additionals.${id}`, { file: null, checked: false });
  };

  const emergencyContact = values.details.contacts[ProviderContactTypesEnum.EMERGENCY];
  const referenceContact = values.details.contacts[ProviderContactTypesEnum.REFERENCE];
  const secondReferenceContact = values.details.contacts[ProviderContactTypesEnum.SECOND_REFERENCE];

  return (
    <Card title="Basic details" subtitle="Enter your personal information.">
      <CardSection>
        <Grid sx={{ mt: 3 }} container>
          {!withoutImage && (
            <>
              <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} md={2}>
                <UserImage user={values} onChange={(file) => setFieldValue('details.image', file)} loading={loading} />
              </Grid>
              <Grid item xs={0} md={1} />
            </>
          )}
          <Grid item xs={12} md={withoutImage ? 12 : 9}>
            <TextField
              name="first_name"
              value={values.first_name}
              onOwnValueChange={(value) => setFieldValue('first_name', value)}
              placeholder="First name"
              loading={loading}
            />
            <TextField
              name="last_name"
              value={values.last_name}
              onOwnValueChange={(value) => setFieldValue('last_name', value)}
              placeholder="Last name"
              loading={loading}
            />
            <FieldDescription>
              Use your legal name as we will use it to verify you (e.g. ABN) and Police Check. Your clients will see
              your first name and initial only.
            </FieldDescription>
            <FieldsGroupContainer sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
                Your personal gender
              </Typography>
              <OwnGenderRadioGroup
                value={values.details.gender}
                onChange={(value) => setFieldValue('details.gender', value)}
                loading={loading}
              />
            </FieldsGroupContainer>
            <TextField
              name="details.phone"
              value={values.details.phone}
              onOwnValueChange={(value) => setFieldValue('details.phone', value)}
              placeholder="Phone number"
              loading={loading}
            />
            <TextField
              type="textarea"
              name="details.description"
              rows={4}
              value={values.details.description}
              maxLength={240}
              onOwnValueChange={(value) => setFieldValue('details.description', value)}
              placeholder="Tell us about your services and working history..."
              loading={loading}
            />
            {fullInfo && (
              <FieldsGroupContainer sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  References
                </Typography>
                <TextField
                  label="First referee name"
                  value={referenceContact?.name || ''}
                  onChange={(e) => handleChangeContact(ProviderContactTypesEnum.REFERENCE, 'name', e.target.value)}
                  placeholder="Enter referee’s name..."
                  loading={loading}
                  fullWidth
                />
                <TextField
                  label="First referee phone"
                  value={referenceContact?.phone || ''}
                  onChange={(e) => handleChangeContact(ProviderContactTypesEnum.REFERENCE, 'phone', e.target.value)}
                  placeholder="Enter referee’s phone number..."
                  loading={loading}
                  fullWidth
                />
                <TextField
                  label="Second referee name"
                  value={secondReferenceContact?.name || ''}
                  onChange={(e) =>
                    handleChangeContact(ProviderContactTypesEnum.SECOND_REFERENCE, 'name', e.target.value)
                  }
                  placeholder="Enter referee’s name..."
                  loading={loading}
                  fullWidth
                />
                <TextField
                  label="Second referee phone"
                  value={secondReferenceContact?.phone || ''}
                  onChange={(e) =>
                    handleChangeContact(ProviderContactTypesEnum.SECOND_REFERENCE, 'phone', e.target.value)
                  }
                  placeholder="Enter referee’s phone number..."
                  loading={loading}
                  fullWidth
                />
              </FieldsGroupContainer>
            )}
            <FieldsGroupContainer>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Emergency contact
              </Typography>
              <TextField
                label="Emergency contact name"
                value={emergencyContact?.name || ''}
                onOwnValueChange={(value) =>
                  handleChangeContact(ProviderContactTypesEnum.EMERGENCY, 'name', value as string)
                }
                placeholder="Enter referee’s name..."
                loading={loading}
              />
              <TextField
                label="Emergency contact phone"
                name="emergency_phone"
                value={emergencyContact?.phone || ''}
                onOwnValueChange={(value) =>
                  handleChangeContact(ProviderContactTypesEnum.EMERGENCY, 'phone', value as string)
                }
                placeholder="Enter referee’s phone number..."
                loading={loading}
              />
            </FieldsGroupContainer>
            {fullInfo && (
              <>
                {additionalList.filter(({ is_file }) => is_file === 0).map(({ id, therapist_title }) => {
                  if (loading) {
                    return (
                      <Skeleton
                        key={id}
                        sx={{ borderRadius: '8px', mt: 2 }}
                        variant="rectangular"
                        width="100%"
                        height={40}
                      />
                    );
                  }

                  if (!values.additionals) return null;
                  const checked = !!(values.additionals[id] as ProviderAdditional)?.checked;
                  return (
                    <FieldsGroupContainer sx={{ mt: 2, p: 2 }} key={id}>
                      <FormControlLabel
                        componentsProps={{
                          typography: {
                            fontSize: 14,
                          },
                        }}
                        onChange={(e, checked) => addAdditional(id, { file: null, checked })}
                        control={<Checkbox checked={checked} />}
                        label={therapist_title}
                      />
                      {checked && (
                        <DocumentsLoader
                          columns={1}
                          documents={values.additionals}
                          displayDocuments={[id]}
                          loading={loading}
                          errors={errors}
                          touched={touched}
                          onUpload={addDocument}
                          onRemove={removeDocument}
                        />
                      )}
                    </FieldsGroupContainer>
                  );
                })}
              </>
            )}
            <FieldsGroupContainer sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Bank Details
              </Typography>
              <Button sx={{ pl: 0 }} onClick={() => setOpenBankDetailsModal(true)}>
                <CardPrimary sx={{ mr: 1 }} />
                Add EFT info
              </Button>
              {errors.details?.has_bank_details && (
                <Typography variant="body2" color={colors.error[70]}>
                  {errors.details?.has_bank_details}
                </Typography>
              )}
            </FieldsGroupContainer>
          </Grid>
        </Grid>
      </CardSection>
      {!!values.id && (
        <AddBankDetailsModal
          open={openBankDetailsModal}
          providerId={values.id}
          onSave={() => setFieldValue('details.has_bank_details', true)}
          onClose={() => setOpenBankDetailsModal(false)}
        />
      )}
    </Card>
  );
};

export default BasicDetailsCard;
