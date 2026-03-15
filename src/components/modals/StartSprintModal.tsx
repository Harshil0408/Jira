import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  Box, 
  IconButton,
  Grid
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addDays } from 'date-fns';
import { useToast } from '../../components/common/ToastContext';

interface StartSprintModalProps {
  open: boolean;
  onClose: () => void;
  sprintName: string;
  issueCount: number;
  totalPoints: number;
}

export const StartSprintModal: React.FC<StartSprintModalProps> = ({ 
  open, 
  onClose, 
  sprintName, 
  issueCount, 
  totalPoints 
}) => {
  const [name, setName] = useState(sprintName);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(addDays(new Date(), 14));
  const [goal, setGoal] = useState('');
  const { showToast } = useToast();

  const handleStart = () => {
    if (!name || !startDate || !endDate) return;
    
    // Mock start logic
    showToast(`Sprint "${name}" started successfully`, 'success');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Start Sprint</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ mb: 3, p: 2, bgcolor: '#E9F2FF', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: '#0052CC', fontWeight: 600 }}>
            {issueCount} issues will be included in this sprint ({totalPoints} story points).
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
              SPRINT NAME
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
              START DATE
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
              END DATE
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
              SPRINT GOAL
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="What do we want to achieve in this sprint?"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ color: '#42526E', textTransform: 'none' }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleStart}
          disabled={!name || !startDate || !endDate}
          sx={{ bgcolor: '#0052CC', '&:hover': { bgcolor: '#0747A6' }, textTransform: 'none' }}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
};
