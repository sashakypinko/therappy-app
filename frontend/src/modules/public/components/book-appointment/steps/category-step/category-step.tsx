import { ReactElement } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { ServiceCategoriesEnum } from '../../../../../../enums/service-categories.enum';
import Button from '../../../../../../common/ui/button';
import { StepProps } from '../../book-appointment';
import StepsEnum from '../../enums/steps.enum';
import CategorySelector from '../../../../../../common/components/appointment-widgets/category-selector';
import useIsMobile from '../../../../../../hooks/use-is-mobile.hook';

const CategoryStep = ({ appointment, setAppointment, setActiveStep }: StepProps): ReactElement => {
  const isMobile = useIsMobile();
  const handleSetCategory = (category_id: ServiceCategoriesEnum) => {
    setAppointment({ ...appointment, category_id });
    setActiveStep(StepsEnum.SERVICE);
  };

  return (
    <Grid sx={{ pl: isMobile ? 0 : 3 }} container spacing={isMobile ? 0 : 3}>
      <Grid sx={{ mb: 3 }} item display="flex" justifyContent="center" xs={12}>
        <Box textAlign="center" maxWidth={700}>
          <Typography variant="h3">What type of therapy are you looking for?</Typography>
          <Typography sx={{ mt: 1 }} variant="h6">
            Select they type of therapy you are looking for and we&apos;ll match your appointment request to the next
            available therapist in your area
          </Typography>
        </Box>
      </Grid>
      <CategorySelector categoryId={appointment.category_id} onCategorySelect={handleSetCategory} />
      <Grid sx={{ mt: 1, mb: 4 }} display="flex" justifyContent="end" item xs={12}>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={() => setActiveStep(StepsEnum.SERVICE)}
          disabled={!appointment.category_id}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default CategoryStep;
