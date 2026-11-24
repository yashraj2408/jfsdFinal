import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
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

export default function SignUp({ store }) {
  const [role, setRole] = useState(2); // Default: User
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');

    if (!name || !email || !password) {
      setStatusMsg({ type: 'error', text: 'All fields are required.' });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    axios.post(`${API_BASE_URL}/user`, {
      name: name.trim(),
      role: Number(role),
      email: email.trim(),
      password: password.trim()
    })
    .then((res) => {
      setLoading(false);
      setStatusMsg({ type: 'success', text: 'Account created successfully! Redirecting to Sign In...' });
      setTimeout(() => {
        if (store) {
          store.dispatch({ type: "page", data: "Signin" });
        }
      }, 1000);
    })
    .catch((err) => {
      setLoading(false);
      console.error('Registration error:', err);
      setStatusMsg({ type: 'error', text: 'Failed to create user. Please check your backend connection.' });
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
            Sign up
          </Typography>

          {statusMsg.text && (
            <Alert severity={statusMsg.type} sx={{ width: '100%', mt: 2 }}>
              {statusMsg.text}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>User</MenuItem>
                    <MenuItem value={0}>Guest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={() => {
                    if (store) store.dispatch({ type: "page", data: "Signin" });
                  }}
                  sx={{ fontWeight: 'bold' }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
