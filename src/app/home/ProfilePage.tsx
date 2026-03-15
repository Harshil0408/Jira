import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Email as EmailIcon, 
  Business as BusinessIcon, 
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  History as HistoryIcon,
  Assignment as AssignmentIcon,
  MoreHoriz as MoreIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { mockUsers, mockIssues, mockProjects, mockActivities } from '../../lib/mockData';
import { StatusChip } from '../../components/common/StatusChip';
import { IssueTypeIcon } from '../../components/common/IssueTypeIcon';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const user = mockUsers[0]; // Current user
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const userIssues = mockIssues.filter(i => i.assigneeId === user.id);
  const userProjects = mockProjects.slice(0, 3);
  const userActivities = mockActivities.filter(a => a.userId === user.id).slice(0, 8);

  return (
    <Box sx={{ height: '100%', overflowY: 'auto', bgcolor: '#F4F5F7' }}>
      {/* Header / Cover Area */}
      <Box sx={{ height: 160, bgcolor: '#0052CC', position: 'relative' }}>
        <Box sx={{ position: 'absolute', bottom: -60, left: 40, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
          <Avatar 
            src={user.avatarUrl} 
            sx={{ 
              width: 120, 
              height: 120, 
              border: '4px solid white', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
            }} 
          />
          <Box sx={{ pb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#172B4D' }}>{user.name}</Typography>
            <Typography variant="subtitle1" sx={{ color: '#5E6C84' }}>{user.jobTitle} • {user.department}</Typography>
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', bottom: 16, right: 40, display: 'flex', gap: 1.5 }}>
          <Button 
            variant="contained" 
            startIcon={<EditIcon />} 
            onClick={() => navigate('/settings')}
            sx={{ bgcolor: 'white', color: '#172B4D', '&:hover': { bgcolor: '#F4F5F7' }, textTransform: 'none' }}
          >
            Edit profile
          </Button>
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}>
            <MoreIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ mt: 10, px: 5, pb: 5 }}>
        <Grid container spacing={4}>
          {/* Left Column - Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#5E6C84', textTransform: 'uppercase' }}>About</Typography>
                <Typography variant="body2" sx={{ color: '#172B4D', mb: 3, lineHeight: 1.6 }}>
                  {user.bio || 'No bio provided yet.'}
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <EmailIcon sx={{ color: '#5E6C84', fontSize: 20 }} />
                    <Typography variant="body2">{user.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <BusinessIcon sx={{ color: '#5E6C84', fontSize: 20 }} />
                    <Typography variant="body2">{user.department} Team</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocationOnIcon sx={{ color: '#5E6C84', fontSize: 20 }} />
                    <Typography variant="body2">San Francisco, CA</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AccessTimeIcon sx={{ color: '#5E6C84', fontSize: 20 }} />
                    <Typography variant="body2">Local time: 12:34 PM (UTC-8)</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#5E6C84', textTransform: 'uppercase' }}>Skills</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['Product Management', 'UI/UX', 'Agile', 'Jira', 'Strategy', 'React'].map(skill => (
                    <Chip key={skill} label={skill} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#5E6C84', textTransform: 'uppercase' }}>Projects</Typography>
                <List disablePadding>
                  {userProjects.map(project => (
                    <ListItem key={project.id} sx={{ px: 0, py: 1 }}>
                      <ListItemAvatar sx={{ minWidth: 40 }}>
                        <Avatar variant="rounded" sx={{ width: 28, height: 28, bgcolor: project.color, fontSize: 12, fontWeight: 700 }}>
                          {project.key[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{project.name}</Typography>}
                        secondary={<Typography variant="caption">{project.type} project</Typography>}
                      />
                    </ListItem>
                  ))}
                </List>
                <Button fullWidth size="small" sx={{ mt: 1, textTransform: 'none' }}>View all projects</Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Activity & Issues */}
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Stats Row */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {[
                { label: 'Assigned', value: userIssues.length, icon: <AssignmentIcon sx={{ color: '#0052CC' }} /> },
                { label: 'Completed', value: 42, icon: <CheckCircleIcon sx={{ color: '#36B37E' }} /> },
                { label: 'Starred', value: 8, icon: <StarIcon sx={{ color: '#FF8B00' }} /> },
                { label: 'Days Active', value: 124, icon: <HistoryIcon sx={{ color: '#6554C0' }} /> },
              ].map(stat => (
                <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                    <Box sx={{ mb: 1 }}>{stat.icon}</Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                    <Typography variant="caption" sx={{ color: '#5E6C84', fontWeight: 600 }}>{stat.label}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Tabs */}
            <Box sx={{ borderBottom: '1px solid #DFE1E6', mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 4 }}>
                {['Overview', 'Activity', 'Assigned Issues'].map(tab => (
                  <Box 
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    sx={{ 
                      pb: 1.5, 
                      cursor: 'pointer',
                      borderBottom: activeTab === tab.toLowerCase() ? '2px solid #0052CC' : 'none',
                      color: activeTab === tab.toLowerCase() ? '#0052CC' : '#5E6C84',
                      fontWeight: activeTab === tab.toLowerCase() ? 700 : 500,
                      fontSize: 14
                    }}
                  >
                    {tab}
                  </Box>
                ))}
              </Box>
            </Box>

            {activeTab === 'overview' && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Recent Activity</Typography>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <List disablePadding>
                    {userActivities.map((activity, idx) => (
                      <React.Fragment key={activity.id}>
                        <ListItem sx={{ py: 2 }}>
                          <ListItemAvatar>
                            <Avatar src={user.avatarUrl} sx={{ width: 32, height: 32 }} />
                          </ListItemAvatar>
                          <ListItemText 
                            primary={
                              <Typography variant="body2">
                                <Box component="span" sx={{ fontWeight: 700 }}>You</Box> {activity.action} <Box component="span" sx={{ fontWeight: 700, color: '#0052CC' }}>{activity.target}</Box>
                              </Typography>
                            }
                            secondary={<Typography variant="caption">{activity.timestamp}</Typography>}
                          />
                        </ListItem>
                        {idx < userActivities.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Card>
              </Box>
            )}

            {activeTab === 'assigned issues' && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Issues Assigned to You</Typography>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <List disablePadding>
                    {userIssues.map((issue, idx) => (
                      <React.Fragment key={issue.id}>
                        <ListItem 
                          sx={{ py: 2, cursor: 'pointer', '&:hover': { bgcolor: '#F4F5F7' } }}
                          onClick={() => navigate(`/projects/${mockProjects.find(p => p.id === issue.projectId)?.key}/issues/${issue.key}`)}
                        >
                          <ListItemAvatar sx={{ minWidth: 40 }}>
                            <IssueTypeIcon type={issue.type} size={18} />
                          </ListItemAvatar>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{issue.summary}</Typography>
                                <StatusChip status={issue.status} size="small" />
                              </Box>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ color: '#0052CC', fontWeight: 700, fontFamily: 'monospace' }}>
                                {issue.key}
                              </Typography>
                            }
                          />
                        </ListItem>
                        {idx < userIssues.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Card>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// Helper for stats
const CheckCircleIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
