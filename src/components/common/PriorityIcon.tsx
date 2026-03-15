import React from 'react';
import { 
  KeyboardDoubleArrowUp as HighestIcon,
  KeyboardArrowUp as HighIcon,
  DragHandle as MediumIcon,
  KeyboardArrowDown as LowIcon,
  KeyboardDoubleArrowDown as LowestIcon
} from '@mui/icons-material';
import { Tooltip, Box, Typography } from '@mui/material';
import { Priority } from '../../types';

interface Props {
  priority: Priority;
  size?: number;
  showLabel?: boolean;
}

export const PriorityIcon: React.FC<Props> = ({ priority, size = 16, showLabel = false }) => {
  const priorityMap = {
    HIGHEST: { icon: <HighestIcon sx={{ color: '#DE350B', fontSize: size }} />, label: 'Highest' },
    HIGH: { icon: <HighIcon sx={{ color: '#DE350B', fontSize: size }} />, label: 'High' },
    MEDIUM: { icon: <MediumIcon sx={{ color: '#FF8B00', fontSize: size }} />, label: 'Medium' },
    LOW: { icon: <LowIcon sx={{ color: '#00875A', fontSize: size }} />, label: 'Low' },
    LOWEST: { icon: <LowestIcon sx={{ color: '#00875A', fontSize: size }} />, label: 'Lowest' },
  };

  const { icon, label } = priorityMap[priority];

  return (
    <Tooltip title={label}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <span className="flex items-center justify-center">{icon}</span>
        {showLabel && (
          <Typography variant="body2" sx={{ fontSize: 13, color: 'text.primary' }}>
            {label}
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};
