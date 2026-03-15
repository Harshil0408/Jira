import React from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { SprintSection } from './SprintSection';
import { mockIssues, mockSprints } from '../../lib/mockData';

export const BacklogView: React.FC = () => {
  const activeSprint = mockSprints.find(s => s.status === 'ACTIVE');
  const sprintIssues = mockIssues.filter(i => i.sprintId === activeSprint?.id);
  const backlogIssues = mockIssues.filter(i => !i.sprintId);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Backlog</Typography>
      </Box>

      {/* Filter Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search backlog"
          sx={{ width: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          variant="outlined" 
          size="small" 
          sx={{ color: 'text.primary', borderColor: 'divider' }}
        >
          Create Sprint
        </Button>
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pb: 4 }}>
        {activeSprint && (
          <SprintSection sprint={activeSprint} issues={sprintIssues} />
        )}
        
        <SprintSection isBacklog issues={backlogIssues} />
      </Box>
    </Box>
  );
};
