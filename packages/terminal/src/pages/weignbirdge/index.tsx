import * as React from 'react';
import { Box } from '@mui/system';
import AddNewWeighBridge from './add';
import {
  useGetAllWeighbridgeRealtimeSubscription,
  useWeighbridgesCountSubscription,
} from '../../generated';
import columns from './columns';
import DataGridComponent from '../../components/dataGrid';

const Weighbridges: React.FunctionComponent = () => {
  const [sort, SetSort] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const { data, loading } = useGetAllWeighbridgeRealtimeSubscription({
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: sort,
    },
  });
  const { data: count, loading: countLoading } =
    useWeighbridgesCountSubscription({
      variables: {
        orderBy: sort,
      },
    });
  return (
    <Box>
      <AddNewWeighBridge />
      <Box width={'100%'} textAlign="center">
        <DataGridComponent
          loading={loading || countLoading}
          data={data?.weighbridge || []}
          pageSize={pageSize}
          setFilter={() => null}
          setPage={setPage}
          setPageSize={setPageSize}
          setSort={SetSort}
          rowCount={count?.weighbridge_aggregate.aggregate?.count || 0}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Weighbridges;
