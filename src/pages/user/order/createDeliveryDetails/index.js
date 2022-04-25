import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DatePicker';
import { Button } from '@mui/material';

import ptLocale from 'date-fns/locale/pt-BR';
import frLocale from 'date-fns/locale/fr';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setDeliveryDetails, setPath } from '../../../../redux/createOrder.slice';

import { useDispatch, useSelector } from 'react-redux';

import {
  LABEL_DATE_DELIVERY,
  LABEL_COMPANY_NAME_DELIVERY,
  LABEL_EMAIL_DELIVERY,
  LABEL_PHONE_DELIVERY,
  LABEL_ADRESS_DELIVERY,
  LABEL_ZIPCODE_DELIVERY,
  LABEL_CITY_DELIVERY,
  LABEL_STATE_DELIVERY,
  LABEL_CONTACT_NAME_DELIVERY,
  BTN_NEXT_DELIVERY,
  BTN_BACK_DELIVERY,
} from '../../../../config/ConfigDefault';
import { makeStyles } from '@mui/styles';

const localeMap = {
  pt: ptLocale,
  fr: frLocale,
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '20px',
    width: '100%',
    height: '100%',
    marginTop: '-60px',
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFAE3'
  },
  input: {
    width: '70%',
    '& :nth-child(2)': {
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  containerCity: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(2),
    width: '70%',
    '& :nth-child(1)': {
      width: '100%',
      marginRight: theme.spacing(2),
    },
    '& :nth-child(2)': {
      width: '100%',
      marginRight: theme.spacing(2),
    },
    '& :nth-child(3)': {
      width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
    },
  },

  containerBtn: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(3, 0),
    '& button:nth-of-type(1)': {
      backgroundColor: theme.palette.primary.CINZA30,
    },
    '& button:nth-of-type(2)': {
      backgroundColor: theme.palette.primary.AZUL,
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
}));

const CreateDeliveryDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [company, setCompany] = React.useState('');
  const [contactName, setContactName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [adress, setAdress] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');

  const resultRedux = useSelector(function (state) {
    return state.order
  });

  useEffect(() => {
    // if (Object.keys(resultRedux.deliveryDetails.data).length !== 0) {
    //   setCompany(resultRedux.deliveryDetails.data.empresa);
    //   setContactName(resultRedux.deliveryDetails.data.contato);
    //   setEmail(resultRedux.deliveryDetails.data.email);
    //   setPhone(resultRedux.deliveryDetails.data.telefone);
    //   setAdress(resultRedux.deliveryDetails.data.endereco);
    //   setDate(resultRedux.deliveryDetails.data.data);
    //   setCity(resultRedux.deliveryDetails.data.cidade);
    //   setState(resultRedux.deliveryDetails.data.estado);
    //   setZipCode(resultRedux.deliveryDetails.data.cep);
    // }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      empresa: company,
      contato: contactName,
      email,
      telefone: phone,
      endereco: adress,
      data: date,
      cidade: city,
      estado: state,
      cep: zipCode,
    };

    dispatch(setDeliveryDetails(data));
  };

  const ValidationFields = () => {
    //validation input

    const MSG_ERROR = 'Campo obrigatório';

    const error = {};

    if (date === '' || date === null || date === undefined) {
      error.date = MSG_ERROR;
      return error;
    }

    if (company?.trim() === '' || company?.trim() === null || company?.trim() === undefined) {
      error.company = MSG_ERROR;
      return error;
    }
    if (
      contactName?.trim() === '' ||
      contactName?.trim() === null ||
      contactName?.trim() === undefined
    ) {
      error.contactName = MSG_ERROR;
      return error;
    }
    if (email?.trim() === '' || email?.trim() === null || email?.trim() === undefined) {
      error.email = MSG_ERROR;
      return error;
    }
    if (phone?.trim() === '' || phone?.trim() === null || phone?.trim() === undefined) {
      error.phone = MSG_ERROR;
      return error;
    }
    if (adress?.trim() === '' || adress?.trim() === null || adress?.trim() === undefined) {
      error.adress = MSG_ERROR;
      return error;
    }
    if (city?.trim() === '' || city?.trim() === null || city?.trim() === undefined) {
      error.city = MSG_ERROR;
      return error;
    }
    if (state?.trim() === '' || state?.trim() === null || state?.trim() === undefined) {
      error.state = MSG_ERROR;
      return error;
    }
    if (zipCode?.trim() === '' || zipCode?.trim() === null || zipCode?.trim() === undefined) {
      error.zipCode = MSG_ERROR;
      return error;
    }

    return error;
  };

  return (
    <>
      <div className={classes.container}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap.pt}>
          <DesktopDatePicker
            label={t(LABEL_DATE_DELIVERY)}
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <TextField
                label={t(LABEL_DATE_DELIVERY)}
                variant="standard"
                ref={inputRef}
                {...inputProps}
                className={classes.input}
                error={Object.keys(ValidationFields()).includes('date')}
                helperText={
                  Object.keys(ValidationFields()).includes('date') && ValidationFields().date
                }
                InputProps={{
                  endAdornment: InputProps?.endAdornment,
                }}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          className={classes.input}
          label={t(LABEL_COMPANY_NAME_DELIVERY)}
          variant="standard"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          error={Object.keys(ValidationFields()).includes('company')}
          helperText={
            Object.keys(ValidationFields()).includes('company') && ValidationFields().company
          }
        />
        <TextField
          className={classes.input}
          label={t(LABEL_CONTACT_NAME_DELIVERY)}
          variant="standard"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          error={Object.keys(ValidationFields()).includes('contactName')}
          helperText={
            Object.keys(ValidationFields()).includes('contactName') &&
            ValidationFields().contactName
          }
        />

        <TextField
          className={classes.input}
          label={t(LABEL_EMAIL_DELIVERY)}
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Object.keys(ValidationFields()).includes('email')}
          helperText={Object.keys(ValidationFields()).includes('email') && ValidationFields().email}
        />
        <TextField
          className={classes.input}
          label={t(LABEL_PHONE_DELIVERY)}
          variant="standard"
          value={phone}
          type="number"
          onChange={(e) => setPhone(e.target.value)}
          error={Object.keys(ValidationFields()).includes('phone')}
          helperText={Object.keys(ValidationFields()).includes('phone') && ValidationFields().phone}
        />
        <TextField
          className={classes.input}
          label={t(LABEL_ADRESS_DELIVERY)}
          variant="standard"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          error={Object.keys(ValidationFields()).includes('adress')}
          helperText={
            Object.keys(ValidationFields()).includes('adress') && ValidationFields().adress
          }
        />
        <div className={classes.containerCity}>
          <TextField
            label={t(LABEL_CITY_DELIVERY)}
            variant="standard"
            className={classes.input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={Object.keys(ValidationFields()).includes('city')}
            helperText={Object.keys(ValidationFields()).includes('city') && ValidationFields().city}
          />
          <TextField
            label={t(LABEL_STATE_DELIVERY)}
            variant="standard"
            className={classes.input}
            value={state}
            onChange={(e) => setState(e.target.value)}
            error={Object.keys(ValidationFields()).includes('state')}
            helperText={
              Object.keys(ValidationFields()).includes('state') && ValidationFields().state
            }
          />
          <TextField
            label={t(LABEL_ZIPCODE_DELIVERY)}
            variant="standard"
            value={zipCode}
            type="number"
            onChange={(e) => setZipCode(e.target.value)}
            error={Object.keys(ValidationFields()).includes('zipCode')}
            helperText={
              Object.keys(ValidationFields()).includes('zipCode') && ValidationFields().zipCode
            }
          />
        </div>

        <div className={classes.containerBtn}>
          <Button variant="contained" onClick={() => dispatch(setPath("/home/user/ordem/create"))}>
            {t(BTN_BACK_DELIVERY)}
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          //disabled={Object.keys(ValidationFields()).length > 0}
          >
            {t(BTN_NEXT_DELIVERY)}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateDeliveryDetails;
