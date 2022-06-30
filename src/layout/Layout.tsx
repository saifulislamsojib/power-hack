import { Container } from "@mui/material";
import { FC, ReactNode } from "react";
import Header from "../components/Header";

interface IProps {
  children?: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Container maxWidth="xl">
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
