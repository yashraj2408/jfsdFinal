import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export default function User() {
  const [emailInput, setEmailInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [msg, setMsg] = useState("");

  const handleGetDetails = () => {
    if (!emailInput.trim()) {
      setMsg("Please enter an email address.");
      return;
    }

    setMsg("");
    axios
      .get(`${API_BASE_URL}/user`, {
        params: { email: emailInput.trim() },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error(err);
        setMsg("User not found or connection error.");
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Search User Details
        </Typography>

        {msg && <Alert severity="warning" sx={{ mb: 2 }}>{msg}</Alert>}

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Enter User Email"
            variant="outlined"
            size="small"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <Button variant="contained" onClick={handleGetDetails}>
            Search
          </Button>
        </Box>

        {userData && (
          <Box sx={{ mt: 3, p: 2, bgcolor: "#f8fafc", borderRadius: 1, border: "1px solid #e2e8f0" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              User Record:
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace", mt: 1 }}>
              {typeof userData === "object" ? JSON.stringify(userData, null, 2) : userData}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
