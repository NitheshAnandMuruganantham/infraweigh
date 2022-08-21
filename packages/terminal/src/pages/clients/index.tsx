import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import useRole from '../../hooks/role';
import { Box } from '@mui/system';
import { Button, LinearProgress, TextField } from '@mui/material';
import AddNewClient from './add';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditClient from './edit';
import {
  DeleteCustomerDocument,
  useGetCustomersCountSubscription,
  useGetCustomersSubscription,
} from '../../generated';
import gqlClient from '../../utils/client';
import { toast } from 'react-toastify';
import columns from './columns';
import DataGridComponent from '../../components/dataGrid';

const TenentAdminColumns: GridColDef[] = [
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
                    gqlClient
                      .mutate({
                        mutation: DeleteCustomerDocument,
                        variables: {
                          deleteCustomerByPkId: params.row.id,
                        },
                      })
                      .catch(() => {
                        toast.error('bills are linked to this client');
                      })
                      .then((dat) => {
                        dat &&
                          dat.data &&
                          toast.success('client deleted successfully');
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
  const [role, loadingRole] = useRole();
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [sort, SetSort] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const searchParsed = [
    {
      name: {
        _ilike: `%${search}%`,
      },
    },
    {
      phone: {
        _ilike: `%${search}%`,
      },
    },
    {
      email: {
        _ilike: `%${search}%`,
      },
    },
    {
      company_name: {
        _ilike: `%${search}%`,
      },
    },
  ];
  const { data, loading } = useGetCustomersSubscription({
    variables: {
      orderBy: sort,
      where: {
        _or: searchParsed,
      },
      offset: (page - 1) * pageSize < 0 ? 0 : (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: customerCountData, loading: customerCountLoading } =
    useGetCustomersCountSubscription({
      variables: {
        orderBy: sort,
        where: {
          _or: searchParsed,
        },
      },
    });
  return (
    <Box>
      <AddNewClient />
      <TextField
        fullWidth
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{
          my: 2,
        }}
        name="search"
        label="Search"
      />
      <Box width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility: customerCountLoading || loading ? 'visible' : 'hidden',
          }}
        />
        <DataGridComponent
          data={data?.customer || []}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setFilter={() => null}
          setPage={setPage}
          setSort={SetSort}
          loading={loading || customerCountLoading || loadingRole}
          rowCount={customerCountData?.customer_aggregate.aggregate?.count || 0}
          columns={
            role === 'terminal' ? columns : [...columns, ...TenentAdminColumns]
          }
        />
      </Box>
    </Box>
  );
};

export default Clients;
