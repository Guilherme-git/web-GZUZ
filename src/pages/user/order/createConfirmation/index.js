import React, { useEffect, useState } from 'react';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  TITLE_CONFIRMATION_PICKUP_DETAILS,
  TITLE_CONFIRMATION_DELIVERY_DETAILS,
  TITLE_CONFIRMATION_ORDER_DETAILS,
  LABEL_BILL_TO_CONFIRMATION,
  LABEL_DATE_CONFIRMATION,
  LABEL_TIME_CONFIRMATION,
  LABEL_COMPANY_NAME_CONFIRMATION,
  LABEL_CONTACT_NAME_CONFIRMATION,
  LABEL_EMAIL_CONFIRMATION,
  LABEL_PHONE_CONFIRMATION,
  LABEL_ADRESS_CONFIRMATION,
  LABEL_ZIPCODE_CONFIRMATION,
  LABEL_CITY_CONFIRMATION,
  LABEL_STATE_CONFIRMATION,
  BTN_FINISH_ORDER,
  TITLE_CONFIRMATION_PROOF_DELIVERY,
  LABEL_ATTACH_DOCS,
  BTN_CONFIRMATION_UPLOAD_DOCS,
  LABEL_ATTACH_PICTURES_CARGO,
  LABEL_CONTATCT_SIGNTURE,
  LABEL_CONFIRMATION_NAME,
  LABEL_CONFIRMATION_DATE,
  LABEL_CONFIRMATION_TIME,
  LABEL_CONFIRMATION_LOCATION,
  BTN_BACK_CONFIRMATION,
  BTN_NEW_ORDER_CONFIRMATION,
  MSG_CREATE_SUCCESS_ORDER_CONFIRMATION,
  MSG_CREATE_FAILED_ORDER_CONFIRMATION
} from '../../../../config/ConfigDefault';
import { useTranslation } from 'react-i18next';
import { Divider, CollapseComponent } from '../../../../components';
import { Colors } from '../../../../contants';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
  resetReducer,
  createNewOrder,
  setPath
} from '../../../../redux/createOrder.slice';

const InputNEw = styled('input')({
  display: 'none'
});

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal'
  },
  containerList: {
    backgroundColor: '#f2f2f2',
    width: '80%',
    alignSelf: 'center',
    color: theme.palette.primary.CINZA80,
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  },
  details: {
    '& label:nth-of-type(1)': {
      marginRight: '10px'
    },
    '& label:nth-of-type(2)': {
      marginRight: '100px'
    },
    '& label:nth-of-type(3)': {
      marginRight: '10px'
    },
    '& label:nth-of-type(4)': {
      marginRight: '100px'
    },
    '& label:nth-of-type(5)': {
      marginRight: '10px'
    },
    '& p:nth-of-type(1)': {
      color: '#bebebe'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      '& label:nth-of-type(1)': {
        marginRight: '7px'
      },
      '& label:nth-of-type(2)': {
        marginRight: '15px'
      },
      '& label:nth-of-type(3)': {
        marginRight: '7px'
      },
      '& label:nth-of-type(4)': {
        marginRight: '15px'
      },
      '& label:nth-of-type(5)': {
        marginRight: '7px'
      }
    }
  },
  horizontal: {
    color: '#bebebe'
  },
  containerbtn: {
    width: '80%',
    alignSelf: 'center',
    margin: theme.spacing(3, 0)
  },
  containerBtnFinish: {
    display: 'flex',
    justifyContent: 'flex-end',

    '& button': {
      backgroundColor: theme.palette.primary.AMARELO,
      width: '250px',
      alignSelf: 'flex-end'
    },
    [theme.breakpoints.down('sm')]: {
      '& button': {
        width: '100%'
      }
    }
  },
  divider: {
    marginBottom: theme.spacing(3)
  },
  footer: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  },
  containerFooterHorizontal: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.CINZA80,
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px'
    }
  },
  footerDot: {
    marginRight: '10px',
    color: theme.palette.primary.AMARELO,
    [theme.breakpoints.down('sm')]: {
      marginRight: '5px'
    }
  },
  footerBtnUpload: {
    backgroundColor: theme.palette.primary.CINZA40 + ' !important',
    marginLeft: '10px' + ' !important',
    [theme.breakpoints.down('sm')]: {
      fontSize: '7px' + ' !important'
    }
  },
  containerSignature: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2) + ' !important'
    }
  },
  signatureInput: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  containerDate: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    paddingTop: '150px',
    backgroundColor: theme.palette.primary.CINZA10,
    width: '60%',
    marginBottom: theme.spacing(4),
    borderRadius: '10px',
    '& :nth-child(1)': {
      marginBottom: theme.spacing(1)
    },
    '& :nth-child(2)': {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  conteinerBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(4, 0),
    '& button:nth-of-type(1)': {
      backgroundColor: theme.palette.primary.CINZA30
    },
    '& button:nth-of-type(2)': {
      backgroundColor: theme.palette.primary.AZUL
    }
  }
}));

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openPickup, setOpenPickup] = React.useState(false);
  const [openDelivery, setOpenDelivery] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);

  const resultRedux = useSelector(function (state) {
    return state.order
  });

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

  const handleClickPickup = () => {
    setOpenPickup(!openPickup);
  };

  const handleClickDelivery = () => {
    setOpenDelivery(!openDelivery);
  };

  const handleClickDetails = () => {
    setOpenDetails(!openDetails);
  };

  useEffect(() => {
    if (resultRedux.status === 'success') {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: t(MSG_CREATE_SUCCESS_ORDER_CONFIRMATION),
        type: 'success'
      });
      setTimeout(() => {
        dispatch(resetReducer());
        dispatch(setPath('/home/user/ordem/create'))
        navigate('/home/user');
      }, 2000);
    }
  }, [resultRedux.status])

  const handleCreateOrders = (event) => {
    event.preventDefault();

    const data = {
      detalhe_retirada: resultRedux.pickupDetails.data,
      detalhe_entrega: resultRedux.deliveryDetails.data,
      detalhe_ordem: resultRedux.orderDetails.data,
      confirmacao: {
        documento: null,
        foto: null
      }
    };

    dispatch(createNewOrder(data));
  };

  const PICKUPDETAILS_DATA = new Date(resultRedux.pickupDetails.data?.data).toLocaleDateString('pt-BR');
  const DELIVERYDETAILS_DATA = new Date(resultRedux.deliveryDetails.data?.data).toLocaleDateString('pt-BR');

  return (
    <>
      <div className={classes.container}>
        
        {/* 1 */}
        <CollapseComponent
          style={classes.containerList}
          title={t(TITLE_CONFIRMATION_PICKUP_DETAILS)}
          handleOpen={handleClickPickup}
          open={openPickup}
        >
          <div className={classes.details}>
            <div className={classes.horizontal}>
              <label>{t(LABEL_BILL_TO_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.conta}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_DATE_CONFIRMATION)}:</label>
              <label>{PICKUPDETAILS_DATA.toString()}</label>
              <label>{t(LABEL_TIME_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.hora}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_COMPANY_NAME_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.empresa}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_CONTACT_NAME_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.contato}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_EMAIL_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.email}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_PHONE_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.telefone}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_ADRESS_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.endereco}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_CITY_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.cidade}</label>
              <label>{t(LABEL_STATE_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.estado}</label>
              <label>{t(LABEL_ZIPCODE_CONFIRMATION)}:</label>
              <label>{resultRedux.pickupDetails.data?.cep}</label>
            </div>
          </div>
        </CollapseComponent>


        {/* 2 */}
        <CollapseComponent
          style={classes.containerList}
          title={t(TITLE_CONFIRMATION_DELIVERY_DETAILS)}
          handleOpen={handleClickDelivery}
          open={openDelivery}
        >
          <div className={classes.details}>
            {/* <div className={classes.horizontal}>
              <label>{t(LABEL_BILL_TO_CONFIRMATION)}:</label>
              <label>deliveryDetails</label>
            </div> */}
            <div className={classes.horizontal}>
              <label>{t(LABEL_DATE_CONFIRMATION)}:</label>
              <label>{DELIVERYDETAILS_DATA}</label>
              {/* <label>{t(LABEL_TIME_CONFIRMATION)}:</label>
              <label>{deliveryDetails.data}</label> */}
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_COMPANY_NAME_CONFIRMATION)}:</label>
              <label>{resultRedux.deliveryDetails.data?.empresa}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_CONTACT_NAME_CONFIRMATION)}:</label>
              <label>{resultRedux.deliveryDetails.data?.contato}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_EMAIL_CONFIRMATION)}:</label>
              <label>{resultRedux.deliveryDetails.data?.email}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_PHONE_CONFIRMATION)}:</label>
              <label>{resultRedux.deliveryDetails.data?.telefone}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_ADRESS_CONFIRMATION)}:</label>
              <label>{resultRedux.deliveryDetails.data?.endereco}</label>
            </div>
            <div className={classes.horizontal}>
              <label>{t(LABEL_CITY_CONFIRMATION)}:</label>
              <label>{resultRedux.deliveryDetails.data?.cidade}</label>
              <label>{t(LABEL_STATE_CONFIRMATION)}:</label>
              <label>{resultRedux.deliveryDetails.data?.estado}</label>
              <label>{t(LABEL_ZIPCODE_CONFIRMATION)}:</label>
              <label>{resultRedux.deliveryDetails.data?.cep}</label>
            </div>
          </div>
        </CollapseComponent>

        {/* 3 */}
        <CollapseComponent
          style={classes.containerList}
          title={t(TITLE_CONFIRMATION_ORDER_DETAILS)}
          handleOpen={handleClickDetails}
          open={openDetails}
        >
          <div className={classes.details}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a consectetur
              lectus. Vivamus augue velit, dictum at malesuada et.
            </p>
          </div>
        </CollapseComponent>

        {/* 4 */}
        <div className={classes.containerbtn}>
          <div className={classes.containerBtnFinish}>
            <Button variant="contained" onClick={(event) => handleCreateOrders(event)}>
              {t(BTN_FINISH_ORDER)}
            </Button>
          </div>
        </div>

        {/* 5 */}
        <div className={classes.footer}>
          <Divider
            textAlign="left"
            colorDivider={Colors.AMARELO}
            colorText={Colors.CINZA80}
            className={classes.divider}
          >
            {t(TITLE_CONFIRMATION_PROOF_DELIVERY)}
          </Divider>

          {/* 5.1 */}
          <div className={classes.containerFooterHorizontal}>
            <FiberManualRecordIcon className={classes.footerDot} />
            <label>{t(LABEL_ATTACH_DOCS)}</label>

            <label htmlFor="contained-button-file">
              <InputNEw accept="image/*" id="contained-button-file" multiple type="file" />
              <Button
                className={classes.footerBtnUpload}
                size="small"
                variant="contained"
                component="span"
                endIcon={<UploadFileIcon />}
                type="file"
                accept="image/*"
                sx={{ backgroundColor: Colors.CINZA40 }}
              >
                {t(BTN_CONFIRMATION_UPLOAD_DOCS)}
              </Button>
            </label>
          </div>

          {/* 5.2 */}
          <div className={classes.containerFooterHorizontal}>
            <FiberManualRecordIcon className={classes.footerDot} />
            <label>{t(LABEL_ATTACH_PICTURES_CARGO)}</label>

            <label htmlFor="contained-button-file">
              <InputNEw accept="image/*" id="contained-button-file" multiple type="file" />
              <Button
                className={classes.footerBtnUpload}
                size="small"
                variant="contained"
                component="span"
                endIcon={<UploadFileIcon />}
                type="file"
                accept="image/*"
                sx={{ backgroundColor: Colors.CINZA40 }}
              >
                {t(BTN_CONFIRMATION_UPLOAD_DOCS)}
              </Button>
            </label>
          </div>

          {/* 5.3 */}
          <div className={classes.containerSignature}>
            <div className={classes.containerFooterHorizontal}>
              <FiberManualRecordIcon className={classes.footerDot} />
              <label>{t(LABEL_CONTATCT_SIGNTURE)}</label>
            </div>
            <TextField
              size="small"
              label={t(LABEL_CONFIRMATION_NAME)}
              className={classes.signatureInput}
              variant="filled"
              disabled
            />
          </div>

          {/* 5.5 */}
          <div className={classes.containerDate}>
            <TextField
              size="small"
              label={t(LABEL_CONFIRMATION_DATE)}
              className={classes.signatureInput}
              variant="filled"
              disabled
            />
            <TextField
              size="small"
              label={t(LABEL_CONFIRMATION_TIME)}
              className={classes.signatureInput}
              variant="filled"
              disabled
            />
            <TextField
              size="small"
              label={t(LABEL_CONFIRMATION_LOCATION)}
              className={classes.signatureInput}
              variant="filled"
              disabled
            />
          </div>

          {/* 5.6 */}
          <div className={classes.containerFooterHorizontal}>
            <div className={classes.conteinerBtn}>
              <Button
                variant="contained"
                onClick={() => navigate('/homeUsers/newOrder/orderDetails')}
              >
                {t(BTN_BACK_CONFIRMATION)}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(resetReducer());
                  dispatch(setPath('/home/user/ordem/create'))
                }}
              >
                {t(BTN_NEW_ORDER_CONFIRMATION)}
              </Button>
            </div>
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
      </div>
    </>
  );
}