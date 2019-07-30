import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Slide } from "@material-ui/core";

export const ErrorSnackbar = React.memo(props => {
  const [error, setError] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(props.error);
  };

  console.log(error);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={error !== props.error}
      autoHideDuration={2000}
      onClose={handleClose}
      TransitionComponent={Slide}
      message={<span> {props.error} </span>}
    />
  );
});
