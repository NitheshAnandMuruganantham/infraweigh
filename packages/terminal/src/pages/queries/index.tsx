import * as React from 'react';

import { LinearProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';

import DataGridComponent from '../../components/dataGrid';
import {
  useGetAllUsersCountSubscription,
  useGetAllUsersSubscription,
  useGetIssuesSubscription,
} from '../../generated';

const Users = () => {
  const [sort, SetSort] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data, loading } = useGetIssuesSubscription({
    variables: {
      where: {
        _or: [
          {
            title: {
              _ilike: `%${search}%`,
            },
          },
          {
            message: {
              _ilike: `%${search}%`,
            },
          },
        ],
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: Count, loading: CountLoading } =
    useGetAllUsersCountSubscription({});

  return (
    <Box>
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
            visibility: CountLoading || loading ? 'visible' : 'hidden',
          }}
        />
        <DataGridComponent
          loading={loading || CountLoading}
          data={data?.issues || []}
          pageSize={pageSize}
          setPage={setPage}
          setFilter={() => null}
          setPageSize={setPageSize}
          setSort={SetSort}
          columns={[
            {
              field: 'title',
              headerName: 'title',
              sortable: false,
              filterable: false,
              minWidth: 400,
              flex: 1,
            },
            {
              field: 'message',
              headerName: 'message',
              sortable: false,
              filterable: false,
              minWidth: 800,
              flex: 1,
            },
          ]}
          rowCount={Count?.user_aggregate?.aggregate?.count || 0}
        />
      </Box>
    </Box>
  );
};

export default Users;
