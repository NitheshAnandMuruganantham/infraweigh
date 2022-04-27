import { Box } from '@mui/system';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppBar from './components/navBar';
import Home from './screens/home';
import Weighment from './screens/weighments';
import Users from './screens/users';
import Clients from './screens/clients';
import Bills from './screens/bills';

function App() {
  return (
    <Box>
      <AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weighbridges" element={<Weighment />} />
          <Route path="/users" element={<Users />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/bills" element={<Bills />} />
        </Routes>
      </AppBar>
    </Box>
  );
}

export default App;
