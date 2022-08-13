import { DataGrid, GridColumns } from '@mui/x-data-grid';
import * as React from 'react';

interface DataGridProps {
  loading: boolean;
  pageSize: number;
  rowCount: number;
  data: any;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSort: (sort: any) => void;
  columns: GridColumns;
  setFilter: (page: number) => void;
}

const Grid: React.FunctionComponent<DataGridProps> = (props) => {
  return (
    <DataGrid
      filterMode="server"
      sortingMode="server"
      paginationMode="server"
      autoHeight
      disableSelectionOnClick
      disableColumnFilter
      disableColumnMenu
      disableColumnSelector
      loading={props.loading}
      onPageChange={(p) => props.setPage(p + 1)}
      onPageSizeChange={(s) => props.setPageSize(s)}
      rows={props.data || []}
      rowCount={props.rowCount || 0}
      rowsPerPageOptions={[10, 20, 50, 100]}
      columns={props.columns}
      pageSize={props.pageSize}
      // onFilterModelChange={(f) => props.setFilter(f)}
      onSortModelChange={(s) => {
        const dt: any = [];
        s.forEach((s) => {
          dt.push({
            [s.field]: s.sort,
          });
        });
        props.setSort(dt);
      }}
    />
  );
};

export default Grid;
