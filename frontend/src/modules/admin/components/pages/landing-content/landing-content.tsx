import React, { type ReactElement, useCallback, useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, styled, Typography } from "@mui/material";
import { ExpandMore } from '@mui/icons-material';
import { colors } from '../../../../../config/theme/colors';
import TextInput from '../../../../../common/ui/text-input';
import { ILandingContent } from '../../../../../services/api/landing-content/dto/landing-content.dto';
import { LandingContentApi } from '../../../../../services/api/landing-content';
import { useSnackbar } from '../../../../../hooks';
import { defaultLandingContentValue } from '../../../../../services/api/landing-content/default-landing-content-value';
import Button from "../../../../../common/ui/button";

const StyledContainer = styled(Container)(
  () => `
    padding: 0 38px 0 38px !important;
    margin: 0;
`,
);

const StyledAccordion = styled(Accordion)(
  () => `
  padding: 16px 24px;
  margin-bottom: 8px;
  margin-top: 36px;
  border-radius: 16px !important;
  border: 1px solid ${colors.secondary[30]};
  box-shadow: none;
  
  &:before {
     display: none;
  }
`,
);

interface SectionProps {
  title: string;
  data: ILandingContent;
  expanded: boolean;
  inputs: { name: string, label: string, type?: 'text' | 'textarea', rows?: number }[];
  onChange: (value: string, name: string) => void;
  onToggle: () => void;
}

const Section = ({ title, data, expanded, inputs, onToggle, onChange }: SectionProps) => {
  return (
    <StyledAccordion
      expanded={expanded}
      onChange={onToggle}
      disableGutters
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {
          inputs.map(({ name, label, type = 'text', rows = 10 }) => (
            <>
              <Typography sx={{ mb: 1, mt: 2 }} variant="subtitle1">{label}:</Typography>
              <TextInput
                value={data[name as keyof ILandingContent] || ''}
                type={type}
                onChange={e => onChange(e.target.value, name)}
                rows={rows}
              />
            </>
          ))
        }
      </AccordionDetails>
    </StyledAccordion>
  );
};

const LandingContent = (): ReactElement => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['welcomeSection']);
  const [originData, setOriginData] = useState<ILandingContent>(defaultLandingContentValue);
  const [data, setData] = useState<ILandingContent>(defaultLandingContentValue);
  const [loading, setLoading] = useState<boolean>(false);
  const { successSnackbar, errorSnackbar } = useSnackbar();

  const fetchData =  useCallback(async () => {
    try {
      setLoading(true);
      const newData = await LandingContentApi.getAll();

      setData(newData);
      setOriginData(newData);
    } catch (e) {
      errorSnackbar("Can't get landing content!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData().then();
  }, []);

  const handleSectionToggle = (sectionName: string): void => {
    const expandedSectionIdx = expandedSections.findIndex((expandedSectionName) => sectionName === expandedSectionName);

    if (expandedSectionIdx === -1) {
      setExpandedSections([...expandedSections, sectionName]);
    } else {
      setExpandedSections([
        ...expandedSections.slice(0, expandedSectionIdx),
        ...expandedSections.slice(expandedSectionIdx + 1),
      ]);
    }
  };

  const handleChange = useCallback((value: string, name: string) => {
    setData({
      ...data,
      [name]: value,
    })
  }, [data]);

  const handleSave = useCallback(async () => {
    try {
      setLoading(true);
      const newData = await LandingContentApi.update(data);

      setData(newData);
      setOriginData(newData);
      successSnackbar("Your changes saved successfully");
    } catch (e) {
      errorSnackbar("Can't save landing content!");
    } finally {
      setLoading(false);
    }
  }, [data]);

  const handleCancel = useCallback(() => {
    setData(originData);
  }, [originData]);

  return (
    <StyledContainer>
      <Typography sx={{ mt: 7, mb: 3 }} fontSize={20} fontWeight={600}>
        Edit landing content
      </Typography>
      <Section
        title="Welcome Section"
        data={data}
        expanded={expandedSections.includes('welcomeSection')}
        inputs={[
          {
            name: 'welcome_section_title',
            label: 'Title',
          },
          {
            name: 'welcome_section_subtitle',
            label: 'Subtitle',
          },
          {
            name: 'welcome_section_button',
            label: 'Button',
          },
        ]}
        onToggle={() => handleSectionToggle('welcomeSection')}
        onChange={handleChange}
      />
      <Section
        title="Services Section"
        data={data}
        expanded={expandedSections.includes('servicesSection')}
        inputs={[
          {
            name: 'services_section_title',
            label: 'Title',
          },
          {
            name: 'services_section_card_title',
            label: 'Card title',
          },
          {
            name: 'services_section_card_text',
            label: 'Card text',
            type: 'textarea',
          },
        ]}
        onToggle={() => handleSectionToggle('servicesSection')}
        onChange={handleChange}
      />
      <Section
        title="Why Therappy Section"
        data={data}
        expanded={expandedSections.includes('whyTherappySection')}
        inputs={[
          {
            name: 'why_therappy_section_title',
            label: 'Title',
          },
          {
            name: 'why_therappy_section_text',
            label: 'Text',
            type: 'textarea',
          },
        ]}
        onToggle={() => handleSectionToggle('whyTherappySection')}
        onChange={handleChange}
      />
      <Section
        title="Advantages Section"
        data={data}
        expanded={expandedSections.includes('advantagesSection')}
        inputs={[
          {
            name: 'advantages_section_title',
            label: 'Title',
          },
          {
            name: 'advantages_section_1_card_title',
            label: '1 Card title',
          },
          {
            name: 'advantages_section_1_card_text',
            label: '1 Card text',
            type: 'textarea',
            rows: 3,
          },
          {
            name: 'advantages_section_2_card_title',
            label: '2 Card title',
          },
          {
            name: 'advantages_section_2_card_text',
            label: '2 Card text',
            type: 'textarea',
            rows: 3,
          },
          {
            name: 'advantages_section_3_card_title',
            label: '3 Card title',
          },
          {
            name: 'advantages_section_3_card_text',
            label: '3 Card text',
            type: 'textarea',
            rows: 3,
          },
          {
            name: 'advantages_section_4_card_title',
            label: '4 Card title',
          },
          {
            name: 'advantages_section_4_card_text',
            label: '4 Card text',
            type: 'textarea',
            rows: 3,
          },
          {
            name: 'advantages_section_5_card_title',
            label: '5 Card title',
          },
          {
            name: 'advantages_section_5_card_text',
            label: '5 Card text',
            type: 'textarea',
            rows: 3,
          },
          {
            name: 'advantages_section_6_card_title',
            label: '6 Card title',
          },
          {
            name: 'advantages_section_6_card_text',
            label: '6 Card text',
            type: 'textarea',
            rows: 3,
          },
        ]}
        onToggle={() => handleSectionToggle('advantagesSection')}
        onChange={handleChange}
      />
      <Section
        title="How It Works Section"
        data={data}
        expanded={expandedSections.includes('howItWorksSection')}
        inputs={[
          {
            name: 'how_it_works_section_title',
            label: 'Title',
          },
          {
            name: 'how_it_works_section_1_step_text',
            label: '1 Step text',
          },
          {
            name: 'how_it_works_section_2_step_text',
            label: '2 Step text',
          },
          {
            name: 'how_it_works_section_3_step_text',
            label: '3 Step text',
          },
        ]}
        onToggle={() => handleSectionToggle('howItWorksSection')}
        onChange={handleChange}
      />
      <Section
        title="Professionals Section"
        data={data}
        expanded={expandedSections.includes('professionalsSection')}
        inputs={[
          {
            name: 'professionals_section_title',
            label: 'Title',
          },
          {
            name: 'professionals_section_text',
            label: 'Text',
            type: 'textarea',
          },
        ]}
        onToggle={() => handleSectionToggle('professionalsSection')}
        onChange={handleChange}
      />
      <Section
        title="Reviews Section"
        data={data}
        expanded={expandedSections.includes('reviewsSection')}
        inputs={[
          {
            name: 'reviews_section_title',
            label: 'Title',
          },
        ]}
        onToggle={() => handleSectionToggle('reviewsSection')}
        onChange={handleChange}
      />
      <Box mt={2} mb={6} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="inherit"
          onClick={handleCancel}
          loading={loading}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          loading={loading}
          disabled={loading}
        >
          Save
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default LandingContent;
