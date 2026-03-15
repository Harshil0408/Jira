import React from 'react';
import { 
  Drawer, 
  Box, 
  IconButton, 
  Typography, 
  Divider, 
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Close as CloseIcon, 
  OpenInNew as OpenInNewIcon, 
  Share as ShareIcon, 
  Visibility as WatchIcon, 
  MoreHoriz as MoreIcon,
  ContentCopy as CopyIcon,
  DriveFileMove as MoveIcon,
  Archive as ArchiveIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Issue } from '../../types';
import { IssueTypeIcon } from '../common/IssueTypeIcon';
import { IssueDetailContent } from '../issue/IssueDetailContent';
import { IssueMetaSidebar } from '../issue/IssueMetaSidebar';

interface Props {
  issue: Issue | null;
  open: boolean;
  onClose: () => void;
}

export const IssueDrawer: React.FC<Props> = ({ issue, open, onClose }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!issue) return null;

  const handleOpenFullPage = () => {
    navigate(`/issues/${issue.key}`);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        zIndex: 1250,
        '& .MuiDrawer-paper': {
          width: 720,
          boxSizing: 'border-box',
          boxShadow: '-8px 0 24px rgba(9,30,66,0.15)',
        },
      }}
      ModalProps={{
        BackdropProps: {
          sx: { bgcolor: 'rgba(9,30,66,0.3)' }
        }
      }}
    >
      {/* Header */}
      <Box sx={{ 
        height: 52, 
        px: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid #DFE1E6'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IssueTypeIcon type={issue.type} size={16} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
            {issue.type}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 16, alignSelf: 'center' }} />
          <Typography variant="body2" sx={{ color: '#0052CC', fontWeight: 600, fontFamily: 'monospace' }}>
            {issue.key}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Open full page">
            <IconButton size="small" onClick={handleOpenFullPage}><OpenInNewIcon fontSize="small" /></IconButton>
          </Tooltip>
          <Tooltip title="Copy link">
            <IconButton size="small"><ShareIcon fontSize="small" /></IconButton>
          </Tooltip>
          <Tooltip title="Watch">
            <IconButton size="small"><WatchIcon fontSize="small" /></IconButton>
          </Tooltip>
          <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}><MoreIcon fontSize="small" /></IconButton>
          <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ display: 'flex', height: 'calc(100vh - 52px)', overflow: 'hidden' }}>
        {/* Left Content */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
          <IssueDetailContent issue={issue} />
        </Box>

        {/* Right Sidebar */}
        <Box sx={{ 
          width: 240, 
          bgcolor: '#FAFBFC', 
          borderLeft: '1px solid #DFE1E6', 
          overflowY: 'auto',
          p: 2
        }}>
          <IssueMetaSidebar issue={issue} />
        </Box>
      </Box>

      {/* Footer Hint */}
      <Box sx={{ 
        height: 32, 
        bgcolor: '#F4F5F7', 
        px: 2, 
        display: 'flex', 
        alignItems: 'center',
        borderTop: '1px solid #DFE1E6'
      }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>
          <b>[</b> Prev issue &nbsp;&nbsp; <b>]</b> Next issue &nbsp;&nbsp; <b>Esc</b> Close
        </Typography>
      </Box>

      {/* More Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><CopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Clone" />
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><MoveIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Move" />
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon><ArchiveIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Archive" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </Drawer>
  );
};
