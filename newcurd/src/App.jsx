import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Logout from "./Pages/Logout";
import User from "./Pages/User";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import EditUser from "./Pages/EditUser";

function App() {
  const isDarkMode = true;

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              padding: "20px",
              marginTop: "100px",
              marginLeft: "0px", // Adjust to match the width of your Sidebar (240px)
              transition: "margin-left 0.3s",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user" element={<User />} />
              <Route path="/user-edit" element={<EditUser />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
