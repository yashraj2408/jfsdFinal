import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © FeedBack Management System '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn({ store }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both Email and Password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    axios.post(`${API_BASE_URL}/login`, {
      email: email.trim(),
      password: password.trim(),
    })
    .then((res) => {
      setLoading(false);
      if (res.data && res.data.name) {
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("role", res.data.role);
        // Admin (role 1) goes to Show (table), User (role 2) goes to User
        if (Number(res.data.role) === 1) {
          store.dispatch({ type: "page", data: "Show" });
        } else {
          store.dispatch({ type: "page", data: "User" });
        }
      } else {
        setErrorMsg('Invalid email or password. Please try again or Sign Up.');
      }
    })
    .catch((err) => {
      setLoading(false);
      console.error('Login error:', err);
      setErrorMsg('Connection failed. Please check if the backend is running.');
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {errorMsg && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" defaultChecked />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 2, mb: 2 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Quick Demo Credentials for Fast Evaluation */}
            <Box sx={{ p: 1.5, bgcolor: '#f0f4f8', borderRadius: 1, textAlign: 'center', mb: 2 }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 'bold' }}>
                ⚡ Quick Fill Demo Logins:
              </Typography>
              <Stack direction="row" spacing={1} justifyContent="center">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fillDemo('admin@gmail.com', 'admin123')}
                >
                  🔑 Admin (Role 1)
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fillDemo('user@gmail.com', 'user123')}
                >
                  👤 User (Role 2)
                </Button>
              </Stack>
            </Box>

            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => alert('Demo default password is "admin123" or "user123"')}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => store.dispatch({ type: "page", data: "Signup" })}
                  sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
