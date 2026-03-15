import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Avatar, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Select,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { mockProjects, mockUsers } from '../../lib/mockData';

export const ProjectSettingsPage: React.FC = () => {
  const { projectKey } = useParams<{ projectKey: string }>();
  const project = mockProjects.find(p => p.key === projectKey) || mockProjects[0];
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <Box sx={{ width: 180, flexShrink: 0, borderRight: '1px solid #DFE1E6' }}>
        <Tabs 
          orientation="vertical" 
          value={tabValue} 
          onChange={(_, v) => setTabValue(v)}
          sx={{ 
            '& .MuiTab-root': { 
              alignItems: 'flex-start', 
              textAlign: 'left', 
              fontSize: 13,
              textTransform: 'none',
              minHeight: 40
            } 
          }}
        >
          <Tab label="General" />
          <Tab label="Members" />
          <Tab label="Labels" />
          <Tab label="Workflows" />
        </Tabs>
      </Box>

      <Box sx={{ flexGrow: 1, p: 4, maxWidth: 800 }}>
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>General Settings</Typography>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5 }}>Project Avatar</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 80, height: 80, bgcolor: project.color, borderRadius: 1 }} />
                <Button variant="outlined" size="small">Change</Button>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField fullWidth label="Project Name" defaultValue={project.name} size="small" />
              <TextField 
                fullWidth 
                label="Project Key" 
                defaultValue={project.key} 
                size="small" 
                disabled 
                helperText="Project keys are unique and cannot be changed after creation."
              />
              <TextField fullWidth label="Description" defaultValue={project.description} multiline rows={3} size="small" />
              
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Project Type</Typography>
                <RadioGroup defaultValue={project.type}>
                  <FormControlLabel value="SCRUM" control={<Radio size="small" />} label={<Typography variant="body2">Scrum (Sprints, backlog, velocity)</Typography>} />
                  <FormControlLabel value="KANBAN" control={<Radio size="small" />} label={<Typography variant="body2">Kanban (Continuous flow)</Typography>} />
                </RadioGroup>
              </Box>

              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button variant="contained">Save changes</Button>
                <Button variant="text" sx={{ color: 'text.secondary' }}>Discard</Button>
              </Box>
            </Box>

            <Divider sx={{ my: 6 }} />

            <Box sx={{ p: 3, border: '1px solid #FFEBE6', borderRadius: 1, bgcolor: '#FFF5F5' }}>
              <Typography variant="subtitle2" sx={{ color: '#DE350B', fontWeight: 700, mb: 1 }}>Danger Zone</Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>Once you delete a project, there is no going back. Please be certain.</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" color="error" size="small">Archive Project</Button>
                <Button variant="contained" color="error" size="small">Delete Project</Button>
              </Box>
            </Box>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Members</Typography>
              <Button variant="contained" size="small">Invite member</Button>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ bgcolor: '#F4F5F7' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar src={user.avatarUrl} sx={{ width: 32, height: 32 }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>{user.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Select size="small" defaultValue={user.role} sx={{ height: 32, fontSize: 13, width: 120 }}>
                          <MenuItem value="OWNER">Owner</MenuItem>
                          <MenuItem value="ADMIN">Admin</MenuItem>
                          <MenuItem value="MEMBER">Member</MenuItem>
                          <MenuItem value="VIEWER">Viewer</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};
