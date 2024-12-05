import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const EditUser = () => {
  // React Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State to hold form data
  const [formData, setFormData] = useState(location.state?.item || {});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change for hobbies
  const handleCheckboxChange = (key, hobby, checked) => {
    setFormData((prev) => {
      // Ensure formData[key] is an array before performing any array operations
      const updatedHobbies = Array.isArray(prev[key]) ? [...prev[key]] : [];
      if (checked) {
        if (!updatedHobbies.includes(hobby)) {
          updatedHobbies.push(hobby);
        }
      } else {
        const index = updatedHobbies.indexOf(hobby);
        if (index !== -1) {
          updatedHobbies.splice(index, 1);
        }
      }
      return { ...prev, [key]: updatedHobbies };
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // navigate("/"); // Redirect to a different page after saving
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, margin: "auto" }}
    >
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      {/* Dynamically render input fields based on initial data */}
      {Object.keys(formData).map((key) => {
        if (key !== "id") {
          if (key === "userGender") {
            return (
              <TextField
                key={key}
                select
                label="Gender"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            );
          } else if (key === "userHobbies") {
            // Ensure that formData[key] is an array
            const hobbies = Array.isArray(formData[key]) ? formData[key] : [];
            return (
              <Box key={key}>
                <Typography variant="subtitle1" gutterBottom>
                  Hobbies
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobbies.includes("Reading")}
                      onChange={(e) =>
                        handleCheckboxChange(key, "Reading", e.target.checked)
                      }
                    />
                  }
                  label="Reading"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobbies.includes("Gaming")}
                      onChange={(e) =>
                        handleCheckboxChange(key, "Gaming", e.target.checked)
                      }
                    />
                  }
                  label="Gaming"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hobbies.includes("Traveling")}
                      onChange={(e) =>
                        handleCheckboxChange(key, "Traveling", e.target.checked)
                      }
                    />
                  }
                  label="Traveling"
                />
              </Box>
            );
          } else {
            return (
              <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            );
          }
        }
      })}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button type="button" onClick={() => navigate("/")} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditUser;
