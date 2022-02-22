import React from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BTN_BACK, BTN_DRIVER, BTN_USER } from '../../config/ConfigDefault';
import { Images } from '../../contants';
// import './Register.scss';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        width: '100%',
        backgroundImage: `url(${Images.HOME_HEADER})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: theme.palette.primary.CINZA00,
        borderRadius: '29px',
        boxShadow: '5px 5px 6px rgba(194, 194, 194, 0.25)',
        padding: theme.spacing(4),
        width: '496px',
        height: '376px',
        [theme.breakpoints.down('sm')]: {
            width: '90%' + ' !important',
        },
    },
    containerImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            width: '201px',
            height: '93px',
        },
    },
    items: {
        marginBottom: theme.spacing(2),
    },
    containerBtn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& button': {
            margin: theme.spacing(2, 2),
            backgroundColor: theme.palette.primary.AMARELO,
            color: theme.palette.primary.BRANCO,
            width: '290px',
        },
        [theme.breakpoints.down('sm')]: {
            '& button': {
                margin: theme.spacing(2, 0),
                width: '80%',
            },
        },
    },
    btnBack: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(4),
        color: theme.palette.primary.CINZA80,
        textDecoration: 'none',
        fontSize: '8px',
        lineHeight: '9px',
    },
}));

export default () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const classes = useStyles();

    const ReturnMainPage = () => {
        navigate('/');
      };

      return (
        <div className={classes.container}>
          <div className={classes.card}>
            <div className={classes.containerImg}>
              <img src={Images.GZUZLOGOPRETO} alt="Logo GZUZ" onClick={ReturnMainPage} />
            </div>
            <div className={classes.items}>
              <Divider />
            </div>
            <div className={classes.containerBtn}>
              <Button variant="contained" onClick={() => navigate('/register/driver')}>
                {t(BTN_DRIVER)}
              </Button>
              <Button variant="contained" onClick={() => navigate('/register/user')}>
                {t(BTN_USER)}
              </Button>
            </div>
    
            <NavLink to="/" className={classes.btnBack}>
              <ArrowLeftIcon className="register-back icon" />
              {t(BTN_BACK)}
            </NavLink>
          </div>
        </div>
      );
}