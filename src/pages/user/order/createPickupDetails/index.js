import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DatePicker';
import { Button } from '@mui/material';
import ptLocale from 'date-fns/locale/pt-BR';
import frLocale from 'date-fns/locale/fr';
import { useNavigate } from 'react-router-dom';
import { setPickupDetails } from '../../../../redux/createOrder.slice';

import {
  LABEL_BILL_TO_PICKUP,
  LABEL_DATE_PICKUP,
  LABEL_TIME_PICKUP,
  LABEL_COMPANY_NAME_PICKUP,
  LABEL_EMAIL_PICKUP,
  LABEL_PHONE_PICKUP,
  LABEL_ADRESS_PICKUP,
  LABEL_ZIPCODE_PICKUP,
  LABEL_CITY_PICKUP,
  LABEL_STATE_PICKUP,
  LABEL_CONTACT_NAME_PICKUP,
  BTN_NEXT_PICKUP,
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
    fontFamily: 'Roboto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-60px',
    backgroundColor: '#E8EBF6'
  },
  space: {
    marginBottom: theme.spacing(2),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  containerDateTime: {
    width: '70%',
    '& :nth-child(1)': {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '& :nth-child(1)': {
        marginBottom: theme.spacing(1),
      },
    },
  },
  date: {
    width: '90%',
  },
  containerCity: {
    width: '70%',
    '& :nth-child(1)': {
      marginRight: theme.spacing(1),
    },
    '& :nth-child(2)': {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      '& :nth-child(1)': {
        marginBottom: theme.spacing(1),
      },
      '& :nth-child(2)': {
        marginBottom: theme.spacing(1),
      },
    },
  },
  containerBtnNext: {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: theme.spacing(3, 0),
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  btnNext: {
    backgroundColor: theme.palette.primary.AZUL + ' !important',
  },
}));

const CreatePickupDetails = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bill, setBill] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [contactName, setContactName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [adress, setAdress] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');

  // const { pickupDetails } = useSelector(CreateOrderSelector);

  const resultRedux = useSelector(function (state) {
    return state.login
  })

  useEffect(() => {
    // if (Object.keys(pickupDetails).length !== 0) {
    //   setBill(pickupDetails.conta);
    //   setCompany(pickupDetails.empresa);
    //   setContactName(pickupDetails.contato);
    //   setEmail(pickupDetails.email);
    //   setPhone(pickupDetails.telefone);
    //   setAdress(pickupDetails.endereco);
    //   setDate(pickupDetails.data);
    //   setTime(pickupDetails.hora);
    //   setCity(pickupDetails.cidade);
    //   setState(pickupDetails.estado);
    //   setZipCode(pickupDetails.cep);
    // }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      usuario: "aa", //resultRedux.user.id,
      conta: "bb", //bill,
      empresa: "cc", //company,
      contato: "dd", //contactName,
      email: "ee",
      telefone: "ff",//phone,
      endereco: "gg", //adress,
      data: "hh", //date,
      hora: "ii", //time,
      cidade: "jj", //city,
      estado: "kk", //state,
      cep: "ll", //zipCode,
    };

    dispatch(setPickupDetails(data));

    // if (Object.keys(ValidationFields()).length === 0) {
    //   dispatch(setPickupDetails({ data, navigate }));
    // }
  };

  const ValidationFields = () => {
    //validation input

    const MSG_ERROR = 'Campo obrigatório';

    const error = {};
    if (bill?.trim() === '' || bill?.trim() === null || bill?.trim() === undefined) {
      error.bill = MSG_ERROR;
      return error;
    }
    if (date === '' || date === null || date === undefined) {
      error.date = MSG_ERROR;
      return error;
    }
    if (time === '' || time === null || time === undefined) {
      error.time = MSG_ERROR;
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
        
          <div className={classes.space}>
            <TextField
              className={classes.input}
              label={t(LABEL_BILL_TO_PICKUP)}
              variant="standard"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              error={Object.keys(ValidationFields()).includes('bill')}
              helperText={Object.keys(ValidationFields()).includes('bill') && ValidationFields().bill}
            />
          </div>
          <div className={`${classes.containerDateTime} ${classes.space}`}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap.pt}>
              <DesktopDatePicker
                label={t(LABEL_DATE_PICKUP)}
                value={date}
                className={classes.date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                  <TextField
                    label={t(LABEL_DATE_PICKUP)}
                    variant="standard"
                    ref={inputRef}
                    {...inputProps}
                    className={classes.date}
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
              label={t(LABEL_TIME_PICKUP)}
              variant="standard"
              value={time}
              type="time"
              onChange={(e) => setTime(e.target.value)}
              error={Object.keys(ValidationFields()).includes('time')}
              helperText={Object.keys(ValidationFields()).includes('time') && ValidationFields().time}
            />
          </div>
          <div className={classes.space}>
            <TextField
              className={classes.input}
              label={t(LABEL_COMPANY_NAME_PICKUP)}
              variant="standard"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              error={Object.keys(ValidationFields()).includes('company')}
              helperText={
                Object.keys(ValidationFields()).includes('company') && ValidationFields().company
              }
            />
          </div>
          <div className={classes.space}>
            <TextField
              className={classes.input}
              label={t(LABEL_CONTACT_NAME_PICKUP)}
              variant="standard"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              error={Object.keys(ValidationFields()).includes('contactName')}
              helperText={
                Object.keys(ValidationFields()).includes('contactName') &&
                ValidationFields().contactName
              }
            />
          </div>

          <div className={classes.space}>
            <TextField
              className={classes.input}
              label={t(LABEL_EMAIL_PICKUP)}
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Object.keys(ValidationFields()).includes('email')}
              helperText={
                Object.keys(ValidationFields()).includes('email') && ValidationFields().email
              }
            />
          </div>
          <div className={classes.space}>
            <TextField
              className={classes.input}
              label={t(LABEL_PHONE_PICKUP)}
              variant="standard"
              value={phone}
              type="number"
              onChange={(e) => setPhone(e.target.value)}
              error={Object.keys(ValidationFields()).includes('phone')}
              helperText={
                Object.keys(ValidationFields()).includes('phone') && ValidationFields().phone
              }
            />
          </div>

          <div className={classes.space}>
            <TextField
              className={classes.input}
              label={t(LABEL_ADRESS_PICKUP)}
              variant="standard"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              error={Object.keys(ValidationFields()).includes('adress')}
              helperText={
                Object.keys(ValidationFields()).includes('adress') && ValidationFields().adress
              }
            />
          </div>
          <div className={`${classes.containerCity} ${classes.space}`}>
            <TextField
              className={classes.input}
              label={t(LABEL_CITY_PICKUP)}
              variant="standard"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={Object.keys(ValidationFields()).includes('city')}
              helperText={Object.keys(ValidationFields()).includes('city') && ValidationFields().city}
            />
            <TextField
              className={classes.input}
              label={t(LABEL_STATE_PICKUP)}
              variant="standard"
              value={state}
              onChange={(e) => setState(e.target.value)}
              error={Object.keys(ValidationFields()).includes('state')}
              helperText={
                Object.keys(ValidationFields()).includes('state') && ValidationFields().state
              }
            />
            <TextField
              className={classes.input}
              label={t(LABEL_ZIPCODE_PICKUP)}
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
          <div className={classes.containerBtnNext}>
            <Button
              className={classes.btnNext}
              variant="contained"
              onClick={handleSubmit}
            //disabled={Object.keys(ValidationFields()).length > 0}
            >
              {t(BTN_NEXT_PICKUP)}
            </Button>
          </div>
        </div>
    </>
  );
};

export default CreatePickupDetails;
