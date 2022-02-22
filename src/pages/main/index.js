import React from 'react';

import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { HeaderMain } from '../../components';
import Principal from '../../pages/principal';

export function Main () {
  const location = useLocation();
  return (
    <>
      <HeaderMain />
    
      {location.pathname === '/' ?
        <Principal />
        : <Outlet />
      }
    </>
  );
};