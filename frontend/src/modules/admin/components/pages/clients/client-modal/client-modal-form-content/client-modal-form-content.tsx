import React, { ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { Box, Divider, styled, Typography } from '@mui/material';
import { IProvider } from '../../../../../../../services/api/provider/dto/provider.dto';
import Button from '../../../../../../../common/ui/button';
import { IUser } from '../../../../../../../services/api/user/dto/user.dto';
import { TextField } from '../../../../../../../common/ui/text-field';
import { Location } from '../../../../../../../common/ui/icon';
import OwnGenderRadioGroup from '../../../../../../../common/components/own-gender-radio-group';
import PreferredGenderRadioGroup from '../../../../../../../common/components/preferred-gender-radio-group';
import UserDetailsCard from '../../../../../../../common/components/user-details-card';

const Subtitle = styled('p')(
  ({ theme }) => `
    color: ${theme.palette.primary.main};
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    margin: 0;
`,
);

const Buttons = styled(Box)(
  () => `
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`,
);

const StyledButton = styled(Button)(
  () => `
  height: 40px;
`,
);

interface Props {
  onClose: () => void;
  onDelete: () => void;
  deletableClient: IUser | null;
  loading: boolean;
}

const ClientModalFormContent = ({ onClose, onDelete, loading, deletableClient }: Props): ReactElement => {
  const { values, isSubmitting, setFieldValue } = useFormikContext<IProvider>();

  const handleClose = () => {
    onClose();
  };

  return (
    <Form>
      <UserDetailsCard
        image={'/img/default-avatar.svg'}
        name={`${values.first_name} ${values.last_name}`}
        subtitle={<Subtitle>{values.email}</Subtitle>}
      />
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Typography sx={{ mb: 2 }} fontWeight={600}>
        User Details
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Client’s gender
      </Typography>
      <OwnGenderRadioGroup
        value={values.details?.gender}
        onChange={(value) => !deletableClient && setFieldValue('details.gender', value)}
      />
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Preferred therapist gender
      </Typography>
      <PreferredGenderRadioGroup
        value={values.details?.preferred_gender}
        onChange={(value) => !deletableClient && setFieldValue('details.preferred_gender', value)}
      />
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Phone number
      </Typography>
      <TextField name="details.phone" disabled={!!deletableClient} fullWidth />
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Address
      </Typography>
      <TextField name="details.address" disabled={!!deletableClient} startIcon={<Location size={20} />} fullWidth />
      <TextField
        type="textarea"
        name="details.description"
        rows={4}
        value={values.details?.description}
        maxLength={240}
        onOwnValueChange={(value) => setFieldValue('details.description', value)}
        placeholder="Description..."
        disabled={!!deletableClient}
      />
      <Buttons>
        <StyledButton variant="contained" color="secondary" onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </StyledButton>
        {deletableClient ? (
          <StyledButton variant="contained" color="error" onClick={onDelete} disabled={loading} loading={loading}>
            Confirm Delete
          </StyledButton>
        ) : (
          <StyledButton type="submit" variant="contained" disabled={isSubmitting} loading={isSubmitting}>
            Save
          </StyledButton>
        )}
      </Buttons>
    </Form>
  );
};

export default ClientModalFormContent;
