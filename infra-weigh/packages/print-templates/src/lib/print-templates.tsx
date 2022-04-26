import { Box, TableHead } from '@mui/material';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Bill: React.FunctionComponent<{
  data: any;
}> = (props) => {
  return (
    <Box
      sx={{
        mx: 'auto',
        width: '20cm',
        height: '14.5cm',
      }}
    >
      <Box
        sx={{
          width: '98%',
          height: '98%',
          borderRadius: '10px',
          marginTop: '1%',
          marginX: 'auto',
          border: '1px solid black',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '15%',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              marginTop: '5px',
              fontSize: '10px',
              fontFamily: 'Oswald',
            }}
          >
            INFRA WEIGH & Co.
          </div>
          <div
            style={{
              fontSize: '30px',
              fontFamily: 'Oswald',
            }}
          >
            {props.data.weighbridge.display_name}
          </div>
          <div
            style={{
              fontSize: '15px',
              fontFamily: 'Oswald',
              marginBottom: '3%',
            }}
          >
            {props.data.weighbridge.address}
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ width: '100%', height: '20%' }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    VEHICLE NUMBER
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    MATERIAL
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    DATE TIME
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    VEHICLE TYPE
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    CHARGES
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    CUSTOMER
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{props.data.vehicle_number}</TableCell>
                  <TableCell>{props.data.material.name}</TableCell>
                  <TableCell>
                    {new Date(props.data.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{props.data.vehicle.name || ''}</TableCell>
                  <TableCell>{props.data.charges}</TableCell>
                  <TableCell>{props.data.customer?.name}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Table sx={{ width: '100%', height: '20%', mt: '2%' }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    SCALE WEIGHT
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    TARE WEIGHT
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    NET WEIGHT
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    VERIFIED TARE WEIGHT
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{props.data.scale_weight}</TableCell>
                  <TableCell>
                    {props.data.second_weight ? props.data.tare_weight : ''}
                  </TableCell>
                  <TableCell>
                    {props.data.second_weight
                      ? Math.abs(
                          props.data.scale_weight - props.data.tare_weight
                        ) || ''
                      : ''}
                  </TableCell>
                  <TableCell>
                    {props.data.reference_bill_id || !props.data.second_weight
                      ? 'VERIFIED'
                      : 'GENERIC'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: '160px',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: '10px',
            }}
          >
            <img
              src={props.data.photos[0]}
              alt=""
              style={{
                width: '135px',
                aspectRatio: '1/1',
              }}
            />
            <img
              src={props.data.photos[1]}
              alt=""
              style={{
                width: '135px',
                aspectRatio: '1/1',
              }}
            />
            <img
              src={props.data.photos[2]}
              alt=""
              style={{
                width: '135px',
                aspectRatio: '1/1',
              }}
            />
            <img
              src={props.data.photos[3]}
              alt=""
              style={{
                width: '135px',
                aspectRatio: '1/1',
              }}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Bill;
