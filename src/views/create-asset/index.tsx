import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { MuiFileInput } from "mui-file-input";

type CreateAssetViewProps = {
  formProps: {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleFileChange: (file: File | null) => void;
    fileValue: File | null;
  };
};

const CreateAssetView = ({ formProps }: CreateAssetViewProps) => {
  const { handleSubmit, handleFileChange, fileValue } = formProps;

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Asset
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            type="text"
            label="NFT Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="description"
            multiline
            rows={4}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            type="number"
            label="Price"
            id="price"
            autoComplete="price"
          />
          <MuiFileInput
            value={fileValue}
            label="Upload Image (png/jpeg/svg)"
            onChange={handleFileChange}
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Asset
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateAssetView;
