import * as React from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import Bills from '../../pages/bills';
import Home from '../../pages/weigh';
import AppBar from '../../components/nav';
import Clients from '../../pages/clients';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';

const App: React.FunctionComponent = () => {
  return (
    <AppBar
      links={[
        {
          name: 'Home',
          path: '/',
          icon: HomeIcon,
          active: useMatch('/'),
        },
        {
          name: 'report',
          path: '/report',
          icon: AssessmentIcon,
          active: useMatch('/report'),
        },
        {
          name: 'clients',
          path: '/clients',
          icon: PersonOutlineIcon,
          active: useMatch('/clients'),
        },
      ]}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Bills />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </AppBar>
  );
};

export default App;
