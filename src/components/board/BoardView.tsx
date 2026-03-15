import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, AvatarGroup, Avatar, Tooltip, Select, MenuItem, Switch, FormControlLabel, Divider } from '@mui/material';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { BoardColumn } from './BoardColumn';
import { Issue, Status } from '../../types';
import { mockIssues, mockUsers } from '../../lib/mockData';
import { CompleteSprintModal } from '../modals/CompleteSprintModal';

export const BoardView: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [completeSprintOpen, setCompleteSprintOpen] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newIssues = Array.from(issues);
    const draggedIssue = newIssues.find(i => i.id === draggableId);
    
    if (draggedIssue) {
      draggedIssue.status = destination.droppableId as Status;
      setIssues(newIssues);
    }
  };

  const columns: { status: Status; label: string; color: string }[] = [
    { status: 'TODO', label: 'TO DO', color: '#5E6C84' },
    { status: 'IN_PROGRESS', label: 'IN PROGRESS', color: '#0052CC' },
    { status: 'IN_REVIEW', label: 'IN REVIEW', color: '#6554C0' },
    { status: 'DONE', label: 'DONE', color: '#00875A' },
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Board Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Board</Typography>
          <Box sx={{ px: 1, py: 0.5, border: '1px solid #DFE1E6', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>Sprint 2 · Mar 1 – Mar 31</Typography>
          </Box>
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ color: 'text.secondary', borderColor: 'divider' }}
            onClick={() => setCompleteSprintOpen(true)}
          >
            Complete Sprint
          </Button>
        </Box>
      </Box>

      {/* Filter Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search this board"
          sx={{ width: 200 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 12 } }}>
          {mockUsers.map(user => (
            <Tooltip key={user.id} title={user.name}>
              <Avatar src={user.avatarUrl} />
            </Tooltip>
          ))}
        </AvatarGroup>
        <Select size="small" defaultValue="all" sx={{ width: 120, height: 32, fontSize: 13 }}>
          <MenuItem value="all">Epic: All</MenuItem>
        </Select>
        <Select size="small" defaultValue="all" sx={{ width: 120, height: 32, fontSize: 13 }}>
          <MenuItem value="all">Label: All</MenuItem>
        </Select>
        <FormControlLabel
          control={<Switch size="small" />}
          label={<Typography variant="body2" sx={{ fontSize: 13 }}>Only My Issues</Typography>}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Button size="small" sx={{ color: 'text.secondary', fontSize: 13 }}>Clear all</Button>
      </Box>

      {/* Board Area */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, flexGrow: 1 }}>
          {columns.map(col => (
            <BoardColumn
              key={col.status}
              status={col.status}
              label={col.label}
              color={col.color}
              issues={issues.filter(i => i.status === col.status)}
            />
          ))}
        </Box>
      </DragDropContext>

      <CompleteSprintModal 
        open={completeSprintOpen} 
        onClose={() => setCompleteSprintOpen(false)} 
        sprintName="Sprint 2"
        completedCount={issues.filter(i => i.status === 'DONE').length}
        openCount={issues.filter(i => i.status !== 'DONE').length}
      />
    </Box>
  );
};
