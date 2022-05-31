import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetTareWeightBillsLazyQuery } from '@infra-weigh/generated';
const AddNewClient: React.FunctionComponent<{
  vehicleNumber: string;
  setLoading: (loading: boolean) => void;
  setWeight(weight: number): void;
  setBillRefId(id: string): void;
}> = ({ vehicleNumber, setWeight, setBillRefId, setLoading }) => {
  const [data, SetData] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [getData] = useGetTareWeightBillsLazyQuery();
  const handleClickOpen = async () => {
    await getData({
      variables: {
        where: {
          vehicle_number: {
            _eq: vehicleNumber,
          },
        },
        limit: 50,
      },
    }).then((res) => {
      // eslint-disable-next-line array-callback-return
      res.data?.bill.map((x) => {
        SetData([
          ...data,
          { id: x.id, created_at: x.created_at, scale_weight: x.scale_weight },
        ]);
      });
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      width: 300,
      headerName: 'id',
      editable: false,
    },
    {
      field: 'scale_weight',
      headerName: 'weight',
      width: 300,
      editable: false,
    },
    {
      field: 'created_at',
      headerName: 'created at',
      width: 400,
      valueGetter: (val) => new Date(val.value).toLocaleString(),
      editable: false,
    },

    {
      field: 'select',
      headerName: 'select',
      renderCell: (val) => (
        <Button
          onClick={() => {
            setLoading(true);
            setWeight(val.row.scale_weight || 0);
            setBillRefId(val.row.id);
            setLoading(false);
            handleClose();
          }}
          variant="outlined"
          size="small"
        >
          select
        </Button>
      ),
    },
  ];

  return (
    <>
      <Button
        variant="outlined"
        sx={{ m: 1, width: '60%' }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        select weight
      </Button>
      <Dialog maxWidth="xl" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>select weight</DialogTitle>
        <DialogContent>
          <Box height={'500px'}>
            <DataGrid rows={data} columns={columns} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewClient;
