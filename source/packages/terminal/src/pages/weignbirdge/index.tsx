import * as React from 'react';
import { Box } from '@mui/system';
import AddNewWeighBridge from './add';
import {
  useGetAllWeighbridgeRealtimeSubscription,
  useWeighbridgesCountSubscription,
} from '@infra-weigh/generated';
import columns from './columns';
import { DataGridComponent } from '@infra-weigh/shared-ui';

const Weighbridges: React.FunctionComponent = () => {
  const [sort, SetSort] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const { data, loading } = useGetAllWeighbridgeRealtimeSubscription({});
  const { data: count, loading: countLoading } =
    useWeighbridgesCountSubscription();
  return (
    <Box>
      <AddNewWeighBridge />
      <Box height={500} width={'100%'} textAlign="center">
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
