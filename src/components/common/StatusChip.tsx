import React from 'react';
import { Box, Typography } from '@mui/material';
import { Status } from '../../types';

interface Props {
  status: Status;
  size?: 'small' | 'medium';
}

export const StatusChip: React.FC<Props> = ({ status, size = 'medium' }) => {
  const statusMap = {
    TODO: { bg: '#DFE1E6', text: '#5E6C84', label: 'TO DO' },
    IN_PROGRESS: { bg: '#0052CC', text: 'white', label: 'IN PROGRESS' },
    IN_REVIEW: { bg: '#6554C0', text: 'white', label: 'IN REVIEW' },
    DONE: { bg: '#00875A', text: 'white', label: 'DONE' },
  };

  const { bg, text, label } = statusMap[status];

  return (
    <Box
      sx={{
        backgroundColor: bg,
        color: text,
        borderRadius: '3px',
        px: 1,
        py: 0.25,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: size === 'small' ? 18 : 22,
      }}
    >
      <Typography
        sx={{
          fontSize: size === 'small' ? 10 : 11,
          fontWeight: 600,
          letterSpacing: 0.5,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};
