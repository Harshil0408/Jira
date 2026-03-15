import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Divider, 
  TextField, 
  Button, 
  Avatar, 
  Select, 
  MenuItem, 
  Switch, 
  FormControlLabel,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  RadioGroup,
  Radio
} from '@mui/material';
import { 
  Person as PersonIcon, 
  Lock as LockIcon, 
  Notifications as NotificationsIcon, 
  Palette as PaletteIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  IntegrationInstructions as IntegrationIcon,
  AccountBalanceWallet as BillingIcon,
  CheckCircle as CheckCircleIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  LaptopMac as LaptopIcon,
  PhoneIphone as PhoneIcon
} from '@mui/icons-material';
import { mockUsers } from '../../lib/mockData';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      {/* Left Vertical Tabs */}
      <Box sx={{ width: 220, borderRight: '1px solid #DFE1E6', pt: 3, bgcolor: 'white' }}>
        <Typography variant="caption" sx={{ px: 2, fontWeight: 700, color: '#5E6C84', mb: 1, display: 'block' }}>ACCOUNT</Typography>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              minHeight: 40,
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontSize: 14,
              px: 2,
              color: '#42526E',
              '&.Mui-selected': { color: '#0052CC', bgcolor: '#E9F2FF' }
            },
            '& .MuiTabs-indicator': { left: 0, width: 3, borderRadius: '0 2px 2px 0' }
          }}
        >
          <Tab icon={<PersonIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Profile" />
          <Tab icon={<LockIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Password & Security" />
          <Tab icon={<NotificationsIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Notifications" />
          <Tab icon={<PaletteIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Appearance" />
          
          <Divider sx={{ my: 1 }} />
          
          <Typography variant="caption" sx={{ px: 2, fontWeight: 700, color: '#5E6C84', mb: 1, mt: 1, display: 'block' }}>WORKSPACE</Typography>
          <Tab icon={<BusinessIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="General" />
          <Tab icon={<PeopleIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Members" />
          <Tab icon={<IntegrationIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Integrations" />
          <Tab icon={<BillingIcon sx={{ fontSize: 20, mr: 1.5 }} />} iconPosition="start" label="Billing" />
        </Tabs>
      </Box>

      {/* Right Content Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4, bgcolor: 'white' }}>
        {activeTab === 0 && <ProfileSettings />}
        {activeTab === 1 && <SecuritySettings />}
        {activeTab === 2 && <NotificationSettings />}
        {activeTab === 3 && <AppearanceSettings />}
        {activeTab > 3 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" color="text.secondary">Workspace settings are coming soon</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const ProfileSettings: React.FC = () => {
  const user = mockUsers[0];
  return (
    <Box sx={{ maxWidth: 600 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Profile Information</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Avatar src={user.avatarUrl} sx={{ width: 80, height: 80 }} />
        <Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
            <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>Change photo</Button>
            <Button variant="text" size="small" color="error" sx={{ textTransform: 'none' }}>Remove</Button>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>JPG, PNG up to 2MB</Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Full Name" defaultValue={user.name} size="small" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField 
            fullWidth 
            label="Display Name" 
            defaultValue={user.name.split(' ')[0]} 
            size="small" 
            helperText="How your name appears to teammates"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField 
            fullWidth 
            label="Email" 
            defaultValue={user.email} 
            size="small" 
            disabled
            InputProps={{
              endAdornment: <Chip label="Verified" size="small" color="success" sx={{ height: 20, fontSize: 10 }} />
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Job Title" defaultValue={user.jobTitle} size="small" />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Select fullWidth size="small" defaultValue="la">
            <MenuItem value="la">America/Los_Angeles (PST)</MenuItem>
            <MenuItem value="ny">America/New_York (EST)</MenuItem>
            <MenuItem value="london">Europe/London (GMT)</MenuItem>
          </Select>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField 
            fullWidth 
            label="Bio" 
            defaultValue={user.bio} 
            size="small" 
            multiline 
            rows={3} 
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button variant="contained" sx={{ bgcolor: '#0052CC', textTransform: 'none' }}>Save changes</Button>
        <Button variant="text" sx={{ color: '#5E6C84', textTransform: 'none' }}>Discard</Button>
      </Box>
    </Box>
  );
};

const SecuritySettings: React.FC = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Change Password</Typography>
      
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField 
            fullWidth 
            label="Current password" 
            type={showPass ? 'text' : 'password'} 
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </IconButton>
              )
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="New password" type="password" size="small" />
          <Box sx={{ mt: 1, height: 4, bgcolor: '#F4F5F7', borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ width: '60%', height: '100%', bgcolor: '#FF8B00' }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#FF8B00' }}>Medium strength</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Confirm new password" type="password" size="small" />
        </Grid>
      </Grid>
      
      <Button variant="contained" sx={{ mt: 3, bgcolor: '#0052CC', textTransform: 'none' }}>Update password</Button>

      <Divider sx={{ my: 4 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Two-Factor Authentication</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ p: 1, bgcolor: '#E9F2FF', borderRadius: 1 }}><PhoneIcon sx={{ color: '#0052CC' }} /></Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Authenticator App</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Use an app to get codes</Typography>
          </Box>
        </Box>
        <Chip label="Enabled" size="small" color="success" sx={{ height: 20, fontSize: 10 }} />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Active Sessions</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, border: '1px solid #DFE1E6', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <LaptopIcon sx={{ color: '#5E6C84' }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Chrome on macOS</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>San Francisco, USA • Active now</Typography>
          </Box>
        </Box>
        <Typography variant="caption" sx={{ color: '#DE350B', fontWeight: 600, cursor: 'pointer' }}>Revoke</Typography>
      </Box>
    </Box>
  );
};

const NotificationSettings: React.FC = () => {
  const categories = [
    {
      title: 'Issues',
      events: [
        { label: 'Assigned to me', desc: 'When someone assigns an issue to you' },
        { label: 'Mentioned in comment', desc: 'When someone @mentions you' },
        { label: 'Status changed', desc: 'When an issue you watch changes status' },
        { label: 'Due date approaching', desc: 'When an issue is due in 24 hours' },
      ]
    },
    {
      title: 'Sprints',
      events: [
        { label: 'Sprint started', desc: 'When a new sprint begins' },
        { label: 'Sprint completed', desc: 'When a sprint is closed' },
      ]
    }
  ];

  return (
    <Box sx={{ maxWidth: 560 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Notifications</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>Choose what you get notified about</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1, px: 2 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84' }}>EMAIL</Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#5E6C84' }}>IN-APP</Typography>
        </Box>
      </Box>

      {categories.map((cat, idx) => (
        <Box key={cat.title} sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#172B4D', mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cat.title}</Typography>
          {cat.events.map(event => (
            <Box key={event.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #F4F5F7' }}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.label}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>{event.desc}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2.5 }}>
                <Switch size="small" defaultChecked />
                <Switch size="small" defaultChecked />
              </Box>
            </Box>
          ))}
        </Box>
      ))}

      <Button variant="contained" sx={{ mt: 2, bgcolor: '#0052CC', textTransform: 'none' }}>Save preferences</Button>
    </Box>
  );
};

const AppearanceSettings: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 500 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Appearance</Typography>
      
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Theme</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {[
          { id: 'light', label: 'Light', bg: '#FFFFFF' },
          { id: 'dark', label: 'Dark', bg: '#172B4D' },
          { id: 'system', label: 'System', bg: 'linear-gradient(135deg, #FFFFFF 50%, #172B4D 50%)' }
        ].map(theme => (
          <Box key={theme.id} sx={{ textAlign: 'center' }}>
            <Box 
              sx={{ 
                width: 140, 
                height: 100, 
                background: theme.bg, 
                borderRadius: 1, 
                border: theme.id === 'light' ? '2px solid #0052CC' : '1px solid #DFE1E6',
                position: 'relative',
                cursor: 'pointer',
                mb: 1
              }}
            >
              {theme.id === 'light' && <CheckCircleIcon sx={{ position: 'absolute', top: 4, right: 4, color: '#0052CC', fontSize: 20 }} />}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: theme.id === 'light' ? 700 : 400 }}>{theme.label}</Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Sidebar Color</Typography>
      <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
        {['#0747A6', '#172B4D', '#006644', '#403294', '#DE350B', '#FF8B00', '#00B8D9', '#36B37E'].map((color, i) => (
          <Box 
            key={color} 
            sx={{ 
              width: 32, 
              height: 32, 
              bgcolor: color, 
              borderRadius: '50%', 
              cursor: 'pointer',
              border: i === 0 ? '2px solid white' : 'none',
              boxShadow: i === 0 ? '0 0 0 2px #0052CC' : 'none'
            }} 
          />
        ))}
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Density</Typography>
      <RadioGroup row defaultValue="normal">
        <FormControlLabel value="compact" control={<Radio size="small" />} label={<Typography variant="body2">Compact</Typography>} />
        <FormControlLabel value="normal" control={<Radio size="small" />} label={<Typography variant="body2">Normal</Typography>} />
        <FormControlLabel value="comfortable" control={<Radio size="small" />} label={<Typography variant="body2">Comfortable</Typography>} />
      </RadioGroup>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>Language</Typography>
        <Select fullWidth size="small" defaultValue="en">
          <MenuItem value="en">English (US)</MenuItem>
          <MenuItem value="uk">English (UK)</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="es">Español</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};
