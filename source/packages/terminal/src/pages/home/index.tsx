import { Box } from '@mui/system';
import { FunctionComponent } from 'react';
import CustomerCollection from './customerCollection';
import DailyCollection from './dailyCollection';
import VehicleCollection from './vehicleCollection';
import WeightCount from './weightCounts';
const Home: FunctionComponent = () => {
  return (
    <Box sx={{ h: '100vh', w: '100%', p: 10 }}>
      <DailyCollection />
      <WeightCount />
      <div
        style={{
          display: 'flex',
          marginTop: '50px',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <h2
          style={{
            width: '50%',
            textAlign: 'center',
          }}
        >
          vehicle collection report
        </h2>
        <h2
          style={{
            width: '50%',
            textAlign: 'center',
          }}
        >
          customer collection report
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          marginBottom: '30px',
        }}
      >
        <CustomerCollection />
        <VehicleCollection />
      </div>
    </Box>
  );
};

export default Home;
