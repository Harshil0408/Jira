import React from 'react';
import { Box } from '@mui/material';
import { ProjectSidebar } from './ProjectSidebar';
import { Outlet } from 'react-router-dom';

export const ProjectLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%', m: -3 }}>
      <ProjectSidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
