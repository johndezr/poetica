import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useEffect } from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserAuthAlert = ({ userAlreadyExist, text }) => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    if (userAlreadyExist) {
      setOpenAlert(true);
    }
  }, [userAlreadyExist]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={openAlert}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default UserAuthAlert;
