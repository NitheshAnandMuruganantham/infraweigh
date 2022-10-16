import decode from 'jwt-decode';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';

import AddTaskIcon from '@mui/icons-material/AddTask';
import ArticleIcon from '@mui/icons-material/Article';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {
  Avatar,
  CircularProgress,
  createTheme,
  Menu,
  MenuItem,
  ThemeProvider,
  Tooltip,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import { ColorModeContext } from '../../context/colorMode';
import useRole from '../../hooks/role';
import GetHeaderNames from './getRoutes';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const NavBar: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [role, RoleLoading] = useRole();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<any>();
  useEffect(() => {
    setUser(decode(sessionStorage.getItem('token') || ''));
  }, []);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [mode, setMode] = React.useContext<any>(ColorModeContext);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: any) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );
  const theme = createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: 'Poppins',
    },
  });
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const links = [
    {
      name: 'queries',
      path: '/queries',
      icon: SupportAgentIcon,
      role: ['maintainer'],
      active: useMatch('/queries'),
    },
    {
      name: 'Bills',
      path: '/',
      icon: ArticleIcon,
      role: ['admin', 'terminal', 'tenantAdmin', 'customer', 'maintainer'],
      active: useMatch('/'),
    },
    {
      name: 'tenants',
      path: '/tenants',
      role: ['admin', 'maintainer'],
      icon: PersonOutlineIcon,
      active: useMatch('/tenants'),
    },
    {
      name: 'maintainers',
      path: '/maintainers',
      icon: EngineeringIcon,
      role: ['admin'],
      active: useMatch('/maintainers'),
    },
    {
      name: 'weighbridge entry',
      path: '/weigh',
      icon: AddTaskIcon,
      role: ['terminal'],
      active: useMatch('/weigh'),
    },
    {
      name: 'Weighbridges',
      path: '/weighbridges',
      role: ['admin', 'tenantAdmin', 'maintainer'],
      icon: StoreMallDirectoryIcon,
      active: useMatch('/weighbridges'),
    },
    {
      name: 'users',
      path: '/users',
      role: ['admin', 'tenantAdmin', 'maintainer'],
      icon: AdminPanelSettingsIcon,
      active: useMatch('/users'),
    },
    {
      name: 'clients',
      role: ['terminal', 'tenantAdmin', 'maintainer'],
      path: '/clients',
      icon: PersonOutlineIcon,
      active: useMatch('/clients'),
    },
  ];
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <img
              style={{
                height: '40px',
                backgroundColor: 'white',
                paddingTop: '3px',
                paddingBottom: '3px',
                paddingRight: '10px',
                paddingLeft: '10px',
                borderRadius: '20px',
              }}
              src="/logo.png"
            />
            <Typography variant="h6" sx={{ mx: '10px' }} component="div">
              |
            </Typography>
            {<GetHeaderNames />}
            <Box
              sx={{
                marginLeft: 'auto',
                flexGrow: 0,
              }}
            >
              <Menu
                sx={{ mt: '50px' }}
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
                  disabled={loading}
                  key={'logOut'}
                  onClick={async () => {
                    setLoading(true);
                    await fetch(
                      import.meta.env['VITE_SERVER_URL'] + '/auth/logout',
                      {
                        headers: {
                          Authorization: `Bearer ${sessionStorage.getItem(
                            'token'
                          )}`,
                        },
                        method: 'post',
                      }
                    ).catch();
                    sessionStorage.clear();
                    localStorage.clear();
                    setLoading(false);
                    navigate('/login');
                  }}
                >
                  <Typography textAlign="center">
                    {!loading ? (
                      'log out'
                    ) : (
                      <CircularProgress color="success" size={25} />
                    )}
                  </Typography>
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
                  <Avatar
                    src={`https://avatars.dicebear.com/api/initials/${
                      user?.email || 'infraweigh'
                    }.svg`}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {!RoleLoading && (
            <List>
              {links
                .filter((dt) => role && dt.role.includes(role))
                .map((data, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => navigate(data.path)}
                    sx={{
                      ':hover': {
                        backgroundColor: data.active
                          ? 'slategray'
                          : 'whitesmoke',
                      },
                      backgroundColor: data.active ? 'gray' : 'inherit',
                      backgroundOpacity: 50,
                      margin: 1,
                      borderRadius: '5px',
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <data.icon htmlColor={data.active ? 'white' : 'gray'} />
                    </ListItemIcon>
                    <ListItemText
                      primary={data.name}
                      sx={{
                        color: data.active ? 'white' : 'inherit',
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                ))}
            </List>
          )}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 7 }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
