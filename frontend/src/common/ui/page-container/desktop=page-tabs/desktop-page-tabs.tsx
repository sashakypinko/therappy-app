import { ReactElement, useState } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import { colors } from '../../../../config/theme/colors';

const StyledTab = styled(Box)(
  () => `
    cursor: pointer;
    border-radius: 8px 8px 0 0;
    min-width: 120px;
    text-align: center;
    
    &:hover {
      background: ${colors.secondary[20]};
    }
    
    &:active {
      background: ${colors.secondary[30]};
    }
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
  fullWidth: boolean;
}

const Tab = ({ label, isActive, onClick, fullWidth }: TabProps): ReactElement => {
  return (
    <StyledTab onClick={onClick} width={fullWidth ? '100%' : 'auto'}>
      <Typography
        variant="body2"
        sx={{
          m: 2,
          color: isActive ? colors.primary[60] : colors.secondary[70],
          fontWeight: isActive ? 600 : 500,
        }}
      >
        {label}
      </Typography>
      {isActive && <Divider sx={{ height: '2px', background: colors.primary[60] }} />}
    </StyledTab>
  );
};

interface Props {
  tabs: PageTab[];
  activeTab: number;
  onChange: (id: number) => void;
  fullWidth?: boolean;
}

const DesktopPageTabs = ({ tabs, activeTab, onChange, fullWidth = false }: Props): ReactElement => {
  const handleSetActiveTab = (id: number) => {
    onChange(id);
  };

  return (
    <>
      <Box sx={{ mb: 3, overflowX: 'auto' }} display="flex">
        {tabs.map((tab: PageTab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            isActive={tab.id === activeTab}
            onClick={() => handleSetActiveTab(tab.id)}
            fullWidth={fullWidth}
          />
        ))}
      </Box>
    </>
  );
};

export default DesktopPageTabs;
