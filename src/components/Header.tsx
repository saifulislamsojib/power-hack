import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Auth } from "../types/Auth";
import HeaderTotal from "./HeaderTotal";

const Header = () => {
  const { auth, mutate } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    mutate({} as Auth);
  };

  return (
    <Stack
      sx={{ backgroundColor: "lightgray", p: 1 }}
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
      {auth?.email && <HeaderTotal />}
    </Stack>
  );
};

export default Header;
