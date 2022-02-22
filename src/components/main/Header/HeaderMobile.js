/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Images } from '../../../contants';
import DrawerMain from '../../../components/main/DrawerMain';
import './HeaderMobile.scss';
import { useNavigate } from 'react-router-dom';

const HeaderMobile = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = (valor) => {
    setOpenDrawer(valor);
  };

  return (
    <Box className="header-mobile-container">
      <DrawerMain handleDrawerOpen={handleDrawerOpen} openDrawer={openDrawer} />
      <AppBar position="static" className="header-mobile-appbar">
        <Toolbar className="header-mobile-toolbar">
          <IconButton
            size="large"
            edge="start"
            className="header-mobile-menu-button"
            aria-label="menu"
            onClick={() => handleDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <img
            onClick={() => navigate('/')}
            src={Images.GZUZLOGOPRETO}
            alt="Logo GZUZ"
            width="100"
            height="50"
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(HeaderMobile);
