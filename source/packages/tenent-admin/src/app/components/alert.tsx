import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const AlertComponent: React.FunctionComponent<{
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  severity: "success" | "info" | "warning" | "error";
}> = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={props.open}>
        <Alert
          severity={props.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
      </Collapse>
    </Box>
  );
};

export default AlertComponent;
