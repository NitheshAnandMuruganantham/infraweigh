import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditClient from "./edit";
import {
  useGetAllTenantsSubscription,
  useGetTenantsCountSubscription,
} from "../../generated";
import AddNewTenent from "./add";
import DataGridComponent from "../../components/dataGrid";
import { TextField } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "name",
    width: 300,
    editable: false,
    sortable: true,
  },

  {
    field: "email",
    headerName: "e-mail id",
    sortable: false,
    width: 400,
  },

  {
    field: "phone",
    headerName: "phone",
    sortable: false,
    width: 150,
  },
  {
    field: "activate",
    headerName: "active",
    sortable: false,
    width: 150,
    valueGetter: (params) => (params.value ? "active" : "in-active"),
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 130,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditClient id={params.row.id} />,
  },
];
const Clients = () => {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [sort, SetSort] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(1);

  const { data, loading } = useGetAllTenantsSubscription({
    variables: {
      orderBy: sort,
      where: {
        _or: [
          {
            name: {
              _like: `%${search}%`,
            },
          },
          {
            email: {
              _like: `%${search}%`,
            },
          },
        ],
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });
  const { data: count, loading: countLoading } = useGetTenantsCountSubscription(
    {
      variables: {
        orderBy: sort,
        where: {
          _or: [
            {
              name: {
                _like: `%${search}%`,
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
    }
  );

  return (
    <Box>
      <AddNewTenent />
      <TextField
        fullWidth
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{
          width: "100%",
          my: 2,
        }}
        name="search"
        label="Search"
      />
      <Box height={500} width={"100%"} textAlign="center">
        <DataGridComponent
          data={data?.tenents || []}
          pageSize={pageSize}
          setPageSize={setPageSize}
          setFilter={() => null}
          setPage={setPage}
          setSort={SetSort}
          loading={loading || countLoading}
          rowCount={count?.tenents_aggregate.aggregate?.count || 0}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Clients;
