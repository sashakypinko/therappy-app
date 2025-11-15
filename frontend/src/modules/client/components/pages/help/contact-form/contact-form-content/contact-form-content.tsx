import { ReactElement } from 'react';
import { Form, useFormikContext } from 'formik';
import { TextField } from '../../../../../../../common/ui/text-field';
import { Box } from '@mui/material';
import Button from '../../../../../../../common/ui/button';
import { ContactUsRequestDto } from '../../../../../../../services/api/support/dto/contact-us-request.dto';

interface Props {
  onCancel: () => void;
}

const ContactFormContent = ({ onCancel }: Props): ReactElement => {
  const { isSubmitting } = useFormikContext<ContactUsRequestDto>();

  return (
    <Form>
      <TextField label="Subject" name="subject" />
      <TextField type="textarea" name="text" rows={7} placeholder="Text your massage..." />
      <Box sx={{ mt: 2 }} display="flex" justifyContent="space-between">
        <Button onClick={onCancel} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" loading={isSubmitting} disabled={isSubmitting}>
          Send
        </Button>
      </Box>
    </Form>
  );
};

export default ContactFormContent;
