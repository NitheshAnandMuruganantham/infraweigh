import * as React from 'react';
import Bills from '../bills';
import Sec1 from './section1';

interface DashboardProps {}

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  return (
    <>
      <Sec1 />
      <Bills />
    </>
  );
};

export default Dashboard;
