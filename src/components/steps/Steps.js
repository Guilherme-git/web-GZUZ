import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { setPath } from './../../redux/createOrder.slice';

import {
  STEP_PICKUP_DETAILS,
  STEP_DELIVERY_DETAILS,
  STEP_ORDERS_DETAILS,
  STEP_CONFIRMATION,
} from '../../config/ConfigDefault';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    marginBottom: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'aboslute',
    zIndex: '9999',
    '& ul': {
      display: 'flex',
      listStyle: 'none',
      justifyContent: 'space-between',
    },
  },
  list: {
    marginRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '236px',
    height: '46px',
    borderRadius: '20px',

    textDecoration: 'none',
    textTransform: 'uppercase',
    color: theme.palette.primary.BRANCO,

    [theme.breakpoints.down('sm')]: {
      width: '80px',
      height: '20px',
      borderRadius: '5px',
      fontSize: '6px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '150px',
      height: '40px',
      borderRadius: '20px',
      fontSize: '10px',
    },
  },

  enable: {
    backgroundColor: theme.palette.primary.AZUL,
    cursor: 'pointer',
  },
  disable: {
    backgroundColor: theme.palette.primary.CINZA30,
    cursor: 'not-allowed',
  },
  active: {
    backgroundColor: theme.palette.primary.AMARELO,
    cursor: 'pointer',
  },
}));

const Steps = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const resultRedux = useSelector(function (state) {
    return state.order
  });

  const CONFIG_STEPS = [
    {
      id: 1,
      title: t(STEP_PICKUP_DETAILS),
      to: '/home/user/ordem/create',
      active: resultRedux.pickupDetails.enable
    },
    {
      id: 2,
      title: t(STEP_DELIVERY_DETAILS),
      to: '/home/user/ordem/create/delivery-details',
      active: resultRedux.deliveryDetails.enable
    },
    {
      id: 3,
      title: t(STEP_ORDERS_DETAILS),
      to: '/home/user/ordem/create/ordem-details',
      active: resultRedux.orderDetails.enable
    },
    {
      id: 4,
      title: t(STEP_CONFIRMATION),
      to: '/home/user/ordem/create/confirmation',
      active: resultRedux.confirmation.enable
    },
  ];

  const verifyActive = (to) => {
    dispatch(setPath(to))
  };

  return (
    <div className={classes.container}>
      <ul>
        {CONFIG_STEPS.map(({ id, title, to, active }) =>
          active ? (
            <li
              value={id}
              key={id}
              className={`${classes.list}  ${resultRedux.pathActive === to ? classes.active : classes.enable }`}
              onClick={(event) => verifyActive(to)}
            >
              {title}
            </li>
          ) : (
            <li key={id} className={`${classes.list}  ${classes.disable}`}>
              {title}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Steps;
