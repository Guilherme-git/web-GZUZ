/* eslint-disable object-curly-newline */

import React, { memo, useState } from 'react';
import { Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Images } from '../../contants';
import {
  TITLE_NEW_OFFER,
  MSG_WILL_CHANGE,
  MSG_FOR_SERVICE,
  BTN_ACCEPT_OFFER,
  BTN_CANCEL_OFFER,
  MODAL_NEW_OFFER_LABEL_PICKUP,
  MODAL_NEW_OFFER_LABEL_DROPOFF,
} from '../../config/ConfigDefault';
import { ModalShowImages } from '../../components';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.CINZA00,
    borderRadius: '8px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: '0px 5px 7px 0px rgba(116, 116, 116, 0.25)',
    width: '687px',
    height: '338px',

    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '338px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '90%',
      height: '338px',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: theme.palette.primary.AZUL,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    color: theme.palette.primary.BRANCO,
    '& label': {
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: '500',
    },
    '& :nth-child(2)': {
      cursor: 'pointer',
    },
  },
  content: {
    padding: '10px',
    '& .title': {
      color: theme.palette.primary.CINZA80,
      fontSize: '16px',
      lineHeight: '19px',
      marginBottom: '10px',
      '& span': {
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    '& .main': {
      display: 'flex',
      position: 'relative',
      padding: '10px',
      marginBottom: '30px',
      '& .image': {
        marginRight: '100px',

        '& img': {
          position: 'absolute',
        },
        '& img:nth-child(1)': {
          transform: 'rotate(20deg)',
        },
      },
      '& .text': {
        '& .horizontal': {
          '& label': {
            fontWeight: 'normal',
            fontSize: '16px',
            lineHeight: '19px',
            color: theme.palette.primary.AMARELO,
            marginRight: '10px',
          },
          '& span': {
            fontWeight: 'normal',
            fontSize: '16px',
            lineHeight: '19px',
            color: theme.palette.primary.CINZA60,
          },
        },
        '& p': {
          marginTop: '10px',
          fontWeight: 'normal',
          fontSize: '16px',
          lineHeight: '19px',
          color: theme.palette.primary.CINZA60,
        },
      },
    },

    [theme.breakpoints.down('sm')]: {
      '& .title': {
        fontSize: '12px',
        '& span': {
          fontSize: '16px' + ' !important',
        },
      },
      '& .main': {
        marginBottom: '10px',
        '& .image': {
          marginRight: '70px' + ' !important',

          '& img': {
            width: '50px' + ' !important',
          },
        },
        '& .text': {
          '& .horizontal': {
            '& label': {
              fontSize: '12px' + ' !important',
              marginRight: '5px' + ' !important',
            },
            '& span': {
              fontSize: '12px' + ' !important',
            },
          },
          '& p': {
            fontSize: '12px' + ' !important',
          },
        },
      },
    },
  },
  btn: {
    padding: '10px',
    '& button:nth-child(1)': {
      backgroundColor: '#6ED949',
      marginRight: '20px',
    },
    '& button:nth-child(2)': {
      backgroundColor: '#EA6766',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      '& button:nth-child(1)': {
        fontSize: '10px',
      },
      '& button:nth-child(2)': {
        fontSize: '10px',
      },
    },
  },
}));

const ModalNewOffer = ({ handleOpenOffer, modalOffer }) => {
  const [modalShowImages, setModalShowImages] = useState(false);
  const handleClose = () => handleOpenOffer(false);
  const { t } = useTranslation();
  const classes = useStyles();

  const handleModalShowImages = (valor) => {
    setModalShowImages(valor);
  };

  return (
    <div>
      <ModalShowImages
        modalShowImages={modalShowImages}
        handleModalShowImages={handleModalShowImages}
      />
      <Modal
        open={modalOffer}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.container}>
          <div className={classes.header}>
            <label>{t(TITLE_NEW_OFFER)}</label>
            <div onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>
          <div className={classes.content}>
            <div className="title">
              DRIVER1 {t(MSG_WILL_CHANGE)} <span>U$000,00</span> {t(MSG_FOR_SERVICE)}:
            </div>
            <div className="main">
              <div className="image" onClick={() => handleModalShowImages(true)}>
                <img src={Images.box} alt="box" />
                <img src={Images.box} alt="box" />
              </div>
              <div className="text">
                <div className="horizontal">
                  <label>{t(MODAL_NEW_OFFER_LABEL_PICKUP)}:</label>
                  <span>4194 Stoney Lane - Dallas TX </span>
                </div>
                <div className="horizontal">
                  <label>{t(MODAL_NEW_OFFER_LABEL_DROPOFF)}:</label>
                  <span>4194 Stoney Lane - Dallas TX </span>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a
                  consectetur lectus. Vivamus augue velit, dictum at malesuada et.
                </p>
              </div>
            </div>
          </div>

          <div className={classes.btn}>
            <Button variant="contained" onClick={handleClose}>
              {t(BTN_ACCEPT_OFFER)}
            </Button>
            <Button variant="contained" onClick={handleClose}>
              {t(BTN_CANCEL_OFFER)}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

ModalNewOffer.propTypes = {
  handleOpenOffer: PropTypes.func.isRequired,
  modalOffer: PropTypes.bool.isRequired,
};

const equal = (prevProps, nextProps) => {
  if (nextProps.modalOffer !== prevProps.modalOffer) {
    return false;
  }

  return true;
};

export default memo(ModalNewOffer, equal);
