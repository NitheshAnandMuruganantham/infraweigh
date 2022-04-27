import {
  DataGrid,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GridFilterModel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GridSortModel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GridToolbar,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Box } from '@mui/system';
import {
  useGetAllBillsSubscription,
  useGetTotalBillsSubscription,
} from '@infra-weigh/generated';
import BillInfo from './billInfo';
import { useState } from 'react';
import { LinearProgress } from '@mui/material';

const Bills = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<any>({});
  const [filter] = useState<any>({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, loading } = useGetAllBillsSubscription({
    variables: {
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      orderBy: {
        ...sort,
      },
      where: {
        ...filter,
        tenent_id: {
          _eq: localStorage.getItem('x-tenent-id'),
        },
      },
    },
  });

  const { data: TotalRows } = useGetTotalBillsSubscription({
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
      <Box height={600} width={'100%'} textAlign="center">
        <LinearProgress
          sx={{
            visibility: loading ? 'visible' : 'hidden',
          }}
        />
        <DataGrid
          paginationMode="server"
          onPageChange={(page) => {
            setPage(page);
          }}
          onPageSizeChange={(rowsPerPage) => {
            setRowsPerPage(rowsPerPage);
          }}
          columns={[
            {
              field: 'vehicle_number',
              headerName: 'vehicle number',
              width: 150,
              editable: false,
            },
            {
              field: 'material',
              headerName: 'material',
              width: 100,
              valueGetter: (params: GridValueGetterParams) => params.value.name,
            },
            {
              field: 'weighbridge',
              headerName: 'weighbridge',
              sortable: true,
              width: 250,
              valueParser: (params: any) => params.value.id,
              valueGetter: (params: GridValueGetterParams) => params.value.name,
            },
            {
              field: 'created_at',
              headerName: 'created At',
              sortable: true,
              width: 200,
              valueGetter: (params: GridValueGetterParams) =>
                (params.value && new Date(params.value).toLocaleString()) || '',
            },

            {
              field: 'second_weight',
              headerName: 'second weight',
              sortable: true,
              width: 110,
              type: 'boolean',
              valueParser: (value) => value,
              valueGetter: (params: GridValueGetterParams) => params.value,
            },
            {
              field: 'scale_weight',
              headerName: 'scaleWeight',
              sortable: true,
              width: 120,
            },
            {
              field: 'tare_weight',
              headerName: 'tareWeight',
              sortable: true,
              width: 120,
            },
            {
              field: 'netWeight',
              headerName: 'netWeight',
              sortable: true,
              width: 120,
              valueGetter: (params) =>
                Math.abs(
                  parseInt(`${params.row.scale_weight}`, 10) -
                    parseInt(`${params.row.tare_weight}` || '0', 10) || 0
                ),
            },
            {
              field: 'info',
              headerName: 'info',
              sortable: false,
              width: 120,
              renderCell: (params) => (
                <BillInfo name="info" id={params.row.id} />
              ),
            },
          ]}
          rows={data?.bill || []}
          filterMode={'server'}
          disableColumnFilter
          sortingMode={'server'}
          onFilterModelChange={(filter) => {
            // setFilter(filter);
            console.log(filter);
          }}
          onSortModelChange={(sort) => {
            // eslint-disable-next-line prefer-const
            let obj: any = {};
            // eslint-disable-next-line array-callback-return
            sort.map((item) => {
              obj[item.field] = item.sort;
            });
            setSort(obj);
          }}
          loading={loading}
          autoPageSize
          pagination
          rowCount={TotalRows?.bill_aggregate.aggregate?.count || 0}
          page={page}
        />
      </Box>
    </Box>
  );
};

export default Bills;
