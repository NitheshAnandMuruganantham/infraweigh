import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useGetAllWeighbridgeRealtimeSubscription } from '@infra-weigh/generated';
import { useEffect } from 'react';
import { auth } from '@infra-weigh/firebase';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'name',
    width: 150,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 300,
  },
  {
    field: 'display_name',
    headerName: 'display name',
    width: 300,
  },
  {
    field: 'phone',
    headerName: 'phone',
    width: 150,
  },
  {
    field: 'mail',
    headerName: 'mail',
    width: 180,
  },
];
const WeighMentData = () => {
  const { data, loading, error } = useGetAllWeighbridgeRealtimeSubscription({
    variables: {
      where: {
        tenent: {
          customers: {
            email: {
              _eq: auth.currentUser?.email,
            },
          },
        },
      },
    },
  });
  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [data, loading, error]);
  return (
    <Box>
      <Box height={500} width={'100%'} textAlign="center">
        <DataGrid
          loading={loading}
          rows={data?.weighbridge || []}
          columns={columns}
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default WeighMentData;
