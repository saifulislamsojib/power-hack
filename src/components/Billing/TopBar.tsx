import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

interface IProps {
  handleModalOpen: () => void;
}

const TopBar: FC<IProps> = ({ handleModalOpen }) => {
  const handleSearch = () => {
    console.log("Search");
  };

  return (
    <Stack
      sx={{ backgroundColor: "lightgray", p: 1, mt: 2 }}
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems={{ xs: "start", sm: "center" }}
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center">
        <Typography variant="h6" component="h6">
          Billings
        </Typography>
        <Box sx={{ ml: 2 }} component="form" noValidate onSubmit={handleSearch}>
          <TextField size="small" name="search" type="search" label="Search" />
        </Box>
      </Stack>
      <Button onClick={handleModalOpen} variant="contained">
        Add New Bill
      </Button>
    </Stack>
  );
};

export default TopBar;
