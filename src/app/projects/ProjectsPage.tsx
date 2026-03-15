import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  Grid, 
  Card, 
  Chip, 
  Avatar, 
  IconButton, 
  Menu,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Divider
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon, 
  GridView as GridViewIcon, 
  List as ListIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  MoreHoriz as MoreIcon,
  People as PeopleIcon,
  BugReport as BugIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { mockProjects, mockUsers } from '../../lib/mockData';
import { useNavigate } from 'react-router-dom';

export const ProjectsPage: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const filteredProjects = mockProjects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Projects</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create project
        </Button>
      </Box>

      {/* Filter Bar */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3, alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Search projects"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 280 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
        <Select size="small" defaultValue="all" sx={{ width: 140 }}>
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value="scrum">Scrum</MenuItem>
          <MenuItem value="kanban">Kanban</MenuItem>
        </Select>
        <Select size="small" defaultValue="name" sx={{ width: 140 }}>
          <MenuItem value="name">Sort by: Name</MenuItem>
          <MenuItem value="created">Created</MenuItem>
          <MenuItem value="updated">Updated</MenuItem>
        </Select>
        <Box sx={{ flexGrow: 1 }} />
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
          size="small"
        >
          <ToggleButton value="grid">
            <GridViewIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list">
            <ListIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Content */}
      {view === 'grid' ? (
        <Grid container spacing={2}>
          {filteredProjects.map((project) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
              <Card 
                sx={{ 
                  p: 2.5, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 150ms ease',
                  '&:hover': { 
                    transform: 'translateY(-2px)', 
                    boxShadow: '0 4px 12px rgba(9,30,66,0.15)' 
                  } 
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Box sx={{ width: 44, height: 44, bgcolor: project.color, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 20 }}>
                      {project.name.charAt(0)}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 700 }}>{project.name}</Typography>
                      <Chip label={project.key} size="small" variant="outlined" sx={{ height: 20, fontSize: 11, color: 'text.secondary' }} />
                    </Box>
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <StarBorderIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, project.id)}>
                      <MoreIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {project.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip label={project.type} size="small" sx={{ bgcolor: '#E9F2FF', color: 'primary.main', fontWeight: 600, fontSize: 10 }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <PeopleIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption">{project.memberIds.length} members</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <BugIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption">12 open</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <CheckCircleIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption">8 done</Typography>
                  </Box>
                </Box>

                <Box sx={{ pt: 1.5, borderTop: '1px solid #DFE1E6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 20, height: 20 }} src={mockUsers.find(u => u.id === project.leadId)?.avatarUrl} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Lead: {mockUsers.find(u => u.id === project.leadId)?.name}
                    </Typography>
                  </Box>
                  <Button 
                    size="small" 
                    sx={{ fontSize: 13, color: 'primary.main', fontWeight: 600 }}
                    onClick={() => navigate(`/projects/${project.key}/board`)}
                  >
                    Open board →
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead sx={{ bgcolor: '#F4F5F7' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Project</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Lead</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Members</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Open Issues</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Updated</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id} hover onClick={() => navigate(`/projects/${project.key}/board`)} sx={{ cursor: 'pointer' }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 24, height: 24, bgcolor: project.color, borderRadius: 0.5 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{project.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>({project.key})</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={project.type} size="small" variant="outlined" sx={{ fontSize: 10 }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24 }} src={mockUsers.find(u => u.id === project.leadId)?.avatarUrl} />
                      <Typography variant="body2">{mockUsers.find(u => u.id === project.leadId)?.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{project.memberIds.length}</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>2 days ago</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleMenuOpen(e, project.id); }}>
                      <MoreIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Project Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} sx={{ fontSize: 14 }}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ fontSize: 14 }}>Archive</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ fontSize: 14, color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};
