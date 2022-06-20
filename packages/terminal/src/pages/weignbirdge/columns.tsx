import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import EditWeighBridge from "./edit";
import { DeleteWeighbridgeDocument } from "../../generated";
import gqlClient from "../../utils/client";
import { toast } from "react-toastify";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "name",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 300,
  },
  {
    field: "display_name",
    headerName: "display name",
    width: 300,
  },
  {
    field: "phone",
    headerName: "phone",
    width: 150,
  },
  {
    field: "mail",
    headerName: "mail",
    width: 180,
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 75,
    sortable: false,
    filterable: false,
    renderCell: (params) => <EditWeighBridge id={params.row.id} />,
  },
  {
    field: "delete",
    headerName: "Delete",
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
              title: "Confirm to Delete",
              message: "Are you sure want to delete this.",
              buttons: [
                {
                  label: "Yes",
                  onClick: async () => {
                    gqlClient
                      .mutate({
                        mutation: DeleteWeighbridgeDocument,
                        variables: {
                          where: {
                            id: {
                              _eq: params.row.id,
                            },
                          },
                        },
                      })
                      .catch(() => {
                        toast.error(
                          "relation exists so remove the related resources to delete this resource !"
                        );
                      })
                      .then((d) => {
                        d && toast.success("WeighBridge deleted successfully");
                      });
                  },
                },
                {
                  label: "No",
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

export default columns;
