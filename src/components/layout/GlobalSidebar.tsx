import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  IconButton, 
  Typography, 
  Avatar,
  Tooltip
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Inbox as InboxIcon, 
  Assignment as AssignmentIcon, 
  Star as StarIcon, 
  People as PeopleIcon, 
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockProjects, mockUsers } from '../../lib/mockData';
import { CreateProjectModal } from '../modals/CreateProjectModal';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 56;

export const GlobalSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = mockUsers[0];

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'My Issues', icon: <InboxIcon />, path: '/my-issues' },
    { label: 'Assigned to Me', icon: <AssignmentIcon />, path: '/assigned' },
    { label: 'Starred', icon: <StarIcon />, path: '/starred' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#0747A6',
          color: 'white',
          transition: 'width 200ms ease',
          overflowX: 'hidden',
          border: 'none',
        },
      }}
    >
      {/* Top Section */}
      <Box sx={{ p: 1, display: 'flex', alignItems: 'center', minHeight: 56 }}>
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
        {!collapsed && (
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', opacity: 1, transition: 'opacity 150ms' }}>
            <Box sx={{ width: 24, height: 24, bgcolor: 'white', borderRadius: 0.5, mr: 1 }} />
            <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 700 }}>
              JiraClone
            </Typography>
          </Box>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ mt: 2, flexGrow: 1 }}>
        {!collapsed && (
          <Typography variant="overline" sx={{ px: 2, color: '#A5C2FF', fontSize: 11, letterSpacing: 1 }}>
            YOUR WORK
          </Typography>
        )}
        <List sx={{ px: 0, py: 0.5 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 40,
                  px: 2,
                  backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.15)' : 'transparent',
                  borderLeft: isActive(item.path) ? '3px solid white' : '3px solid transparent',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14 }} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.15)' }} />

        {!collapsed && (
          <Typography variant="overline" sx={{ px: 2, color: '#A5C2FF', fontSize: 11, letterSpacing: 1 }}>
            PROJECTS
          </Typography>
        )}
        <List sx={{ px: 0, py: 0.5 }}>
          {mockProjects.slice(0, 5).map((project) => (
            <ListItem key={project.id} disablePadding>
              <ListItemButton
                onClick={() => navigate(`/projects/${project.key}/board`)}
                sx={{
                  minHeight: 40,
                  px: 2,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  <Box sx={{ width: 20, height: 20, bgcolor: project.color, borderRadius: 0.5 }} />
                </ListItemIcon>
                {!collapsed && <ListItemText primary={project.name} primaryTypographyProps={{ fontSize: 14 }} />}
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCreateProjectOpen(true)}
              sx={{
                minHeight: 40,
                px: 2,
                border: !collapsed ? '1px dashed rgba(255,255,255,0.3)' : 'none',
                mx: !collapsed ? 1 : 0,
                borderRadius: 1,
                mt: 1,
                color: 'rgba(255,255,255,0.7)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <AddIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Create Project" primaryTypographyProps={{ fontSize: 13 }} />}
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.15)' }} />

        <List sx={{ px: 0, py: 0.5 }}>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => navigate('/people')}
              sx={{ minHeight: 40, px: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <PeopleIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="People" primaryTypographyProps={{ fontSize: 14 }} />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => navigate('/settings')}
              sx={{ minHeight: 40, px: 2, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <SettingsIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: 14 }} />}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 1, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
        <Box 
          sx={{ display: 'flex', alignItems: 'center', px: 0.5, py: 1, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}
          onClick={() => navigate('/profile')}
        >
          <Avatar src={currentUser.avatarUrl} sx={{ width: 32, height: 32 }} />
          {!collapsed && (
            <Box sx={{ ml: 1.5, flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>
                {currentUser.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
                Admin
              </Typography>
            </Box>
          )}
          {!collapsed && (
            <Tooltip title="Logout">
              <IconButton 
                size="small" 
                sx={{ color: 'white' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login');
                }}
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      <CreateProjectModal 
        open={createProjectOpen} 
        onClose={() => setCreateProjectOpen(false)} 
      />
    </Drawer>
  );
};
