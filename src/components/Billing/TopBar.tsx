import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, FC, FormEvent, SetStateAction } from "react";

interface IProps {
  handleModalOpen: () => void;
  setSearch: Dispatch<SetStateAction<string>>;
}

const TopBar: FC<IProps> = ({ handleModalOpen, setSearch }) => {
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSearch(formData.get("search") as string);
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
        <Box sx={{ ml: 2 }} component="form" onSubmit={handleSearch}>
          <TextField
            onChange={(e) => e.currentTarget.value === "" && setSearch("")}
            size="small"
            name="search"
            type="search"
            label="Search"
          />
        </Box>
      </Stack>
      <Button onClick={handleModalOpen} variant="contained">
        Add New Bill
      </Button>
    </Stack>
  );
};

export default TopBar;
