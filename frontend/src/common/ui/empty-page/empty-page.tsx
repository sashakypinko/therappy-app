import { ReactElement } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import Button from '../button';
import useIsMobile from '../../../hooks/use-is-mobile.hook';

const Title = styled(Typography)(
  () => `
    text-align: center;
    font-size: 24px;
    font-weight: 500;
`,
);

const CreateButton = styled(Button)(
  () => `
    height: 40px;
    font-size: 12px;
`,
);

interface Props {
  title: string;
  image: string;
  buttonLabel?: string;
  onClick?: () => void;
}

const EmptyPage = ({ title, image, buttonLabel, onClick }: Props): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <Grid sx={{ mt: 4 }} container spacing={2}>
      <Grid item md={12}>
        <Title>{title}</Title>
      </Grid>
      {buttonLabel && onClick && (
        <Grid sx={{ textAlign: 'center' }} item md={12}>
          <CreateButton variant="contained" onClick={onClick}>
            {buttonLabel}
          </CreateButton>
        </Grid>
      )}
      <Grid sx={{ textAlign: 'center' }} item md={12}>
        <img width={isMobile ? '100%' : 'auto'} src={image} />
      </Grid>
    </Grid>
  );
};

export default EmptyPage;
