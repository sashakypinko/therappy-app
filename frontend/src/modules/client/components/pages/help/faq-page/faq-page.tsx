import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Skeleton, styled, Typography } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import ContactForm from '../contact-form';
import { colors } from '../../../../../../config/theme/colors';
import { IFaq } from '../../../../../../services/api/support/dto/faq.dto';
import { UserApi } from '../../../../../../services/api/user';
import useSnackbar from '../../../../../../hooks/use-snackbar.hook';
import { SupportApi } from '../../../../../../services/api/support';
import { ExpandMore } from '@mui/icons-material';

const StyledAccordion = styled(Accordion)(
  () => `
  padding: 16px 24px;
  margin-bottom: 8px;
  border-radius: 16px !important;
  border: 1px solid ${colors.secondary[30]};
  box-shadow: none;
  
  &:before {
     display: none;
  }
`,
);

const FaqPage = (): ReactElement => {
  const [opensContactModal, setOpenContactModal] = useState<boolean>(false);
  const [faq, setFaq] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<string | false>(false);
  const { errorSnackbar } = useSnackbar();

  const getFaq = async () => {
    try {
      setLoading(true);
      const newFaq = await SupportApi.getFaq();
      setFaq(newFaq.data);
    } catch (e) {
      errorSnackbar('Error while loading F.A.Q.!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFaq().then();
  }, []);

  return (
    <Grid container>
      <Grid sx={{ mt: 6 }} item xs={12}>
        <Typography variant="h5">F.A.Q.</Typography>
        <Typography sx={{ mt: 2 }}>We are here for you</Typography>
      </Grid>
      <Grid sx={{ mt: 3 }} item xs={12}>
        {faq.map(({ name, text }: IFaq, index) => (
          <StyledAccordion
            key={index}
            expanded={expanded === name}
            onChange={() => setExpanded(expanded === name ? false : name)}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: expanded === name ? colors.primary[60] : colors.secondary[70] }} />}
            >
              <Typography variant="h6">{name}</Typography>
            </AccordionSummary>
            <Typography sx={{ p: 2 }} dangerouslySetInnerHTML={{ __html: text }} />
          </StyledAccordion>
        ))}
        {loading && (
          <>
            <Skeleton sx={{ borderRadius: 4, mt: 1 }} variant="rectangular" width="100%" height={80} />
            <Skeleton sx={{ borderRadius: 4, mt: 1 }} variant="rectangular" width="100%" height={80} />
            <Skeleton sx={{ borderRadius: 4, mt: 1 }} variant="rectangular" width="100%" height={80} />
            <Skeleton sx={{ borderRadius: 4, mt: 1 }} variant="rectangular" width="100%" height={80} />
            <Skeleton sx={{ borderRadius: 4, mt: 1 }} variant="rectangular" width="100%" height={80} />
            <Skeleton sx={{ borderRadius: 4, mt: 1 }} variant="rectangular" width="100%" height={80} />
            <Skeleton sx={{ borderRadius: 4, mt: 1 }} variant="rectangular" width="100%" height={80} />
            <Skeleton sx={{ borderRadius: 4, mt: 1 }} variant="rectangular" width="100%" height={80} />
          </>
        )}
      </Grid>
      <Grid sx={{ mt: 3, mb: 10 }} item xs={12}>
        <Typography sx={{ mt: 2 }} variant="h6">
          If you haven&apos;t found the answer to your question
          <Typography
            sx={{ cursor: 'pointer' }}
            component="span"
            variant="h6"
            color={colors.primary[70]}
            onClick={() => setOpenContactModal(true)}
          >
            {' '}
            Сontact us
          </Typography>
        </Typography>
      </Grid>
      <ContactForm open={opensContactModal} onClose={() => setOpenContactModal(false)} />
    </Grid>
  );
};

export default FaqPage;
