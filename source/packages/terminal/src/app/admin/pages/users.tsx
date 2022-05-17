import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button, LinearProgress } from '@mui/material';
import AddNewUser from './addNewUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditUser from './editUser';
import {
  DeleteUserDocument,
  useGetAllUsersCountSubscription,
  useGetAllUsersSubscription,
} from '@infra-weigh/generated';
import { apollo as gqlClient } from '@infra-weigh/client';
import React from 'react';

const columns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Email Address',
    sortable: false,
    width: 400,
  },
  {
    field: 'weighbridge',
    headerName: 'weighbridge',
    sortable: false,
    width: 400,
    valueGetter: (params: GridValueGetterParams) => params.row.weighbridge.name,
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditUser id={params.row.id} />,
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
                    gqlClient
                      .mutate({
                        mutation: DeleteUserDocument,
                        variables: {
                          deleteUserByPkId: params.row.id,
                        },
                      })
                      .catch((e) =>
                        alert(
                          'relations exists remove the related resources to delete this resource'
                        )
                      );
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
const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, loading } = useGetAllUsersSubscription({
    variables: {
      offset: (page - 1) * rowsPerPage < 0 ? 0 : (page - 1) * rowsPerPage,
      limit: rowsPerPage,
    },
  });
  const { data: TotalRows, loading: TotalRowsLoading } =
    useGetAllUsersCountSubscription();
  return (
    <Box>
      <AddNewUser />
      <Box height={500} width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility: loading || TotalRowsLoading ? 'visible' : 'hidden',
          }}
        />
        {!loading && !TotalRowsLoading && (
          <DataGrid
            paginationMode="server"
            onPageChange={(page) => setPage(page)}
            onPageSizeChange={(rowsPerPage) => setRowsPerPage(rowsPerPage)}
            disableColumnFilter
            rowCount={TotalRows?.user_aggregate?.aggregate?.count}
            disableSelectionOnClick
            loading={loading}
            rows={data?.user || []}
            columns={columns}
            autoPageSize
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
