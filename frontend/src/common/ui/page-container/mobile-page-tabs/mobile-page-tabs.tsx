import { ReactElement } from 'react';
import { Box, styled } from '@mui/material';
import { colors } from '../../../../config/theme/colors';
import { Tabs } from '../../../../modules/provider/components/pages/profile/profile';

const TabsContainer = styled(Box)(
  () => `
    display: flex;
    background: ${colors.secondary[20]};
    border-radius: 5px;
`,
);

const StyledTab = styled(Box)(
  () => `
    cursor: pointer;
    width: 100%;
    text-align: center;
`,
);

export interface PageTab {
  label: string;
  id: number;
}

export interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ label, isActive, onClick }: TabProps): ReactElement => {
  return (
    <StyledTab onClick={onClick}>
      <Box
        sx={{
          fontSize: 18,
          margin: '3px',
          padding: '4px',
          borderRadius: '5px',
          color: isActive ? colors.secondary[90] : colors.secondary[70],
          background: isActive ? colors.background.BG_1 : colors.secondary[20],
          fontWeight: isActive ? 600 : 500,
        }}
      >
        {label}
      </Box>
    </StyledTab>
  );
};

interface Props {
  tabs: PageTab[];
  activeTab: Tabs;
  onChange: (id: number) => void;
}

const MobilePageTabs = ({ tabs, activeTab, onChange }: Props): ReactElement => {
  const handleSetActiveTab = (id: number) => {
    onChange(id);
  };

  return (
    <TabsContainer>
      {tabs.map((tab: PageTab) => (
        <Tab
          key={tab.id}
          label={tab.label}
          isActive={tab.id === activeTab}
          onClick={() => handleSetActiveTab(tab.id)}
        />
      ))}
    </TabsContainer>
  );
};

export default MobilePageTabs;
