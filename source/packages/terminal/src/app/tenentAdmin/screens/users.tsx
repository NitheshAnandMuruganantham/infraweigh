import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button, LinearProgress } from '@mui/material';
import AddNewUser from './addNewUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditUser from './editUser';
import { TextField } from '@mui/material';
import {
  DeleteUserDocument,
  useGetAllUsersCountSubscription,
  useGetAllUsersSubscription,
} from '@infra-weigh/generated';
import { apollo as gqlClient } from '@infra-weigh/client';
import { auth } from '@infra-weigh/firebase';

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
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const { data, loading } = useGetAllUsersSubscription({
    variables: {
      where: {
        _and: [
          {
            tenent_id: {
              _eq: localStorage.getItem('x-tenent-id'),
            },
          },
          {
            _not: {
              email: { _eq: auth.currentUser?.email },
            },
          },
          {
            email: {
              _like: `%${search}%`,
            },
          },
        ],
      },
      offset: (page - 1) * pageSize < 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: Count, loading: CountLoading } =
    useGetAllUsersCountSubscription({
      variables: {
        where: {
          _and: [
            {
              tenent_id: {
                _eq: localStorage.getItem('x-tenent-id'),
              },
            },
            {
              _not: {
                email: { _eq: auth.currentUser?.email },
              },
            },
            {
              email: {
                _like: `%${search}%`,
              },
            },
          ],
        },
      },
    });
  return (
    <Box>
      <AddNewUser />
      <TextField
        fullWidth
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{
          width: '90%',
          my: 2,
        }}
        name="search"
        label="Search"
      />
      <Box height={500} width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility: CountLoading || loading ? 'visible' : 'hidden',
          }}
        />
        {!CountLoading && (
          <DataGrid
            loading={loading}
            rows={data?.user || []}
            paginationMode="server"
            onPageChange={(page) => setPage(page)}
            onPageSizeChange={(pageSize) => setPageSize(pageSize)}
            columns={columns}
            autoPageSize
            rowCount={Count?.user_aggregate.aggregate?.count}
            checkboxSelection
            disableSelectionOnClick
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
