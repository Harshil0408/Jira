import React from 'react';
import { Box, Typography, IconButton, Chip } from '@mui/material';
import { Add as AddIcon, MoreHoriz as MoreIcon } from '@mui/icons-material';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { IssueCard } from './IssueCard';
import { Issue, Status } from '../../types';

interface Props {
  status: Status;
  label: string;
  issues: Issue[];
  color: string;
}

export const BoardColumn: React.FC<Props> = ({ status, label, issues, color }) => {
  return (
    <Box sx={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      {/* Column Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, px: 0.5 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, mr: 1 }} />
        <Typography 
          variant="overline" 
          sx={{ 
            fontSize: 12, 
            fontWeight: 600, 
            color: '#5E6C84', 
            letterSpacing: 0.5,
            lineHeight: 1
          }}
        >
          {label}
        </Typography>
        <Chip 
          label={issues.length} 
          size="small" 
          sx={{ 
            ml: 1, 
            height: 18, 
            fontSize: 11, 
            bgcolor: '#DFE1E6', 
            color: '#42526E' 
          }} 
        />
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="small">
          <AddIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <MoreIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              flexGrow: 1,
              minHeight: 400,
              borderRadius: 1,
              bgcolor: snapshot.isDraggingOver ? '#E9F2FF' : 'transparent',
              border: snapshot.isDraggingOver ? '2px dashed #4C9AFF' : '2px dashed transparent',
              transition: 'all 150ms ease',
              p: 0.5
            }}
          >
            {issues.map((issue, index) => (
              <Draggable key={issue.id} draggableId={issue.id} index={index}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <IssueCard issue={issue} isDragging={snapshot.isDragging} />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>

      {/* Column Footer */}
      <Box sx={{ mt: 1 }}>
        <IconButton 
          size="small" 
          sx={{ 
            width: '100%', 
            borderRadius: 1, 
            justifyContent: 'flex-start',
            color: '#5E6C84',
            '&:hover': { bgcolor: '#EBECF0' }
          }}
        >
          <AddIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontSize: 13 }}>Create issue</Typography>
        </IconButton>
      </Box>
    </Box>
  );
};
