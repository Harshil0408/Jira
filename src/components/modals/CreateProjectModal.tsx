import React, { useState, useEffect } from 'react';
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
  Grid,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Close as CloseIcon, InfoOutlined as InfoIcon } from '@mui/icons-material';
import { useToast } from '../../components/common/ToastContext';

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const COLORS = ['#0052CC', '#0747A6', '#006644', '#403294', '#DE350B', '#FF8B00', '#00B8D9', '#36B37E'];

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [type, setType] = useState('Software');
  const [color, setColor] = useState(COLORS[0]);
  const { showToast } = useToast();

  // Auto-generate key from name
  useEffect(() => {
    if (name) {
      const generatedKey = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 4);
      setKey(generatedKey);
    } else {
      setKey('');
    }
  }, [name]);

  const handleCreate = () => {
    if (!name || !key) return;
    
    // Mock create logic
    showToast(`Project "${name}" created successfully`, 'success');
    setName('');
    setKey('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Create project</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body2" sx={{ color: '#5E6C84', mb: 3 }}>
          Projects are where you and your team collaborate on issues.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
              NAME
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g. Marketing Campaign"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84' }}>
                KEY
              </Typography>
              <InfoIcon sx={{ fontSize: 14, color: '#5E6C84' }} />
            </Box>
            <TextField
              fullWidth
              placeholder="e.g. MC"
              size="small"
              value={key}
              onChange={(e) => setKey(e.target.value.toUpperCase())}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
              PROJECT TYPE
            </Typography>
            <Select 
              fullWidth 
              size="small" 
              value={type} 
              onChange={(e) => setType(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="Software">Software Development</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>
              PROJECT ICON COLOR
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {COLORS.map(c => (
                <Box 
                  key={c} 
                  onClick={() => setColor(c)}
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: c, 
                    borderRadius: 1, 
                    cursor: 'pointer',
                    border: color === c ? '2px solid #172B4D' : 'none',
                    boxShadow: color === c ? '0 0 0 2px white inset' : 'none'
                  }} 
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, p: 2, bgcolor: '#F4F5F7', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar variant="rounded" sx={{ bgcolor: color, width: 40, height: 40, fontWeight: 700 }}>
            {key || '?'}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{name || 'Project Name'}</Typography>
            <Typography variant="caption" sx={{ color: '#5E6C84' }}>{type} project • Key: {key || '?'}</Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ color: '#42526E', textTransform: 'none' }}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleCreate}
          disabled={!name || !key}
          sx={{ bgcolor: '#0052CC', '&:hover': { bgcolor: '#0747A6' }, textTransform: 'none' }}
        >
          Create project
        </Button>
      </DialogActions>
    </Dialog>
  );
};
