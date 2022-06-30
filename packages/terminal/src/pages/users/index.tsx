import * as React from "react";
import { Box } from "@mui/system";
import { LinearProgress } from "@mui/material";
import AddNewUser from "./add";
import { TextField } from "@mui/material";
import {
  useGetAllUsersCountSubscription,
  useGetAllUsersSubscription,
} from "../../generated";
import columns from "./columns";
import { auth } from "../../utils/firebase";
import DataGridComponent from "../../components/dataGrid";
const Users = () => {
  const [sort, SetSort] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const filter = {
    _and: [
      {
        _not: {
          email: { _eq: auth.currentUser?.email },
        },
      },
      {
        _or: [
          {
            email: {
              _like: `%${search}%`,
            },
          },
        ],
      },
    ],
  };
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
          width: "90%",
          my: 2,
        }}
        name="search"
        label="Search"
      />
      <Box height={500} width={"100%"} textAlign="center">
        <LinearProgress
          sx={{
            visibility: CountLoading || loading ? "visible" : "hidden",
          }}
        />
        <DataGridComponent
          loading={loading || CountLoading}
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
