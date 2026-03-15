import React from 'react';
import { Box, Typography, IconButton, Chip, Avatar, Tooltip } from '@mui/material';
import { 
  MoreHoriz as MoreIcon, 
  DragIndicator as DragIcon 
} from '@mui/icons-material';
import { IssueTypeIcon } from '../common/IssueTypeIcon';
import { PriorityIcon } from '../common/PriorityIcon';
import { StatusChip } from '../common/StatusChip';
import { Issue, User } from '../../types';
import { mockUsers } from '../../lib/mockData';

interface Props {
  issue: Issue;
}

export const BacklogRow: React.FC<Props> = ({ issue }) => {
  const assignee = mockUsers.find(u => u.id === issue.assigneeId);

  return (
    <Box
      sx={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        px: 1,
        borderBottom: '1px solid #DFE1E6',
        bgcolor: 'white',
        '&:hover': {
          bgcolor: '#F4F5F7',
          '& .drag-handle': { opacity: 1 }
        },
        cursor: 'pointer'
      }}
    >
      <Box className="drag-handle" sx={{ opacity: 0, mr: 1, color: '#BDC3CE', display: 'flex' }}>
        <DragIcon sx={{ fontSize: 16 }} />
      </Box>
      
      <Box sx={{ mr: 1.5, display: 'flex' }}>
        <IssueTypeIcon type={issue.type} size={14} />
      </Box>

      <Typography 
        variant="body2" 
        sx={{ 
          width: 80, 
          fontSize: 12, 
          color: 'primary.main', 
          fontFamily: 'monospace',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        {issue.key}
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          flexGrow: 1, 
          fontSize: 13, 
          color: '#172B4D',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          mr: 2
        }}
      >
        {issue.summary}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {issue.epicId && (
          <Chip 
            label="EPIC" 
            size="small" 
            sx={{ 
              height: 18, 
              fontSize: 10, 
              bgcolor: '#6554C020', 
              color: '#6554C0',
              borderRadius: '3px',
              maxWidth: 100
            }} 
          />
        )}

        <PriorityIcon priority={issue.priority} size={14} />

        {assignee && (
          <Tooltip title={assignee.name}>
            <Avatar src={assignee.avatarUrl} sx={{ width: 22, height: 22 }} />
          </Tooltip>
        )}

        <Box 
          sx={{ 
            width: 24, 
            height: 20, 
            borderRadius: 1, 
            bgcolor: '#DFE1E6', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: 10,
            fontWeight: 600,
            color: '#42526E'
          }}
        >
          {issue.storyPoints || '-'}
        </Box>

        <StatusChip status={issue.status} size="small" />

        <IconButton size="small" sx={{ ml: 1 }}>
          <MoreIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
