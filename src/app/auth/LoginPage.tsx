import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Link, 
  IconButton, 
  InputAdornment,
  Divider,
  CircularProgress
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon, 
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false }
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    console.log('Login data:', data);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Left Panel */}
      <Box 
        sx={{ 
          flex: 1, 
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0747A6 0%, #0052CC 100%)',
          color: 'white',
          p: 6
        }}
      >
        <Box sx={{ maxWidth: 480, textAlign: 'center' }}>
          {/* Simple Kanban SVG */}
          <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 32 }}>
            <rect x="10" y="10" width="180" height="130" rx="4" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2" />
            <rect x="25" y="25" width="45" height="100" rx="2" fill="white" fillOpacity="0.2" />
            <rect x="77" y="25" width="45" height="100" rx="2" fill="white" fillOpacity="0.2" />
            <rect x="129" y="25" width="45" height="100" rx="2" fill="white" fillOpacity="0.2" />
            <rect x="30" y="35" width="35" height="15" rx="1" fill="white" />
            <rect x="82" y="55" width="35" height="15" rx="1" fill="white" fillOpacity="0.8" />
            <rect x="134" y="45" width="35" height="15" rx="1" fill="white" fillOpacity="0.6" />
          </svg>
          <Typography variant="h4" gutterBottom>
            Manage your work, beautifully.
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)' }}>
            The #1 software development tool used by agile teams to plan, track, and release world-class software.
          </Typography>
        </Box>
      </Box>

      {/* Right Panel */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          bgcolor: 'white',
          p: 4
        }}
      >
        <Box sx={{ maxWidth: 400, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: 0.5, mr: 1.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
              JiraClone
            </Typography>
          </Box>

          <Typography variant="h5" sx={{ mb: 1, color: 'text.primary' }}>
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
            Sign in to your workspace
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                label="Email address"
                placeholder="you@company.com"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel
                  control={<Checkbox size="small" {...register('rememberMe')} />}
                  label={<Typography variant="body2">Remember me</Typography>}
                />
                <Link href="#" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', fontSize: 13 }}>
                  Forgot password?
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={isLoading}
                sx={{ height: 44, fontWeight: 600, mt: 1 }}
              >
                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Sign in'}
              </Button>

              <Divider sx={{ my: 1 }}>
                <Typography variant="caption" sx={{ color: 'divider', px: 1 }}>OR</Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ height: 44, color: 'text.primary', borderColor: 'divider' }}
              >
                Sign in with Google
              </Button>

              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link 
                  component="button" 
                  onClick={() => navigate('/register')}
                  sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none' }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
