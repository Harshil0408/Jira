import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  InputAdornment, 
  Select, 
  MenuItem, 
  Grid, 
  Card, 
  Avatar, 
  Divider, 
  Chip,
  Drawer,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  PersonAdd as PersonAddIcon, 
  Search as SearchIcon, 
  Assignment as AssignmentIcon, 
  Folder as FolderIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  MoreHoriz as MoreIcon
} from '@mui/icons-material';
import { mockUsers, mockProjects, mockIssues } from '../../lib/mockData';
import { User, Project, Issue } from '../../types';
import { InviteMemberModal } from '../../components/modals/InviteMemberModal';
import { StatusChip } from '../../components/common/StatusChip';
import { IssueTypeIcon } from '../../components/common/IssueTypeIcon';

export const PeoplePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    // Project filter logic would need project membership data
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'primary';
      case 'OWNER': return 'error';
      case 'MEMBER': return 'default';
      case 'VIEWER': return 'default';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#172B4D' }}>People</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />} 
          onClick={() => setInviteModalOpen(true)}
          sx={{ bgcolor: '#0052CC', '&:hover': { bgcolor: '#0747A6' }, textTransform: 'none' }}
        >
          Invite member
        </Button>
      </Box>

      {/* Filter Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <TextField
          placeholder="Search people..."
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
        <Select size="small" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} sx={{ width: 140, fontSize: 13 }}>
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="MEMBER">Member</MenuItem>
          <MenuItem value="VIEWER">Viewer</MenuItem>
        </Select>
        <Select size="small" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} sx={{ width: 160, fontSize: 13 }}>
          <MenuItem value="all">All Projects</MenuItem>
          {mockProjects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
        </Select>
      </Box>

      {/* Members Grid */}
      <Grid container spacing={2}>
        {filteredUsers.map(user => (
          <Grid key={user.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card 
              variant="outlined" 
              sx={{ 
                p: 2.5, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.2s',
                '&:hover': { borderColor: '#0052CC', transform: 'translateY(-2px)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Avatar src={user.avatarUrl} sx={{ width: 56, height: 56 }} />
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 2, 
                  right: 2, 
                  width: 12, 
                  height: 12, 
                  bgcolor: '#36B37E', 
                  borderRadius: '50%', 
                  border: '2px solid white' 
                }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1.5, color: '#172B4D' }}>{user.name}</Typography>
              <Typography variant="body2" sx={{ color: '#5E6C84', fontSize: 13 }}>{user.jobTitle || 'Team Member'}</Typography>
              <Typography variant="caption" sx={{ color: '#0052CC', mt: 0.5, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                {user.email}
              </Typography>
              
              <Divider sx={{ width: '100%', my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AssignmentIcon sx={{ fontSize: 14, color: '#5E6C84' }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>12 issues</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FolderIcon sx={{ fontSize: 14, color: '#5E6C84' }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>3 projects</Typography>
                </Box>
              </Box>

              <Chip 
                label={user.role} 
                size="small" 
                color={getRoleColor(user.role) as any}
                variant={user.role === 'MEMBER' ? 'outlined' : 'filled'}
                sx={{ height: 20, fontSize: 10, fontWeight: 700, mb: 2 }} 
              />

              <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <Button 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  onClick={() => setSelectedUser(user)}
                  sx={{ textTransform: 'none', fontSize: 12, borderColor: 'divider', color: 'text.primary' }}
                >
                  View profile
                </Button>
                <Tooltip title="Coming soon">
                  <span>
                    <Button 
                      fullWidth 
                      size="small" 
                      variant="outlined" 
                      disabled
                      sx={{ textTransform: 'none', fontSize: 12, borderColor: 'divider' }}
                    >
                      Message
                    </Button>
                  </span>
                </Tooltip>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Member Profile Drawer */}
      <MemberProfileDrawer 
        user={selectedUser} 
        open={Boolean(selectedUser)} 
        onClose={() => setSelectedUser(null)} 
      />

      <InviteMemberModal 
        open={inviteModalOpen} 
        onClose={() => setInviteModalOpen(false)} 
      />
    </Box>
  );
};

interface DrawerProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

const MemberProfileDrawer: React.FC<DrawerProps> = ({ user, open, onClose }) => {
  if (!user) return null;

  const userIssues = mockIssues.filter(i => i.assigneeId === user.id).slice(0, 5);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { width: 400 } }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #DFE1E6', display: 'flex', alignItems: 'center' }}>
          <IconButton size="small" onClick={onClose} sx={{ mr: 1 }}><CloseIcon /></IconButton>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Member Profile</Typography>
        </Box>

        <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Avatar src={user.avatarUrl} sx={{ width: 80, height: 80 }} />
              <Box sx={{ 
                position: 'absolute', 
                bottom: 4, 
                right: 4, 
                width: 16, 
                height: 16, 
                bgcolor: '#36B37E', 
                borderRadius: '50%', 
                border: '3px solid white' 
              }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{user.name}</Typography>
            <Typography variant="body1" sx={{ color: '#5E6C84' }}>{user.jobTitle || 'Team Member'}</Typography>
            <Typography variant="body2" sx={{ color: '#0052CC' }}>{user.email}</Typography>
            
            <Button variant="outlined" size="small" sx={{ mt: 2, textTransform: 'none' }}>Edit member</Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#5E6C84', fontWeight: 600 }}>Role</Typography>
              <Typography variant="body2">{user.role}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#5E6C84', fontWeight: 600 }}>Timezone</Typography>
              <Typography variant="body2">{user.timezone || 'UTC+0'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#5E6C84', fontWeight: 600 }}>Member since</Typography>
              <Typography variant="body2">Jan 12, 2026</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#5E6C84', fontWeight: 600 }}>Last active</Typography>
              <Typography variant="body2">2 hours ago</Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Projects (3)</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {mockProjects.slice(0, 3).map(p => (
                <Chip 
                  key={p.id} 
                  avatar={<Avatar sx={{ bgcolor: p.color }}>{p.key[0]}</Avatar>} 
                  label={p.name} 
                  size="small" 
                  variant="outlined" 
                />
              ))}
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Open Issues ({userIssues.length})</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {userIssues.map(issue => (
                <Box 
                  key={issue.id} 
                  sx={{ 
                    p: 1, 
                    border: '1px solid #DFE1E6', 
                    borderRadius: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#F4F5F7' }
                  }}
                >
                  <IssueTypeIcon type={issue.type} size={14} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#0052CC', fontFamily: 'monospace' }}>{issue.key}</Typography>
                  <Typography variant="caption" sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{issue.summary}</Typography>
                  <StatusChip status={issue.status} size="small" />
                </Box>
              ))}
              <Typography variant="caption" sx={{ color: '#0052CC', mt: 1, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                View all issues →
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
