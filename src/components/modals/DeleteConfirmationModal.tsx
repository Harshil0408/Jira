import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  IconButton
} from '@mui/material';
import { Warning as WarningIcon, Close as CloseIcon } from '@mui/icons-material';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isDestructive?: boolean;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  open, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmLabel = 'Delete',
  isDestructive = true
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <WarningIcon sx={{ color: '#DE350B' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body2" sx={{ color: '#172B4D', lineHeight: 1.6 }}>
          {message}
        </Typography>
        <Typography variant="caption" sx={{ color: '#5E6C84', mt: 2, display: 'block' }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ color: '#42526E', textTransform: 'none' }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={() => {
            onConfirm();
            onClose();
          }}
          sx={{ 
            bgcolor: isDestructive ? '#DE350B' : '#0052CC', 
            '&:hover': { bgcolor: isDestructive ? '#BF2600' : '#0747A6' }, 
            textTransform: 'none' 
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
