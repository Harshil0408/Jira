import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  IconButton, 
  Collapse, 
  Chip,
  Divider,
  LinearProgress
} from '@mui/material';
import { 
  KeyboardArrowDown as ChevronDownIcon, 
  KeyboardArrowRight as ChevronRightIcon,
  Warning as WarningIcon,
  Today as TodayIcon,
  DateRange as DateRangeIcon,
  HelpOutline as HelpOutlineIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { mockIssues, mockUsers, mockProjects } from '../../lib/mockData';
import { IssueTypeIcon } from '../../components/common/IssueTypeIcon';
import { PriorityIcon } from '../../components/common/PriorityIcon';
import { StatusChip } from '../../components/common/StatusChip';
import { Issue, Status } from '../../types';
import { IssueDrawer } from '../../components/issue/IssueDrawer';

export const AssignedToMePage: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overdue: true,
    today: true,
    week: true,
    nodate: true
  });
  const [drawerIssue, setDrawerIssue] = useState<Issue | null>(null);

  const myIssues = mockIssues.filter(i => i.assigneeId === 'u1');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue = myIssues.filter(i => i.dueDate && new Date(i.dueDate) < today && i.status !== 'DONE');
  const dueToday = myIssues.filter(i => {
    if (!i.dueDate || i.status === 'DONE') return false;
    const d = new Date(i.dueDate);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });
  const dueThisWeek = myIssues.filter(i => {
    if (!i.dueDate || i.status === 'DONE') return false;
    const d = new Date(i.dueDate);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);
    return d > today && d <= endOfWeek;
  });
  const noDueDate = myIssues.filter(i => !i.dueDate && i.status !== 'DONE');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const renderIssueRow = (issue: Issue) => {
    const project = mockProjects.find(p => p.id === issue.projectId);
    return (
      <Box 
        key={issue.id}
        onClick={() => setDrawerIssue(issue)}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          py: 1, 
          px: 2, 
          borderBottom: '1px solid #F4F5F7',
          cursor: 'pointer',
          '&:hover': { bgcolor: '#FAFBFC' }
        }}
      >
        <Box sx={{ width: 32, display: 'flex', justifyContent: 'center' }}>
          <IssueTypeIcon type={issue.type} size={14} />
        </Box>
        <Typography variant="body2" sx={{ width: 90, color: '#0052CC', fontFamily: 'monospace', fontWeight: 600, fontSize: 13 }}>
          {issue.key}
        </Typography>
        <Typography variant="body2" sx={{ flexGrow: 1, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mr: 2 }}>
          {issue.summary}
        </Typography>
        <Box sx={{ width: 130, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 14, height: 14, bgcolor: project?.color || '#ccc', borderRadius: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: 12 }}>{project?.name}</Typography>
        </Box>
        <Box sx={{ width: 100 }}>
          <PriorityIcon priority={issue.priority} showLabel />
        </Box>
        <Box sx={{ width: 120 }}>
          <StatusChip status={issue.status} size="small" />
        </Box>
      </Box>
    );
  };

  const chartData = [
    { name: 'TODO', value: myIssues.filter(i => i.status === 'TODO').length, color: '#5E6C84' },
    { name: 'IN_PROGRESS', value: myIssues.filter(i => i.status === 'IN_PROGRESS').length, color: '#0052CC' },
    { name: 'IN_REVIEW', value: myIssues.filter(i => i.status === 'IN_REVIEW').length, color: '#6554C0' },
    { name: 'DONE', value: myIssues.filter(i => i.status === 'DONE').length, color: '#00875A' },
  ].filter(d => d.value > 0);

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#172B4D' }}>Assigned to Me</Typography>
            <Typography variant="body2" sx={{ color: '#5E6C84' }}>Issues currently in your court</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{mockUsers[0].name}</Typography>
            <Avatar src={mockUsers[0].avatarUrl} sx={{ width: 28, height: 28 }} />
          </Box>
        </Box>

        {/* Overdue */}
        {overdue.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Box 
              onClick={() => toggleSection('overdue')}
              sx={{ 
                display: 'flex', alignItems: 'center', gap: 1, py: 1, px: 2, 
                bgcolor: '#FFF8F7', borderLeft: '3px solid #DE350B', borderRadius: '4px 4px 0 0',
                cursor: 'pointer'
              }}
            >
              {expandedSections.overdue ? <ChevronDownIcon sx={{ color: '#DE350B' }} /> : <ChevronRightIcon sx={{ color: '#DE350B' }} />}
              <WarningIcon sx={{ color: '#DE350B', fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: '#DE350B' }}>Overdue</Typography>
              <Chip label={overdue.length} size="small" sx={{ height: 18, bgcolor: '#DE350B', color: 'white', fontWeight: 700, fontSize: 10 }} />
            </Box>
            <Collapse in={expandedSections.overdue}>
              <Paper variant="outlined" sx={{ borderRadius: '0 0 4px 4px', borderTop: 'none' }}>
                {overdue.map(renderIssueRow)}
              </Paper>
            </Collapse>
          </Box>
        )}

        {/* Due Today */}
        <Box sx={{ mb: 3 }}>
          <Box 
            onClick={() => toggleSection('today')}
            sx={{ 
              display: 'flex', alignItems: 'center', gap: 1, py: 1, px: 2, 
              bgcolor: '#FFFAE6', borderLeft: '3px solid #FF8B00', borderRadius: '4px 4px 0 0',
              cursor: 'pointer'
            }}
          >
            {expandedSections.today ? <ChevronDownIcon sx={{ color: '#FF8B00' }} /> : <ChevronRightIcon sx={{ color: '#FF8B00' }} />}
            <TodayIcon sx={{ color: '#FF8B00', fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#FF8B00' }}>Due Today</Typography>
            <Chip label={dueToday.length} size="small" sx={{ height: 18, bgcolor: '#FF8B00', color: 'white', fontWeight: 700, fontSize: 10 }} />
          </Box>
          <Collapse in={expandedSections.today}>
            <Paper variant="outlined" sx={{ borderRadius: '0 0 4px 4px', borderTop: 'none' }}>
              {dueToday.length > 0 ? dueToday.map(renderIssueRow) : (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>No issues due today</Typography>
                </Box>
              )}
            </Paper>
          </Collapse>
        </Box>

        {/* Due This Week */}
        <Box sx={{ mb: 3 }}>
          <Box 
            onClick={() => toggleSection('week')}
            sx={{ 
              display: 'flex', alignItems: 'center', gap: 1, py: 1, px: 2, 
              bgcolor: 'white', borderLeft: '3px solid #0052CC', border: '1px solid #DFE1E6', borderLeftWidth: 3, borderRadius: '4px 4px 0 0',
              cursor: 'pointer'
            }}
          >
            {expandedSections.week ? <ChevronDownIcon sx={{ color: '#0052CC' }} /> : <ChevronRightIcon sx={{ color: '#0052CC' }} />}
            <DateRangeIcon sx={{ color: '#0052CC', fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0052CC' }}>Due This Week</Typography>
            <Chip label={dueThisWeek.length} size="small" sx={{ height: 18, bgcolor: '#0052CC', color: 'white', fontWeight: 700, fontSize: 10 }} />
          </Box>
          <Collapse in={expandedSections.week}>
            <Paper variant="outlined" sx={{ borderRadius: '0 0 4px 4px', borderTop: 'none' }}>
              {dueThisWeek.length > 0 ? dueThisWeek.map(renderIssueRow) : (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>No issues due this week</Typography>
                </Box>
              )}
            </Paper>
          </Collapse>
        </Box>

        {/* No Due Date */}
        <Box sx={{ mb: 3 }}>
          <Box 
            onClick={() => toggleSection('nodate')}
            sx={{ 
              display: 'flex', alignItems: 'center', gap: 1, py: 1, px: 2, 
              bgcolor: 'white', borderLeft: '3px solid #DFE1E6', border: '1px solid #DFE1E6', borderLeftWidth: 3, borderRadius: '4px 4px 0 0',
              cursor: 'pointer'
            }}
          >
            {expandedSections.nodate ? <ChevronDownIcon sx={{ color: '#5E6C84' }} /> : <ChevronRightIcon sx={{ color: '#5E6C84' }} />}
            <HelpOutlineIcon sx={{ color: '#5E6C84', fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#5E6C84' }}>No Due Date</Typography>
            <Chip label={noDueDate.length} size="small" sx={{ height: 18, bgcolor: '#5E6C84', color: 'white', fontWeight: 700, fontSize: 10 }} />
          </Box>
          <Collapse in={expandedSections.nodate}>
            <Paper variant="outlined" sx={{ borderRadius: '0 0 4px 4px', borderTop: 'none' }}>
              {noDueDate.length > 0 ? noDueDate.map(renderIssueRow) : (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>No issues without due date</Typography>
                </Box>
              )}
            </Paper>
          </Collapse>
        </Box>
      </Box>

      {/* Right Sidebar Panel */}
      <Box sx={{ width: 240, bgcolor: 'white', borderLeft: '1px solid #DFE1E6', p: 2, overflowY: 'auto' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#172B4D' }}>My Workload</Typography>
        
        <Box sx={{ height: 160, position: 'relative', mb: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>{myIssues.length}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>total</Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          {chartData.map(d => (
            <Box key={d.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: d.color }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{d.name.replace('_', ' ')}</Typography>
              </Box>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{d.value}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>BY PROJECT</Typography>
        {mockProjects.map(p => {
          const count = myIssues.filter(i => i.projectId === p.id).length;
          if (count === 0) return null;
          return (
            <Box key={p.id} sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>{p.name}</Typography>
                <Typography variant="caption">{count}</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(count / myIssues.length) * 100} 
                sx={{ height: 4, borderRadius: 2, bgcolor: '#F4F5F7', '& .MuiLinearProgress-bar': { bgcolor: p.color } }} 
              />
            </Box>
          );
        })}

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>STORY POINTS</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption">Total SP assigned:</Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>{myIssues.reduce((acc, i) => acc + (i.storyPoints || 0), 0)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption">Completed this sprint:</Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>12</Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={45} 
          sx={{ height: 6, borderRadius: 3, bgcolor: '#F4F5F7', '& .MuiLinearProgress-bar': { bgcolor: '#00875A' } }} 
        />
      </Box>

      <IssueDrawer 
        issue={drawerIssue} 
        open={Boolean(drawerIssue)} 
        onClose={() => setDrawerIssue(null)} 
      />
    </Box>
  );
};
