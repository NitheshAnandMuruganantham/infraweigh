import React from 'react';
import {
  useTheme,
  Theme,
  CSSObject,
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AppBar, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import { ColorModeContext } from '../../context/colorMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const NavBar: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user] = useAuthState(auth);

  const [mode, setMode] = React.useContext<any>(ColorModeContext);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: any) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: 'Poppins',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              INFRA WEIGH
            </Typography>
            <Box
              sx={{
                marginLeft: 'auto',
                flexGrow: 0,
              }}
            >
              <Menu
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key={'logOut'}
                  onClick={async () => {
                    await auth.signOut().catch(() => null);
                    navigate('/login');
                  }}
                >
                  <Typography textAlign="center">log out</Typography>
                </MenuItem>
              </Menu>
              <Typography variant="overline" sx={{ mr: '10px' }}>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === 'dark' ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Typography>
              <Tooltip title={`${user?.email || ''}`}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={user?.photoURL || ''} />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
