import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Bill } from '@infra-weigh/print-templates';
import { useGetBillForReceptLazyQuery } from '@infra-weigh/generated';
import { CircularProgress } from '@mui/material';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '@infra-weigh/firebase';
import ReactToPrint from 'react-to-print';
import { toast } from 'react-toastify';

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
    setOpen(false);
  };
  const [data, setData] = React.useState<any | null>(null);
  const [getData] = useGetBillForReceptLazyQuery({
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
            // eslint-disable-next-line prefer-const
            let dat1 = await getData();
            const d1 = await getDownloadURL(
              ref(storage, dat1.data?.bill_by_pk?.photos[0])
            );
            const d2 = await getDownloadURL(
              ref(storage, dat1.data?.bill_by_pk?.photos[1])
            );
            const d3 = await getDownloadURL(
              ref(storage, dat1.data?.bill_by_pk?.photos[2])
            );
            const d4 = await getDownloadURL(
              ref(storage, dat1.data?.bill_by_pk?.photos[3])
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            dat1 &&
            dat1.data &&
            dat1.data.bill_by_pk &&
            dat1.data.bill_by_pk.photos
              ? (dat1.data.bill_by_pk.photos = [d1, d2, d3, d4])
              : null;
            setData(dat1);
            setLoading(false);
            handleClickOpen();
          } catch {
            handleClose();
            setLoading(false);
            toast.error('can not feth bill details');
          }
        }}
        variant="outlined"
        size="small"
      >
        {name}
      </Button>
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
            {data !== null && data ? (
              <Bill data={data.data?.bill_by_pk} />
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
    </>
  );
};

export default BillInfo;
