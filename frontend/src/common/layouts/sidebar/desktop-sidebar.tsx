import { Box, CSSObject, Drawer as MuiDrawer, IconButton, styled, Theme, Typography } from '@mui/material';
import { TherapyLogo } from '../../ui/icon';
import SidebarContent from './sidebar-content';
import { ChevronLeft, Menu } from '@mui/icons-material';
import { useContext } from 'react';
import { SidebarContext } from './context/sidebar.context';

const Header = styled(Box)(
  () => `
  display: block;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
`,
);

const Title = styled(Typography)(
  () => `
  letter-spacing: 0.4px;
  margin: 0;
`,
);

const Subtitle = styled('p')(
  ({ theme }) => `
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  margin: 0;
  color: ${theme.palette.text.disabled};
`,
);

const MenuTitle = styled('p')(
  ({ theme }) => `
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  color: ${theme.palette.text.disabled};
`,
);

const openedMixin = (theme: Theme): CSSObject => ({
  width: 260,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: 260,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: 260,
    boxSizing: 'border-box',
  },
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DesktopSidebar = () => {
  const sidebar = useContext(SidebarContext);
  return (
    <Drawer PaperProps={{ sx: { background: '#06274b' } }} variant="permanent" open={sidebar.opened}>
      <Header>
        <Box display="flex" justifyContent="end">
          <IconButton sx={{ mr: 1.5 }} onClick={sidebar.toggle}>
            {sidebar.opened ? <ChevronLeft color="secondary" fontSize="large" /> : <Menu color="secondary" />}
          </IconButton>
        </Box>
        <Box sx={{ ml: sidebar.opened ? 3 : 1.5, display: 'flex' }}>
          <TherapyLogo />
          {sidebar.opened && (
            <Box sx={{ ml: 1, display: 'grid' }}>
              <Title variant="h6">Therappy</Title>
              <Subtitle>Medical Platform</Subtitle>
            </Box>
          )}
        </Box>
        <Box sx={{ ml: sidebar.opened ? 3 : 2, mt: 6 }}>
          <MenuTitle>Menu</MenuTitle>
        </Box>
      </Header>
      <SidebarContent />
    </Drawer>
  );
};

export default DesktopSidebar;
