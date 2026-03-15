import React from 'react';
import { Box, Typography, Avatar, Chip, Divider, Tooltip } from '@mui/material';
import { 
  Person as PersonIcon, 
  Flag as PriorityIcon, 
  Label as LabelIcon, 
  Bolt as EpicIcon, 
  CalendarMonth as CalendarIcon,
  Visibility as WatchIcon
} from '@mui/icons-material';
import { Issue, User } from '../../types';
import { mockUsers } from '../../lib/mockData';
import { PriorityIcon as PriorityIconComp } from '../common/PriorityIcon';

interface Props {
  issue: Issue;
}

export const IssueMetaSidebar: React.FC<Props> = ({ issue }) => {
  const assignee = mockUsers.find(u => u.id === issue.assigneeId);
  const reporter = mockUsers.find(u => u.id === issue.reporterId);

  const MetaRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        py: 1.5, 
        px: 1,
        borderRadius: 1,
        '&:hover': { bgcolor: '#F4F5F7' }
      }}
    >
      <Typography variant="body2" sx={{ width: 120, color: 'text.secondary', fontSize: 12, fontWeight: 500 }}>
        {label}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid #DFE1E6' }}>
      <MetaRow label="Assignee">
        {assignee ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={assignee.avatarUrl} sx={{ width: 24, height: 24 }} />
            <Typography variant="body2" sx={{ fontSize: 13 }}>{assignee.name}</Typography>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: 'primary.main', cursor: 'pointer', fontSize: 13 }}>Unassigned</Typography>
        )}
      </MetaRow>

      <MetaRow label="Reporter">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={reporter?.avatarUrl} sx={{ width: 24, height: 24 }} />
          <Typography variant="body2" sx={{ fontSize: 13 }}>{reporter?.name}</Typography>
        </Box>
      </MetaRow>

      <MetaRow label="Priority">
        <PriorityIconComp priority={issue.priority} showLabel />
      </MetaRow>

      <MetaRow label="Labels">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {issue.labels.map(label => (
            <Chip key={label} label={label} size="small" sx={{ height: 20, fontSize: 11, borderRadius: '3px' }} />
          ))}
          {issue.labels.length === 0 && <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>None</Typography>}
        </Box>
      </MetaRow>

      <MetaRow label="Epic Link">
        {issue.epicId ? (
          <Chip 
            label="Real-time Charting" 
            size="small" 
            sx={{ height: 20, fontSize: 11, bgcolor: '#6554C020', color: '#6554C0', fontWeight: 600 }} 
          />
        ) : (
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>None</Typography>
        )}
      </MetaRow>

      <MetaRow label="Sprint">
        <Typography variant="body2" sx={{ color: 'primary.main', fontSize: 13, cursor: 'pointer' }}>Sprint 2</Typography>
      </MetaRow>

      <MetaRow label="Story Points">
        <Typography variant="body2" sx={{ fontSize: 13 }}>{issue.storyPoints || 'None'}</Typography>
      </MetaRow>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ px: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
          Created March 1, 2026, 10:00 AM
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          Updated 2 hours ago
        </Typography>
      </Box>
    </Box>
  );
};
