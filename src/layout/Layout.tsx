import { Box, Container } from "@mui/material";
import { FC, ReactNode } from "react";
import Header from "../components/Header";

interface IProps {
  children?: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
};

export default Layout;
