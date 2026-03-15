import React from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  IconButton,
  Divider
} from '@mui/material';
import { 
  Dashboard as BoardIcon, 
  FormatListBulleted as BacklogIcon, 
  Timeline as RoadmapIcon, 
  BarChart as ReportsIcon, 
  Settings as SettingsIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { mockProjects } from '../../lib/mockData';

export const ProjectSidebar: React.FC = () => {
  const { projectKey } = useParams<{ projectKey: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const project = mockProjects.find(p => p.key === projectKey);

  if (!project) return null;

  const navItems = [
    { label: 'Board', icon: <BoardIcon />, path: `/projects/${projectKey}/board` },
    { label: 'Backlog', icon: <BacklogIcon />, path: `/projects/${projectKey}/backlog` },
    { label: 'Roadmap', icon: <RoadmapIcon />, path: `/projects/${projectKey}/roadmap` },
    { label: 'Reports', icon: <ReportsIcon />, path: `/projects/${projectKey}/reports` },
    { label: 'Project Settings', icon: <SettingsIcon />, path: `/projects/${projectKey}/settings` },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box 
      sx={{ 
        width: 200, 
        flexShrink: 0, 
        bgcolor: 'white', 
        borderRight: '1px solid #DFE1E6',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Top: Project Info */}
      <Box sx={{ p: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            cursor: 'pointer', 
            mb: 2,
            '&:hover': { color: 'primary.main' }
          }}
          onClick={() => navigate('/projects')}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ fontWeight: 600 }}>Projects</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 28, height: 28, bgcolor: project.color, borderRadius: 0.5 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{project.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{project.key} Project</Typography>
          </Box>
        </Box>
      </Box>

      {/* Nav Items */}
      <List sx={{ px: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 1,
                minHeight: 36,
                backgroundColor: isActive(item.path) ? '#E9F2FF' : 'transparent',
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                '&:hover': { backgroundColor: '#EBECF0' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                {React.cloneElement(item.icon as React.ReactElement<any>, { fontSize: 'small' })}
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontSize: 13, fontWeight: isActive(item.path) ? 600 : 400 }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
