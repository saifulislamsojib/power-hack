import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Auth } from "../types/Auth";

const Header = () => {
  const { auth, mutate } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    mutate({} as Auth);
  };

  return (
    <Stack
      sx={{ marginTop: 1, backgroundColor: "lightgray", p: 1, borderRadius: 2 }}
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        {auth?.email ? (
          <Button onClick={handleLogout} variant="outlined">
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button sx={{ mr: 1 }} variant="outlined">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outlined">Register</Button>
            </Link>
          </>
        )}
      </Box>
      <Typography variant="h6" component="h6">
        Total Paid: {0}
      </Typography>
    </Stack>
  );
};

export default Header;
