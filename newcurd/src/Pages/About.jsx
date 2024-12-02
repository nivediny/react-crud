import React, { useEffect, useState } from 'react'
import * as api from '../Services/api';
import ListTable from '../Components/ListTable';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Snackbar } from '@mui/material';

const About = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await api.getUsers();
    console.log(data)
    setUsers(data);
  };

  const handleEdit = (item) => {
    console.log('Edit:', item);
  };

  const handleDelete = async (id) => {
    await api.deleteUser(id);
    fetchUsers();
    setSnackbarOpen(true); // Show success message
    setOpenDialog(false); // Close confirmation dialog
  
  };

  const handleOpenDialog = (id) => {
    setSelectedId(id); // Store ID of the user to be deleted
    setOpenDialog(true); // Open confirmation dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close confirmation dialog
    setSelectedId(null); // Clear selected ID
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close success message
  };
  return (
    <div>
    <ListTable data={users} handleEdit={handleEdit} handleDelete={handleDelete} />
     {/* Confirmation Dialog */}
     <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="User deleted successfully"
      />
    </div>
  )
}

export default About
