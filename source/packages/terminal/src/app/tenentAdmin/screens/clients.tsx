import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import AddNewClient from './addNewClient';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditClient from './editClient';
import {
  DeleteCustomerDocument,
  useGetCustomersSubscription,
} from '@infra-weigh/generated';
import { apollo as gqlClient } from '@infra-weigh/client';

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'name',
    width: 300,
    editable: false,
    sortable: true,
  },

  {
    field: 'company_address',
    headerName: 'Address',
    sortable: false,
    width: 400,
  },

  {
    field: 'phone',
    headerName: 'phone',
    sortable: false,
    width: 150,
  },
  {
    field: 'email',
    headerName: 'e-mail id',
    sortable: false,
    width: 150,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditClient id={params.row.id} />,
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
                  onClick: () => {
                    gqlClient.mutate({
                      mutation: DeleteCustomerDocument,
                      variables: {
                        deleteCustomerByPkId: params.row.id,
                      },
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
];
const Clients = () => {
  const { data, loading } = useGetCustomersSubscription({
    variables: {
      where: {
        tenent_id: {
          _eq: localStorage.getItem('x-tenent-id'),
        },
      },
    },
  });
  return (
    <Box>
      <AddNewClient />
      <Box height={500} width={'100%'} textAlign="center">
        <DataGrid
          loading={loading}
          rows={data?.customer || []}
          columns={columns}
          autoPageSize
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Clients;
