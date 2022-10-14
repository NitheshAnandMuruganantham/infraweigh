import * as React from 'react';
import Sec1 from './section1';

interface DashboardProps {}

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  return (
    <>
      <Sec1 />
      <div
        style={{
          marginTop: '20px',
          height: '300px',
          width: '100%',
          marginLeft: 'auto',
          marginBottom: '10px',
          display: 'flex',
          backgroundColor: 'whitesmoke',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src="./infratrack.png"
          style={{
            height: '100px',
            borderRadius: '10px',
          }}
        />
        <div style={{ fontSize: '30px', margin: '10px' }}>infratrack</div>
        <div>track your shipments directly from your dashboard</div>
        <div>launching soon............</div>
      </div>
    </>
  );
};

export default Dashboard;
