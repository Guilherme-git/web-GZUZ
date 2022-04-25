/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import api from '../../../api'

import {
  Button,
  TextField,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Checkbox,
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  UploadFile as UploadFileIcon,
  Visibility,
  VisibilityOff,
  ArrowLeft as ArrowLeftIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setResetStatus, RegisterDriverRedux } from '../../../redux/login.slice'

import { Images, Colors, SERVER_IMAGES } from '../../../contants';
import {
  REGISTER_DRIVERS_TITLE,
  REGISTER_DRIVERS_LABEL_NAME,
  REGISTER_DRIVERS_LABEL_COMPANY,
  REGISTER_DRIVERS_BUTTON_ADD_COMPANY,
  REGISTER_DRIVERS_LABEL_CARRIER,
  REGISTER_DRIVERS_LABEL_PHONE,
  REGISTER_DRIVERS_LABEL_EMAIL,
  REGISTER_DRIVERS_LABEL_POSITION,
  REGISTER_DRIVERS_LABEL_CITY,
  REGISTER_DRIVERS_LABEL_STATE,
  REGISTER_DRIVERS_LABEL_COUNTRY,
  REGISTER_DRIVERS_LABEL_ACTIVE,
  REGISTER_DRIVERS_LABEL_VEHICLE,
  REGISTER_DRIVERS_CHECKBOX_VEHICLE,
  REGISTER_DRIVERS_LABEL_DRIVER_LICENSE,
  REGISTER_DRIVERS_LABEL_DRIVER_DESCRIPTION,
  REGISTER_DRIVERS_LABEL_VEHICLE_INSURANCE,
  REGISTER_DRIVERS_LABEL_STA,
  REGISTER_DRIVERS_LABEL_PASSWORD,
  REGISTER_DRIVERS_LABEL_CONFIRM_PASSWORD,
  REGISTER_DRIVERS_BTN_REGISTER,
  REGISTER_MSG_PASSWORD_NOT_MATCH,
  REGISTER_MSG_USER_REGISTERED_SUCCESS,
  REGISTER_MSG_USER_REGISTERED_ERROR,
  REGISTER_MSG_EMPTY_FIELDS
} from '../../../config/ConfigDefault';
import { Divider, ModalRegisterCompany } from '../../../components';

import { makeStyles } from '@mui/styles';

const CONFIG_IMG_CARS = [
  {
    id: 1,
    model: 'Ford Van E250',
    length: 'L52',
    height: 'H48',
    width: 'W96',
    weight: '2500 Lbs',
    //description: 'L52 x W96 x H48 2500 Lbs',
    image: Images.FordVanE250,
  },
  {
    id: 2,
    model: 'Van Sprinter 2500',
    length: 'L171',
    height: 'H70',
    width: 'W52',
    weight: '5000 Lbs',
    //description: 'L171 x W52 x H70 5000 Lbs',
    image: Images.VanSprinter2500,
  },
  {
    id: 3,
    model: 'Flat Bed',
    length: 'L171',
    height: 'H70',
    width: 'W52',
    weight: '5000 Lbs',
    //description: 'L171 x W52 x H70 5000 Lbs',
    image: Images.FlatBed,
  },
  {
    id: 4,
    model: 'Pick Up Truck 16’',
    length: 'L52',
    height: 'H48',
    width: 'W96',
    weight: '2500 Lbs',
    //description: 'L52 x W96 x H48 2500 Lbs',
    image: Images.PickUpTruck16,
  },
  {
    id: 5,
    model: 'Truck 16’',
    length: 'L87',
    height: 'H87',
    width: 'W12',
    weight: '14500 Lbs',
    //description: 'L87 x W12 x H87 14500 Lbs',
    image: Images.Truck16,
  },
  {
    id: 6,
    model: 'Truck 26’',
    length: 'L52',
    height: 'H90',
    width: 'W96',
    weight: '22500 Lbs',
    //description: 'L52 x W96 x H90 22500 Lbs',
    image: Images.Truck26,
  },
  {
    id: 7,
    model: 'Cart',
    length: 'L87',
    height: 'H87',
    width: 'W12',
    weight: '14500 Lbs',
    //description: 'L87 x W12 x H87 14500 Lbs',
    image: Images.Cart,
  },
];

const InputNEw = styled('input')({
  display: 'none',
});

const CONFIG_CHECKBOX = [
  {
    id: 1,
    label: '16',
  },
  {
    id: 2,
    label: '18',
  },
  {
    id: 3,
    label: '24',
  },
  {
    id: 4,
    label: '26',
  },
  {
    id: 5,
    label: '53',
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.GOLD,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  containerImgBackground: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    '& img': {
      width: '60%',
      filter: 'opacity(0.1) drop-shadow(0 0 0 gray)',
    },
  },
  card: {
    backgroundColor: theme.palette.primary.CINZA00,
    overflow: 'auto',
    width: '80%',
    height: '90vh',
    padding: '24px',
    zIndex: '1',
    borderRadius: '42px',
    boxShadow: '0px 13px 17px rgba(148, 148, 148, 0.25)',
    [theme.breakpoints.down('md')]: {
      width: '90%' + ' !important',
    },
  },
  divider: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  items: {
    marginBottom: theme.spacing(2) + ' !important',
  },
  input: {
    width: '100%',
  },
  containerCompany: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  companyInput: {
    width: '70%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  btnAddCompany: {
    backgroundColor: theme.palette.primary.CINZA40 + ' !important',
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '100%' + ' !important',
    },
    // width: `calc(30% - ${theme.spacing(2)})` + ' !important',
  },
  containerCellPhone: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  cellPhone: {
    width: '50%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  email: {
    // width: `calc(50% - ${theme.spacing(2)})` + ' !important',
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '100%' + ' !important',
    },
  },
  containerCity: {
    marginBottom: theme.spacing(2) + ' !important',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  city: {
    width: '100%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  state: {
    width: '100%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  country: {
    width: '100%',
  },
  containerSwitch: {
    marginBottom: theme.spacing(2) + ' !important',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.CINZA80,
    '& label': {
      marginRight: theme.spacing(2) + ' !important',
    },
  },
  containerVehicle: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  vehicle: {
    width: '65%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      width: '100%' + ' !important',
    },
  },
  checkVehicle: {
    fontSize: '16px',
  },
  containerCheckbox: {
    display: 'flex',
    flexDirection: 'row' + ' !important',
    marginBottom: theme.spacing(2) + ' !important',
  },
  containerUpload: {
    display: 'flex',
    flexDirection: 'row' + ' !important',
    alignItems: 'center',
    marginBottom: theme.spacing(2) + ' !important',
    '& label': {
      color: theme.palette.primary.CINZA80,
      marginRight: theme.spacing(2) + ' !important',
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2) + ' !important',
      },
    },
    '& :nth-child(3)': {
      fontSize: '10px',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column' + ' !important',
      backgroundColor: theme.palette.primary.CINZA10 + ' !important',
      padding: '10px' + ' !important',
      borderRadius: '30px' + ' !important',
      textAlign: 'center' + ' !important',
    },
  },
  containerCars: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3) + ' !important',
    width: '100%',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  detailsCars: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(3) + ' !important',

    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  containerImgCar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.BRANCO + ' !important',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    width: '191px',
    height: '191px',
    borderRadius: '50%',
    position: 'relative',
    marginBottom: theme.spacing(1) + ' !important',
    '&:hover': {
      boxShadow: `0px 10px 1px ${theme.palette.primary.AMARELO}` + ' !important',
    },
    '& img': {
      width: '150px',
    },
  },
  selectedCar: {
    position: 'absolute',
    top: '0px',
  },
  containerTextCars: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPassword: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column' + ' !important',
      justifyContent: 'center' + ' !important',
      alignItems: 'center' + ' !important',
    },
  },
  password: {
    width: '50%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  ConfirmPassword: {
    width: '50%',
    marginRight: theme.spacing(2) + ' !important',
    [theme.breakpoints.down('md')]: {
      width: '100%' + ' !important',
      marginBottom: theme.spacing(2) + ' !important',
    },
  },
  BtnRegister: {
    width: '50%',
    backgroundColor: theme.palette.primary.GOLD + ' !important',
    [theme.breakpoints.down('md')]: {
      width: '100%' + ' !important',
      left: '-7px' + ' !important',
    },
  },
  containerBtnBack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    textDecoration: 'none',
    color: theme.palette.primary.CINZA80,
    fontSize: '10px',
    lineheight: '9px',
    '&:hover': {
      color: theme.palette.primary.AMARELO,
    },
  },
}));

const RegisterDriver = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([]);
  const [dataVehicles, setDataVehicles] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [dataNumbers, setDataNumbers] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [openModaladdcompany, setOpenModaladdcompany] = useState(false);
  const resultRedux = useSelector(function (state) {
    return state.login
  });
  const [document, setDocument] = useState();

  const [openMsg, setOpenMsg] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    msg: '',
    type: 'success',
  });
  const { vertical, horizontal, open, msg, type } = openMsg;

  const [values, setValues] = useState({
    name: '',
    companys: [],
    transporter: '',
    phone: '',
    email: '',
    position: '',
    city: '',
    state: '',
    country: '',
    status: false,
    vehicle: '',
    vehicle_status: false,
    numbers: [],
    document_driver_license: '',
    document_vehicle_insurance: '',
    sta: '',
    vehicles: [],
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  useEffect(() => {
    const result = async () => {
      const responseNumbers = await api.get('/number/list');
      setDataNumbers(responseNumbers.data)

      const responseVehicles = await api.get('/vehicles/list');
      setDataVehicles(responseVehicles.data)
    }
    result()
  }, [])
  console.log(values)

  useEffect(() => {
    if (resultRedux.status === 'success') {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: t(REGISTER_MSG_USER_REGISTERED_SUCCESS),
        type: 'success',
      });
      setCompanies([]);
      setVehicles([]);
      setNumbers([]);
      setValues({
        name: '',
        companys: [],
        transporter: '',
        phone: '',
        email: '',
        position: '',
        city: '',
        state: '',
        country: '',
        status: false,
        vehicle: '',
        vehicle_status: false,
        numbers: [],
        document_driver_license: '',
        document_vehicle_insurance: '',
        sta: '',
        vehicles: [],
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
      })

      setTimeout(() => {
        dispatch(setResetStatus());
      }, 5000);
    }

    if (resultRedux.status === 'failed') {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: t(REGISTER_MSG_USER_REGISTERED_ERROR),
        type: 'error',
      });
      setTimeout(() => {
        dispatch(setResetStatus());
      }, 5000);
    }
  }, [resultRedux.status])

  const handleModalAddCompany = (valor) => {
    setOpenModaladdcompany(valor);
  };

  const VerifyPassword = () => {
    if (values.password !== values.confirmPassword) {
      setOpenMsg({
        ...openMsg,
        open: true,
        msg: t(REGISTER_MSG_PASSWORD_NOT_MATCH),
        type: 'error',
      });
      return true;
    }
    return false;
  };

  const VerifyEmptyFields = () => {
    if (values.name === '' || values.transporter === '' || values.phone === '' || values.email === '' || values.position === '' || values.city === '' ||
      values.state === '' || values.country === '' || values.vehicle === '' || values.numbers.length === 0 || values.document_driver_license === '' ||
      values.document_vehicle_insurance === '' || values.sta === '' || values.vehicles.length === 0 || values.password === '') {
      setOpenMsg({ ...openMsg, open: true, msg: t(REGISTER_MSG_EMPTY_FIELDS), type: 'error' });
      return true;
    }
    return false;
  };

  const handleCloseMsg = () => {
    setOpenMsg({ ...openMsg, open: false });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeStatus = (prop) => {
    setValues({ ...values, [prop]: !values.status });
  };

  const handleChangeVehicleStatus = (prop) => {
    setValues({ ...values, [prop]: !values.vehicle_status });
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const handleDocument = (event) => {
    getBase64(event.target.files[0], (result) => {
      setValues({ ...values, [event.target.name]: result });
    });
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleAddCompany = (valor) => {
    setCompanies([...companies, valor]);
    setValues({ ...values, companys: [...values.companys, valor] })
  };

  const handleChangeNumbers = (valor) => {
    if (numbers.find(item => item.id === valor.id)) {
      let arraySup = [];
      arraySup.push(...numbers)
      let index = arraySup.findIndex(item => item.id === valor.id);
      arraySup.splice(index, 1)
      setNumbers(arraySup)
      setValues({ ...values, numbers: arraySup })
    } else {
      setNumbers([...numbers, { id: valor.id }])
      setValues({ ...values, numbers: [...numbers, { id: valor.id }] })
    }
  }

  const handleAddVehicles = (valor) => {
    if (vehicles.find(item => item.id === valor.id)) {
      let arraySup = [];
      arraySup.push(...vehicles)
      let index = arraySup.findIndex(item => item.id === valor.id)
      arraySup.splice(index, 1)
      setVehicles(arraySup)
      setValues({ ...values, vehicles: arraySup })
    } else {
      setVehicles([...vehicles, { id: valor.id }])
      setValues({ ...values, vehicles: [...vehicles, { id: valor.id }] })
    }
  }

  const handleSubmit = () => {
    VerifyPassword();
    VerifyEmptyFields();
    if (VerifyEmptyFields() === false && VerifyPassword() === false) {
      dispatch(RegisterDriverRedux(values))
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.containerImgBackground}>
        <img src={Images.GZUZLOGOBRANCOGRANDE} alt="registerUser" />
      </div>

      <div className={classes.card}>
        <Divider colorDivider="#162F80" textAlign="left" className={classes.divider}>
          <Typography className={classes.titleFont} variant="h6">
            {t(REGISTER_DRIVERS_TITLE)}
          </Typography>
        </Divider>
        <TextField
          size="small"
          value={values.name}
          onChange={handleChange('name')}
          className={`${classes.input} ${classes.items}`}
          label={t(REGISTER_DRIVERS_LABEL_NAME)}
          type="text"
        />
        <div className={classes.containerCompany}>
          <TextField
            select
            label={t(REGISTER_DRIVERS_LABEL_COMPANY)}
            value={values.company}
            className={classes.companyInput}
            variant="outlined"
            size="small"
          >
            {companies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className={classes.btnAddCompany}
            onClick={() => handleModalAddCompany(true)}
          >
            {t(REGISTER_DRIVERS_BUTTON_ADD_COMPANY)}
          </Button>
        </div>
        <TextField
          size="small"
          value={values.transporter}
          onChange={handleChange('transporter')}
          className={`${classes.input} ${classes.items}`}
          label={t(REGISTER_DRIVERS_LABEL_CARRIER)}
          type="text"
        />
        <div className={classes.containerCellPhone}>
          <TextField
            size="small"
            value={values.phone}
            onChange={handleChange('phone')}
            type="number"
            className={classes.cellPhone}
            label={t(REGISTER_DRIVERS_LABEL_PHONE)}
          />
          <TextField
            size="small"
            value={values.email}
            onChange={handleChange('email')}
            className={classes.email}
            label={t(REGISTER_DRIVERS_LABEL_EMAIL)}
            type="text"
          />
        </div>
        <TextField
          size="small"
          value={values.position}
          onChange={handleChange('position')}
          className={`${classes.input} ${classes.items}`}
          label={t(REGISTER_DRIVERS_LABEL_POSITION)}
          type="text"
        />
        <div className={classes.containerCity}>
          <TextField
            size="small"
            value={values.city}
            onChange={handleChange('city')}
            className={classes.city}
            label={t(REGISTER_DRIVERS_LABEL_CITY)}
            type="text"
          />
          <TextField
            size="small"
            value={values.state}
            onChange={handleChange('state')}
            className={classes.state}
            label={t(REGISTER_DRIVERS_LABEL_STATE)}
            type="text"
          />
          <TextField
            size="small"
            value={values.country}
            onChange={handleChange('country')}
            className={classes.country}
            label={t(REGISTER_DRIVERS_LABEL_COUNTRY)}
            type="text"
          />
        </div>
        <div className={classes.containerSwitch}>
          <label>Status</label>
          <FormGroup>
            <FormControlLabel onChange={() => handleChangeStatus('status')} control={<Switch checked={values.status} />} label={t(REGISTER_DRIVERS_LABEL_ACTIVE)} />
          </FormGroup>
        </div>
        <div className={classes.containerVehicle}>
          <TextField
            size="small"
            value={values.vehicle}
            onChange={handleChange('vehicle')}
            className={classes.vehicle}
            label={t(REGISTER_DRIVERS_LABEL_VEHICLE)}
            type="text"
          />
          <FormGroup>
            <FormControlLabel
              onChange={() => handleChangeVehicleStatus('vehicle_status')}
              control={<Checkbox checked={values.vehicle_status} defaultChecked />}
              label={t(REGISTER_DRIVERS_CHECKBOX_VEHICLE)}
              className={classes.checkVehicle}
            />
          </FormGroup>
        </div>

        <FormGroup className={classes.containerCheckbox}>
          {dataNumbers.map((value) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={numbers.find(item => item.id === value.id) ? true : false}
                  onChange={() => handleChangeNumbers({ id: value.id, label: value.number })}
                />
              }
              label={value.number + "’"}
              key={value.id}
            />
          ))}
        </FormGroup>

        <div className={classes.containerUpload}>
          <label>{t(REGISTER_DRIVERS_LABEL_DRIVER_LICENSE)}</label>

          <label htmlFor="document_driver_license">
            <InputNEw
              onChange={event => handleDocument(event)}
              onClick={event =>  event.target.value = null }
              name='document_driver_license' accept="image/*" 
              id="document_driver_license" multiple type="file" />
            <Button
              variant="contained"
              component="span"
              startIcon={<UploadFileIcon />}
              type="file"
              accept="image/*"
              sx={{ backgroundColor: Colors.CINZA40 }}
            >
              Upload
            </Button>
          </label>
          <label>{t(REGISTER_DRIVERS_LABEL_DRIVER_DESCRIPTION)}</label>
        </div>
        <div className={classes.containerUpload}>
          <label>{t(REGISTER_DRIVERS_LABEL_VEHICLE_INSURANCE)}</label>

          <label htmlFor="document_vehicle_insurance">
            <InputNEw
              onChange={event => handleDocument(event)}
              onClick={event =>  event.target.value = null }
              name='document_vehicle_insurance'
              accept="image/*" id="document_vehicle_insurance" multiple type="file" />
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              type="file"
              accept="image/*"
              component="span"
              sx={{ backgroundColor: Colors.CINZA40 }}
            >
              Upload
            </Button>
          </label>
          <label>{t(REGISTER_DRIVERS_LABEL_DRIVER_DESCRIPTION)}</label>
        </div>
        <div className={classes.containerUpload}>
          <label>{t(REGISTER_DRIVERS_LABEL_STA)}</label>

          <label htmlFor="sta">
            <InputNEw
              onChange={event => handleDocument(event)}
              onClick={event =>  event.target.value = null }
              name='sta'
              accept="image/*" id="sta" multiple type="file" />
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              type="file"
              accept="image/*"
              component="span"
              sx={{ backgroundColor: Colors.CINZA40 }}
            >
              Upload
            </Button>
          </label>
          <label>{t(REGISTER_DRIVERS_LABEL_DRIVER_DESCRIPTION)}</label>
        </div>

        <div className={classes.containerCars}>
          {dataVehicles.map((value) => (
            <div
              className={classes.detailsCars}
              key={value.id}
            >
              <div className={classes.containerImgCar}>
                <div className={classes.selectedCar}>
                  <Checkbox
                    checked={vehicles.find(item => item.id === value.id) ? true : false}
                    onClick={() => handleAddVehicles({ id: value.id, model: value.model, length: value.length, weight: value.weight, height: value.height, width: value.width, image: value.image })} />
                </div>
                <img src={`${SERVER_IMAGES}/${value.image}`} alt="details cars" />
              </div>
              <div className={classes.containerTextCars}>
                <label>{value.model} </label>
                <label>{value.length + " x " + value.width + " x " + value.height + " " + value.weight} </label>
              </div>
            </div>
          ))}
        </div>

        <div className={classes.containerPassword}>
          <FormControl size="small" variant="outlined" className={classes.password}>
            <InputLabel htmlFor="outlined-adornment-password">
              {t(REGISTER_DRIVERS_LABEL_PASSWORD)}
            </InputLabel>
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={event => event.preventDefault()}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={t(REGISTER_DRIVERS_LABEL_PASSWORD)}
            />
          </FormControl>
          <FormControl size="small" variant="outlined" className={classes.ConfirmPassword}>
            <InputLabel htmlFor="outlined-adornment-password">
              {t(REGISTER_DRIVERS_LABEL_CONFIRM_PASSWORD)}
            </InputLabel>
            <OutlinedInput
              type={values.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={event => event.preventDefault()}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={t(REGISTER_DRIVERS_LABEL_CONFIRM_PASSWORD)}
            />
          </FormControl>
          <Button onClick={handleSubmit}
            variant="contained" className={classes.BtnRegister}>
            {t(REGISTER_DRIVERS_BTN_REGISTER)}
          </Button>
        </div>

        <NavLink to="/register" className={classes.containerBtnBack}>
          <ArrowLeftIcon className="register-drive-back icon" />
          Voltar
        </NavLink>
      </div>
      <ModalRegisterCompany
        openModaladdcompany={openModaladdcompany}
        handleModalAddCompany={handleModalAddCompany}
        handleAddCompany={handleAddCompany}
      />

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

export default RegisterDriver;
