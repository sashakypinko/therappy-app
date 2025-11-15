import { ReactElement } from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { CallMadeRounded, CheckRounded } from '@mui/icons-material';
import { colors } from '../../../../../config/theme/colors';
import Button from '../../../../ui/button';

const Card = styled(Box)(
  () => `
    border-radius: 12px;
    padding: 24px;
  `,
);

interface Props {
  title: string;
  subtitle: string;
  price: number;
  active: boolean;
  onSelect: () => void;
}

const TypeCard = ({ title, subtitle, price, active, onSelect }: Props): ReactElement => {
  const selected = active;

  return (
    <Card
      sx={{
        background: selected ? `url(/img/background-blurred-things.svg)` : colors.background.BG_1,
        boxShadow: selected
          ? `
         9px 12px 32px 0px rgba(0, 0, 0, 0.10),
         35px 47px 59px 0px rgba(0, 0, 0, 0.09), 
         80px 106px 80px 0px rgba(0, 0, 0, 0.05),
         141px 189px 94px 0px rgba(0, 0, 0, 0.01),
         221px 295px 103px 0px rgba(0, 0, 0, 0.00)
        `
          : 'none',
        border: selected ? 'none' : `1px solid ${colors.secondary[30]}`,
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5" color={colors.secondary[selected ? 10 : 90]}>
            {title}
          </Typography>
          <Typography color={colors.secondary[selected ? 20 : 40]}>{subtitle}</Typography>
        </Box>
        <IconButton sx={{ width: 58, height: 58, background: '#263238', color: '#fff' }}>
          {selected ? <CheckRounded /> : <CallMadeRounded />}
        </IconButton>
      </Box>
      <Typography color={colors.secondary[selected ? 10 : 90]} fontSize={96} fontWeight={300} lineHeight="normal">
        ${price}
      </Typography>
      <Button
        sx={{
          mt: 4,
          ...(selected && {
            background: '#fff',
            color: colors.secondary[90],
          }),
        }}
        variant="contained"
        onClick={onSelect}
        fullWidth
      >
        Select {title}
      </Button>
    </Card>
  );
};

export default TypeCard;
