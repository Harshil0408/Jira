import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Chip, Collapse } from '@mui/material';
import { 
  KeyboardArrowDown as ChevronDownIcon, 
  KeyboardArrowRight as ChevronRightIcon,
  MoreHoriz as MoreIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { BacklogRow } from './BacklogRow';
import { Issue, Sprint } from '../../types';
import { StartSprintModal } from '../modals/StartSprintModal';
import { CompleteSprintModal } from '../modals/CompleteSprintModal';

interface Props {
  sprint?: Sprint;
  issues: Issue[];
  isBacklog?: boolean;
}

export const SprintSection: React.FC<Props> = ({ sprint, issues, isBacklog = false }) => {
  const [expanded, setExpanded] = useState(true);
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          py: 1, 
          px: 1, 
          cursor: 'pointer',
          '&:hover': { bgcolor: '#F4F5F7' },
          borderRadius: 1
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronDownIcon sx={{ fontSize: 20, mr: 1 }} /> : <ChevronRightIcon sx={{ fontSize: 20, mr: 1 }} />}
        
        <Typography variant="body2" sx={{ fontWeight: 700, mr: 1 }}>
          {isBacklog ? 'Backlog' : sprint?.name}
        </Typography>
        
        {!isBacklog && sprint && (
          <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1 }}>
            Mar 1 – Mar 31
          </Typography>
        )}
        
        <Typography variant="caption" sx={{ color: 'text.secondary', mr: 2 }}>
          ({issues.length} issues)
        </Typography>

        {!isBacklog && sprint && (
          <Chip 
            label={sprint.status} 
            size="small" 
            sx={{ 
              height: 18, 
              fontSize: 10, 
              fontWeight: 700,
              bgcolor: sprint.status === 'ACTIVE' ? '#E3FCEF' : '#DFE1E6',
              color: sprint.status === 'ACTIVE' ? '#00875A' : '#42526E'
            }} 
          />
        )}

        <Box sx={{ flexGrow: 1 }} />

        {!isBacklog && (
          <Button 
            size="small" 
            variant="outlined" 
            sx={{ 
              height: 24, 
              fontSize: 11, 
              borderColor: 'divider', 
              color: 'text.primary',
              mr: 1
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (sprint?.status === 'ACTIVE') {
                setCompleteModalOpen(true);
              } else {
                setStartModalOpen(true);
              }
            }}
          >
            {sprint?.status === 'ACTIVE' ? 'Complete Sprint' : 'Start Sprint'}
          </Button>
        )}

        <IconButton size="small" onClick={(e) => e.stopPropagation()}>
          <MoreIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Issues List */}
      <Collapse in={expanded}>
        <Box sx={{ mt: 0.5, border: '1px solid #DFE1E6', borderRadius: 1, overflow: 'hidden' }}>
          {issues.length > 0 ? (
            issues.map(issue => (
              <BacklogRow key={issue.id} issue={issue} />
            ))
          ) : (
            <Box sx={{ p: 2, textAlign: 'center', bgcolor: 'white' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Plan your sprint by dragging issues here</Typography>
            </Box>
          )}
          
          {/* Create Issue Footer */}
          <Box 
            sx={{ 
              height: 36, 
              display: 'flex', 
              alignItems: 'center', 
              px: 2, 
              color: 'text.secondary',
              cursor: 'pointer',
              '&:hover': { bgcolor: '#F4F5F7' }
            }}
          >
            <AddIcon sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="body2" sx={{ fontSize: 13 }}>Create issue</Typography>
          </Box>
        </Box>
      </Collapse>

      {sprint && (
        <>
          <StartSprintModal 
            open={startModalOpen} 
            onClose={() => setStartModalOpen(false)} 
            sprintName={sprint.name}
            issueCount={issues.length}
            totalPoints={issues.reduce((acc, i) => acc + (i.storyPoints || 0), 0)}
          />
          <CompleteSprintModal 
            open={completeModalOpen} 
            onClose={() => setCompleteModalOpen(false)} 
            sprintName={sprint.name}
            completedCount={issues.filter(i => i.status === 'DONE').length}
            openCount={issues.filter(i => i.status !== 'DONE').length}
          />
        </>
      )}
    </Box>
  );
};
