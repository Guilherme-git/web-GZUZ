import React, { memo } from 'react';
import './Header.scss';

import { Nav } from '../../';
import { NavLink } from 'react-router-dom';
import HeaderMobile from './HeaderMobile';
import { useTranslation } from 'react-i18next';

import { BTN_LOGIN, BTN_REGISTER } from '../../../config/ConfigDefault';

const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <div className="container-mobile">
        <HeaderMobile />
      </div>
      <div className="container-desktop">
        <Nav /> 
        <div className="header-botton">
          <ul>
            <li>
              <NavLink to="/login">{t(BTN_LOGIN)}</NavLink>
            </li>
            <li>
              <NavLink to="/register">{t(BTN_REGISTER)}</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
