/* eslint-disable object-curly-newline */
import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Modal,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert
} from '@mui/material';
import { Close as CloseIcon, Send as SendIcon } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  TITLE_CANCEL_ORDER,
  MSG_CANCEL,
  BTN_AWARE,
  TITLE_ORDER_CANCELED,
  MSG_ORDER_CANCELED,
  MSG_OPTIONAL_CAR,
  MSG_OPTIONAL_DRIVER,
  MSG_OPTIONAL_PLACE,
  MSG_OPTIONAL_DATES,
  MSG_OPTIONAL_RUDE,
  MSG_OPTIONAL_OTHER,
  BTN_SEND
} from '../../config/ConfigDefault';
import {
  resetReducerCancelOrder
} from '../../redux/createOrder.slice';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.CINZA00,
    borderRadius: '8px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    boxShadow: '0px 5px 7px 0px rgba(116, 116, 116, 0.25)',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    [theme.breakpoints.down('md')]: {
      width: '90%'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: '90%'
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: theme.palette.primary.AMARELO,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    '& label': {
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: '500',
      color: '#000000'
    },
    '& :nth-child(2)': {
      cursor: 'pointer'
    }
  },
  content: {
    padding: '10px',
    '& .title': {
      color: theme.palette.primary.CINZA80,
      fontSize: '16px',
      lineHeight: '19px',
      marginBottom: '10px'
    },
    '& .radio': {
      color: theme.palette.primary.CINZA80,
      marginBottom: '10px'
    },
    '& .send': {
      // padding: '10px',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& button': {
        backgroundColor: theme.palette.primary.AZUL,
        color: theme.palette.primary.BRANCO
      }
    },
    [theme.breakpoints.down('sm')]: {
      '& .title': {
        fontSize: '13px'
      },
      '& .send': {
        // padding: '10px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        '& button': {
          backgroundColor: theme.palette.primary.AZUL,
          color: theme.palette.primary.BRANCO
        }
      }
    }
  },
  aware: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px',
    '& button': {
      backgroundColor: '#EA6766'
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      width: '100%' + '!important',
      '& button': {
        fontSize: '7px'
      }
    },
    [theme.breakpoints.between('sm', 'md')]: {
      flexDirection: 'column',
      width: '100%' + '!important',
      '& button': {
        fontSize: '13px'
      }
    }
  }
}));

const ModalCancelOrder = ({ modalCancelOrder, handleCancelOffer, usuarioId, ordemId }) => {
  const [cancel, setCancel] = useState(false);

  const [value, setValue] = React.useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();
  const resultRedux = useSelector(function (state) {
    return state.login
  })
  const dispatch = useDispatch();

  const [openMsg, setOpenMsg] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    msg: '',
    type: 'success'
  });
  const { vertical, horizontal, open, msg, type } = openMsg;

  const handleCloseMsg = () => {
    setOpenMsg({ ...openMsg, open: false });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    handleCancelOffer(false);
    setCancel(false);
    navigate('/homeUsers');
  };

  const SendCancelOrder = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (resultRedux.statusCancelOrder === 'success') {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: 'cancelado com sucesso',
        type: 'success'
      });
      setTimeout(() => {
        dispatch(resetReducerCancelOrder());
        handleCancelOffer(false);
      }, 2000);
    }

    if (resultRedux.statusCancelOrder === 'failed') {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: 'erro ao cancelar',
        type: 'error'
      });
    }
  }, [resultRedux.statusCancelOrder]);

  return (
    <div>
      <Modal
        open={modalCancelOrder}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.container}>
          <div className={classes.header}>
            <label>{t(TITLE_CANCEL_ORDER)}</label>
            <div onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>
          {!cancel ? (
            <>
              <div className={classes.content}>
                <div className="title">{t(MSG_CANCEL)}</div>
              </div>

              <div className={classes.aware}>
                <Button variant="contained" onClick={() => setCancel(true)}>
                  {t(BTN_AWARE)}
                </Button>
              </div>
            </>
          ) : (
            <div className={classes.content}>
              <div className="title">{t(TITLE_ORDER_CANCELED)}</div>
              <div className="title">{t(MSG_ORDER_CANCELED)}</div>
              <div className="radio">
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="car" control={<Radio />} label={t(MSG_OPTIONAL_CAR)} />
                    <FormControlLabel
                      value="driver"
                      control={<Radio />}
                      label={t(MSG_OPTIONAL_DRIVER)}
                    />
                    <FormControlLabel
                      value="place"
                      control={<Radio />}
                      label={t(MSG_OPTIONAL_PLACE)}
                    />
                    <FormControlLabel
                      value="dates"
                      control={<Radio />}
                      label={t(MSG_OPTIONAL_DATES)}
                    />
                    <FormControlLabel
                      value="rude"
                      control={<Radio />}
                      label={t(MSG_OPTIONAL_RUDE)}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label={t(MSG_OPTIONAL_OTHER)}
                    />
                  </RadioGroup>
                </FormControl>
              </div>

              {value !== '' && (
                <div className="send">
                  <LoadingButton
                    loading={resultRedux.statusCancelOrder === 'loading'}
                    loadingPosition="start"
                    startIcon={<SendIcon />}
                    variant="outlined"
                    className="btn"
                    onClick={SendCancelOrder}
                  >
                    {t(BTN_SEND)}
                  </LoadingButton>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

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

ModalCancelOrder.propTypes = {
  modalCancelOrder: PropTypes.bool.isRequired,
  handleCancelOffer: PropTypes.func.isRequired,
  ordemId: PropTypes.string.isRequired,
  usuarioId: PropTypes.number.isRequired
};

const equal = (prevProps, nextProps) => {
  if (
    nextProps.modalCancelOrder !== prevProps.modalCancelOrder ||
    nextProps.ordemId !== prevProps.ordemId ||
    nextProps.usuarioId !== prevProps.usuarioId
  ) {
    return false;
  }

  return true;
};

export default memo(ModalCancelOrder, equal);
