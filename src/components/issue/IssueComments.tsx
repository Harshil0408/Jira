import React from 'react';
import { Box, Avatar, Typography, TextField, Button, Divider } from '@mui/material';
import { mockUsers } from '../../lib/mockData';
import { formatDistanceToNow } from 'date-fns';

export const IssueComments: React.FC = () => {
  const currentUser = mockUsers[0];
  const comments = [
    {
      id: 'c1',
      authorId: 'u2',
      text: "I've started working on the Lambda functions. Should be done by tomorrow.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
      id: 'c2',
      authorId: 'u1',
      text: "Great! Make sure to include error handling for the stream processing.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#5E6C84', mb: 2, letterSpacing: 0.5 }}>
        ACTIVITY
      </Typography>
      
      {/* Comment Input */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Avatar src={currentUser.avatarUrl} sx={{ width: 32, height: 32 }} />
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            multiline
            minRows={1}
            placeholder="Add a comment..."
            variant="outlined"
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': { bgcolor: 'white' }
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            <Box component="span" sx={{ fontWeight: 600 }}>Pro tip:</Box> press <Box component="span" sx={{ fontWeight: 600 }}>M</Box> to comment
          </Typography>
        </Box>
      </Box>

      {/* Comments List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {comments.map(comment => {
          const author = mockUsers.find(u => u.id === comment.authorId);
          return (
            <Box key={comment.id} sx={{ display: 'flex', gap: 2 }}>
              <Avatar src={author?.avatarUrl} sx={{ width: 32, height: 32 }} />
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{author?.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {formatDistanceToNow(new Date(comment.createdAt))} ago
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  {comment.text}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                    Edit
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                    Delete
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
