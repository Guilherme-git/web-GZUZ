/* eslint-disable object-curly-newline */

import React, { memo, useState } from 'react';
import { Box, Button, Modal, TextField, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

import { Images } from '../../../contants';
import { Alert, Snackbar } from '@mui/material';
import {
  MODAL_NEW_COMPANY_TITLE,
  MODAL_NEW_COMPANY_LABEL_CAMPANY_NAME,
  MODAL_NEW_COMPANY_LABEL_EIN,
  MODAL_NEW_COMPANY_LABEL_ADDRESS,
  MODAL_NEW_COMPANY_BTN_ENTER,
  MODAL_NEW_COMPANY_MSG_SUCCESS,
} from '../../../config/ConfigDefault';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '495px',
    height: '401px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding: '20px',
    '& button': {
      marginTop: '5px',
      backgroundColor: theme.palette.primary.CINZA40,
      '&:hover': {
        backgroundColor: theme.palette.primary.AMARELO + ' !important',
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%' + ' !important',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& img': {
      width: '143px',
      height: '66px',
    },
    '& :nth-child(2)': {
      cursor: 'pointer',
    },
  },
  divider: {
    margin: '10px 0' + ' !important',
  },
  tittle: {
    '& label': {
      fonsize: '16px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      color: theme.palette.primary.CINZA80,
    },
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0',
    '& :nth-child(1)': {
      marginBottom: '5px',
    },
    '& :nth-child(2)': {
      marginBottom: '5px',
    },
  },
}));

const ModalRegisterCompany = ({ openModaladdcompany, handleModalAddCompany, handleAddCompany }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleClose = () => handleModalAddCompany(false);

  const [companyName, setCompanyName] = useState('');
  const [ein, setEin] = useState('');
  const [adress, setAdress] = useState('');

  const [openMsg, setOpenMsg] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = openMsg;

  const handleCloseMsg = () => {
    setOpenMsg({ ...openMsg, open: false });
  };

  const verifyEmptyFields = () => {
    if (companyName === '' || ein === '' || adress === '') {
      return true;
    }
    return false;
  };

  const handleChangeCompanyName = (event) => {
    event.preventDefault();

    handleAddCompany({
      value: companyName,
      label: companyName,
      address: adress,
      ein: ein,
    });
    setCompanyName('');
    setEin('');
    setAdress('');
    setOpenMsg({ ...openMsg, open: true });
    handleClose();
  };

  return (
    <>
      <Modal
        open={openModaladdcompany}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.container}>
          <div className={classes.header}>
            <img src={Images.GZUZLOGOPRETO} alt="" />
            <div onClick={() => handleClose(false)}>
              <CloseIcon />
            </div>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.tittle}>
            <label>{t(MODAL_NEW_COMPANY_TITLE)}</label>
          </div>
          <div className={classes.inputs}>
            <TextField
              label={t(MODAL_NEW_COMPANY_LABEL_CAMPANY_NAME)}
              variant="standard"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              label={t(MODAL_NEW_COMPANY_LABEL_EIN)}
              variant="standard"
              value={ein}
              onChange={(e) => setEin(e.target.value)}
            />
            <TextField
              label={t(MODAL_NEW_COMPANY_LABEL_ADDRESS)}
              variant="standard"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
          </div>
          <Button
            disabled={verifyEmptyFields()}
            variant="contained"
            onClick={handleChangeCompanyName}
          >
            {t(MODAL_NEW_COMPANY_BTN_ENTER)}
          </Button>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseMsg}
      >
        <Alert onClose={handleCloseMsg} severity="success" sx={{ width: '100%' }}>
          {t(MODAL_NEW_COMPANY_MSG_SUCCESS)}
        </Alert>
      </Snackbar>
    </>
  );
};

ModalRegisterCompany.propTypes = {
  openModaladdcompany: PropTypes.bool.isRequired,
  handleModalAddCompany: PropTypes.func.isRequired,
  handleAddCompany: PropTypes.func.isRequired,
};

const equal = (prevProps, nextProps) => {
  if (nextProps.openModaladdcompany !== prevProps.openModaladdcompany) {
    return false;
  }

  return true;
};

export default memo(ModalRegisterCompany, equal);
