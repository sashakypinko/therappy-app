import React, { MutableRefObject, type ReactElement, useMemo, useRef } from 'react';
import { Form, useFormikContext } from 'formik';
import { Box, styled } from '@mui/material';
import { TextField } from '../../../../../../../common/ui/text-field';
import Button from '../../../../../../../common/ui/button';
import FileField from '../../../../../../../common/ui/file-field';
import { colors } from '../../../../../../../config/theme/colors';
import { IService } from '../../../../../../../services/api/service/dto/service.dto';
import SelectField from '../../../../../../../common/ui/select-field';
import { CategoryLabels } from '../../../../../../../enums/service-categories.enum';
import { ParsedServiceStatuses } from '../../../../../../../enums/service-statuses.enum';
import { getImagePath } from '../../../../../../../helpers/image.helper';
import { ImageSizesEnum } from '../../../../../../../enums/image-sizes.enum';

const StyledTextField = styled(TextField)(
  () => `
  
`,
);

const FieldsContainer = styled(Box)(
  () => `
    max-height: 65vh;
    overflow-y: scroll;
    padding: 4px;
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

const Image = styled('img')(
  () => `
    width: 75px;
    height: 75px;
    object-fit: cover;
    border-radius: 4px;
`,
);

const ImageLabel = styled('p')(
  () => `
  font-size: 14px;
  margin: 4px 2px;
`,
);

interface Props {
  onClose: () => void;
  onDelete: () => void;
  editableService: IService | null;
  deletableService: IService | null;
}

const ServiceModalFormContent = ({ onClose, onDelete, deletableService, editableService }: Props): ReactElement => {
  const { values, isSubmitting, setFieldValue } = useFormikContext<IService>();
  const fileLoaderRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);

  const imageUrl = useMemo(() => {
    if (typeof values.image === 'string') return values.image;
    if (values.image) return URL.createObjectURL(values.image);
    if (values.image_id) return getImagePath(values.image_id, ImageSizesEnum.SMALL);

    return undefined;
  }, [values.image]);

  const handleImageClick = (): void => {
    fileLoaderRef.current && fileLoaderRef.current?.click();
  };

  return (
    <Form>
      <FieldsContainer>
        {deletableService || imageUrl ? (
          <Box>
            <Image src={imageUrl} onClick={handleImageClick} />
          </Box>
        ) : (
          <>
            <ImageLabel>Upload Image</ImageLabel>
            <FileField
              ButtonProps={{
                sx: {
                  background: colors.secondary[20],
                  width: '75px',
                  height: '75px',
                },
              }}
              onChange={(file) => setFieldValue('image', file)}
            />
          </>
        )}
        <FileField
          ButtonProps={{ sx: { display: 'none' } }}
          fileFieldRef={fileLoaderRef}
          onChange={(file) => setFieldValue('image', file)}
        />
        <StyledTextField label="Name" name="name" disabled={!!deletableService} fullWidth />
        <SelectField
          label="Category"
          name="category_id"
          options={Object.entries(CategoryLabels).map(([value, label]) => ({ value, label }))}
          disabled={!!deletableService}
          fullWidth
        />
        <SelectField
          label="Status"
          name="status"
          options={Object.entries(ParsedServiceStatuses).map(([value, label]) => ({ value, label }))}
          disabled={!!deletableService}
          fullWidth
        />
        <StyledTextField
          label="Duration (minutes)"
          name="duration"
          type="number"
          disabled={!!deletableService}
          fullWidth
          defaultValue={60}
        />
        <StyledTextField label="Price (AUD)" name="price" type="number" disabled={!!deletableService} fullWidth />
        <StyledTextField
          label="Description"
          name="description"
          type="textarea"
          disabled={!!deletableService}
          fullWidth
        />
      </FieldsContainer>
      <Buttons>
        <StyledButton variant="contained" color="secondary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </StyledButton>
        {deletableService ? (
          <StyledButton variant="contained" color="error" onClick={onDelete}>
            Confirm Delete
          </StyledButton>
        ) : (
          <StyledButton type="submit" variant="contained" disabled={isSubmitting}>
            Save
          </StyledButton>
        )}
      </Buttons>
    </Form>
  );
};

export default ServiceModalFormContent;
