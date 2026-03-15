import React from 'react';
import { Card, Box, Typography, Chip, Avatar, Tooltip } from '@mui/material';
import { IssueTypeIcon } from '../common/IssueTypeIcon';
import { PriorityIcon } from '../common/PriorityIcon';
import { Issue, User } from '../../types';
import { mockUsers } from '../../lib/mockData';

interface Props {
  issue: Issue;
  isDragging?: boolean;
}

export const IssueCard: React.FC<Props> = ({ issue, isDragging }) => {
  const assignee = mockUsers.find(u => u.id === issue.assigneeId);

  return (
    <Card
      sx={{
        p: 1.5,
        mb: 1,
        borderRadius: '3px',
        boxShadow: isDragging ? '0 8px 24px rgba(9,30,66,0.3)' : '0 1px 2px rgba(9,30,66,0.25)',
        transform: isDragging ? 'rotate(2deg)' : 'none',
        opacity: isDragging ? 0.9 : 1,
        cursor: 'grab',
        '&:hover': {
          boxShadow: '0 3px 8px rgba(9,30,66,0.2)',
        },
      }}
    >
      {/* Epic Link */}
      {issue.epicId && (
        <Box sx={{ mb: 0.5 }}>
          <Chip 
            label="EPIC" 
            size="small" 
            sx={{ 
              height: 16, 
              fontSize: 9, 
              fontWeight: 700, 
              bgcolor: '#6554C020', 
              color: '#6554C0',
              borderRadius: '2px'
            }} 
          />
        </Box>
      )}

      {/* Labels */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
        {issue.labels.map(label => (
          <Chip 
            key={label} 
            label={label} 
            size="small" 
            sx={{ 
              height: 18, 
              fontSize: 10, 
              bgcolor: '#EBECF0', 
              color: '#42526E',
              borderRadius: '3px'
            }} 
          />
        ))}
      </Box>

      {/* Title */}
      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: 13, 
          fontWeight: 500, 
          color: '#172B4D', 
          mb: 1.5,
          lineHeight: 1.4,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {issue.summary}
      </Typography>

      {/* Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IssueTypeIcon type={issue.type} size={14} />
          <PriorityIcon priority={issue.priority} size={14} />
          <Typography variant="caption" sx={{ fontSize: 11, color: '#5E6C84', fontFamily: 'monospace' }}>
            {issue.key}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {issue.storyPoints && (
            <Box 
              sx={{ 
                width: 20, 
                height: 20, 
                borderRadius: '50%', 
                bgcolor: '#DFE1E6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 600
              }}
            >
              {issue.storyPoints}
            </Box>
          )}
          {assignee && (
            <Tooltip title={assignee.name}>
              <Avatar src={assignee.avatarUrl} sx={{ width: 24, height: 24 }} />
            </Tooltip>
          )}
        </Box>
      </Box>
    </Card>
  );
};
