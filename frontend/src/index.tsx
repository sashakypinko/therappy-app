import React, { type ReactElement, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './store';
import Routes from './routes/routes';
import { DesktopSidebar, MobileSidebar } from './common/layouts/sidebar';
import Snackbar from './common/ui/snackbar';
import desktopTheme from './config/theme/desktop-theme';
import mobileTheme from './config/theme/mobile-theme';
import { SidebarContext } from './common/layouts/sidebar/context/sidebar.context';
import useRoutes from './routes/hooks';
import useWithSidebar from './hooks/use-with-sidebar.hook';
import useSidebarContext from './common/layouts/sidebar/hooks/use-sidebar-context.hook';
import useIsMobile from './hooks/use-is-mobile.hook';
import { getServices } from './store/actions/services';
import Header from './common/layouts/header';
import Footer from './common/layouts/footer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthorized } from './hooks';
import { getAuthUser } from './store/actions/auth';
import { selectAuth } from './store/selectors';
import useRole from './hooks/use-role.hook';
import { UserTypesEnum } from './enums/user-types.enum';
import FeedbackModal from './common/components/modals/feedback-modal';
import Backdrop from './common/ui/backdrop';
import { BackdropContext } from './common/ui/backdrop/context/backdrop.context';
import useBackdropContext from './common/ui/backdrop/hooks/use-backdrop-context.hook';
import useBackdrop from './common/ui/backdrop/hooks/use-backdrop.hook';

import './index.css';
import './temporary-resize-observer-fix';
import { getAdditionalList } from "./store/actions/users";

const App = (): ReactElement | null => {
  const { authUserLoading } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const routesProps = useRoutes();
  const withSidebar = useWithSidebar();
  const isMobile = useIsMobile();
  const isAuth = useAuthorized();
  const { startLoading, endLoading } = useBackdrop();
  const userRole = useRole();

  useEffect(() => {
    if (isAuth) {
      dispatch(getAuthUser());
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth !== null && !authUserLoading) {
      dispatch(getServices({}));
      dispatch(getAdditionalList());
    }
  }, [isAuth]);

  useEffect(() => {
    authUserLoading ? startLoading() : endLoading();
  }, [authUserLoading]);

  const Sidebar = isMobile ? MobileSidebar : DesktopSidebar;

  return (
    <>
      <Router>
        <Snackbar />
        {routesProps.withHeader && <Header />}
        {!routesProps.withoutSidebar && withSidebar ? (
          <Box sx={{ display: isMobile ? 'block' : 'flex' }}>
            <Sidebar />
            <Suspense fallback={<div />}>
              <Routes {...routesProps} />
            </Suspense>
          </Box>
        ) : (
          <Suspense fallback={<div />}>
            <Routes {...routesProps} />
          </Suspense>
        )}
        {routesProps.withFooter && <Footer />}
      </Router>
      {userRole && userRole === UserTypesEnum.CLIENT && <FeedbackModal />}
    </>
  );
};

const AppContainer = (): ReactElement | null => {
  const { authUser } = useSelector(selectAuth);
  const sidebarContextValues = useSidebarContext(authUser);
  const backdropContextValues = useBackdropContext();
  const isMobile = useIsMobile();

  return (
    <SidebarContext.Provider value={sidebarContextValues}>
      <BackdropContext.Provider value={backdropContextValues}>
        <ThemeProvider theme={isMobile ? mobileTheme : desktopTheme}>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <CssBaseline />
            <Backdrop />
            <App />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </BackdropContext.Provider>
    </SidebarContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
