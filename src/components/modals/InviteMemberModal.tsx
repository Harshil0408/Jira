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
  Autocomplete,
  Grid,
  Chip,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Close as CloseIcon, Email as EmailIcon } from '@mui/icons-material';
import { useToast } from '../../components/common/ToastContext';

interface InviteMemberModalProps {
  open: boolean;
  onClose: () => void;
}

export const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ open, onClose }) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [message, setMessage] = useState('');
  const { showToast } = useToast();

  const handleInvite = () => {
    if (emails.length === 0 && !inputValue) return;
    
    const finalEmails = [...emails];
    if (inputValue && isValidEmail(inputValue)) {
      finalEmails.push(inputValue);
    }

    if (finalEmails.length === 0) {
      showToast('Please enter at least one valid email address', 'error');
      return;
    }

    // Mock invite logic
    showToast(`Invitation sent to ${finalEmails.length} member(s)`, 'success');
    setEmails([]);
    setInputValue('');
    setMessage('');
    onClose();
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Invite team members</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body2" sx={{ color: '#5E6C84', mb: 3 }}>
          New members will be added to the workspace and can be assigned to projects.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
            EMAIL ADDRESSES
          </Typography>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={emails}
            onChange={(_, newValue) => setEmails(newValue as string[])}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip 
                  variant="outlined" 
                  label={option} 
                  size="small" 
                  {...getTagProps({ index })} 
                  sx={{ borderRadius: 1 }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="e.g. alex@company.com"
                size="small"
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue) {
                    if (isValidEmail(inputValue)) {
                      if (!emails.includes(inputValue)) {
                        setEmails([...emails, inputValue]);
                      }
                      setInputValue('');
                      e.preventDefault();
                    }
                  }
                }}
              />
            )}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
              ROLE
            </Typography>
            <Select 
              fullWidth 
              size="small" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="MEMBER">Member</MenuItem>
              <MenuItem value="VIEWER">Viewer</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
            PERSONAL MESSAGE (OPTIONAL)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Join our workspace to collaborate on projects..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            size="small"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ color: '#42526E', textTransform: 'none' }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleInvite}
          disabled={emails.length === 0 && !inputValue}
          sx={{ bgcolor: '#0052CC', '&:hover': { bgcolor: '#0747A6' }, textTransform: 'none' }}
        >
          Send invitation
        </Button>
      </DialogActions>
    </Dialog>
  );
};
