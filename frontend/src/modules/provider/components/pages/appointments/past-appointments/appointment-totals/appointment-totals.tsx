import React, { ReactElement, useEffect, useState } from 'react';
import GetTotalsResponseDto from '../../../../../../../services/api/appointment/dto/get-totals-response.dto';
import { AppointmentApi } from '../../../../../../../services/api/appointment';
import useSnackbar from '../../../../../../../hooks/use-snackbar.hook';
import { Box, Skeleton, styled, Typography } from '@mui/material';
import { colors } from '../../../../../../../config/theme/colors';
import useIsMobile from '../../../../../../../hooks/use-is-mobile.hook';

const TotalsContainer = styled(Box)(
  () => `
    display: flex;
    padding: 6px 8px;
    border-radius: 5px;
    border: 1px solid ${colors.secondary[40]};
`,
);

const AppointmentTotals = (): ReactElement | null => {
  const [totals, setTotals] = useState<GetTotalsResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { errorSnackbar } = useSnackbar();
  const isMobile = useIsMobile();

  const getTotals = async () => {
    setLoading(true);
    try {
      const newTotals = await AppointmentApi.getTotals();
      setTotals(newTotals);
    } catch (e) {
      errorSnackbar('Error while getting appointment totals!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTotals().then();
  }, []);

  if (loading) {
    return (
      <Skeleton sx={{ borderRadius: 1, mt: 1 }} variant="rectangular" width={isMobile ? '100%' : 600} height={120} />
    );
  }

  if (totals === null) {
    return null;
  }

  return (
    <TotalsContainer sx={{ width: isMobile ? '100%' : 'min-content' }}>
      {Object.entries(totals).map(([title, [hours, cost]], index) => (
        <Box
          sx={
            index < Object.entries(totals).length - 1
              ? {
                  mr: 2,
                  pr: 2,
                  borderRight: `1px dashed ${colors.secondary[40]}`,
                }
              : {}
          }
          key={title}
        >
          <Typography variant="subtitle2" color={colors.secondary[60]} fontSize={isMobile ? 10 : 12}>
            {title}
          </Typography>
          <Typography variant={isMobile ? 'h3' : 'h2'}>{hours}</Typography>
          <Typography color={colors.secondary[60]}>{cost}</Typography>
        </Box>
      ))}
    </TotalsContainer>
  );
};

export default AppointmentTotals;
