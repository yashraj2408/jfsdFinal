import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";

export default function Show() {
  const [result, setResult] = useState(null);
  const [editObj, setEditObj] = useState(null);

  const fetchUsers = () => {
    axios
      .get(`${API_BASE_URL}/all`)
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = (email) => {
    if (!window.confirm(`Are you sure you want to delete ${email}?`)) return;
    axios
      .delete(`${API_BASE_URL}/delete`, { params: { email: email } })
      .then((res) => {
        alert(res.data);
        fetchUsers();
      })
      .catch((err) => console.error(err));
  };

  const startEdit = (user) => {
    setEditObj({ ...user });
  };

  const saveEdit = () => {
    if (!editObj) return;
    axios
      .put(`${API_BASE_URL}/update`, editObj)
      .then((res) => {
        alert(res.data || "User updated successfully!");
        setEditObj(null);
        fetchUsers();
      })
      .catch((err) => console.error(err));
  };

  const getRoleLabel = (r) => {
    if (Number(r) === 1) return <Chip label="Admin" color="primary" size="small" />;
    if (Number(r) === 2) return <Chip label="User" color="success" size="small" />;
    return <Chip label="Guest" size="small" />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2", mb: 2 }}>
          User Records & Management (Admin View)
        </Typography>

        {result === null ? (
          <Typography>Loading user records from {API_BASE_URL}...</Typography>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>ROLE</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>EMAIL</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>PASSWORD</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users registered yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  result.map((obj, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{obj.name}</TableCell>
                      <TableCell>{getRoleLabel(obj.role)}</TableCell>
                      <TableCell>{obj.email}</TableCell>
                      <TableCell>{obj.password}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          sx={{ mr: 1 }}
                          onClick={() => startEdit(obj)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => deleteUser(obj.email)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Edit Modal / Form */}
        {editObj && (
          <Box sx={{ mt: 3, p: 3, border: "2px solid #1976d2", borderRadius: 2, bgcolor: "#f8fafc" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Edit User: {editObj.email}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Name"
                value={editObj.name || ""}
                onChange={(e) => setEditObj({ ...editObj, name: e.target.value })}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="edit-role-label">Role</InputLabel>
                <Select
                  labelId="edit-role-label"
                  label="Role"
                  value={editObj.role ?? 2}
                  onChange={(e) => setEditObj({ ...editObj, role: Number(e.target.value) })}
                >
                  <MenuItem value={1}>Admin (1)</MenuItem>
                  <MenuItem value={2}>User (2)</MenuItem>
                  <MenuItem value={0}>Guest (0)</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Password"
                type="password"
                value={editObj.password || ""}
                onChange={(e) => setEditObj({ ...editObj, password: e.target.value })}
              />
              <Button variant="contained" onClick={saveEdit}>
                Save Changes
              </Button>
              <Button variant="text" color="secondary" onClick={() => setEditObj(null)}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
