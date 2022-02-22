/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './Header/Header.scss';

import { Bandeiras } from '../';
import { Images } from '../../contants';
import { useTranslation } from 'react-i18next';

import {
  BTN_HOME,
  BTN_COURIER,
  BTN_CONSULTING,
  BTN_HELPING_LIVES,
  BTN_CONTACT_US,
} from '../../config/ConfigDefault';

const ButtonNav = () => {
  const { t } = useTranslation();

  const CONFIG = [
    {
      id: 1,
      name: t(BTN_HOME),
      nav: '/',
    },
    {
      id: 2,
      name: t(BTN_COURIER),
      nav: '/courier',
    },
    {
      id: 3,
      name: t(BTN_CONSULTING),
      nav: '/consulting',
    },
    {
      id: 4,
      name: t(BTN_HELPING_LIVES),
      nav: '/helpingLives',
    },
    {
      id: 5,
      name: t(BTN_CONTACT_US),
      nav: '/contactUs',
    },
  ];

  return (
    <nav>
      <div className="container-menu">
        <ul className="lista-menu">
          {CONFIG.map(({ nav, name, id }) => (
            <li key={id}>
              <NavLink to={nav}>{name}</NavLink>
            </li>
          ))}
        </ul>
        <Bandeiras />
      </div>
      <div className="image-logo">
        <NavLink to="/">
          <img
            src={Images.GZUZLOGOBRANCO}
            alt={'Bandeira de cada país para tradução'}
            className="logo"
          />
        </NavLink>
      </div>
    </nav>
  );
};

export default memo(ButtonNav);
