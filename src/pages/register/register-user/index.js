/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility,
  VisibilityOff,
  ArrowLeft as ArrowLeftIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

import LoadingButton from '@mui/lab/LoadingButton';

import { Images, Colors } from '../../../contants';
import { Divider, ModalAddUser } from '../../../components';
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from 'react-redux';

import { RegisterUserRedux, setResetStatus } from '../../../redux/login.slice';

import {
  LABEL_REGISTER,
  LABEL_COMPANY,
  LABEL_NAME,
  LABEL_EMAIL,
  LABEL_PHONE,
  ADD_MORE_USERS,
  LABEL_ADRESS,
  LABEL_ZIPCODE,
  LABEL_CITY,
  LABEL_STATE,
  LABEL_COUNTRY,
  LABEL_PASSWORD_REGISTER,
  LABEL_CONFIRM_PASSWORD,
  BTN_REGISTER_REGISTER,
  BTN_BACK_REGISTER,
  REGISTER_MSG_EMPTY_FIELDS,
  REGISTER_MSG_PASSWORD_NOT_MATCH,
  REGISTER_MSG_USER_REGISTERED_SUCCESS,
  REGISTER_MSG_USER_REGISTERED_ERROR,
} from '../../../config/ConfigDefault';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.primary.AZUL,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  backgroundImg: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    '& img': {
      width: '60%',
      filter: 'opacity(0.1) drop-shadow(0 0 0 gray)',
    },
  },
  card: {
    width: '1097px',
    height: '627px',
    backgroundColor: theme.palette.primary.CINZA00,
    padding: theme.spacing(4),
    borderRadius: '42px',
    boxShadow: '0px 13px 17px rgba(148, 148, 148, 0.25)',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
    },
  },
  title: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
    },
  },
  containerInput: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: theme.spacing(2) + ' !important',
  },
  inputColors: {
    '& label.Mui-focused': {
      color: theme.palette.primary.GOLD,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.GOLD,
      },
    },
  },
  containerPhone: {
    marginBottom: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('sm')]: {
      display: 'flex' + ' !important',
      flexDirection: 'column' + ' !important',
    },
  },
  phone: {
    width: '70%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  btnAddMore: {
    backgroundColor: theme.palette.primary.CINZA40 + ' !important',
    width: `calc(30% - ${theme.spacing(2)})` + ' !important',
    color: theme.palette.primary.BRANCO + ' !important',
    '&:hover': {
      backgroundColor: theme.palette.primary.GOLD + ' !important',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
    },
  },
  containerAddress: {
    marginBottom: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('sm')]: {
      display: 'flex' + ' !important',
      flexDirection: 'column' + ' !important',
    },
  },
  address: {
    width: '70%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  zipCode: {
    width: `calc(30% - ${theme.spacing(2)})` + ' !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
    },
  },
  containerCity: {
    marginBottom: theme.spacing(12) + ' !important',
    [theme.breakpoints.down('sm')]: {
      display: 'flex' + ' !important',
      flexDirection: 'column' + ' !important',
      marginBottom: theme.spacing(6) + ' !important',
    },
  },
  city: {
    width: '34%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  state: {
    width: '34.5%',
    marginRight: theme.spacing(2) + '!important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  country: {
    width: `calc(31.5% - ${theme.spacing(4)})` + ' !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
    },
  },
  containerPassword: {
    marginBottom: theme.spacing(1) + ' !important',
    [theme.breakpoints.down('sm')]: {
      display: 'flex' + ' !important',
      flexDirection: 'column' + ' !important',
    },
  },
  password: {
    width: '34%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  confirmPassword: {
    width: '34.5%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  registerBtn: {
    width: `calc(31.5% - ${theme.spacing(4)})` + ' !important',
    backgroundColor: theme.palette.primary.AMARELO + ' !important',
    color: theme.palette.primary.BRANCO + ' !important',
    [theme.breakpoints.down('sm')]: {
      width: '100%' + ' !important',
    },
  },
  btnBack: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.primary.CINZA80 + ' !important',
    fontSize: '8px',
    lineHeight: '9px',
    marginTop: theme.spacing(2),
  },
}));

const RegisterUser = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, SetShowConfirmPassword] = useState(false);
  const [openModalAddUser, SetOpenModalAddUser] = useState(false);

  const resultRedux = useSelector(function(state) {
    return state.login
  });

  const [openMsg, setOpenMsg] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    msg: '',
    type: 'success',
  });
  const { vertical, horizontal, open, msg, type } = openMsg;

  const handleCloseMsg = () => {
    setOpenMsg({ ...openMsg, open: false });
  };

  const handleOpenModalAddUser = (valor) => {
    SetOpenModalAddUser(valor);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    SetShowConfirmPassword(!showConfirmPassword);
  };

  const VerifyEmptyFields = () => {
    if (name === '' || password === '' || confirmPassword === '' || email === '') {
      setOpenMsg({ ...openMsg, open: true, msg: t(REGISTER_MSG_EMPTY_FIELDS), type: 'error' });
      return true;
    }
    return false;
  };

  const VerifyPassword = () => {
    if (password !== confirmPassword) {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: t(REGISTER_MSG_PASSWORD_NOT_MATCH),
        type: 'error',
      });
      return true;
    }
    return false;
  };

  const handleRegisterUser = (event) => {
    event.preventDefault();
    VerifyEmptyFields();
    VerifyPassword();

    if (VerifyEmptyFields() === false && VerifyPassword() === false) {
      dispatch(
        RegisterUserRedux({
          name,
          email,
          password,
          type: 'user',
        }),
      );
    }
  };

  useEffect(() => {
    if (resultRedux.status === 'success') {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: t(REGISTER_MSG_USER_REGISTERED_SUCCESS),
        type: 'success',
      });

      setName('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        dispatch(setResetStatus());
      }, 5000);
    }

    if (resultRedux.status === 'failed') {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: t(REGISTER_MSG_USER_REGISTERED_ERROR),
        type: 'error',
      });
      setTimeout(() => {
        dispatch(setResetStatus());
      }, 5000);
    }
  }, [resultRedux.status]);

  return (
    <div className={classes.container}>
      <div className={classes.backgroundImg}>
        <img src={Images.GZUZLOGOBRANCOGRANDE} alt="registerUser" />
      </div>
      <div className={classes.card}>
        <div className={classes.title}>
          <Divider textAlign="left" colorDivider={Colors.AZUL}>
            <Typography className={classes.titleFont} variant="h6">
              {t(LABEL_REGISTER)}
            </Typography>
          </Divider>
        </div>
        <div className={classes.containerInput}>
          <TextField
            className={`${classes.input} ${classes.inputColors}`}
            label={t(LABEL_COMPANY)}
            type="text"
            size="small"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
          <TextField
            className={`${classes.input} ${classes.inputColors}`}
            label={t(LABEL_NAME)}
            type="text"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={name === ''}
          />
          <TextField
            className={`${classes.input} ${classes.inputColors}`}
            label={t(LABEL_EMAIL)}
            type="text"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={classes.containerPhone}>
            <TextField
              className={`${classes.phone} ${classes.inputColors}`}
              label={t(LABEL_PHONE)}
              type="number"
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              className={classes.btnAddMore}
              startIcon={<AddIcon />}
              onClick={() => handleOpenModalAddUser(true)}
            >
              {t(ADD_MORE_USERS)}
            </Button>
          </div>
          <div className={classes.containerAddress}>
            <TextField
              className={`${classes.address} ${classes.inputColors}`}
              label={t(LABEL_ADRESS)}
              type="text"
              size="small"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <TextField
              className={`${classes.zipCode} ${classes.inputColors}`}
              label={t(LABEL_ZIPCODE)}
              type="number"
              size="small"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className={classes.containerCity}>
            <TextField
              className={`${classes.city} ${classes.inputColors}`}
              label={t(LABEL_CITY)}
              type="text"
              size="small"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <TextField
              className={`${classes.state} ${classes.inputColors}`}
              label={t(LABEL_STATE)}
              type="text"
              size="small"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />

            <TextField
              className={`${classes.country} ${classes.inputColors}`}
              label={t(LABEL_COUNTRY)}
              type="text"
              size="small"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className={classes.containerPassword}>
            <TextField
              size="small"
              className={`${classes.password} ${classes.inputColors}`}
              label={t(LABEL_PASSWORD_REGISTER)}
              placeholder={t(LABEL_PASSWORD_REGISTER)}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={password === ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              className={`${classes.confirmPassword} ${classes.inputColors}`}
              id="confirm-password"
              size="small"
              label={t(LABEL_CONFIRM_PASSWORD)}
              placeholder={t(LABEL_CONFIRM_PASSWORD)}
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPassword === ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <LoadingButton
              loading={resultRedux.status === 'loading'}
              loadingPosition="end"
              endIcon={<SaveIcon />}
              className={classes.registerBtn}
              onClick={handleRegisterUser}
            >
              {t(BTN_REGISTER_REGISTER)}
            </LoadingButton>
          </div>
        </div>

        <NavLink to="/register" className={classes.btnBack}>
          <ArrowLeftIcon />
          {t(BTN_BACK_REGISTER)}
        </NavLink>
      </div>
      <ModalAddUser
        openModalAddUser={openModalAddUser}
        handleOpenModalAddUser={handleOpenModalAddUser}
      />

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseMsg}
      >
        <Alert onClose={handleCloseMsg} severity={type} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterUser;
