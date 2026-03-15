import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  TextField, 
  InputAdornment, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  Collapse,
  Button,
  Chip
} from '@mui/material';
import { 
  Search as SearchIcon, 
  ViewList as ListIcon,
  ViewColumn as BoardIcon,
  KeyboardArrowDown as ChevronDownIcon,
  KeyboardArrowRight as ChevronRightIcon,
  MoreHoriz as MoreIcon,
  Assignment as AssignmentIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { mockIssues, mockProjects, mockSprints } from '../../lib/mockData';
import { IssueTypeIcon } from '../../components/common/IssueTypeIcon';
import { PriorityIcon } from '../../components/common/PriorityIcon';
import { StatusChip } from '../../components/common/StatusChip';
import { useNavigate } from 'react-router-dom';
import { Issue, Status, Priority, IssueType } from '../../types';
import { IssueDrawer } from '../../components/issue/IssueDrawer';

export const MyIssuesPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string[]>(['all']);
  const [priorityFilter, setPriorityFilter] = useState<string[]>(['all']);
  const [typeFilter, setTypeFilter] = useState<string[]>(['all']);
  const [groupBy, setGroupBy] = useState('none');
  const [sortBy, setSortBy] = useState('updated');
  const [viewMode, setViewMode] = useState('list');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [drawerIssue, setDrawerIssue] = useState<Issue | null>(null);

  const navigate = useNavigate();

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.summary.toLowerCase().includes(search.toLowerCase()) || issue.key.toLowerCase().includes(search.toLowerCase());
    const matchesProject = projectFilter === 'all' || issue.projectId === projectFilter;
    const matchesStatus = statusFilter.includes('all') || statusFilter.includes(issue.status);
    const matchesPriority = priorityFilter.includes('all') || priorityFilter.includes(issue.priority);
    const matchesType = typeFilter.includes('all') || typeFilter.includes(issue.type);
    
    // Tab filters
    let matchesTab = true;
    if (tabValue === 0) matchesTab = issue.assigneeId === 'u1';
    if (tabValue === 1) matchesTab = issue.reporterId === 'u1';
    // Add more tab logic if needed

    return matchesSearch && matchesProject && matchesStatus && matchesPriority && matchesType && matchesTab;
  });

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedIds(filteredIssues.map(i => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const renderIssueRow = (issue: Issue) => {
    const project = mockProjects.find(p => p.id === issue.projectId);
    const sprint = mockSprints.find(s => s.id === issue.sprintId);
    const isOverdue = issue.dueDate && new Date(issue.dueDate) < new Date();

    return (
      <TableRow 
        key={issue.id}
        hover
        sx={{ 
          height: 40, 
          cursor: 'pointer',
          bgcolor: selectedIds.includes(issue.id) ? 'rgba(0, 82, 204, 0.05)' : 'inherit',
          '&:hover .more-btn': { opacity: 1 }
        }}
        onClick={() => setDrawerIssue(issue)}
      >
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Checkbox 
            size="small" 
            checked={selectedIds.includes(issue.id)}
            onChange={() => handleToggleSelect(issue.id)}
          />
        </TableCell>
        <TableCell sx={{ width: 40, px: 1 }}>
          <IssueTypeIcon type={issue.type} size={14} />
        </TableCell>
        <TableCell sx={{ width: 90, fontSize: 13, color: '#0052CC', fontFamily: 'monospace', fontWeight: 600 }}>
          {issue.key}
        </TableCell>
        <TableCell sx={{ fontSize: 13, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {issue.summary}
        </TableCell>
        <TableCell sx={{ width: 130 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 14, height: 14, bgcolor: project?.color || '#ccc', borderRadius: 0.5 }} />
            <Typography variant="body2" sx={{ fontSize: 12 }}>{project?.name}</Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ width: 100 }}>
          <PriorityIcon priority={issue.priority} showLabel />
        </TableCell>
        <TableCell sx={{ width: 120 }}>
          <StatusChip status={issue.status} size="small" />
        </TableCell>
        <TableCell sx={{ width: 120, fontSize: 12, color: 'text.secondary' }}>
          {sprint?.name || '-'}
        </TableCell>
        <TableCell sx={{ width: 100, fontSize: 12, color: isOverdue ? '#DE350B' : 'text.secondary', fontWeight: isOverdue ? 600 : 400 }}>
          {issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : '-'}
        </TableCell>
        <TableCell sx={{ width: 100, fontSize: 11, color: 'text.secondary' }}>
          2h ago
        </TableCell>
        <TableCell sx={{ width: 40, p: 0 }} align="right">
          <IconButton className="more-btn" size="small" sx={{ opacity: 0, transition: 'opacity 0.2s' }}>
            <MoreIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

  const groupedIssues: Record<string, Issue[]> = {};
  if (groupBy === 'project') {
    filteredIssues.forEach(i => {
      const projectName = mockProjects.find(p => p.id === i.projectId)?.name || 'Unknown';
      if (!groupedIssues[projectName]) groupedIssues[projectName] = [];
      groupedIssues[projectName].push(i);
    });
  } else if (groupBy === 'status') {
    filteredIssues.forEach(i => {
      if (!groupedIssues[i.status]) groupedIssues[i.status] = [];
      groupedIssues[i.status].push(i);
    });
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Bulk Actions Bar */}
      <Collapse in={selectedIds.length > 0}>
        <Box sx={{ 
          position: 'absolute', 
          top: -16, 
          left: 0, 
          right: 0, 
          zIndex: 10,
          bgcolor: '#172B4D',
          color: 'white',
          borderRadius: 1,
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>{selectedIds.length} selected</Typography>
          <Button size="small" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none', fontSize: 12 }}>Assign</Button>
          <Button size="small" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none', fontSize: 12 }}>Status</Button>
          <Button size="small" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none', fontSize: 12 }}>Priority</Button>
          <Button size="small" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none', fontSize: 12 }}>Move</Button>
          <Button size="small" variant="outlined" sx={{ color: '#FF8B00', borderColor: 'rgba(255,255,255,0.3)', textTransform: 'none', fontSize: 12 }}>Delete</Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="small" onClick={() => setSelectedIds([])} sx={{ color: 'white' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Collapse>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#172B4D' }}>My Issues</Typography>
        <Typography variant="body2" sx={{ color: '#5E6C84', fontSize: 13 }}>
          All issues assigned to or reported by you
        </Typography>
      </Box>

      {/* Filter Bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search my issues"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 240 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <Select size="small" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} sx={{ width: 160, fontSize: 13 }}>
          <MenuItem value="all">All Projects</MenuItem>
          {mockProjects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
        </Select>
        <Select size="small" multiple value={statusFilter} onChange={(e) => setStatusFilter(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)} sx={{ width: 140, fontSize: 13 }}>
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="TODO">To Do</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="IN_REVIEW">In Review</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </Select>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
        <Select size="small" value={groupBy} onChange={(e) => setGroupBy(e.target.value)} sx={{ width: 130, fontSize: 13 }}>
          <MenuItem value="none">Group by: None</MenuItem>
          <MenuItem value="project">Project</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
        <Select size="small" value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ width: 130, fontSize: 13 }}>
          <MenuItem value="updated">Sort by: Updated</MenuItem>
          <MenuItem value="created">Created</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
        </Select>
        <Box sx={{ flexGrow: 1 }} />
        <ToggleButtonGroup size="small" value={viewMode} exclusive onChange={(_, v) => v && setViewMode(v)}>
          <ToggleButton value="list"><ListIcon fontSize="small" /></ToggleButton>
          <ToggleButton value="board"><BoardIcon fontSize="small" /></ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ minHeight: 40 }}>
          <Tab label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Assigned to Me <Chip label="12" size="small" sx={{ height: 18, fontSize: 10 }} /></Box>} sx={{ fontSize: 13, textTransform: 'none', minHeight: 40 }} />
          <Tab label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Reported by Me <Chip label="5" size="small" sx={{ height: 18, fontSize: 10 }} /></Box>} sx={{ fontSize: 13, textTransform: 'none', minHeight: 40 }} />
          <Tab label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Watching <Chip label="2" size="small" sx={{ height: 18, fontSize: 10 }} /></Box>} sx={{ fontSize: 13, textTransform: 'none', minHeight: 40 }} />
        </Tabs>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} variant="outlined" sx={{ border: '1px solid #DFE1E6', borderRadius: 1, flexGrow: 1, overflowY: 'auto' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#F4F5F7', height: 36 }}>
              <TableCell padding="checkbox" sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6' }}>
                <Checkbox size="small" onChange={handleSelectAll} checked={selectedIds.length === filteredIssues.length && filteredIssues.length > 0} />
              </TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>T</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>KEY</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>SUMMARY</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>PROJECT</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>PRIORITY</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>STATUS</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>SPRINT</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>DUE DATE</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6', fontSize: 11, fontWeight: 700, color: '#5E6C84' }}>UPDATED</TableCell>
              <TableCell sx={{ bgcolor: '#F4F5F7', borderBottom: '2px solid #DFE1E6' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIssues.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} sx={{ py: 10, textAlign: 'center' }}>
                  <AssignmentIcon sx={{ fontSize: 64, color: '#DFE1E6', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#5E6C84', fontWeight: 600 }}>No issues found</Typography>
                  <Typography variant="body2" sx={{ color: '#5E6C84', mb: 2 }}>Try adjusting your filters or search query</Typography>
                  <Button size="small" onClick={() => { setSearch(''); setProjectFilter('all'); setStatusFilter(['all']); }}>Clear filters</Button>
                </TableCell>
              </TableRow>
            ) : groupBy === 'none' ? (
              filteredIssues.map(renderIssueRow)
            ) : (
              Object.entries(groupedIssues).map(([group, issues]) => (
                <React.Fragment key={group}>
                  <TableRow 
                    sx={{ bgcolor: '#F4F5F7', height: 36, cursor: 'pointer' }}
                    onClick={() => toggleGroup(group)}
                  >
                    <TableCell colSpan={11} sx={{ py: 0.5, px: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {expandedGroups[group] === false ? <ChevronRightIcon fontSize="small" /> : <ChevronDownIcon fontSize="small" />}
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase' }}>{group}</Typography>
                        <Chip label={issues.length} size="small" sx={{ height: 18, fontSize: 10 }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                  <Collapse in={expandedGroups[group] !== false} component="tr">
                    <TableCell colSpan={11} sx={{ p: 0, border: 'none' }}>
                      <Table size="small">
                        <TableBody>
                          {issues.map(renderIssueRow)}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </Collapse>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <IssueDrawer 
        issue={drawerIssue} 
        open={Boolean(drawerIssue)} 
        onClose={() => setDrawerIssue(null)} 
      />
    </Box>
  );
};
