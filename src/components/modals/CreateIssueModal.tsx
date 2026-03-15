import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel,
  Grid,
  Autocomplete,
  Avatar,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Close as CloseIcon, AttachFile as AttachIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { mockProjects, mockUsers, mockIssues } from '../../lib/mockData';
import { IssueTypeIcon } from '../common/IssueTypeIcon';
import { PriorityIcon } from '../common/PriorityIcon';

const issueSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  type: z.string().min(1, 'Issue type is required'),
  summary: z.string().min(1, 'Summary is required').max(255),
  description: z.string().optional(),
  priority: z.string().min(1, 'Priority is required'),
  assigneeId: z.string().optional(),
  epicId: z.string().optional(),
  sprintId: z.string().optional(),
  storyPoints: z.number().optional(),
});

type IssueFormValues = z.infer<typeof issueSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateIssueModal: React.FC<Props> = ({ open, onClose }) => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<IssueFormValues>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      projectId: mockProjects[0].id,
      type: 'STORY',
      priority: 'MEDIUM',
    }
  });

  const onSubmit = (data: IssueFormValues) => {
    console.log('Create issue:', data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #DFE1E6', py: 1.5 }}>
        <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>Create Issue</Typography>
        <IconButton size="small" onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, display: 'flex', minHeight: 500 }}>
        {/* Left Panel */}
        <Box sx={{ flex: 1.6, p: 3, borderRight: '1px solid #DFE1E6' }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Project</InputLabel>
                <Controller
                  name="projectId"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Project">
                      {mockProjects.map(p => (
                        <MenuItem key={p.id} value={p.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 16, height: 16, bgcolor: p.color, borderRadius: 0.5 }} />
                            {p.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Issue Type</InputLabel>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Issue Type">
                      <MenuItem value="STORY"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IssueTypeIcon type="STORY" /> Story</Box></MenuItem>
                      <MenuItem value="BUG"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IssueTypeIcon type="BUG" /> Bug</Box></MenuItem>
                      <MenuItem value="TASK"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IssueTypeIcon type="TASK" /> Task</Box></MenuItem>
                      <MenuItem value="EPIC"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IssueTypeIcon type="EPIC" /> Epic</Box></MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Summary *"
            placeholder="Short, clear title"
            size="small"
            sx={{ mt: 3 }}
            {...register('summary')}
            error={!!errors.summary}
            helperText={errors.summary?.message}
          />

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>Description</Typography>
            <TextField
              fullWidth
              multiline
              minRows={6}
              placeholder="Describe the issue..."
              {...register('description')}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>Attachments</Typography>
            <Box 
              sx={{ 
                border: '2px dashed #DFE1E6', 
                borderRadius: 1, 
                p: 4, 
                textAlign: 'center',
                bgcolor: '#FAFBFC',
                cursor: 'pointer',
                '&:hover': { bgcolor: '#F4F5F7' }
              }}
            >
              <AttachIcon sx={{ color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Drag files here, or browse
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Panel */}
        <Box sx={{ flex: 1, p: 3, bgcolor: '#FAFBFC' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Assignee</InputLabel>
              <Controller
                name="assigneeId"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Assignee">
                    <MenuItem value="">Unassigned</MenuItem>
                    {mockUsers.map(u => (
                      <MenuItem key={u.id} value={u.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar src={u.avatarUrl} sx={{ width: 20, height: 20 }} />
                          {u.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Priority">
                    <MenuItem value="HIGHEST"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PriorityIcon priority="HIGHEST" /> Highest</Box></MenuItem>
                    <MenuItem value="HIGH"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PriorityIcon priority="HIGH" /> High</Box></MenuItem>
                    <MenuItem value="MEDIUM"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PriorityIcon priority="MEDIUM" /> Medium</Box></MenuItem>
                    <MenuItem value="LOW"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PriorityIcon priority="LOW" /> Low</Box></MenuItem>
                    <MenuItem value="LOWEST"><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PriorityIcon priority="LOWEST" /> Lowest</Box></MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Epic Link</InputLabel>
              <Controller
                name="epicId"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Epic Link">
                    <MenuItem value="">None</MenuItem>
                    {mockIssues.filter(i => i.type === 'EPIC').map(e => (
                      <MenuItem key={e.id} value={e.id}>{e.summary}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>

            <TextField
              label="Story Points"
              type="number"
              size="small"
              {...register('storyPoints', { valueAsNumber: true })}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ borderTop: '1px solid #DFE1E6', px: 3, py: 2 }}>
        <FormControlLabel
          control={<Checkbox size="small" />}
          label={<Typography variant="body2">Create another</Typography>}
          sx={{ flexGrow: 1 }}
        />
        <Button onClick={onClose} sx={{ color: 'text.primary' }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>Create issue</Button>
      </DialogActions>
    </Dialog>
  );
};
