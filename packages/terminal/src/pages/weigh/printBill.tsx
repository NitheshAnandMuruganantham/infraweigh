import * as React from "react";
import ReactToPrint from "react-to-print";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import Bill from "../../components/printTemplates";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BillInfo: React.FunctionComponent<{
  data: any;
  open: boolean;
  setOpen(open: boolean): void;
}> = ({ open, setOpen, data }) => {
  const handleClose = async () => {
    setOpen(false);
  };
  const printRef = React.useRef<any>();

  return (
    <Dialog
      sx={{
        zIndex: "10000",
      }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="md"
      onClose={handleClose}
    >
      <DialogTitle>Bill invoice</DialogTitle>
      <DialogContent>
        {open ? (
          <span ref={printRef}>
            <Bill data={data} />
          </span>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
        <ReactToPrint
          content={() => printRef.current}
          trigger={() => <Button>print</Button>}
        />
      </DialogActions>
    </Dialog>
  );
};

export default BillInfo;
