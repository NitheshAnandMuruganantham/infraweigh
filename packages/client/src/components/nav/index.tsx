import React from 'react';
import { useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';

const NavBar: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user, loadingUser] = useAuthState(auth);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
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
                await auth.signOut().catch(() => null);
                navigate('/login');
              }}
            >
              <Typography textAlign="center">log out</Typography>
            </MenuItem>
          </Menu>
          <Tooltip title={`${user?.email || ''}`}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                src={
                  user?.photoURL ||
                  `https://avatars.dicebear.com/api/initials/${
                    user?.email || 'infraweigh'
                  }.svg`
                }
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 7 }}>
        {children}
      </Box>
    </Box>
  );
};

export default NavBar;
