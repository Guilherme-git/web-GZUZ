/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionSheet from 'actionsheet-react';
import { useTranslation } from 'react-i18next';
import { MapsDriver, HeaderHome, Divider } from '../../../components'
import { makeStyles, styled } from '@mui/styles';
import { Button, TextField } from '@mui/material';
import { Colors } from '../../../contants';

import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  LinkedCamera as LinkedCameraIcon,
  FiberManualRecord as FiberManualRecordIcon,
  UploadFile as UploadFileIcon,
} from '@mui/icons-material';

import {
  DELIVERY_DRIVER_DETAILS,
  DELIVERY_DRIVER_PICKUP,
  DELIVERY_DRIVER_DROPOFF,
  DELIVERY_DRIVER_BTN_SEND_MESSAGE,
  DELIVERY_DRIVER_BTN_IM_HERE,
  DELIVERY_DRIVER_BTN_DROP_OFF,
  DROPOFF_DETAILS_BTN_SIGNATURE,
  DROPOFF_SIGNATURE_TITLE,
  DROPOFF_SIGNATURE_LABEL_ATTACH_DOCS,
  DROPOFF_SIGNATURE_BTN_UPLOAD,
  DROPOFF_SIGNATURE_LABEL_ATTACH_PICTURES,
  DROPOFF_SIGNATURE_LABEL_CONTACT_SIGNATURE,
  DROPOFF_SIGNATURE_LABEL_DATE,
  DROPOFF_SIGNATURE_LABEL_TIME,
  DROPOFF_SIGNATURE_LABEL_LOCATION,
  DROPOFF_SIGNATURE_LABEL_NAME,
  DROPOFF_SIGNATURE_BTN_FINISH,
} from '../../../config/ConfigDefault';
import './styles.scss'

const InputNEw = styled('input')({
  display: 'none',
});

const useStyles = makeStyles((theme) => ({
  containerMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      backgroundColor: theme.palette.primary.AMARELO,
      width: '100%',
      justifyContent: 'center',
      color: theme.palette.primary.BRANCO,
    },
  },
  container: {
    padding: '14px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.CINZA40,
    color: theme.palette.primary.BRANCO,
    padding: '10px',
    width: '70px',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    lineHeight: '16px',
    marginBottom: '5px',
  },
  content: {
    marginBottom: '10px',
  },
  horizontal1: {
    display: 'flex',
    position: 'relative',

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
      color: '#898989',
      marginRight: '10px',
    },
    '& p': {
      marginTop: '10px',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '19px',
      color: '#898989',
      width: '70%',
    },
  },
  containerBtn: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: '0',
    top: '-3rem',

    '& button': {
      backgroundColor: theme.palette.primary.AZUL,
      color: theme.palette.primary.BRANCO,
      fontWeight: '500',
      fontSize: '13px',
      lineHeight: '22px',
      letterSpacing: '0.46px',
      textTransform: 'uppercase',
      padding: '0.3rem 0.3rem',
      width: '171px',
    },
    '& :nth-child(1)': {
      marginBottom: '10px',
    },
    '& :nth-child(2)': {
      marginBottom: '10px',
    },
  },
  containerActionSheet: {
    height: '450px',
    padding: '1rem',
  },
  ActionSheetHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',

    '& :nth-child(1)': {
      color: theme.palette.primary.AMARELO,
      fontSize: '40px',
    },
  },
  ActionSheetBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    flexDirection: 'column',
    '& button': {
      backgroundColor: theme.palette.primary.AZUL,
      width: '171px',
      fontSize: '13px',
    },
    '& :nth-child(1)': {
      marginBottom: '10px',
    },
    '& :nth-child(2)': {
      marginBottom: '20px',
    },
  },
  ActionSheetDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.CINZA40,
    color: theme.palette.primary.BRANCO,
    width: '25%',
    borderRadius: '16px',
    padding: '4px',
    fontSize: '14px',
    lineHeight: '16px',
    marginBottom: '10px',
    fontWeight: 'normal',
  },
  ActionSheetFooter: {
    marginBottom: '10px',

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
      color: '#898989',
    },
  },

  divider: {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '20px',
    color: ' #898989',
    margin: '5px 0' + ' !important',
  },
  horizontal: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    '& .icon': {
      marginRight: '10px',
      color: theme.palette.primary.AMARELO,
    },
    '& label': {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '19px',
      color: theme.palette.primary.CINZA80,
      marginRight: '10px',
      textAlign: 'right',
    },
    '& button': {
      backgroundColor: theme.palette.primary.CINZA40,
    },
  },
  footer: {
    display: 'flex',
  },
  signature: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    backgroundColor: theme.palette.primary.CINZA00,
    boxShadow: '0px 4px 4px rgba(170, 170, 170, 0.25)',
    borderRadius: '15px',
    padding: '10px',
    paddingTop: '100px',
  },
  name: {
    width: '50%',
    padding: '10px',
    position: 'relative',
    '& .input-name': {
      width: '100%',
    },
    '& button': {
      position: 'absolute',
      right: '1rem',
      bottom: '0',
      backgroundColor: theme.palette.primary.AMARELO,
      width: '171px',
      fontWeight: '500',
      fontSize: '13px',
      lineHeight: '22px',
    },
  },
  containerActionSheet: {
    height: '600px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  actionSheetHeader: {
    marginBottom: '10px',
    '& .divider': {
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '16px',
      color: ' #898989',
      margin: '5px 0' + ' !important',
    },
  },
  actionSheetBtn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  actionSheetInput: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    height: '40%',
    padding: '15px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 4px rgba(170, 170, 170, 0.25)',
    borderRadius: '15px',
  },
  actionSheetSignature: {
    paddingTop: '40px',
    '& .signature-input': {
      width: '100%',
    },
  },
  actionSheetFooter: {
    display: 'flex',
    flexDirection: 'column',
    margin: '60px 0',
    '& button': {
      marginTop: '50px',
      backgroundColor: theme.palette.primary.AMARELO,
    },
  }

}));

const DeliveryDetailsDriver = () => {
  const navigate = useNavigate();
  const refActionSheet = useRef();
  const classes = useStyles();
  const { t } = useTranslation();
  const [statusBtn, setStatusBtn] = useState("delivery");

  const handleActionSheet = () => {
    refActionSheet.current.open();
  };

  const handleClose = () => {
    refActionSheet.current.close();
  };

  return (
    <div className={classes.container}>
      <div className="container-homeUsers">
        <HeaderHome />

        <div style={{ width: '90%' }}>
          <MapsDriver />
        </div>

        {/* 1 */}

        <div style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
          <div className={classes.title}>{t(DELIVERY_DRIVER_DETAILS)}</div>
          <div className={classes.content}>
            <div className={classes.horizontal1}>
              <div className={classes.vertical}>
                <div className={classes.horizontal1}>
                  <label>{t(DELIVERY_DRIVER_PICKUP)}:</label>
                  <span>4194 Stoney Lane - Dallas TX</span>
                </div>
                <div className={classes.horizontal1}>
                  <label>{t(DELIVERY_DRIVER_DROPOFF)}:</label>
                  <span>4483 Zappia Drive - Winchester KY</span>
                </div>
                <div className={classes.horizontal1}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a
                    consectetur lectus. Vivamus augue velit, dictum at malesuada et. aaa
                  </p>
                </div>
              </div>

              {statusBtn === "delivery" &&
                <div className={classes.containerBtn}>
                  <Button size="small" variant="contained">
                    {t(DELIVERY_DRIVER_BTN_SEND_MESSAGE)}
                  </Button>
                  <Button size="small" variant="contained">
                    {/* I&apos;M HERE */}
                    {t(DELIVERY_DRIVER_BTN_IM_HERE)}
                  </Button>

                  <Button size="small" variant="contained" onClick={() => setStatusBtn("signature")}>
                    {t(DELIVERY_DRIVER_BTN_DROP_OFF)}
                  </Button>

                </div>
              }

              {statusBtn === "signature" &&
                <div className={classes.containerBtn}>
                  <Button size="small" variant="contained">
                    {t(DELIVERY_DRIVER_BTN_SEND_MESSAGE)}
                  </Button>
                  <Button size="small" variant="contained">
                    {/* I&apos;M HERE */}
                    {t(DELIVERY_DRIVER_BTN_IM_HERE)}
                  </Button>

                  <Button size="small" variant="contained" onClick={() => setStatusBtn("finish")} style={{ backgroundColor: '#FAC312' }} >
                    {t(DROPOFF_DETAILS_BTN_SIGNATURE)}
                  </Button>
                </div>
              }
            </div>
          </div>



          {statusBtn === 'finish' &&
            <>
              <div className={classes.container}>
                <Divider textAlign="left" className={classes.divider}>
                  {t(DROPOFF_SIGNATURE_TITLE)}
                </Divider>
                
                <div className={classes.footer}>
                  <div className={classes.signature}>
                    <TextField
                      id="standard-basic"
                      label={t(DROPOFF_SIGNATURE_LABEL_DATE)}
                      variant="standard"
                      disabled
                    />
                    <TextField
                      id="standard-basic"
                      label={t(DROPOFF_SIGNATURE_LABEL_TIME)}
                      variant="standard"
                      disabled
                    />
                    <TextField
                      id="standard-basic"
                      label={t(DROPOFF_SIGNATURE_LABEL_LOCATION)}
                      variant="standard"
                      disabled
                    />
                  </div>
                  <div className={classes.name}>
                    <TextField
                      className="input-name"
                      label={t(DROPOFF_SIGNATURE_LABEL_NAME)}
                      variant="filled"
                    />
                    <Button size="small" variant="contained" onClick={() => navigate('/home/driver')}>
                      {t(DROPOFF_SIGNATURE_BTN_FINISH)}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          }

        </div>

      </div>

    </div >
  );
};

export default DeliveryDetailsDriver;
