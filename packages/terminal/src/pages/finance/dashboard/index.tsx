import * as React from 'react';
import Sec1 from './section1';
import Sec2 from './section2';
import Sec3 from './section3';

interface DashboardProps {}

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  return (
    <>
      <Sec1 />
      <Sec2 />
      <Sec3 />
    </>
  );
};

export default Dashboard;
