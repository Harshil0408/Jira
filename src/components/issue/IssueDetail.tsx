import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Breadcrumbs, Link as MuiLink, Grid, TextField, Chip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { 
  Close as CloseIcon, 
  Share as ShareIcon, 
  Visibility as WatchIcon, 
  MoreHoriz as MoreIcon,
  AttachFile as AttachIcon,
  Link as LinkIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { mockIssues } from '../../lib/mockData';
import { IssueTypeIcon } from '../common/IssueTypeIcon';
import { StatusChip } from '../common/StatusChip';
import { IssueComments } from './IssueComments';
import { IssueMetaSidebar } from './IssueMetaSidebar';
import { IssueDetailContent } from './IssueDetailContent';
import { DeleteConfirmationModal } from '../modals/DeleteConfirmationModal';

export const IssueDetail: React.FC = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const issue = mockIssues.find(i => i.key === issueId) || mockIssues[0];

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    handleMoreClose();
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
    navigate(-1);
  };

  return (
    <Box sx={{ bgcolor: '#F4F5F7', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Breadcrumb Bar */}
      <Box sx={{ bgcolor: 'white', px: 3, py: 1.5, borderBottom: '1px solid #DFE1E6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Breadcrumbs sx={{ '& .MuiBreadcrumbs-separator': { fontSize: 12 } }}>
          <MuiLink href="#" sx={{ fontSize: 13, color: 'text.secondary', textDecoration: 'none' }}>Cloud Infrastructure</MuiLink>
          <MuiLink href="#" sx={{ fontSize: 13, color: 'text.secondary', textDecoration: 'none' }}>Board</MuiLink>
          <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 700 }}>{issue.key}</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small"><WatchIcon fontSize="small" /></IconButton>
          <IconButton size="small"><ShareIcon fontSize="small" /></IconButton>
          <IconButton size="small" onClick={handleMoreClick}><MoreIcon fontSize="small" /></IconButton>
          <IconButton size="small" onClick={() => navigate(-1)}><CloseIcon fontSize="small" /></IconButton>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreClose}
      >
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete issue" />
        </MenuItem>
      </Menu>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete issue?"
        message={`Are you sure you want to delete ${issue.key}? This action cannot be undone.`}
      />

      {/* Main Content */}
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid size={{ xs: 12, lg: 7.5 }}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, border: '1px solid #DFE1E6' }}>
              <IssueDetailContent issue={issue} />
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, lg: 4.5 }}>
            <IssueMetaSidebar issue={issue} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
