import React, { type ReactElement, useState } from 'react';
import { Form, useFormikContext } from 'formik';
import Button from '../../../../../../common/ui/button';
import { Box, Checkbox, FormControlLabel, styled, Typography } from '@mui/material';
import { colors } from '../../../../../../config/theme/colors';
import { TextField } from '../../../../../../common/ui/text-field';
import { Link } from 'react-router-dom';
import CustomTooltip from '../../../../../../common/ui/custom-tooltip';
import { InfoOutlined } from '@mui/icons-material';
import { IProvider, ProviderAdditional } from '../../../../../../services/api/provider/dto/provider.dto';
import { ParsedUserStatuses } from '../../../../../../enums/working-visa-types.enum';
import SelectField from '../../../../../../common/ui/select-field';
import { ProviderContactTypesEnum } from '../../../../../../services/api/provider/enums/provider-contact-types.enum';
import DocumentsLoader from "../../../../../../common/components/documents-loader";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../../../../store/selectors";

const SectionTitle = styled(Typography)(
  () => `
    margin-top: 24px;
    color: ${colors.secondary[90]};
`,
);

const SectionDescription = styled(Typography)(
  () => `
    color: ${colors.secondary[60]};
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: 400;
    line-height: 24px
`,
);

const PolicyLink = styled(Link)(
  () => `
    color: ${colors.secondary[90]};
`,
);

interface Props {
  onBackClick: () => void;
}

const SignUpLastStepFormContent = ({ onBackClick }: Props): ReactElement => {
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState<boolean>(false);
  const { values, errors, touched, setFieldValue, isSubmitting } = useFormikContext<IProvider>();
  const { additionalList } = useSelector(selectUsers);

  const addAdditional = (id: number, value: ProviderAdditional) => {
    setFieldValue(`additionals.${id}`, value);
  };

  const addDocument = (id: number, value: any) => {
    setFieldValue(`additionals.${id}`, value);
  };

  const removeDocument = (id: number) => {
    setFieldValue(`additionals.${id}`, { file: null, checked: false });
  };

  const handleChangeContact = (type: ProviderContactTypesEnum, field: 'name' | 'phone', value: string) => {
    setFieldValue(`details.contacts.${type}`, { ...values.details.contacts[type], [field]: value });
  };

  const referenceContact = values.details.contacts[ProviderContactTypesEnum.REFERENCE];
  const secondReferenceContact = values.details.contacts[ProviderContactTypesEnum.SECOND_REFERENCE];

  return (
    <Form>
      <SectionTitle variant="h4">Required documents</SectionTitle>
      <SectionDescription>Upload required documents to complete your registration</SectionDescription>
      <DocumentsLoader
        columns={1}
        documents={values.additionals}
        loading={isSubmitting}
        errors={errors}
        touched={touched}
        onUpload={addDocument}
        onRemove={removeDocument}
      />
      <SectionTitle variant="h6" sx={{ mt: 3 }}>
        Working visa
      </SectionTitle>
      <SelectField
        sx={{ mt: 2 }}
        name="details.visa"
        options={Object.entries(ParsedUserStatuses).map(([value, label]) => ({ label, value }))}
        fullWidth
      />
      {errors.details?.visa && (
        <Typography variant="body2" color={colors.error[70]}>
          {errors.details.visa}
        </Typography>
      )}
      <SectionTitle variant="h6">Your Australian Business Number (ABN)</SectionTitle>
      <Typography sx={{ mb: 2 }} fontSize={14} color={colors.secondary[40]}>
        To accept any appointments(work) on our platform you must have an 11 digit ABN.
      </Typography>
      <TextField
        name="details.abn"
        onChange={(e) => {
          setFieldValue('details.abn', e.target.value.replace(/\D/g, ''));
        }}
        placeholder="Enter australian business number..."
        endIcon={
          <CustomTooltip
            title="
            Your ABN may be:
            A sole trader type in your name
            An incorporated entity of which you are a director
            If your ABN is an incorporated entity, email a copy of your ASIC or ABN document to
            help@therappy.com.au to show you are the director.
          "
          >
            <InfoOutlined sx={{ width: 24, height: 24 }} color="primary" />
          </CustomTooltip>
        }
      />

      <SectionTitle variant="h6" sx={{ mb: 2 }}>
        Your AHRPA registration number
      </SectionTitle>
      <TextField
        name="details.ahrpa_number"
        onChange={(e) => {
          setFieldValue('details.ahrpa_number', e.target.value.replace(/\D/g, ''));
        }}
        placeholder="Enter AHRPA number..."
      />

      <SectionTitle variant="h6">Remedial massage registration number</SectionTitle>
      <Typography sx={{ mb: 2 }} fontSize={14} color={colors.secondary[40]}>
        If you are a remedial massage therapist including oncology please enter your registration number
      </Typography>
      <TextField
        name="details.remedial_number"
        onChange={(e) => {
          setFieldValue('details.remedial_number', e.target.value.replace(/\D/g, ''));
        }}
        placeholder="Enter registration number..."
      />

      <SectionTitle variant="h4">References</SectionTitle>
      <SectionDescription>Please optionally provide two reference names and contact numbers</SectionDescription>
      <TextField
        label="First referee name"
        value={referenceContact?.name || ''}
        onChange={(e) => handleChangeContact(ProviderContactTypesEnum.REFERENCE, 'name', e.target.value)}
        placeholder="Enter referee’s name..."
        fullWidth
      />
      <TextField
        label="First referee phone"
        value={referenceContact?.phone || ''}
        onChange={(e) => handleChangeContact(ProviderContactTypesEnum.REFERENCE, 'phone', e.target.value)}
        placeholder="Enter referee’s phone number..."
        fullWidth
      />
      <TextField
        label="Second referee name"
        value={secondReferenceContact?.name || ''}
        onChange={(e) => handleChangeContact(ProviderContactTypesEnum.SECOND_REFERENCE, 'name', e.target.value)}
        placeholder="Enter referee’s name..."
        fullWidth
      />
      <TextField
        label="Second referee phone"
        value={secondReferenceContact?.phone || ''}
        onChange={(e) => handleChangeContact(ProviderContactTypesEnum.SECOND_REFERENCE, 'phone', e.target.value)}
        placeholder="Enter referee’s phone number..."
        fullWidth
      />

      <Typography sx={{ mt: 3 }} variant="body2">
        Additional
      </Typography>
      <Box sx={{ display: 'grid', mt: 1 }}>
        {additionalList.filter(({ is_file }) => is_file === 0).map(({ id, therapist_title }) => {
          if (!values.additionals) return null;

          const checked = !!(values.additionals[id] as ProviderAdditional)?.checked;

          return (
            <>
              <FormControlLabel
                key={id}
                componentsProps={{
                  typography: {
                    fontSize: 14,
                  },
                }}
                checked={checked}
                onChange={(e, checked) => addAdditional(id, { file: null, checked })}
                control={<Checkbox />}
                label={therapist_title}
              />
              {checked && (
                <DocumentsLoader
                  columns={1}
                  documents={values.additionals}
                  displayDocuments={[id]}
                  loading={isSubmitting}
                  errors={errors}
                  touched={touched}
                  onUpload={addDocument}
                  onRemove={removeDocument}
                />
              )}
            </>
          );
        })}
        <FormControlLabel
          sx={{ mt: 2 }}
          componentsProps={{
            typography: {
              fontSize: 14,
            },
          }}
          checked={privacyPolicyAccepted}
          control={<Checkbox />}
          onChange={(e, checked) => setPrivacyPolicyAccepted(checked)}
          label={
            <Typography>
              I have read and agree to the&nbsp;
              <PolicyLink to={''}>Privacy Policy</PolicyLink>,&nbsp;
              <PolicyLink to={''}>Terms & Conditions</PolicyLink>,&nbsp;
              <PolicyLink to={''}>Cancellation Policy</PolicyLink>&nbsp;*
            </Typography>
          }
        />
      </Box>

      <Button
        sx={{ mt: 3, mb: 3 }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={isSubmitting || !privacyPolicyAccepted}
        loading={isSubmitting}
      >
        Create account
      </Button>
      <Button sx={{ mb: 3 }} fullWidth onClick={onBackClick} disabled={isSubmitting}>
        Back
      </Button>
    </Form>
  );
};

export default SignUpLastStepFormContent;
