import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  IconButton,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import { Close as CloseIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';
import { useToast } from '../../components/common/ToastContext';

interface CompleteSprintModalProps {
  open: boolean;
  onClose: () => void;
  sprintName: string;
  completedCount: number;
  openCount: number;
}

export const CompleteSprintModal: React.FC<CompleteSprintModalProps> = ({ 
  open, 
  onClose, 
  sprintName, 
  completedCount, 
  openCount 
}) => {
  const [moveTarget, setMoveTarget] = useState('backlog');
  const { showToast } = useToast();

  const handleComplete = () => {
    // Mock complete logic
    showToast(`Sprint "${sprintName}" completed`, 'success');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Complete Sprint: {sprintName}</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This sprint contains:
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#36B37E' }}>{completedCount}</Typography>
              <Typography variant="caption" sx={{ color: '#5E6C84', fontWeight: 600 }}>COMPLETED ISSUES</Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF8B00' }}>{openCount}</Typography>
              <Typography variant="caption" sx={{ color: '#5E6C84', fontWeight: 600 }}>OPEN ISSUES</Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {openCount > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
              Where should we move the {openCount} open issues?
            </Typography>
            <Select 
              fullWidth 
              size="small" 
              value={moveTarget} 
              onChange={(e) => setMoveTarget(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="backlog">Backlog</MenuItem>
              <MenuItem value="new-sprint">New Sprint</MenuItem>
            </Select>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, p: 1.5, bgcolor: '#F4F5F7', borderRadius: 1 }}>
              <InfoIcon sx={{ fontSize: 16, color: '#5E6C84', mt: 0.2 }} />
              <Typography variant="caption" sx={{ color: '#5E6C84' }}>
                Issues that aren't completed will be moved to the selected destination.
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ color: '#42526E', textTransform: 'none' }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleComplete}
          sx={{ bgcolor: '#0052CC', '&:hover': { bgcolor: '#0747A6' }, textTransform: 'none' }}
        >
          Complete Sprint
        </Button>
      </DialogActions>
    </Dialog>
  );
};
