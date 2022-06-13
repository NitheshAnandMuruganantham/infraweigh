import React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { auth } from '@infra-weigh/firebase';
import { useState } from 'react';
import { FunctionComponent } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useRole from '../../hooks/role';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Home from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useMatch } from 'react-router-dom';

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
  const [role, loading] = useRole();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const links = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
      role: ['admin', 'terminal', 'tenantAdmin', 'customer'],
      active: useMatch('/'),
    },
    {
      name: 'tenants',
      path: '/tenants',
      role: ['admin'],
      icon: PersonOutlineIcon,
      active: useMatch('/tenants'),
    },
    {
      name: 'weighbridge entry',
      path: '/weigh',
      icon: AddTaskIcon,
      role: ['terminal'],
      active: useMatch('/weigh'),
    },
    {
      name: 'Bills',
      path: '/bills',
      role: ['admin', 'terminal', 'tenantAdmin', 'customer'],
      icon: ArticleIcon,
      active: useMatch('/bills'),
    },
    {
      name: 'Weighbridges',
      path: '/weighbridges',
      role: ['admin', 'tenantAdmin'],
      icon: StoreMallDirectoryIcon,
      active: useMatch('/weighbridges'),
    },
    {
      name: 'users',
      path: '/users',
      role: ['admin', 'tenantAdmin'],
      icon: SupportAgentIcon,
      active: useMatch('/users'),
    },
    {
      name: 'clients',
      role: ['terminal', 'tenantAdmin'],
      path: '/clients',
      icon: PersonOutlineIcon,
      active: useMatch('/clients'),
    },
  ];
  const navigate = useNavigate();
  return (
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
                key={'logOut'}
                onClick={async () => {
                  toast('Logging out...', {});
                  await auth.signOut();
                  navigate('/', { replace: true, state: { from: '/' } });
                }}
              >
                <Typography textAlign="center">log out</Typography>
              </MenuItem>
            </Menu>
            <Tooltip title={`${auth.currentUser?.email}`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={auth?.currentUser?.photoURL + ''} />
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
        {!loading && (
          <List>
            {links
              .filter((dt) => role && dt.role.includes(role))
              .map((data, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => navigate(data.path)}
                  sx={{
                    ':hover': {
                      backgroundColor: data.active ? 'slategray' : 'whitesmoke',
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
  );
};

export default NavBar;
