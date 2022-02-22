/* eslint-disable object-curly-newline */
import React, { useState } from 'react';

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

import { Images, Colors } from '../../../contants';
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
} from '../../../config/ConfigDefault';
import { Divider, ModalRegisterCompany } from '../../../components';

import { makeStyles } from '@mui/styles';

const CONFIG_IMG_CARS = [
  {
    id: 1,
    name: 'Ford Van E250',
    description: 'L52 x W96 x H48 2500 Lbs',
    image: Images.FordVanE250,
  },
  {
    id: 2,
    name: 'Van Sprinter 2500',
    description: 'L171 x W52 x H70 5000 Lbs',
    image: Images.VanSprinter2500,
  },
  {
    id: 3,
    name: 'Flat Bed',
    description: 'L171 x W52 x H70 5000 Lbs',
    image: Images.FlatBed,
  },
  {
    id: 4,
    name: 'Pick Up Truck 16’',
    description: 'L52 x W96 x H48 2500 Lbs',
    image: Images.PickUpTruck16,
  },
  {
    id: 5,
    name: 'Truck 16’',
    description: 'L87 x W12 x H87 14500 Lbs',
    image: Images.Truck16,
  },
  {
    id: 6,
    name: 'Truck 26’',
    description: 'L52 x W96 x H90 22500 Lbs',
    image: Images.Truck26,
  },
  {
    id: 7,
    name: 'Cart',
    description: 'L87 x W12 x H87 14500 Lbs',
    image: Images.Cart,
  },
];

const companiesList = [
  {
    value: 'company',
    label: 'company 01',
    adress: 'Rua 01',
    ein: '123456789',
  },
  {
    value: 'company001',
    label: 'company 02',
    adress: 'Rua 01',
    ein: '123456789',
  },
  {
    value: 'company002',
    label: 'company 03',
    adress: 'Rua 01',
    ein: '123456789',
  },
  {
    value: 'company003',
    label: 'company 04',
    adress: 'Rua 01',
    ein: '123456789',
  },
];

const InputNEw = styled('input')({
  display: 'none',
});

const CONFIG_CHECKBOX = [
  {
    id: 1,
    label: '18’',
  },
  {
    id: 2,
    label: '18’',
  },
  {
    id: 3,
    label: '24’',
  },
  {
    id: 4,
    label: '26’',
  },
  {
    id: 5,
    label: '53’',
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
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([...companiesList]);
  const [company, setCompany] = useState('');
  const [openModaladdcompany, setOpenModaladdcompany] = useState(false);
  const [checkBox, setCheckBox] = useState({
    id: 0,
    label: '',
  });
  const [selectCars, setSelectCars] = useState({
    id: 0,
    name: '',
    description: '',
  });

  const handleModalAddCompany = (valor) => {
    setOpenModaladdcompany(valor);
  };

  const [values, setValues] = useState({
    amount: '',
    password: '',
    confirmPassword: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const handleChange = (prop) => (event) => {
    console.log([prop])
    setValues({ ...values, [prop]: event.target.value });
  };

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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCompany = (event) => {
    setCompany(event.target.value);
  };

  const handleAddCompany = (valor) => {
    setCompanies([...companies, valor]);
  };

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
          className={`${classes.input} ${classes.items}`}
          label={t(REGISTER_DRIVERS_LABEL_NAME)}
          type="text"
        />
        <div className={classes.containerCompany}>
          <TextField
            select
            label={t(REGISTER_DRIVERS_LABEL_COMPANY)}
            value={company}
            onChange={handleCompany}
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
          className={`${classes.input} ${classes.items}`}
          // className={[classes.input, classes.items]}
          label={t(REGISTER_DRIVERS_LABEL_CARRIER)}
          type="text"
        />
        <div className={classes.containerCellPhone}>
          <TextField
            size="small"
            type="number"
            className={classes.cellPhone}
            label={t(REGISTER_DRIVERS_LABEL_PHONE)}
          />
          <TextField
            size="small"
            className={classes.email}
            label={t(REGISTER_DRIVERS_LABEL_EMAIL)}
            type="text"
          />
        </div>
        <TextField
          size="small"
          className={`${classes.input} ${classes.items}`}
          // className={[classes.input, classes.items]}
          label={t(REGISTER_DRIVERS_LABEL_POSITION)}
          type="text"
        />
        <div className={classes.containerCity}>
          <TextField
            size="small"
            className={classes.city}
            label={t(REGISTER_DRIVERS_LABEL_CITY)}
            type="text"
          />
          <TextField
            size="small"
            className={classes.state}
            label={t(REGISTER_DRIVERS_LABEL_STATE)}
            type="text"
          />
          <TextField
            size="small"
            className={classes.country}
            label={t(REGISTER_DRIVERS_LABEL_COUNTRY)}
            type="text"
          />
        </div>
        <div className={classes.containerSwitch}>
          <label>Status</label>
          <FormGroup>
            <FormControlLabel control={<Switch />} label={t(REGISTER_DRIVERS_LABEL_ACTIVE)} />
          </FormGroup>
        </div>
        <div className={classes.containerVehicle}>
          <TextField
            size="small"
            className={classes.vehicle}
            label={t(REGISTER_DRIVERS_LABEL_VEHICLE)}
            type="text"
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={t(REGISTER_DRIVERS_CHECKBOX_VEHICLE)}
              className={classes.checkVehicle}
            />
          </FormGroup>
        </div>

        <FormGroup className={classes.containerCheckbox}>
          {CONFIG_CHECKBOX.map(({ label, id }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={id === checkBox.id}
                  onChange={() => setCheckBox({ id, label })}
                />
              }
              label={label}
              key={id}
            />
          ))}
        </FormGroup>

        <div className={classes.containerUpload}>
          <label>{t(REGISTER_DRIVERS_LABEL_DRIVER_LICENSE)}</label>

          <label htmlFor="contained-button-file">
            <InputNEw accept="image/*" id="contained-button-file" multiple type="file" />
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

          <label htmlFor="contained-button-file">
            <InputNEw accept="image/*" id="contained-button-file" multiple type="file" />
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

          <label htmlFor="contained-button-file">
            <InputNEw accept="image/*" id="contained-button-file" multiple type="file" />
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
          {CONFIG_IMG_CARS.map(({ name, image, description, id }) => (
            <div
              className={classes.detailsCars}
              key={id}
              onClick={() => setSelectCars({ id, name, description })}
            >
              <div className={classes.containerImgCar}>
                <div className={classes.selectedCar}>
                  <Checkbox checked={id === selectCars.id} />
                </div>
                <img src={image} alt="details cars" />
              </div>
              <div className={classes.containerTextCars}>
                <label>{name} </label>
                <label>{description} </label>
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
                    onMouseDown={handleMouseDownPassword}
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
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={t(REGISTER_DRIVERS_LABEL_CONFIRM_PASSWORD)}
            />
          </FormControl>
          <Button variant="contained" className={classes.BtnRegister}>
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
    </div>
  );
};

export default RegisterDriver;
