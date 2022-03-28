/* eslint-disable object-curly-newline */

import React, { memo, useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, Divider, Alert, Snackbar, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

import { Images } from '../../../contants';

import {
  MODAL_ADD_USER_TITLE,
  MODAL_ADD_USER_LABEL_NAME,
  MODAL_ADD_USER_LABEL_EMAIL,
  MODAL_ADD_USER_LABEL_PHONE,
  MODAL_ADD_USER_BTN_ADD,
  MODAL_ADD_USER_LABEL_USER,
  MODAL_ADD_USER_LABEL,
  MODAL_ADD_USER_BTN_EDIT_LIST,
  MODAL_ADD_USER_LABEL_USER_ADDED,
} from '../../../config/ConfigDefault';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '728px',
    height: '551px',
    borderRadius: '10px',
    backgroundColor: theme.palette.primary.BRANCO,
    padding: '20px',
    fontFamily: 'Roboto',

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
    margin: '20px 0' + ' !important',
  },
  tittle: {
    '& label': {
      fonsize: '16px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      color: theme.palette.primary.AZUL,
      fontWeight: 'bold',
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
  addBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& button': {
      marginTop: '5px',
      backgroundColor: theme.palette.primary.AMARELO + ' !important',
      fontWeight: '500',
      fontSize: '13px',
      lineHeight: '22px',
      '&:hover': {
        backgroundColor: theme.palette.primary.AZUL + ' !important',
      },
    },
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    '& label': {
      fontSize: '16px',
      fontWeight: 'bold',
      lineHeight: '19px',
      color: theme.palette.primary.AZUL,
    },
  },
  editList: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    '& :nth-child(1)': {
      width: '500px',
    },
    '& button': {
      backgroundColor: theme.palette.primary.AMARELO + ' !important',
      width: '120px',
      fontWeight: '500',
      fontSize: '13px',
      lineHeight: '22px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      '& :nth-child(1)': {
        width: '150px',
      },
      '& button': {
        width: '100px',
        fontSize: '10px',
      },
    },
  },
}));

const ModalAddUser = ({ openModalAddUser, handleOpenModalAddUser, setUsersProps }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [indexSelected, setIndexSelected] = useState('')

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleClose = () => handleOpenModalAddUser(false);

  const [openMsg, setOpenMsg] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = openMsg;

  const verifyEmptyFields = () => {
    if (name === '' || email === '' || phone === '' || indexSelected !== '') {
      return true;
    }
    return false;
  };

  const verifyIndex = () => {
    if (indexSelected === '') {
      return true;
    }
    return false;
  };

  const handleCloseMsg = () => {
    setOpenMsg({ ...openMsg, open: false });
  };

  const handleUser = (event) => {
    const userFilter = users.filter(user => user.id == event.target.value)
    const userIndex = users.indexOf(userFilter[0])

    setIndexSelected(userIndex)

    setEmail(userFilter[0].email)
    setName(userFilter[0].name)
    setPhone(userFilter[0].phone)

  };

  const handleAddUser = (event) => {
    event.preventDefault();
    setUsers([...users, { id: users.length + 1, name, email, phone }]);
    setUsersProps([...users, { id: users.length + 1, name, email, phone }]);
    setOpenMsg({ ...openMsg, open: true });
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleEditUser = (event) => {
    event.preventDefault();

    let newArray = [];
    newArray.push(...users);
    newArray[indexSelected] = { ...users[indexSelected], name, email, phone }
    setName('');
    setEmail('');
    setPhone('');

    setUsers(newArray)
    setUsersProps(newArray)
    setIndexSelected('')
  };

  return (
    <>
      <Modal
        open={openModalAddUser}
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
            <label>{t(MODAL_ADD_USER_TITLE)}</label>
          </div>
          <div className={classes.inputs}>
            <TextField
              label={t(MODAL_ADD_USER_LABEL_NAME)}
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label={t(MODAL_ADD_USER_LABEL_EMAIL)}
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label={t(MODAL_ADD_USER_LABEL_PHONE)}
              variant="standard"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={classes.addBtn}>
            <Button disabled={verifyEmptyFields()} variant="contained" onClick={handleAddUser}>
              {t(MODAL_ADD_USER_BTN_ADD)}
            </Button>
          </div>

          <div className={classes.footer}>
            <label>{t(MODAL_ADD_USER_LABEL_USER)}</label>

            <div className={classes.editList}>
              <TextField
                select
                label={t(MODAL_ADD_USER_LABEL)}
                onChange={handleUser}
                className={classes.companyInput}
                variant="outlined"
                size="small"
              >
                {users.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                disabled={verifyIndex()}
                onClick={handleEditUser} variant="contained">
                {t(MODAL_ADD_USER_BTN_EDIT_LIST)}
              </Button>
            </div>
          </div>

        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseMsg}
      >
        <Alert onClose={handleCloseMsg} severity="success" sx={{ width: '100%' }}>
          {t(MODAL_ADD_USER_LABEL_USER_ADDED)}
        </Alert>
      </Snackbar>
    </>
  );
};

ModalAddUser.propTypes = {
  openModalAddUser: PropTypes.bool.isRequired,
  handleOpenModalAddUser: PropTypes.func.isRequired,
};

const equal = (prevProps, nextProps) => {
  if (nextProps.openModalAddUser !== prevProps.openModalAddUser) {
    return false;
  }

  return true;
};

export default memo(ModalAddUser, equal);
