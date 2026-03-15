import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Avatar,
  Tooltip
} from '@mui/material';
import { 
  Star as StarIcon, 
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import { mockIssues, mockProjects } from '../../lib/mockData';
import { IssueTypeIcon } from '../../components/common/IssueTypeIcon';
import { PriorityIcon } from '../../components/common/PriorityIcon';
import { StatusChip } from '../../components/common/StatusChip';
import { useNavigate } from 'react-router-dom';
import { Issue, Project } from '../../types';
import { IssueDrawer } from '../../components/issue/IssueDrawer';

export const StarredPage: React.FC = () => {
  const [starredProjects, setStarredProjects] = useState<Project[]>(mockProjects.filter(p => p.isStarred));
  const [starredIssues, setStarredIssues] = useState<Issue[]>(mockIssues.filter(i => i.isStarred));
  const [drawerIssue, setDrawerIssue] = useState<Issue | null>(null);
  const navigate = useNavigate();

  const handleUnstarProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setStarredProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleUnstarIssue = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setStarredIssues(prev => prev.filter(i => i.id !== id));
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <StarIcon sx={{ color: '#FF8B00', fontSize: 28 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#172B4D' }}>Starred</Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#5E6C84' }}>Your bookmarked projects and issues</Typography>
      </Box>

      {/* Projects Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', letterSpacing: 0.8, mb: 2, display: 'block', textTransform: 'uppercase' }}>
          PROJECTS
        </Typography>
        {starredProjects.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center', bgcolor: '#F4F5F7', borderRadius: 1 }}>
            <StarBorderIcon sx={{ fontSize: 40, color: '#DFE1E6', mb: 1 }} />
            <Typography variant="body2" sx={{ color: '#5E6C84' }}>No starred projects yet</Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {starredProjects.map(project => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    cursor: 'pointer', 
                    '&:hover': { bgcolor: '#FAFBFC', borderColor: '#0052CC' },
                    position: 'relative'
                  }}
                  onClick={() => navigate(`/projects/${project.key}/board`)}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar 
                          variant="rounded" 
                          sx={{ width: 32, height: 32, bgcolor: project.color, fontSize: 14, fontWeight: 700 }}
                        >
                          {project.key.substring(0, 1)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#172B4D' }}>{project.name}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{project.type} project</Typography>
                        </Box>
                      </Box>
                      <IconButton size="small" onClick={(e) => handleUnstarProject(e, project.id)}>
                        <StarIcon sx={{ color: '#FF8B00', fontSize: 20 }} />
                      </IconButton>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Last visited: 2 hours ago</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Issues Section */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', letterSpacing: 0.8, mb: 2, display: 'block', textTransform: 'uppercase' }}>
          ISSUES
        </Typography>
        {starredIssues.length === 0 ? (
          <Box sx={{ py: 4, textAlign: 'center', bgcolor: '#F4F5F7', borderRadius: 1 }}>
            <StarBorderIcon sx={{ fontSize: 40, color: '#DFE1E6', mb: 1 }} />
            <Typography variant="body2" sx={{ color: '#5E6C84' }}>No starred issues yet</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} variant="outlined" sx={{ border: '1px solid #DFE1E6', borderRadius: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#F4F5F7', height: 36 }}>
                  <TableCell sx={{ width: 40 }} />
                  <TableCell sx={{ width: 40, fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>T</TableCell>
                  <TableCell sx={{ width: 90, fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>KEY</TableCell>
                  <TableCell sx={{ fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>SUMMARY</TableCell>
                  <TableCell sx={{ width: 130, fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>PROJECT</TableCell>
                  <TableCell sx={{ width: 100, fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>PRIORITY</TableCell>
                  <TableCell sx={{ width: 120, fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>STATUS</TableCell>
                  <TableCell sx={{ width: 120, fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>STARRED ON</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {starredIssues.map(issue => {
                  const project = mockProjects.find(p => p.id === issue.projectId);
                  return (
                    <TableRow 
                      key={issue.id} 
                      hover 
                      sx={{ height: 40, cursor: 'pointer' }}
                      onClick={() => setDrawerIssue(issue)}
                    >
                      <TableCell sx={{ px: 1 }}>
                        <IconButton size="small" onClick={(e) => handleUnstarIssue(e, issue.id)}>
                          <StarIcon sx={{ color: '#FF8B00', fontSize: 18 }} />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ px: 1 }}>
                        <IssueTypeIcon type={issue.type} size={14} />
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, color: '#0052CC', fontFamily: 'monospace', fontWeight: 600 }}>
                        {issue.key}
                      </TableCell>
                      <TableCell sx={{ fontSize: 13 }}>
                        {issue.summary}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 14, height: 14, bgcolor: project?.color || '#ccc', borderRadius: 0.5 }} />
                          <Typography variant="body2" sx={{ fontSize: 12 }}>{project?.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <PriorityIcon priority={issue.priority} showLabel />
                      </TableCell>
                      <TableCell>
                        <StatusChip status={issue.status} size="small" />
                      </TableCell>
                      <TableCell sx={{ fontSize: 12, color: 'text.secondary' }}>
                        Mar 12, 2026
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <IssueDrawer 
        issue={drawerIssue} 
        open={Boolean(drawerIssue)} 
        onClose={() => setDrawerIssue(null)} 
      />
    </Box>
  );
};
