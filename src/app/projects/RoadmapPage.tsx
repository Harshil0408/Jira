import React from 'react';
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { mockIssues, mockProjects } from '../../lib/mockData';

export const RoadmapPage: React.FC = () => {
  const epics = mockIssues.filter(i => i.type === 'EPIC');

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Roadmap</Typography>
          <ToggleButtonGroup size="small" value="month" exclusive>
            <ToggleButton value="month" sx={{ fontSize: 11, px: 1.5 }}>Month</ToggleButton>
            <ToggleButton value="quarter" sx={{ fontSize: 11, px: 1.5 }}>Quarter</ToggleButton>
            <ToggleButton value="year" sx={{ fontSize: 11, px: 1.5 }}>Year</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Button variant="contained" size="small" startIcon={<AddIcon />}>Create Epic</Button>
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, border: '1px solid #DFE1E6', borderRadius: 1, overflow: 'hidden' }}>
        {/* Left Panel */}
        <Box sx={{ width: 220, flexShrink: 0, borderRight: '1px solid #DFE1E6', bgcolor: 'white' }}>
          <Box sx={{ p: 1.5, borderBottom: '1px solid #DFE1E6', bgcolor: '#F4F5F7' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>EPICS</Typography>
          </Box>
          {epics.map(epic => (
            <Box key={epic.id} sx={{ p: 1.5, borderBottom: '1px solid #DFE1E6', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#6554C0' }} />
              <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {epic.summary}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Timeline Area */}
        <Box sx={{ flexGrow: 1, bgcolor: 'white', position: 'relative', overflowX: 'auto' }}>
          {/* Timeline Header */}
          <Box sx={{ display: 'flex', borderBottom: '1px solid #DFE1E6', bgcolor: '#F4F5F7' }}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(month => (
              <Box key={month} sx={{ minWidth: 200, p: 1, borderRight: '1px solid #DFE1E6', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{month} 2026</Typography>
              </Box>
            ))}
          </Box>

          {/* Epic Bars */}
          <Box sx={{ p: 0 }}>
            {epics.map((epic, index) => (
              <Box key={epic.id} sx={{ height: 49, borderBottom: '1px solid #DFE1E6', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Tooltip title={`${epic.summary} (Mar 1 - Apr 15)`}>
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      left: 400 + (index * 20), // Mock position
                      width: 300,
                      height: 28,
                      bgcolor: '#6554C0',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      color: 'white',
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.9 }
                    }}
                  >
                    {epic.summary}
                  </Box>
                </Tooltip>
              </Box>
            ))}
          </Box>

          {/* Today Line */}
          <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: 500, width: 2, bgcolor: '#DE350B', zIndex: 1 }}>
            <Box sx={{ position: 'absolute', top: 0, left: -20, bgcolor: '#DE350B', color: 'white', px: 0.5, py: 0.25, fontSize: 9, borderRadius: 0.5 }}>TODAY</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
