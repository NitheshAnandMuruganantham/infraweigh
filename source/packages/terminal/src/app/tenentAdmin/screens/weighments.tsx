import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import AddNewWeighBridge from './addNewWeighBridge';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditWeighBridge from './editWeighbridge';
import {
  DeleteWeighbridgeDocument,
  // useGetAllWeighbridgeQuery,
  useGetAllWeighbridgeRealtimeSubscription,
} from '@infra-weigh/generated';
import { apollo as gqlClient } from '@infra-weigh/client';
import { useEffect } from 'react';

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
  {
    field: 'edit',
    headerName: 'Edit',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditWeighBridge id={params.row.id} />,
  },
  {
    field: 'delete',
    headerName: 'Delete',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => {
            confirmAlert({
              title: 'Confirm to Delete',
              message: 'Are you sure want to delete this.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: async () => {
                    gqlClient
                      .mutate({
                        mutation: DeleteWeighbridgeDocument,
                        variables: {
                          where: {
                            id: {
                              _eq: params.row.id,
                            },
                          },
                        },
                      })
                      .catch(() => {
                        alert(
                          'relation exists so remove the related resources to delete this resource !'
                        );
                      });
                  },
                },
                {
                  label: 'No',
                  onClick: () => null,
                },
              ],
            });
          }}
        >
          Delete
        </Button>
      );
    },
  },
  {
    field: 'info',
    headerName: 'Info',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <Button
          variant="contained"
          color="info"
          size="small"
          onClick={() => {
            alert(`Edit ${params.row.id}`);
          }}
        >
          Info
        </Button>
      );
    },
  },
];
const WeighMentData = () => {
  const { data, loading, error } = useGetAllWeighbridgeRealtimeSubscription({
    variables: {
      where: {
        tenent_id: {
          _eq: localStorage.getItem('x-tenent-id'),
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
      <AddNewWeighBridge />
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
