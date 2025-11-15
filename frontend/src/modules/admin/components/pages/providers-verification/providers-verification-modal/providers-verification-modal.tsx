import React, { ReactElement, ReactNode, SyntheticEvent, useMemo, useState } from 'react';
import Modal from '../../../../../../common/ui/modal';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { IProvider, ProviderAdditional } from '../../../../../../services/api/provider/dto/provider.dto';
import { getImagePath } from '../../../../../../helpers/image.helper';
import { colors } from '../../../../../../config/theme/colors';
import { ExpandMore } from '@mui/icons-material';
import { ParsedUserStatuses } from '../../../../../../enums/working-visa-types.enum';
import Button from '../../../../../../common/ui/button';
import UserDetailsCard from '../../../../../../common/components/user-details-card';
import {
  prepareEditableProvider,
  workWithChildren,
} from "../../../../../../helpers/provider.helper";
import DocumentsLoader from '../../../../../../common/components/documents-loader';
import { ImageSizesEnum } from '../../../../../../enums/image-sizes.enum';
import { useSelector } from "react-redux";
import { selectUsers } from "../../../../../../store/selectors";

const StyledSection = styled(Accordion)(
  () => `
    border: none;
    box-shadow: unset;
    
    &:before {
        display: none;
    }
`,
);

interface SectionProps {
  expanded: boolean;
  title: string;
  handleAccordionChange: (title: string) => any;
  children: ReactNode;
}

const Section = ({ title, expanded, handleAccordionChange, children }: SectionProps) => {
  return (
    <StyledSection expanded={expanded} onChange={handleAccordionChange(title)} disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: expanded ? colors.primary[60] : colors.secondary[70] }} />}
      >
        <Typography variant="subtitle1" sx={{ color: expanded ? colors.primary[60] : colors.secondary[70] }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </StyledSection>
  );
};

const defaultExpanded = [0, 1, 2, 3];

interface Props {
  open: boolean;
  provider: IProvider;
  loading: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

const ProvidersVerificationModal = ({ open, provider, loading, onClose, onAccept, onDecline }: Props): ReactElement => {
  const [expanded, setExpanded] = useState<number[]>(defaultExpanded);
  const { additionalList } = useSelector(selectUsers);

  const handleAccordionChange = (index: number) => (event: SyntheticEvent, isExpanded: boolean) => {
    if (isExpanded) {
      setExpanded([...expanded, index]);
    } else {
      setExpanded(expanded.filter((item) => item !== index));
    }
  };

  const documents = useMemo(() => {
    return prepareEditableProvider(provider).additionals;
  }, [provider]);

  return (
    <Modal open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ maxHeight: '75vh', overflowY: 'scroll' }}>
        <Grid item lg={7} md={9} sm={12}>
          <UserDetailsCard
            image={getImagePath(provider?.image_id || 0, ImageSizesEnum.SMALL)}
            name={`${provider.first_name} ${provider.last_name}`}
            status={provider.status}
            workWithChildren={workWithChildren(provider)}
          />
        </Grid>
        <Divider sx={{ mt: 3, mb: 3 }} />
        <Section
          title="User Details"
          expanded={expanded.includes(0)}
          handleAccordionChange={() => handleAccordionChange(0)}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body2">First Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" fontSize={16} color={colors.secondary[70]}>
                {provider.first_name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">Last Name</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" fontSize={16} color={colors.secondary[70]}>
                {provider.last_name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2">Email Address</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" fontSize={16} color={colors.secondary[70]}>
                {provider.email}
              </Typography>
            </Grid>
          </Grid>
        </Section>
        <Section
          title="Uploaded Documents"
          expanded={expanded.includes(1)}
          handleAccordionChange={() => handleAccordionChange(1)}
        >
          <DocumentsLoader
            documents={documents}
            loading={false}
            columns={2}
            readOnly
          />
        </Section>
        <Section
          title="Reference contact"
          expanded={expanded.includes(2)}
          handleAccordionChange={() => handleAccordionChange(2)}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography fontSize={14} color={colors.secondary[50]}>
                First referee
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                {provider.details.contacts[0]?.name}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                {provider.details.contacts[0]?.phone}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={14} color={colors.secondary[50]}>
                Second referee
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                {provider.details.contacts[1]?.name}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body2">
                {provider.details.contacts[1]?.phone}
              </Typography>
            </Grid>
          </Grid>
        </Section>
        <Section
          title="Working visa"
          expanded={expanded.includes(3)}
          handleAccordionChange={() => handleAccordionChange(3)}
        >
          <Typography>{ParsedUserStatuses[provider.details.visa]}</Typography>
        </Section>
        <Section
          title="Australian Business Number (ABN)"
          expanded={expanded.includes(4)}
          handleAccordionChange={() => handleAccordionChange(4)}
        >
          <Typography>{provider.details.abn}</Typography>
        </Section>
        <Section
          title="Your AHRPA registration number"
          expanded={expanded.includes(5)}
          handleAccordionChange={() => handleAccordionChange(5)}
        >
          <Typography>{provider.details.ahrpa_number}</Typography>
        </Section>
        <Section
          title="Remedial massage registration number"
          expanded={expanded.includes(6)}
          handleAccordionChange={() => handleAccordionChange(6)}
        >
          <Typography>{provider.details.remedial_number}</Typography>
        </Section>
        {/* <Section */}
        {/*   title="Location" */}
        {/*   expanded={expanded.includes(7)} */}
        {/*   handleAccordionChange={() => handleAccordionChange(7)} */}
        {/* > */}
        {/*   <Typography>{provider.details.address}</Typography> */}
        {/* </Section> */}
        <Section
          title="Additional"
          expanded={expanded.includes(7)}
          handleAccordionChange={() => handleAccordionChange(7)}
        >
          <Box sx={{ display: 'grid', mt: 1 }}>
            {additionalList.filter(({ is_file }) => is_file === 0).map(({ id, customer_title }) => {
              if (!provider.additionals) return null;

              const checked =
                (provider.additionals as ProviderAdditional[])?.find(
                  ({ additional_id }) => additional_id === id,
                )?.checked || false;

              return (
                <Box key={id} sx={{ mb: 1 }}>
                  <FormControlLabel
                    componentsProps={{
                      typography: {
                        fontSize: 14,
                      },
                    }}
                    checked={checked}
                    control={<Checkbox />}
                    label={customer_title}
                  />
                  {checked && (
                    <DocumentsLoader
                      columns={1}
                      displayDocuments={[id]}
                      documents={documents}
                      readOnly
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Section>
      </Box>
      <Divider sx={{ mt: 2, mb: 3 }} />
      <Box display="flex" justifyContent="space-between">
        <Button variant="contained" color="error" onClick={onDecline}>
          Decline
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" onClick={onAccept} loading={loading} disabled={loading}>
          Accept
        </Button>
      </Box>
    </Modal>
  );
};

export default ProvidersVerificationModal;
