import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Bills from './pages/bills';
import Login from './pages/login';
import RequireAuth from './pages/requireAuth';

function App() {
  const theme = createTheme({
    palette: {
      mode:
        (new Date().getHours() > 18 || new Date().getHours()) < 7
          ? 'dark'
          : 'light',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Bills />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
