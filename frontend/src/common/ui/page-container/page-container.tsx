import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Box, Container, styled, Typography } from '@mui/material';
import DesktopPageTabs from './desktop=page-tabs';
import { PageTab } from './desktop=page-tabs/desktop-page-tabs';
import useIsMobile from '../../../hooks/use-is-mobile.hook';
import MobilePageTabs from './mobile-page-tabs';
import { Tabs } from '../../../modules/provider/components/pages/profile/profile';
import { colors } from '../../../config/theme/colors';
import useQuery from '../../../hooks/use-query.hook';

const StyledContainer = styled(Container)(
  ({ theme }) => `
    padding: 0 16px;
    margin: 0;
    
    @media (min-width: ${theme.breakpoints.values.md}px) {
      padding: 0 48px 0 38px !important;
    }
`,
);

const Header = styled(Box)(
  ({ theme }) => `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  
  @media (min-width: ${theme.breakpoints.values.md}px) {
    padding: 8px 0 !important;
  }
`,
);

interface Props {
  title?: string;
  tabs?: PageTab[];
  activeTab?: Tabs;
  onTabChange?: (id: number) => void;
  children: ReactNode;
}

const PageContainer = ({ title, tabs, activeTab, onTabChange, children }: Props): ReactElement | null => {
  const [loading, setLoading] = useState<boolean>(!!tabs);
  const isMobile = useIsMobile();
  const PageTabs = isMobile ? MobilePageTabs : DesktopPageTabs;
  const { params, setParams } = useQuery();

  const handleTabChange = (tab: number) => {
    setParams({ tab });
    onTabChange && onTabChange(tab);
  };

  useEffect(() => {
    if (tabs && !params.tab) {
      setParams({ tab: 0 });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params.tab && onTabChange) {
      onTabChange(parseInt(params.tab));
      setLoading(false);
    }
  }, [params.tab]);

  if (loading) {
    return null;
  }

  return (
    <StyledContainer maxWidth="xl">
      <Header>
        {title && (
          <Typography sx={{ mt: 4, mb: 1, ml: 2 }} variant="h5">
            {title}
          </Typography>
        )}
      </Header>
      {tabs && onTabChange && (
        <PageTabs tabs={tabs} activeTab={activeTab || Tabs.PERSONAL_DETAILS} onChange={handleTabChange} />
      )}
      {children}
    </StyledContainer>
  );
};

export default PageContainer;
