/* eslint-disable object-curly-newline */

import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import HailIcon from '@mui/icons-material/Hail';
import HealingIcon from '@mui/icons-material/Healing';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { Images } from '../../contants';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import {
  BTN_HOME,
  BTN_COURIER,
  BTN_CONSULTING,
  BTN_HELPING_LIVES,
  BTN_CONTACT_US,
  TEXT_FLAG_PT,
  TEXT_FLAG_EN,
  TEXT_FLAG_ES,
  BTN_LOGIN,
  BTN_REGISTER,
} from '../../config/ConfigDefault';

const DrawerMain = ({ handleDrawerOpen, openDrawer }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const CONFIG_MENU = [
    {
      id: 1,
      name: t(BTN_HOME),
      icon: <HomeIcon />,
      path: '/',
    },
    {
      id: 2,
      name: t(BTN_COURIER),
      icon: <AttachEmailIcon />,
      path: '/courier',
    },
    {
      id: 3,
      name: t(BTN_CONSULTING),
      icon: <HailIcon />,
      path: '/consulting',
    },
    {
      id: 4,
      name: t(BTN_HELPING_LIVES),
      icon: <HealingIcon />,
      path: '/helpingLives',
    },
    {
      id: 5,
      name: t(BTN_CONTACT_US),
      icon: <ContactMailIcon />,
      path: '/contactUs',
    },
  ];

  const CONFIG_TRANSLATION = [
    {
      id: '1',
      name: t(TEXT_FLAG_PT),
      source: Images.FLAGBRAZIL,
      translate: 'pt-BR',
    },
    {
      id: '2',
      name: t(TEXT_FLAG_EN),
      source: Images.FLAGUSA,
      translate: 'en-US',
    },
    {
      id: '3',
      name: t(TEXT_FLAG_ES),
      source: Images.FLAGSPAIN,
      translate: 'es-ES',
    },
  ];

  const CONFIG_LOGIN_REGISTER = [
    {
      id: '1',
      name: t(BTN_LOGIN),
      icon: <LoginIcon />,
      path: '/login',
    },
    {
      id: '2',
      name: t(BTN_REGISTER),
      icon: <HowToRegIcon />,
      path: '/register',
    },
  ];

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    handleDrawerOpen(!openDrawer);
  };

  const list = () => (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {CONFIG_MENU.map(({ id, name, icon, path }) => (
          <ListItem button key={id} onClick={() => navigate(path)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {CONFIG_LOGIN_REGISTER.map(({ id, name, icon, path }) => (
          <ListItem button key={id} onClick={() => navigate(path)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {CONFIG_TRANSLATION.map(({ id, name, source, translate }) => (
          <ListItem
            button
            key={id}
            onClick={() => {
              i18n.changeLanguage(translate);
              console.log(name);
            }}
          >
            <ListItemIcon>
              <img
                src={source}
                alt={'Bandeira de cada país para tradução'}
                className="image-flag"
              />
            </ListItemIcon>

            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

DrawerMain.propTypes = {
  handleDrawerOpen: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired,
};

const equal = (prevProps, nextProps) => {
  console.log(prevProps);
  if (nextProps.openDrawer !== prevProps.openDrawer) {
    return false;
  }

  return true;
};

export default memo(DrawerMain, equal);
