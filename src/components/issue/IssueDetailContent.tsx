import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { 
  AttachFile as AttachIcon,
  Link as LinkIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Issue } from '../../types';
import { IssueTypeIcon } from '../common/IssueTypeIcon';
import { StatusChip } from '../common/StatusChip';
import { IssueComments } from './IssueComments';

interface Props {
  issue: Issue;
}

export const IssueDetailContent: React.FC<Props> = ({ issue }) => {
  return (
    <Box>
      {/* Type + Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <IssueTypeIcon type={issue.type} size={18} />
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 12, fontWeight: 600 }}>
          {issue.type}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <StatusChip status="TODO" size="small" />
          <Typography sx={{ color: '#DFE1E6', mx: 0.5 }}>→</Typography>
          <StatusChip status="IN_PROGRESS" size="small" />
          <Typography sx={{ color: '#DFE1E6', mx: 0.5 }}>→</Typography>
          <StatusChip status="DONE" size="small" />
        </Box>
      </Box>

      {/* Title */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#172B4D' }}>
        {issue.summary}
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
        <Button size="small" variant="outlined" startIcon={<AttachIcon />} sx={{ color: '#5E6C84', borderColor: 'divider', textTransform: 'none' }}>Attach</Button>
        <Button size="small" variant="outlined" startIcon={<AddIcon />} sx={{ color: '#5E6C84', borderColor: 'divider', textTransform: 'none' }}>Add child issue</Button>
        <Button size="small" variant="outlined" startIcon={<LinkIcon />} sx={{ color: '#5E6C84', borderColor: 'divider', textTransform: 'none' }}>Link issue</Button>
      </Box>

      {/* Description */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#5E6C84', mb: 1, letterSpacing: 0.5, fontSize: 11 }}>
          DESCRIPTION
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: 14 }}>
          {issue.description}
        </Typography>
      </Box>

      {/* Comments */}
      <IssueComments />
    </Box>
  );
};
