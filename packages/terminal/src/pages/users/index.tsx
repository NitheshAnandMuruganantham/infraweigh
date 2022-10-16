import * as React from 'react';

import { LinearProgress, TextField } from '@mui/material';
import { Box } from '@mui/system';

import DataGridComponent from '../../components/dataGrid';
import {
  useGetAllUsersCountSubscription,
  useGetAllUsersSubscription,
} from '../../generated';
import useRole from '../../hooks/role';
import AddNewUser from './add';
import columns from './columns';
import useUser from '../../hooks/user';

const Users = () => {
  const [sort, SetSort] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [role, loadingRole] = useRole();
  const [user] = useUser();
  let filter: any;
  if (role === 'tenantAdmin') {
    filter = {
      _and: [
        {
          _or: [
            {
              email: {
                _ilike: `%${search}%`,
              },
            },
          ],
        },
      ],
    };
  } else if (role === 'maintainer') {
    filter = {
      _and: [
        {
          role: {
            _eq: 'tenantAdmin',
          },
        },
        {
          _or: [
            {
              email: {
                _ilike: `%${search}%`,
              },
            },
          ],
        },
      ],
    };
  } else {
    filter = {
      _and: [
        {
          role: {
            _eq: 'tenantAdmin',
          },
        },
        {
          email: {
            _neq: user?.user.email,
          },
        },
        {
          _or: [
            {
              email: {
                _ilike: `%${search}%`,
              },
            },
          ],
        },
      ],
    };
  }
  const { data, loading } = useGetAllUsersSubscription({
    variables: {
      orderBy: sort,
      where: filter,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: Count, loading: CountLoading } =
    useGetAllUsersCountSubscription({
      variables: {
        orderBy: sort,
        where: filter,
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
          my: 2,
        }}
        name="search"
        label="Search"
      />
      <Box width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility:
              CountLoading || loading || loadingRole ? 'visible' : 'hidden',
          }}
        />
        <DataGridComponent
          loading={loading || CountLoading || loadingRole}
          data={data?.user || []}
          pageSize={pageSize}
          setPage={setPage}
          setFilter={() => null}
          setPageSize={setPageSize}
          setSort={SetSort}
          columns={columns}
          rowCount={Count?.user_aggregate?.aggregate?.count || 0}
        />
      </Box>
    </Box>
  );
};

export default Users;
