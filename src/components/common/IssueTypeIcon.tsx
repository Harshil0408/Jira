import React from 'react';
import { 
  BugReport as BugIcon, 
  Assignment as StoryIcon, 
  CheckCircle as TaskIcon, 
  FlashOn as EpicIcon 
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { IssueType } from '../../types';

interface Props {
  type: IssueType;
  size?: number;
}

export const IssueTypeIcon: React.FC<Props> = ({ type, size = 16 }) => {
  const iconMap = {
    BUG: { icon: <BugIcon sx={{ color: '#DE350B', fontSize: size }} />, label: 'Bug' },
    STORY: { icon: <StoryIcon sx={{ color: '#00875A', fontSize: size }} />, label: 'Story' },
    TASK: { icon: <TaskIcon sx={{ color: '#4C9AFF', fontSize: size }} />, label: 'Task' },
    EPIC: { icon: <EpicIcon sx={{ color: '#6554C0', fontSize: size }} />, label: 'Epic' },
  };

  const { icon, label } = iconMap[type];

  return (
    <Tooltip title={label}>
      <span className="flex items-center justify-center">{icon}</span>
    </Tooltip>
  );
};
