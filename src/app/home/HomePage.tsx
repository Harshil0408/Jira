import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  Tabs, 
  Tab, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Avatar,
  LinearProgress,
  Link as MuiLink
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon, 
  CheckCircle as CheckCircleIcon, 
  Warning as WarningIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { mockIssues, mockActivities, mockProjects, mockUsers } from '../../lib/mockData';
import { IssueTypeIcon } from '../../components/common/IssueTypeIcon';
import { PriorityIcon } from '../../components/common/PriorityIcon';
import { StatusChip } from '../../components/common/StatusChip';

export const HomePage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const currentUser = mockUsers[0];

  const stats = [
    { label: 'My Open Issues', value: 12, color: '#0052CC', icon: <TrendingUpIcon sx={{ color: '#00875A' }} />, trend: '+3 this week' },
    { label: 'In Progress', value: 5, color: '#FF8B00' },
    { label: 'Done This Week', value: 8, color: '#00875A', icon: <CheckCircleIcon sx={{ color: '#00875A' }} /> },
    { label: 'Overdue', value: 2, color: '#DE350B', icon: <WarningIcon sx={{ color: '#DE350B' }} /> },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ color: 'text.primary', mb: 0.5 }}>
            Good morning, {currentUser.name.split(' ')[0]} 👋
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Here's what's happening across your projects today.
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
          {format(new Date(), 'EEEE, d MMMM yyyy')}
        </Typography>
      </Box>

      {/* Stats Row */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card 
              sx={{ 
                p: 2.5, 
                transition: 'all 150ms ease',
                '&:hover': { 
                  transform: 'translateY(-2px)', 
                  boxShadow: '0 4px 12px rgba(9,30,66,0.15)' 
                } 
              }}
            >
              <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700, mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                {stat.label}
              </Typography>
              {stat.trend && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {stat.icon}
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                    {stat.trend}
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* My Issues */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>My Issues</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} indicatorColor="primary">
                <Tab label="All" sx={{ fontSize: 13 }} />
                <Tab label="In Progress" sx={{ fontSize: 13 }} />
                <Tab label="Todo" sx={{ fontSize: 13 }} />
                <Tab label="Done" sx={{ fontSize: 13 }} />
              </Tabs>
            </Box>
            <TableContainer component={Paper} variant="outlined" sx={{ border: '1px solid #DFE1E6', borderRadius: 1 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F4F5F7' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12 }}>T</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12 }}>Key</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12 }}>Summary</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12 }}>P</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 12 }}>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockIssues.map((issue) => (
                    <TableRow 
                      key={issue.id} 
                      hover 
                      sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#FAFBFC' } }}
                    >
                      <TableCell><IssueTypeIcon type={issue.type} /></TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'primary.main', fontSize: 12, fontFamily: 'monospace' }}>
                          {issue.key}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap sx={{ fontSize: 13, maxWidth: 300 }}>
                          {issue.summary}
                        </Typography>
                      </TableCell>
                      <TableCell><PriorityIcon priority={issue.priority} /></TableCell>
                      <TableCell><StatusChip status={issue.status} size="small" /></TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          2h ago
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
              <MuiLink href="#" sx={{ fontSize: 13, color: 'primary.main', textDecoration: 'none', fontWeight: 500 }}>
                View all my issues
              </MuiLink>
            </Box>
          </Box>

          {/* Recent Projects */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Recent Projects</Typography>
            <Grid container spacing={2}>
              {mockProjects.map((project) => (
                <Grid size={{ xs: 12, sm: 4 }} key={project.id}>
                  <Card sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ width: 40, height: 40, bgcolor: project.color, borderRadius: 1, mr: 1.5 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{project.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{project.key} Project</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Progress</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>65%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={65} sx={{ height: 6, borderRadius: 3 }} />
                    </Box>
                    <MuiLink href="#" sx={{ fontSize: 13, color: 'primary.main', textDecoration: 'none', fontWeight: 500 }}>
                      Go to board →
                    </MuiLink>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Activity Feed */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Activity</Typography>
              <MuiLink href="#" sx={{ fontSize: 13, color: 'primary.main', textDecoration: 'none' }}>View all</MuiLink>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mockActivities.map((activity) => (
                <Box 
                  key={activity.id} 
                  sx={{ 
                    display: 'flex', 
                    gap: 1.5, 
                    p: 1, 
                    borderRadius: 1,
                    '&:hover': { bgcolor: '#F4F5F7' }
                  }}
                >
                  <Avatar 
                    src={mockUsers.find(u => u.id === activity.userId)?.avatarUrl} 
                    sx={{ width: 28, height: 28 }} 
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontSize: 13, lineHeight: 1.4 }}>
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {mockUsers.find(u => u.id === activity.userId)?.name}
                      </Box>{' '}
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      2h ago
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Upcoming Due Dates */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              <Typography variant="h6">Upcoming Due Dates</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {mockIssues.slice(0, 3).map((issue) => (
                <Box 
                  key={issue.id} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 1.5,
                    border: '1px solid #DFE1E6',
                    borderRadius: 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IssueTypeIcon type={issue.type} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>{issue.key}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>{issue.summary}</Typography>
                    </Box>
                  </Box>
                  <Box 
                    sx={{ 
                      px: 1, 
                      py: 0.25, 
                      bgcolor: '#E3FCEF', 
                      color: '#00875A', 
                      borderRadius: 1,
                      fontSize: 11,
                      fontWeight: 600
                    }}
                  >
                    Mar 20
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
