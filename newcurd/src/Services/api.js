import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getItems = () => API.get('/items');
export const createItem = (item) => API.post('/items', item);
export const updateItem = (id, item) => API.put(`/items/${id}`, item);
export const deleteItem = (id) => API.delete(`/items/${id}`);



export const getUsers = () => API.get('/users');
export const createUser = (user) => API.post('/user', user);
export const updateUser = (id, item) => API.put(`/user/${id}`, item);
export const deleteUser = (id) => API.delete(`/user/${id}`);


export const createcontact = (values) =>API.post('/contactdata',values);
export const getcontactdata = () =>API.get('/contactdata');
