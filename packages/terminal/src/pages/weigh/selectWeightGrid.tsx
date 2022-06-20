import * as React from "react";
import DataGridComponent from "../../components/dataGrid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FunctionComponent } from "react";
import { Box } from "@mui/system";
import {
  useGetAllBillsSubscription,
  useGetTotalBillsSubscription,
} from "../../generated";

interface SelectWeightGridProps {
  vehicleNumber: string;
  setWeight: (weight: any) => void;
  setBillRefId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  handleClose: () => void;
}

const SelectWeightGrid: FunctionComponent<SelectWeightGridProps> = ({
  handleClose,
  setLoading,
  setWeight,
  setBillRefId,
  vehicleNumber,
}) => {
  const [page, setPage] = React.useState(1);
  const [sort, SetSort] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(1);

  const { data, loading } = useGetAllBillsSubscription({
    variables: {
      where: {
        vehicle_number: {
          _eq: vehicleNumber,
        },
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: totalRows, loading: totalRowsLoading } =
    useGetTotalBillsSubscription({
      variables: {
        where: {
          vehicle_number: {
            _eq: vehicleNumber,
          },
        },
      },
    });

  const columns: GridColDef[] = [
    {
      field: "id",
      width: 300,
      headerName: "id",
      editable: false,
    },
    {
      field: "scale_weight",
      headerName: "weight",
      width: 300,
      editable: false,
    },
    {
      field: "created_at",
      headerName: "created at",
      width: 400,
      valueGetter: (val) => new Date(val.value).toLocaleString(),
      editable: false,
    },

    {
      field: "select",
      headerName: "select",
      renderCell: (val) => (
        <Button
          onClick={() => {
            setLoading(true);
            setWeight(val?.row?.scale_weight || 0);
            setBillRefId(val?.row?.id || "");
            setLoading(false);
            handleClose();
          }}
          variant="outlined"
          size="small"
        >
          select
        </Button>
      ),
    },
  ];

  return (
    <Dialog maxWidth="xl" fullWidth open={true} onClose={handleClose}>
      <DialogTitle>select weight</DialogTitle>
      <DialogContent>
        <Box height={"500px"}>
          <DataGridComponent
            data={data?.bill || []}
            pageSize={pageSize}
            setPage={setPage}
            setSort={SetSort}
            rowCount={totalRows?.bill_aggregate?.aggregate?.count || 0}
            setFilter={() => null}
            setPageSize={setPageSize}
            loading={totalRowsLoading || loading}
            columns={columns}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectWeightGrid;
