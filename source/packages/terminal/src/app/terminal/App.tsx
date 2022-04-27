import * as React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Bills from './pages/bills';
import Home from './pages/home';
import ResponsiveAppBar from './components/appBar';
import Clients from './pages/clients';

const App: React.FunctionComponent = () => {
  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Bills />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </ResponsiveAppBar>
  );
};

export default App;
