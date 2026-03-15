import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor, Box, IconButton, Typography } from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  Error as ErrorIcon, 
  Info as InfoIcon, 
  Warning as WarningIcon,
  Close as CloseIcon
} from '@mui/icons-material';

interface ToastContextType {
  showToast: (message: string, severity?: AlertColor, action?: React.ReactNode) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [action, setAction] = useState<React.ReactNode>(null);

  const showToast = useCallback((msg: string, sev: AlertColor = 'success', act?: React.ReactNode) => {
    setMessage(msg);
    setSeverity(sev);
    setAction(act || null);
    setOpen(true);
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getIcon = () => {
    switch (severity) {
      case 'success': return <CheckCircleIcon sx={{ color: '#00875A' }} />;
      case 'error': return <ErrorIcon sx={{ color: '#DE350B' }} />;
      case 'info': return <InfoIcon sx={{ color: '#0052CC' }} />;
      case 'warning': return <WarningIcon sx={{ color: '#FF8B00' }} />;
      default: return null;
    }
  };

  const getColors = () => {
    switch (severity) {
      case 'success': return { bg: '#E3FCEF', text: '#006644' };
      case 'error': return { bg: '#FFEBE6', text: '#BF2600' };
      case 'info': return { bg: '#E9F2FF', text: '#0747A6' };
      case 'warning': return { bg: '#FFFAE6', text: '#974F0C' };
      default: return { bg: '#F4F5F7', text: '#172B4D' };
    }
  };

  const colors = getColors();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: colors.bg,
            color: colors.text,
            px: 2,
            py: 1.5,
            borderRadius: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            minWidth: 300,
            maxWidth: 480,
            border: `1px solid ${severity === 'success' ? '#ABF5D1' : severity === 'error' ? '#FFBDAD' : severity === 'info' ? '#B3D4FF' : '#FFF0B3'}`
          }}
        >
          {getIcon()}
          <Typography variant="body2" sx={{ flexGrow: 1, fontWeight: 500, fontSize: 13 }}>
            {message}
          </Typography>
          {action}
          <IconButton size="small" onClick={handleClose} sx={{ color: colors.text }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Snackbar>
    </ToastContext.Provider>
  );
};
