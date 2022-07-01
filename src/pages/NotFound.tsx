import { Box, Typography } from "@mui/material";
import Layout from "../layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <Typography sx={{ color: "red" }} variant="h4" component="h4">
          Not Found The Page.
        </Typography>
      </Box>
    </Layout>
  );
};

export default NotFound;
