import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Checkbox, FormControlLabel, Typography } from '@mui/material';
import {Grid2 as Grid } from '@mui/material';

const Adduser = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully!');
    reset();
  };

  return (
    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h4" gutterBottom>
          User Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: 'Username is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                fullWidth
                margin="normal"
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          <Controller
            name="userAge"
            control={control}
            defaultValue=""
            rules={{
              required: 'Age is required',
              min: { value: 1, message: 'Age must be greater than 0' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Age"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.userAge}
                helperText={errors.userAge?.message}
              />
            )}
          />

          <Controller
            name="userEmail"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!errors.userEmail}
                helperText={errors.userEmail?.message}
              />
            )}
          />

          <Controller
            name="userPhone"
            control={control}
            defaultValue=""
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                type="tel"
                fullWidth
                margin="normal"
                error={!!errors.userPhone}
                helperText={errors.userPhone?.message}
              />
            )}
          />

          <Controller
            name="userDOB"
            control={control}
            defaultValue=""
            rules={{ required: 'Date of birth is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date of Birth"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                margin="normal"
                error={!!errors.userDOB}
                helperText={errors.userDOB?.message}
              />
            )}
          />

          <Controller
            name="userGender"
            control={control}
            defaultValue=""
            rules={{ required: 'Gender is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Gender"
                fullWidth
                margin="normal"
                error={!!errors.userGender}
                helperText={errors.userGender?.message}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="userHobbies"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Hobbies
                </Typography>
                <FormControlLabel
                  control={<Checkbox {...field} value="Reading" />}
                  label="Reading"
                />
                <FormControlLabel
                  control={<Checkbox {...field} value="Gaming" />}
                  label="Gaming"
                />
                <FormControlLabel
                  control={<Checkbox {...field} value="Traveling" />}
                  label="Traveling"
                />
              </>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Adduser;
