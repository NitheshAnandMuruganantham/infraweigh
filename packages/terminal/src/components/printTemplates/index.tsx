import Box  from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TableHead from "@mui/material/TableHead";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import BarCode from "react-barcode";
const Bill: React.FunctionComponent<{
  data: any;
}> = (props) => {
  React.useEffect(() => {
    console.log(props.data);
  }, []);
  return (
    <Box
      sx={{
        mx: "auto",
        width: "20cm",
        height: "14.5cm",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "98%",
          height: "98%",
          borderRadius: "10px",
          marginTop: "1%",
          marginX: "auto",
          border: "1px solid black",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "15%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              fontFamily: "Oswald",
            }}
          >
            {props.data.weighbridge.display_name}
          </div>
          <div
            style={{
              fontSize: "15px",
              fontFamily: "Oswald",
              marginBottom: "3%",
            }}
          >
            {props.data.weighbridge.address}
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%", height: "20%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    VEHICLE NUMBER
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    MATERIAL
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    DATE TIME
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    CHARGES
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    CUSTOMER
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    {props.data.vehicle_number}
                  </TableCell>
                  <TableCell align="center">
                    {props.data.material.name}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(props.data.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">{props.data.charges}</TableCell>
                  <TableCell align="center">
                    {props.data.customer?.name}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%", height: "20%", mt: "2%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    SCALE WEIGHT
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    TARE WEIGHT
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    NET WEIGHT
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    VERIFIED TARE WEIGHT
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    {props.data.scale_weight}
                  </TableCell>
                  <TableCell align="center">
                    {props.data.second_weight ? props.data.tare_weight : ""}
                  </TableCell>
                  <TableCell align="center">
                    {props.data.second_weight
                      ? Math.abs(
                          props.data.scale_weight - props.data.tare_weight
                        ) || ""
                      : ""}
                  </TableCell>
                  {props.data.second_weight ? (
                    <TableCell align="center">
                      {props.data.reference_bill_id || !props.data.second_weight
                        ? "VERIFIED"
                        : "GENERIC"}
                    </TableCell>
                  ) : (
                    <TableCell align="center">--</TableCell>
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "160px",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "10px",
            }}
          >
            {props.data.photos.map((photo: string, index: number) => {
              if (index > 3) {
                return null;
              } else
                return (
                  <img
                    src={props.data.photos[index]}
                    alt=""
                    style={{
                      width: "135px",
                      aspectRatio: "1/1",
                    }}
                  />
                );
            })}
          </div>
          <Chip
            sx={{
              position: "absolute",
              right: "10px",
              bottom: "10px",
            }}
            label="infra weigh secure"
            size="small"
            icon={<VerifiedUserOutlinedIcon />}
            color="primary"
          />
          <div
            style={{
              position: "absolute",
              left: 0,
            }}
          >
            <BarCode
              value={`INF-${props.data.nano_id}`}
              displayValue={false}
              height={25}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Bill;
