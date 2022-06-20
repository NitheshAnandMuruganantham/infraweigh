import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Bill from "../../components/printTemplates";
import { useGetBillForReceptLazyQuery } from "../../generated";
import { CircularProgress } from "@mui/material";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BillInfo: React.FunctionComponent<{
  name: string;
  id: string;
  setLoading: (loading: boolean) => void;
}> = ({ name, id, setLoading }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };
  const [getData, { loading, data, error }] = useGetBillForReceptLazyQuery({
    variables: {
      billByPkId: id,
    },
  });
  const printRef = React.useRef<any>();
  return (
    <>
      <Button
        onClick={async () => {
          try {
            setLoading(true);
            await getData();
            if (error) {
              toast.error(error.message);
              throw new Error(JSON.stringify(error));
            }
            setLoading(false);
            handleClickOpen();
          } catch (e) {
            console.log(e);
            handleClose();
            setLoading(false);
            toast.error("can not fetch bill details");
          }
        }}
        variant="outlined"
        size="small"
      >
        {name}
      </Button>
      {open && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth="md"
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{}</DialogTitle>
          <DialogContent>
            <span ref={printRef}>
              {!loading && data ? (
                <Bill data={data.bill_by_pk} />
              ) : (
                <CircularProgress />
              )}
            </span>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>close</Button>
            <ReactToPrint
              content={() => printRef.current}
              trigger={() => <Button>print</Button>}
            />
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default BillInfo;
