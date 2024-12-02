import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import * as api from '../Services/api';


function User() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await api.getItems();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.updateItem(editingId, form);
    } else {
      await api.createItem(form);
    }
    setForm({ name: '' });
    setEditingId(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    await api.deleteItem(id);
    fetchItems();
  };

  return (
    <Container>
      <h1>CRUD App with React & MUI</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          {editingId ? 'Update' : 'Add'}
        </Button>
      </form>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(item)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default User;
