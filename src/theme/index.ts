import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0052CC',
      dark: '#0747A6',
      light: '#4C9AFF',
    },
    success: {
      main: '#00875A',
    },
    warning: {
      main: '#FF8B00',
    },
    error: {
      main: '#DE350B',
    },
    info: {
      main: '#00B8D9',
    },
    text: {
      primary: '#172B4D',
      secondary: '#5E6C84',
    },
    background: {
      default: '#F4F5F7',
      paper: '#FFFFFF',
    },
    divider: '#DFE1E6',
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 1px 2px rgba(9,30,66,0.25)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          height: 24,
          fontSize: 12,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 150ms ease',
          '&:hover': {
            backgroundColor: '#EBECF0',
          },
        },
      },
    },
  },
});
