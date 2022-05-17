import { Box } from '@mui/system';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppBar from './components/navBar';
import Home from './screens/home';
import Bills from './screens/bills';
import Weighbridges from './screens/weighments';

function App() {
  return (
    <Box>
      <AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/weighbridges" element={<Weighbridges />} />
        </Routes>
      </AppBar>
    </Box>
  );
}

export default App;
