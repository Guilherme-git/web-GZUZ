import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next';
import Images from './../../contants/Images';
import { useSelector, useDispatch } from 'react-redux';
import {LoginRedux, setResetStatus} from '../../redux/login.slice'

import {
  LABEL_PASSWORD,
  FORGOT_PASSWORD,
  BTN_ENTER,
  BTN_BACK,
  LOGIN_MSG_ERROR
} from './../../config/ConfigDefault';

import {
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

import {
  Visibility,
  VisibilityOff,
  ArrowRight,
  ArrowLeft,
  Login as LoginIcon
} from '@mui/icons-material';

import LoadingButton from '@mui/lab/LoadingButton';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${Images.HOME_HEADER})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: theme.palette.primary.BRANCO,
    borderRadius: '29px',
    boxShadow: '5px 5px 6px rgba(194, 194, 194, 0.25)',
    padding: theme.spacing(4),
    width: '496px',
    height: '496px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '60%'
    }
  },
  items: {
    marginBottom: theme.spacing(3) + ' !important'
  },
  image: {
    width: '151px',
    height: '70px',
    cursor: 'pointer'
  },
  containerInput: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    textTransform: 'capitalize',
    '& .MuiFormLabel-root': {
      color: theme.palette.primary.GOLD
    },
    '& label.Mui-focused': {
      color: theme.palette.primary.GOLD
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.GOLD
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.GOLD
      }
    }
  },
  forgotPassword: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.primary.CINZA80,
    fontSize: '11px',
    lineheight: '9px',
    '&:hover': {
      color: theme.palette.primary.GOLD
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    }
  },
  containerBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  btnLogin: {
    backgroundColor: theme.palette.primary.GOLD + ' !important',
    color: theme.palette.primary.BRANCO + ' !important',
    padding: theme.spacing(1, 2) + ' !important',
    '&:hover': {
      backgroundColor: theme.palette.primary.GOLD,
      opacity: 0.9
    }
  },
  btnBack: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '8px',
    lineheight: '9px',
    textDecoration: 'none',
    color: theme.palette.primary.CINZA80,
    margin: theme.spacing(3, 0)
  }
}));

const Login = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { status } = useState();
  const dispatch = useDispatch();
  const resultRedux = useSelector(function (state) {
    return state.login
  });

  const [openMsg, setOpenMsg] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    msg: '',
    type: 'success'
  });
  const { vertical, horizontal, open, msg, type } = openMsg;

  const ReturnMainPage = () => {
    navigate('/');
  };
  const handleCloseMsg = () => {
    setOpenMsg({ ...openMsg, open: false });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(
      LoginRedux({
        email,
        password
      })
      )
  };

  useEffect(() => {
    if (resultRedux.status === 'success') {
      dispatch(setResetStatus())
      if(resultRedux.user.type === 'user') {
        navigate('/home/user')
      } else {
        navigate('/home/driver')
      }
    }
    if (resultRedux.status === 'failed') {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: t(LOGIN_MSG_ERROR),
        type: 'error'
      });
      setTimeout(() => {
        dispatch(setResetStatus());
      }, 5000);
    }
  },[resultRedux.status])


  return (

    <div className={classes.container}>
      <div className={classes.card}>
        <img
          className={classes.image}
          src={Images.GZUZLOGOPRETO}
          alt="Logo GZUZ"
          onClick={ReturnMainPage}
        />

        <div className={classes.items}>
          <Divider />
        </div>

    {resultRedux.status}

        <div className={classes.containerInput}>
         
          <TextField
            className={classes.input}
            label="Email"
            sx={{ mb: 2 }}
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            className={classes.input}
            label={t(LABEL_PASSWORD)}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <NavLink to="/forgotPassword" className={classes.forgotPassword}>
            <Typography variant="body">{t(FORGOT_PASSWORD)}</Typography>

            <ArrowRight className="login-forgot-icon" />
          </NavLink>
        </div>

        <div className={classes.containerBtn}>
          <LoadingButton
            loading={resultRedux.status === 'loading'}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            className={classes.btnLogin}
            onClick={handleLogin}
          >
            {t(BTN_ENTER)}
          </LoadingButton>

          <NavLink to="/" className={classes.btnBack}>
            <ArrowLeft className="login-back icon" />
            {t(BTN_BACK)}
          </NavLink>
        </div>
      </div>
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
    </div >
  )
}

export default Login