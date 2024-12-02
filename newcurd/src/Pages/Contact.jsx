import React, { useState,useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  FormLabel,
  Grid,
} from '@mui/material';
import axios from 'axios';
import * as api from '../Services/api';
import ListTable from '../Components/ListTable';

function Contact(){
const handleSubmit = async (values, { resetForm }) => {
  try {
   
    const response = await api.createcontact(values);
    console.log('Success:', response.data);
    alert('Form submitted successfully!');
    resetForm(); // Optional: Reset the form after successful submission
  } catch (error) {
    console.error('Error submitting the form:', error);
    alert('Failed to submit the form. Please try again.');
  }
};

// Define hobbies options
const hobbiesOptions = ['Reading', 'Traveling', 'Gaming', 'Cooking', 'Sports'];


// Yup validation schema
const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  gender: yup.string().required('Gender is required'),
  hobbies: yup
    .array()
    .min(1, 'Select at least one hobby')
    .required('Hobbies are required'),
});
// const Contact = () => {
  const [userdata,setUserlist] = useState([]);
  const initialValues = {
    username: '',
    age: '',
    phone: '',
    email: '',
    gender: '',
    hobbies: [],
  };
 
  
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    const { data } = await api.getUsers();
    console.log(data)
    setUserlist(data);
  };

  return <div>
    <Grid container spacing={2}>
    <Grid item xs={6}>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
      <Form style={{ maxWidth: 800, margin: 'auto' }}>
          <Field name="username" as={TextField}  label="Username" fullWidth
            margin="normal"   error={touched.username && !!errors.username}
            helperText={touched.username && errors.username}
          />

          <Field
            name="age"
            as={TextField}
            label="Age"
            type="number"
            fullWidth
            margin="normal"
            error={touched.age && !!errors.age}
            helperText={touched.age && errors.age}
          />

          {/* Phone */}
          <Field
            name="phone"
            as={TextField}
            label="Phone"
            fullWidth
            margin="normal"
            error={touched.phone && !!errors.phone}
            helperText={touched.phone && errors.phone}
          />

          {/* Email */}
          <Field
            name="email"
            as={TextField}
            label="Email"
            fullWidth
            margin="normal"
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />

          {/* Gender */}
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={values.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
          {touched.gender && errors.gender && (
            <p style={{ color: 'red', marginTop: -15 }}>{errors.gender}</p>
          )}

          {/* Hobbies */}
          <FormLabel component="legend">Hobbies</FormLabel>
          <FormGroup row>
            {hobbiesOptions.map((hobby) => (
              <FormControlLabel
                key={hobby}
                control={
                  <Checkbox
                    name="hobbies"
                    value={hobby}
                    checked={values.hobbies.includes(hobby)}
                    onChange={(event) => {
                      const { checked } = event.target;
                      if (checked) {
                        setFieldValue('hobbies', [...values.hobbies, hobby]);
                      } else {
                        setFieldValue(
                          'hobbies',
                          values.hobbies.filter((item) => item !== hobby)
                        );
                      }
                    }}
                  />
                }
                label={hobby}
              />
            ))}
          </FormGroup>
          {touched.hobbies && errors.hobbies && (
            <p style={{ color: 'red', marginTop: -15 }}>{errors.hobbies}</p>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Form>

      )}
      </Formik>
      </Grid>
      <Grid item xs={6}>
        {/* <ListTable data={userdata} handleEdit={handleEdit} handleDelete={handleDelete} />  */}
        <ListTable data={userdata}  /> 
      </Grid>
    </Grid>
      
  </div>;
};

export default Contact;
