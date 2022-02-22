/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from '@mui/material';
import { Typography } from '@mui/material';

import { PATH_HOME } from '../../config/ConfigDefault';
import './BasicBreadcrumbs.scss';

const BasicBreadcrumbs = ({ path }) => {
  const { t } = useTranslation();

  return (
    <div className="bread-crumbs">
      <NavLink underline="hover" color="inherit" to="/home/user">
        {t(PATH_HOME)}
      </NavLink>

      <h5>&gt;</h5>

      <h5>{path}</h5>

    </div>
  );
};

export default BasicBreadcrumbs;
