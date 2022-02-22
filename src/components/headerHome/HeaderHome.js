/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { logoutUser, setNovo } from '../../redux/login.slice';

import { Images } from '../../contants';
import { Bandeiras } from '..';

// import './HeaderHome.scss';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.CINZA00 + ' !important',
  },
  logo: {
    cursor: 'pointer',
  },
  containerUser: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerUserText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: '0px 10px',
    '& :nth-child(1)': {
      fontsize: '16px',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    '& :nth-child(2)': {
      color: theme.palette.primary.CINZA50,
      fontsize: '14px',
    },
  },
  iconTop: {
    transform: 'rotate(180deg)',
    transition: 'all 0.3s ease-in-out',
  },
  iconDown: {
    transform: 'rotate(360deg)',
    transition: 'all 0.3s ease-in-out',
  },
  containerMobileMenu: {
    color: theme.palette.primary.BRANCO + ' !important',
    backgroundColor: theme.palette.primary.AMARELO + ' !important',
  },
}));

const ResponsiveAppBar = () => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const resultRedux = useSelector(function (state) {
    return state.login
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event, title, onPress) => {
    event.preventDefault();

    if (title === 'Logout') {
      dispatch(logoutUser());
      setAnchorElUser(null);
      return;
    }

    if (title === 'Driver') {
      dispatch(
        setNovo({
          tipo: 'driver',
        }),
      );
      setAnchorElUser(null);
      return;
    }

    if (title === 'User') {
      dispatch(
        setNovo({
          tipo: 'user',
        }),
      );
      setAnchorElUser(null);
      return;
    }
    setAnchorElUser(null);
  };

  const pagesUsers = [{ title: 'Home', path: '/home/user' }];
  const pagesDriver = [{ title: 'Home', path: '/home/driver' }];

  const ReturnTypeUser = () => {
    if (resultRedux.user?.tipo === 'user') {
      return pagesUsers;
    }
    return pagesDriver;
  };
  const settings = [
    {
      id: 1,
      title: 'User',
      icon: 'account_circle',
      onPress: false,
    },
    {
      id: 2,
      title: 'Driver',
      icon: 'account_circle',
      onPress: false,
    },
    {
      id: 3,
      title: 'Logout',
      icon: 'exit_to_app',
      onPress: false,
    },
  ];

  return (
    <Box sx={{ width: { xs: '100%', md: '90%' } }}>
      <AppBar
        position="static"
        className={classes.appBar}
        sx={{
          borderRadius: { xs: 'none', md: '16px' },
          margin: { xs: '0 0 1rem 0', md: '1rem 0' },
        }}
      >
        <Container maxWidth="100%">
          <Toolbar
            disableGutters
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <img
                src={Images.GZUZLOGOPRETO}
                alt="logo GZUZ"
                className={classes.logo}
                onClick={() => navigate('/homeUsers')}
                width="201"
                height="93"
              // width: '201px',
              // height: '93px',
              />
              <Bandeiras />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                className={classes.containerMobileMenu}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {ReturnTypeUser().map(({ title, path }) => (
                  <MenuItem key={title} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={() => navigate(path)}>
                      {title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <img src={Images.GZUZLOGOPRETO} alt="LOGO GZUZ" width="110" height="55" />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://yt3.ggpht.com/ytc/AAUvwnh5l9QWNxMPr2mXyG-Zyvye5a6XtpF4hPsHLi3nAw=s240-c-k-c0x00ffffff-no-rj"
                  />
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <div className={classes.containerUser}>
                      <div className={classes.containerUserText}>
                        <label>Santi</label>
                        <label>Walter Santi</label>
                      </div>
                      <div className={anchorElUser ? classes.iconTop : classes.iconDown}>
                        <ArrowDropUpIcon />
                      </div>
                    </div>
                  </Box>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
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
                {settings.map(({ id, onPress, title }) => (
                  <MenuItem
                    key={id}
                    onClick={(event) => handleCloseUserMenu(event, title, onPress)}
                  >
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;
