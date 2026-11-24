import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New user form state
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('USER');
  const [formMsg, setFormMsg] = useState('');

  const fetchUsers = () => {
    fetch(`${API_BASE_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const goToAdminPage = () => {
    navigate('/adminpage');
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newFullName,
          email: newEmail,
          username: newUsername || newEmail.split('@')[0],
          password: newPassword,
          role: newRole,
        }),
      });

      if (response.ok) {
        setFormMsg('User created successfully!');
        setNewFullName('');
        setNewEmail('');
        setNewUsername('');
        setNewPassword('');
        fetchUsers();
        setTimeout(() => setShowCreateModal(false), 800);
      } else {
        const errText = await response.text();
        setFormMsg(errText || 'Failed to create user');
      }
    } catch (err) {
      setFormMsg('Network error while creating user');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.title}>🏡 JFSD Admin Portal</h2>
        <div style={styles.navButtons}>
          <button style={styles.navButtonPrimary} onClick={() => setShowCreateModal(true)}>
            ➕ Create New User
          </button>
          <button style={styles.navButton} onClick={goToAdminPage}>
            Themes Management
          </button>
          <button style={styles.navButtonLogout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Create User Modal / Box */}
      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, color: '#1e3c72' }}>Create New User</h3>
              <button style={styles.closeBtn} onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            {formMsg && <p style={styles.formMsg}>{formMsg}</p>}
            <form onSubmit={handleCreateUser} style={styles.modalForm}>
              <input
                style={styles.modalInput}
                type="text"
                placeholder="Full Name *"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                required
              />
              <input
                style={styles.modalInput}
                type="email"
                placeholder="Email Address *"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <input
                style={styles.modalInput}
                type="text"
                placeholder="Username (optional)"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <input
                style={styles.modalInput}
                type="password"
                placeholder="Password *"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <select
                style={styles.modalSelect}
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="USER">Customer (USER)</option>
                <option value="ADMIN">Administrator (ADMIN)</option>
              </select>
              <button style={styles.modalSubmitBtn} type="submit">
                Save User
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={styles.content}>
        {user ? (
          <div style={styles.welcomeBox}>
            <div style={styles.userBanner}>
              <div>
                <p style={styles.welcomeText}>Welcome, {user.email}!</p>
                <span style={styles.roleBadge}>{user.role}</span>
              </div>
            </div>

            <div style={styles.tableHeaderSection}>
              <h3 style={styles.subTitle}>Registered Users ({users.length})</h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Username</th>
                    <th style={styles.th}>Full Name</th>
                    <th style={styles.th}>Role</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{u.email}</td>
                      <td style={styles.td}>{u.username || '-'}</td>
                      <td style={styles.td}>{u.fullName || '-'}</td>
                      <td style={styles.td}>
                        <span style={u.role === 'ADMIN' ? styles.adminBadge : styles.userBadge}>
                          {u.role}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {u.id && (
                          <button
                            style={styles.deleteBtn}
                            onClick={() => handleDeleteUser(u.id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p style={styles.errorText}>Please log in to access the dashboard.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#f1f5f9',
    color: '#1e293b',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 28px',
    backgroundColor: '#0f172a',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: 0,
    fontSize: '1.5em',
    fontWeight: '700',
  },
  navButtons: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  navButtonPrimary: {
    padding: '9px 16px',
    fontSize: '0.9em',
    fontWeight: '600',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  navButton: {
    padding: '9px 16px',
    fontSize: '0.9em',
    backgroundColor: '#334155',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  navButtonLogout: {
    padding: '9px 16px',
    fontSize: '0.9em',
    backgroundColor: '#dc2626',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  content: {
    flex: 1,
    padding: '30px',
    display: 'flex',
    justifyContent: 'center',
  },
  welcomeBox: {
    background: '#ffffff',
    padding: '28px',
    borderRadius: '14px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    width: '100%',
    maxWidth: '1000px',
  },
  userBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '16px',
    marginBottom: '20px',
  },
  welcomeText: {
    fontSize: '1.4em',
    fontWeight: '700',
    margin: 0,
    color: '#0f172a',
  },
  roleBadge: {
    display: 'inline-block',
    marginTop: '6px',
    padding: '4px 10px',
    borderRadius: '6px',
    background: '#e0e7ff',
    color: '#3730a3',
    fontSize: '0.85em',
    fontWeight: '700',
  },
  tableHeaderSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  subTitle: {
    fontSize: '1.2em',
    fontWeight: '700',
    margin: 0,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    backgroundColor: '#f8fafc',
    color: '#64748b',
    borderBottom: '2px solid #e2e8f0',
    fontSize: '0.88em',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '0.92em',
  },
  adminBadge: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '3px 8px',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '0.8em',
  },
  userBadge: {
    background: '#ecfdf5',
    color: '#065f46',
    padding: '3px 8px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '0.8em',
  },
  deleteBtn: {
    background: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fecaca',
    padding: '5px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.82em',
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalBox: {
    background: '#fff',
    padding: '24px',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '420px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.2em',
    cursor: 'pointer',
    color: '#64748b',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  modalInput: {
    padding: '10px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '0.95em',
  },
  modalSelect: {
    padding: '10px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '0.95em',
    background: '#fff',
  },
  modalSubmitBtn: {
    marginTop: '6px',
    padding: '12px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '1em',
    cursor: 'pointer',
  },
  formMsg: {
    color: '#2563eb',
    fontSize: '0.88em',
    marginBottom: '10px',
  },
  errorText: {
    fontSize: '1.2em',
    color: '#d9534f',
  },
};

export default AdminDashboard;
