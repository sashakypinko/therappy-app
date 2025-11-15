import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import StepsEnum from '../../enums/steps.enum';
import { StepProps } from '../../create-appointment';
import { ServiceCategoriesEnum } from '../../../../../../../enums/service-categories.enum';
import CategorySelector from '../../../../../../../common/components/appointment-widgets/category-selector';
import { colors } from '../../../../../../../config/theme/colors';
import Button from '../../../../../../../common/ui/button';

const CategoryStep = ({ appointment, setAppointment, setActiveStep }: StepProps): ReactElement => {
  const handleSetCategory = (category_id: ServiceCategoriesEnum) => {
    setAppointment({ ...appointment, category_id });
    setActiveStep(StepsEnum.SERVICE);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mt: 1, mb: 3, color: colors.secondary[60] }}>
        To make an appointment, select the type of therapy you need
      </Typography>
      <CategorySelector categoryId={appointment.category_id} onCategorySelect={handleSetCategory} />
      <Box sx={{ mt: 8 }} display="flex" justifyContent="space-between">
        <Box />
        <Button
          variant="contained"
          onClick={() => setActiveStep(StepsEnum.SERVICE)}
          disabled={!appointment.category_id}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryStep;
