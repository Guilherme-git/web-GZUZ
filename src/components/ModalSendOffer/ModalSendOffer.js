/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { Box, Button, Modal, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Images } from '../../contants';
import {
  MODAL_SEND_OFFER_TITLE,
  MODAL_SEND_OFFER_LABEL_REQUESTED,
  MODAL_SEND_OFFER_LABEL_PICKUP,
  MODAL_SEND_OFFER_LABEL_DROPOFF,
  MODAL_SEND_OFFER_LABEL_CALCULATION,
  MODAL_SEND_OFFER_LABEL_TELL,
  MODAL_SEND_OFFER_LABEL_HOW_MUCH,
  MODAL_SEND_OFFER_LABEL_INPUT,
  MODAL_SEND_OFFER_BTN_SEND_OFFER,
} from '../../config/ConfigDefault';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    backgroundColor: theme.palette.primary.BRANCO,
    borderRadius: '10px',
    boxShadow: '0px 5px 7px rgba(116, 116, 116, 0.25)',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    outline: 'none',
    [theme.breakpoints.between('sm', 'md')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: '90%',
    },
  },
  sendOffer: {},
  header: {
    backgroundColor: theme.palette.primary.AZUL,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    color: theme.palette.primary.BRANCO,
    padding: '10px',
    fontSize: '16px',
    lineHeight: '19px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& :nth-child(2)': {
      cursor: 'pointer',
    },
  },
  title: {
    padding: '10px',
    color: theme.palette.primary.CINZA80,
    fontSize: '16px',

    '& span': {
      fontWeight: '500',
    },
    '& label': {
      fontWeight: 'normal',
    },
  },
  content: {
    padding: '20px',
    position: 'relative',
    display: 'flex',
    '& .image': {
      marginRight: '100px',
    },
    '& .image img': {
      position: 'absolute',
    },
    '& .image img:nth-child(1)': {
      transform: 'rotate(20deg)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
  details: {
    display: 'flex',
    marginBottom: '10px',
    '& label': {
      fontWeight: 'normal',
      color: theme.palette.primary.AMARELO,
      marginRight: '10px',
      fontSize: '16px',
    },
    '& span': {
      fontWeight: 'normal',
      color: theme.palette.primary.CINZA60,
      marginRight: '10px',
      fontSize: '16px',
    },
    '& p': {
      fontWeight: 'normal',
      color: theme.palette.primary.CINZA60,
      marginRight: '10px',
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '5px',
      '& label': {
        marginRight: '5px',
        fontSize: '9px',
      },
      '& span': {
        marginRight: '5px',
        fontSize: '11px',
      },
      '& p': {
        marginRight: '10px',
        fontSize: '11px',
      },
    },
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    color: theme.palette.primary.CINZA80,

    '& label:nth-child(1)': {
      fontWeight: '500',
      marginBottom: '10px',
    },
    '& label:nth-child(2)': {
      fontWeight: 'normal',
      marginBottom: '10px',
    },
    '& span:nth-child(1)': {
      fontWeight: '500',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
  btnOffer: {
    display: 'flex',
    alignItems: 'center',
    '& .input': {
      width: '60%',
      marginRight: '50px',
    },
    '& button': {
      backgroundColor: '#6ED949',
      fontSize: '13px',
      fontWeight: '500',
    },
    [theme.breakpoints.down('sm')]: {
      '& .input': {
        width: '60%',
        marginRight: '10px',
      },
      '& button': {
        fontSize: '11px',
      },
    },
  },
}));

const ModalSendOffer = ({ openSendOffer, handleOpenSendOffer }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const handleClose = () => handleOpenSendOffer(false);

  return (
    <>
      <Modal
        open={openSendOffer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.container}>
          <div className={classes.sendOffer}>
            <div className={classes.header}>
              <label>{t(MODAL_SEND_OFFER_TITLE)}</label>
              <CloseIcon onClick={handleClose} />
            </div>
            <div className={classes.title}>
              <span>USUÁRIO1 </span>
              <label>{t(MODAL_SEND_OFFER_LABEL_REQUESTED)}</label>
            </div>
            <div className={classes.content}>
              <div className="image">
                <img src={Images.box} alt="box" />
                <img src={Images.box} alt="box" />
                <img src={Images.box} alt="box" />
              </div>
              <div className={classes.pickup}>
                <div className={classes.details}>
                  <label>{t(MODAL_SEND_OFFER_LABEL_PICKUP)}:</label>
                  <span>4194 Stoney Lane - Dallas TX</span>
                </div>
                <div className={classes.details}>
                  <label>{t(MODAL_SEND_OFFER_LABEL_DROPOFF)}:</label>
                  <span>2483 Zappia Drive - Winchester KY</span>
                </div>
                <div className={classes.details}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a
                    consectetur lectus. Vivamus augue velit, dictum at malesuada et.
                  </p>
                </div>
              </div>
            </div>
            <div className={classes.footer}>
              <label>{t(MODAL_SEND_OFFER_LABEL_CALCULATION)} U$000,00.</label>
              <label>
                {t(MODAL_SEND_OFFER_LABEL_TELL)} <span>USUÁRIO1</span>{' '}
                {t(MODAL_SEND_OFFER_LABEL_HOW_MUCH)}
              </label>
              <div className={classes.btnOffer}>
                <TextField
                  size="small"
                  className="input"
                  label={t(MODAL_SEND_OFFER_LABEL_INPUT)}
                  variant="standard"
                  type="number"
                />
                <Button variant="contained">{t(MODAL_SEND_OFFER_BTN_SEND_OFFER)}</Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

ModalSendOffer.propTypes = {
  openSendOffer: PropTypes.bool.isRequired,
  handleOpenSendOffer: PropTypes.func.isRequired,
};

const equal = (prevProps, nextProps) => {
  if (nextProps.openSendOffer !== prevProps.openSendOffer) {
    return false;
  }

  return true;
};

export default memo(ModalSendOffer, equal);
