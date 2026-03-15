import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  InputBase, 
  Button, 
  IconButton, 
  Badge, 
  Avatar, 
  Tooltip,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  Notifications as NotificationsIcon, 
  HelpOutline as HelpIcon 
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockUsers } from '../../lib/mockData';

import { CreateIssueModal } from '../modals/CreateIssueModal';

export const TopBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = mockUsers[0];

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Simple breadcrumb logic
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length === 0) return 'Home';
    return paths.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' > ');
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'white', 
        color: 'text.primary', 
        boxShadow: 'none', 
        borderBottom: '1px solid #DFE1E6',
        zIndex: 1200
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 56, gap: 2 }}>
        {/* Left: Breadcrumbs */}
        <Box sx={{ flexGrow: 0, minWidth: 200 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
            {getBreadcrumbs()}
          </Typography>
        </Box>

        {/* Center: Search */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: '#F4F5F7', 
              borderRadius: '18px', 
              px: 1.5,
              width: searchFocused ? 480 : 320,
              height: 36,
              transition: 'width 200ms ease',
              border: '1px solid transparent',
              '&:hover': { bgcolor: '#EBECF0' },
              ...(searchFocused && { 
                bgcolor: 'white', 
                borderColor: 'primary.main',
                boxShadow: '0 0 0 1px #0052CC'
              })
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search issues, projects..."
              fullWidth
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              sx={{ fontSize: 14 }}
            />
          </Box>
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateModalOpen(true)}
            sx={{ 
              bgcolor: 'primary.main', 
              height: 32, 
              fontSize: 13,
              px: 2
            }}
          >
            Create
          </Button>
          
          <Tooltip title="Notifications">
            <IconButton size="small">
              <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Help">
            <IconButton size="small">
              <HelpIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <IconButton size="small" onClick={handleProfileClick} sx={{ ml: 0.5 }}>
            <Avatar src={currentUser.avatarUrl} sx={{ width: 32, height: 32 }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: { mt: 1, width: 200, boxShadow: '0 4px 12px rgba(9,30,66,0.15)' }
            }}
          >
            <MenuItem onClick={handleClose} sx={{ fontSize: 14 }}>Profile</MenuItem>
            <MenuItem onClick={handleClose} sx={{ fontSize: 14 }}>Account Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ fontSize: 14, color: 'error.main' }}>Sign out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <CreateIssueModal 
        open={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </AppBar>
  );
};
