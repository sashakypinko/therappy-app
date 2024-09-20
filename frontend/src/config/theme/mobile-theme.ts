import { createTheme } from '@mui/material/styles';

const mobileTheme = createTheme({
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontSize: '35px',
      fontWeight: 600,
      lineHeight: '41px',
    },
    h2: {
      fontSize: '39px',
      fontWeight: 500,
      lineHeight: '45px',
    },
    h3: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: '34px',
    },
    h4: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    h5: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '26px',
    },
    h6: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '24px',
    },
    subtitle1: {
      fontSize: '18px',
      fontWeight: 800,
      lineHeight: '22px',
    },
    // subtitle2: {
    //
    // },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '22px',
    },
    // body2: {
    //
    // },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1440,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#088cef',
      light: '#42aefdbf',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EDEDF1',
      light: 'rgba(101,5,45,0.75)',
      dark: '#6f7188',
    },
    error: {
      main: '#f04438',
    },
    background: {
      default: '#F8F8F8',
      paper: '#fff',
    },
    text: {
      primary: '#3f404d',
      secondary: '#6f7188',
      disabled: '#b5b6c4',
    },
    action: {
      disabled: '#fafafa',
    },
    info: {
      main: '#82878E',
    },
  },
});

export default mobileTheme;
