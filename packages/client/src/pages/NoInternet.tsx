import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import SignalWifiBadIcon from '@mui/icons-material/SignalWifiBad';

const NoInternet = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#221a24',
        color: 'white',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SignalWifiBadIcon
        sx={{
          height: '300px',
          width: '300px',
        }}
      />
      <Box
        sx={{
          fontSize: '40px',
          fontFamily: 'Josefin Sans',
        }}
      >
        Your Connection was Offline.
      </Box>
      <Box
        sx={{
          marginTop: '10px',
          fontSize: '20px',
          fontFamily: 'Josefin Sans',
        }}
      >
        Please check your internet Connection.
      </Box>
      <div>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: '10px' }}
        >
          refresh now
        </Button>
      </div>
    </Box>
  );
};

export default NoInternet;
