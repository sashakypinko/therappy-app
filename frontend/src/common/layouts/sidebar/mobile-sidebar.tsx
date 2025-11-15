import {
  AppBarProps as MuiAppBarProps,
  Box,
  Drawer as MuiDrawer,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import { ReactNode, useContext } from 'react';
import { SidebarContext } from './context/sidebar.context';
import { useConfirmation } from '../../../hooks';
import { Cancel, ChevronLeft, Close, Menu } from '@mui/icons-material';
import SidebarContent from './sidebar-content';
import { colors } from '../../../config/theme/colors';
import { Logout, TherapyLogo } from '../../ui/icon';
import { logout } from '../../../store/actions/auth';
import { useDispatch } from 'react-redux';
import { ClientRouteEnum } from '../../../modules/client/routes/enums/route.enum';
import Button from '../../ui/button';

const drawerWidth = 260;

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
}

const AppBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  width: '100%',
  zIndex: 1200,
  background: colors.background.BG_1,
  position: 'fixed',
  top: 0,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  background: '#06274b',
}));

const Drawer = styled(MuiDrawer)(
  () => `
  white-space: nowrap;
`,
);

const LogoutIcon = styled(Logout)(
  () => `
  stroke: ${colors.secondary[70]};
`,
);

const Title = styled(Typography)(
  () => `
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 2px;
  margin: 0;
  color: ${colors.secondary[20]};
`,
);

const Subtitle = styled('p')(
  ({ theme }) => `
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  margin: 0;
  color: ${colors.secondary[40]};
`,
);

interface Props {
  sidebarContent?: ReactNode;
  headerAction?: ReactNode;
}

const MobileSidebar = ({ sidebarContent, headerAction }: Props) => {
  const sidebar = useContext(SidebarContext);
  const dispatch = useDispatch();
  const { Confirmation, showConfirmation } = useConfirmation();

  const handleLogout = () => {
    showConfirmation({
      text: 'Confirm logout',
      description: 'Are you sure you want to log out?',
      onConfirm: () => {
        dispatch(logout());
      },
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {Confirmation}
      <AppBar open={sidebar.opened}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', paddingLeft: 4, paddingRight: 0 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={sidebar.toggle}
            edge="start"
            sx={{ mr: 6, ...(sidebar.opened && { display: 'none' }) }}
          >
            <Menu color="action" />
          </IconButton>
          <TherapyLogo />
          {headerAction || (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        anchor="left"
        open={sidebar.opened}
        PaperProps={{ sx: { background: '#06274b' } }}
        ModalProps={{ onBackdropClick: sidebar.toggle }}
      >
        <DrawerHeader>
          <Box sx={{ m: 3, mr: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Box display="flex">
              <TherapyLogo />
              <Box sx={{ ml: 1, display: 'grid' }}>
                <Title variant="h6">Therappy</Title>
                <Subtitle>Medical Platform</Subtitle>
              </Box>
            </Box>
            <IconButton sx={{ mt: -2 }} onClick={sidebar.toggle}>
              <Close color="secondary" />
            </IconButton>
          </Box>
        </DrawerHeader>
        {sidebarContent || <SidebarContent onLinkClick={sidebar.toggle} />}
      </Drawer>
    </Box>
  );
};

export default MobileSidebar;
