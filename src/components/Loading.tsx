import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const Loading = () => {
  return (
    <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
