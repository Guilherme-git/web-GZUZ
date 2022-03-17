import React, { useEffect, useState } from 'react';
import {
    FiberManualRecord as FiberManualRecordIcon,
    AddCircleOutline as AddCircleOutlineIcon,
    RemoveCircleOutline as RemoveCircleOutlineIcon,
    PhotoCamera,
    CircleOutlined as CircleOutlinedIcon
} from '@mui/icons-material';
import { FormGroup, FormControlLabel, Switch, Button, Checkbox, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { setOrderDetails, setPath } from '../../../../redux/createOrder.slice';
import { Steps } from '../../../../components';
import { Images } from '../../../../contants';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import {
    TITLE_PICKING_UP_01,
    TITLE_PICKING_UP_02,
    TITLE_PICKING_UP_03,
    TITLE_PICKING_UP_04,
    TITLE_DIMENSIONS_01,
    TITLE_DIMENSIONS_02,
    TITLE_DIMENSIONS_03,
    TITLE_DIMENSIONS_04,
    TITLE_CARGO,
    DIMENSION_FEET,
    DIMENSION_CENTIMETER,
    DIMENSION_LBS,
    DIMENSION_KGS,
    TOTAL_WEIGHT,
    LABEL_HIGHT,
    LABEL_WIDTH,
    LABEL_DEPTH,
    LABEL_WEIGHT,
    BTN_TAKE_PICTURE,
    TITLE_PURCHASE_ORDER_01,
    TITLE_PURCHASE_ORDER_02,
    TITLE_PURCHASE_ORDER_03,
    TITLE_PURCHASE_ORDER_04,
    LABEL_INVOICE_NUMBER,
    TITLE_OBSERVATION,
    LABEL_OBSERVATION,
    SELECT_TYPE_CARGO,
    SELECT_TYPE_DOCS,
    SELECT_TYPE_CARGO_DOCS,
    BTN_NEXT_ORDERS_ORDERS_DETAIL,
    BTN_BACK_ORDERS_ORDERS_DETAIL,
    TITLE_TOTAL_OBJ,
    TITLE_VOLUME,
    BTN_TITLE_BUTTOM_IMAGE_DOWNLOAD
} from '../../../../config/ConfigDefault';
import { makeStyles } from '@mui/styles';
import { fontWeight } from '@mui/system';

const CONFIG_IMG_CARS = [
    {
        id: 1,
        nome: 'Ford Van E250',
        description: 'L52 x W96 x H48 2500 Lbs',
        image: Images.FordVanE250
    },
    {
        id: 2,
        nome: 'Van Sprinter 2500',
        description: 'L171 x W52 x H70 5000 Lbs',
        image: Images.VanSprinter2500
    },
    {
        id: 3,
        nome: 'Flat Bed',
        description: 'L171 x W52 x H70 5000 Lbs',
        image: Images.FlatBed
    },
    {
        id: 4,
        nome: 'Pick Up Truck 16’',
        description: 'L52 x W96 x H48 2500 Lbs',
        image: Images.PickUpTruck16
    },
    {
        id: 5,
        nome: 'Truck 16’',
        description: 'L87 x W12 x H87 14500 Lbs',
        image: Images.Truck16
    },
    {
        id: 6,
        nome: 'Truck 26’',
        description: 'L52 x W96 x H90 22500 Lbs',
        image: Images.Truck26
    },
    {
        id: 7,
        nome: 'Cart',
        description: 'L87 x W12 x H87 14500 Lbs',
        image: Images.Cart
    }
];

const Input = styled('input')({
    display: 'none'
});

const useStyles = makeStyles((theme) => ({
    border: {
        backgroundColor: '#6ED949',
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        display: 'flex',
        marginLeft: '10px',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    borderNumber: {
        color: '#fff',
        fontSize: 30,
        //width: '100%',
        // alignSelf: 'center',
        // marginLeft: '18px' + ' !important',
        // marginRight: '18px' + ' !important'
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Roboto',
        fontStyle: 'normal'
    },
    containerPicking: {
        width: '70%',
        alignSelf: 'center',
        margin: '10px 0' + ' !important',
        position: 'relative',

        '& .cargo': {
            maxHeight: '200px',
            overflow: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    containerPicking1: {
        width: '70%',
        alignSelf: 'center',
        margin: '10px 0',
        marginLeft: '60px',
        marginTop: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',

        '& .cargo': {
            maxHeight: '200px',
            overflow: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    containerPicking2: {
        width: '70%',
        alignSelf: 'center',
        margin: '10px 0',
        marginTop: '-10px',
        position: 'relative',

        '& .cargo': {
            maxHeight: '200px',
            overflow: 'auto'
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        }
    },
    containerDimension: {
        //backgroundColor: 'blue',
        flexDirection: 'row' + ' !important',
        width: '70%',
        alignSelf: 'center',
        margin: '30px 0',
        marginLeft: '60px',
        marginTop: '-5px',
        position: 'relative',

        '& .cargo': {
            flexDirection: 'row' + ' !important',
            //backgroundColor: 'red',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            '& .cargo': {
                width: '90%'
            }
        },
        [theme.breakpoints.between('md', 'lg')]: {
            '& .cargo': {
                width: '40%'
            }
        },
        [theme.breakpoints.between('sm', 'md')]: {
            margin: '10px 0' + ' !important',
            '& .cargo': {
                width: '90%'
            }
        }
    },
    dot: {
        color: theme.palette.primary.AZUL
    },
    headerText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(1),
        '& :nth-child(1)': {
            marginRight: theme.spacing(2)
        },
        '& :nth-child(2)': {
            marginRight: theme.spacing(1),
            color: '#898989'
        },
        '& :nth-child(3)': {
            marginRight: theme.spacing(1),
            color: theme.palette.primary.AZUL,
            fontWeight: 'bold'
        },
        '& :nth-child(4)': {
            marginRight: theme.spacing(1),
            color: '#898989'
        },
        '& :nth-child(5)': {
            marginRight: theme.spacing(1),
            color: theme.palette.primary.AZUL,
            fontWeight: 'bold'
        },
        '& :nth-child(6)': {
            marginRight: theme.spacing(1),
            color: '#898989'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
            '& :nth-child(1)': {
                marginRight: theme.spacing(0)
            },
            '& :nth-child(2)': {
                marginRight: theme.spacing(1),
                color: '#898989'
            },
            '& :nth-child(3)': {
                marginRight: theme.spacing(1),
                color: theme.palette.primary.AZUL,
                fontWeight: 'bold'
            },
            '& :nth-child(4)': {
                marginRight: theme.spacing(1),
                color: '#898989'
            },
            '& :nth-child(5)': {
                marginRight: theme.spacing(1),
                color: theme.palette.primary.AZUL,
                fontWeight: 'bold'
            },
            '& :nth-child(6)': {
                marginRight: theme.spacing(1),
                color: '#898989'
            }
        }
    },
    addItem: {
        cursor: 'pointer'
    },
    removeItem: {
        cursor: 'pointer',
        color: 'red',
        marginLeft: theme.spacing(1)
    },
    containerCargo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing(2),

        '& :nth-child(1)': {
            marginRight: theme.spacing(2)
        }
    },
    cargo: {
        width: '60%'
    },
    cargoNumber: {
        width: '30%'
    },
    containerWeight: {
        display: 'flex' + ' !important',
        flexDirection: 'row' + ' !important',
        alignItems: 'center' + ' !important',
        position: 'absolute',
        right: '0px',
        top: '30px',
        '& .vertical': {
            display: 'flex',
            flexDirection: 'column',
            marginRight: theme.spacing(2),
            alignSelf: 'center'
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex' + ' !important',
            flexDirection: 'row' + ' !important',
            alignItems: 'center' + ' !important',
            position: 'relative',
            top: '0',
            marginBottom: theme.spacing(2),
            '& .vertical': {
                display: 'flex',
                flexDirection: 'column',
                marginRight: theme.spacing(2)
            }
        },
        [theme.breakpoints.between('sm', 'md')]: {
            display: 'flex' + ' !important',
            flexDirection: 'row' + ' !important',
            alignItems: 'center' + ' !important',
            position: 'relative',
            top: '0',
            marginBottom: theme.spacing(2),
            '& .vertical': {
                display: 'flex',
                flexDirection: 'column',
                marginRight: theme.spacing(2)
            }
        },
        [theme.breakpoints.between('md', 'lg')]: {
            right: '-100px'
        }
    },
    labelSwitch: {
        color: '#898989',
        fontSize: '15px' + ' !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px' + ' !important'
        }
    },
    switchSize: {
        width: '50px' + ' !important',
        [theme.breakpoints.down('sm')]: {
            fontSize: '100px' + ' !important'
        }
    },
    cargoInput: {
        width: '120px',
    },
    containerCargoInput: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        '& :nth-child(1)': {
            marginRight: theme.spacing(2)
        },
        '& :nth-child(2)': {
            marginRight: theme.spacing(2)
        },
        '& :nth-child(3)': {
            marginRight: theme.spacing(2)
        },
        [theme.breakpoints.down('sm')]: {
            '& :nth-child(1)': {
                marginRight: theme.spacing(1)
            },
            '& :nth-child(2)': {
                marginRight: theme.spacing(1)
            },
            '& :nth-child(3)': {
                marginRight: theme.spacing(1)
            }
        }
    },
    containerCargoInput1: {
        //backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'row' + ' !important',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: theme.spacing(2),
        '& :nth-child(1)': {
            marginRight: theme.spacing(2)
        },
        '& :nth-child(2)': {
            marginRight: theme.spacing(2)
        },
        '& :nth-child(3)': {
            marginRight: theme.spacing(2)
        },
        [theme.breakpoints.down('sm')]: {
            '& :nth-child(1)': {
                marginRight: theme.spacing(1)
            },
            '& :nth-child(2)': {
                marginRight: theme.spacing(1)
            },
            '& :nth-child(3)': {
                marginRight: theme.spacing(1)
            }
        }
    },
    btnTakePicture: {
        backgroundColor: theme.palette.primary.AZUL + ' !important',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    invoiceInput: {
        width: '60%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            '& .MuiInputLabel-root': {
                fontSize: '10px'
            }
        }
    },
    spaceBotton: {
        marginBottom: theme.spacing(4)
    },
    observationInput: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            '& .MuiInputLabel-root': {
                fontSize: '10px'
            }
        }
    },
    observationOptions: {
        display: 'flex' + ' !important',
        flexDirection: 'row' + ' !important',
        alignItems: 'center' + ' !important',
        margin: theme.spacing(2, 0)
    },
    containerMainCars: {
        width: '70%',
        alignSelf: 'center',
        marginBottom: theme.spacing(2)
    },
    containerCars: {
        display: 'flex',
        alignItems: 'center',

        marginBottom: theme.spacing(3) + ' !important',
        // width: '70%',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        }
    },
    detailsCars: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' + ' !important',
        justifyContent: 'space-between' + ' !important',
        marginRight: theme.spacing(3) + ' !important',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column' + ' !important',
            marginBottom: theme.spacing(2) + ' !important'
        }
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
        marginBottom: theme.spacing(1) + ' !important',
        position: 'relative',
        '&:hover': {
            boxShadow: `0px 10px 1px ${theme.palette.primary.AMARELO}` + ' !important'
        },
        '& img': {
            width: '150px'
        }
    },
    selectedCar: {
        position: 'absolute',
        top: '0px'
    },
    containerTextCars: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [feetOrCentimeter, setFeetOrCentimeter] = useState('');
    const [lbsOrKgs, setLbsOrKgs] = useState('');
    const [totalWeight, seTotalWeight] = useState('');
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [purchaseOrder, setPurchaseOrder] = useState('');
    const [observation, setObservation] = useState('');
    const [observationCargo, setObservationCargo] = useState('');

    let [carga, setCarga] = useState();

    const [carga2, setCarga2] = useState([{
        carga: '', picture: {}
    }])
    const [dimensao, setDimensao] = useState([
        { altura: '', largura: '', profundidade: '', peso: '', feetOrCentimeter: '', lbsOrKgs: '' }
    ])

    const [dataDimension, setDataDimension] = useState([
        { altura: '', largura: '', profundidade: '', peso: '' }
    ]);
    const [selectedCars, setSelectedCars] = React.useState([]);

    const resultRedux = useSelector(function (state) {
        return state.order
    })

    useEffect(() => {
        if (Object.keys(resultRedux.orderDetails.data).length !== 0) {
            setCarga(resultRedux.orderDetails.data.carga);
            setDataDimension(resultRedux.orderDetails.data.dimensoes);
            setFeetOrCentimeter(resultRedux.orderDetails.data.tipo_peso);
            setLbsOrKgs(resultRedux.orderDetails.data.tipo_altura);
            seTotalWeight(resultRedux.orderDetails.data.peso_total);
            setSelectedFiles(resultRedux.orderDetails.data.foto);
            setPurchaseOrder(resultRedux.orderDetails.data.numeros);
            setObservation(resultRedux.orderDetails.data.observacao);
            setObservationCargo(resultRedux.orderDetails.data.tipo);
            setSelectedCars(resultRedux.orderDetails.data.automoveis);
        }
    }, [resultRedux.orderDetails.data])

    const addCampos = () => {
        setCarga2([...carga2, { carga: '', picture: {} }])
    }

    const mudarCampos = (event, index) => {
        const { value, name } = event.target;
        let newCarga = [];
        newCarga.push(...carga2);
        newCarga[index] = { ...carga2[index], [name]: value }
        setCarga2(newCarga)
    }

    const mudarCamposPicture = (event, index) => {
        const { name } = event.target;
        const file = event.target.files[0];
        console.log(file)
        let newCarga = [];
        newCarga.push(...carga2);
        newCarga[index] = { ...carga2[index], [name]: file }
        setCarga2(newCarga)
    }

    const addDimensao = () => {
        setDimensao([...dimensao, { altura: '', largura: '', profundidade: '', peso: '', feetOrCentimeter: '' }])
    }

    const mudarDimensao = (event, index) => {
        const { value, name } = event.target;
        let array = [];
        array.push(...dimensao);
        array[index] = { ...dimensao[index], [name]: value }
        setDimensao(array)
    }

    const adicionar = () => {
        addCampos()
        addDimensao()
    }

    const remover = () => {
        if (carga2.length > 1) {
            const arrayCarga2 = [...carga2]
            arrayCarga2.pop()
            setCarga2(arrayCarga2)
        }

        if (dimensao.length > 1) {
            const arrayDimensao = [...dimensao]
            arrayDimensao.pop()
            setDimensao(arrayDimensao)
        }

    }

    const handleAddDimension = (event) => {
        event.preventDefault();
        setDataDimension([...dataDimension, { altura: '', largura: '', profundidade: '', peso: '' }]);
    };

    const handleRemoveDimension = (event, index) => {
        event.preventDefault();
        const arraySupport = [...dataDimension];
        arraySupport.splice(index, 1);
        setDataDimension(arraySupport);
    };

    const handleDimension = (event, index) => {
        const { value, name } = event.target;
        let newState = [];
        newState.push(...dataDimension);
        newState[index] = { ...dataDimension[index], [name]: value };
        setDataDimension(newState);
    };

    const handleTakePicture = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        console.log(typeof file, 'MINHA FOTO')
        setSelectedFiles(file);
    };

    const handleClickCar = (nome, id) => {
        const verify = selectedCars?.find((car) => car.id === id);
        if (verify !== undefined) {
            const arraySupport = [...selectedCars];
            const filterId = arraySupport.filter((car) => car.id !== verify.id);
            setSelectedCars(filterId);
        } else {
            setSelectedCars([...selectedCars, { nome, id }]);
        }
    };

    const verifyChecked = (id) => {
        const verify = selectedCars?.find((car) => car.id === id);
        return verify?.id;
    };

    const checkFields = () => {
        if (
            carga === '' ||
            dataDimension?.length === 0 ||
            feetOrCentimeter === '' ||
            lbsOrKgs === '' ||
            purchaseOrder === '' ||
            observation === '' ||
            observationCargo === ''
        ) {
            return true;
        }
        return false;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = {
        //     carga: carga,
        //     dimensoes: dataDimension,
        //     tipo_peso: feetOrCentimeter,
        //     tipo_altura: lbsOrKgs,
        //     peso_total: totalWeight,
        //     foto: selectedFiles,
        //     numeros: purchaseOrder,
        //     observacao: observation,
        //     tipo: observationCargo,
        //     automoveis: selectedCars
        // };
        // dispatch(setOrderDetails(data));

        console.log(dimensao)
    };

    return (

        <div className={classes.container}>
            {/* 01 */}
            <div className={classes.containerPicking}>
                <FormGroup className={classes.observationOptions}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                className="container-observation-options check"
                                icon={<CircleOutlinedIcon />}
                                checked={observationCargo === 'observationCargo'}
                                onChange={(event) => setObservationCargo(event.target.value)}
                                value="observationCargo"
                            />
                        }
                        label={t(SELECT_TYPE_CARGO)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                className="container-observation-options check"
                                icon={<CircleOutlinedIcon />}
                                checked={observationCargo === 'observationDocs'}
                                onChange={(event) => setObservationCargo(event.target.value)}
                                value="observationDocs"
                            />
                        }
                        label={t(SELECT_TYPE_DOCS)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                className="container-observation-options check"
                                icon={<CircleOutlinedIcon />}
                                checked={observationCargo === 'observationCargoDocs'}
                                onChange={(event) => setObservationCargo(event.target.value)}
                                value="observationCargoDocs"
                            />
                        }
                        label={t(SELECT_TYPE_CARGO_DOCS)}
                    />
                </FormGroup>
            </div>


            {/* 02 */}
            <div className={[`${classes.containerPicking} ${classes.spaceBotton}`]}>
                <div className={classes.headerText}>
                    <FiberManualRecordIcon className={classes.dot} />
                    <label>{t(TITLE_PURCHASE_ORDER_01)}</label>
                    <label>{t(TITLE_PURCHASE_ORDER_02)}</label>
                    <label> {t(TITLE_PURCHASE_ORDER_03)}</label>
                    <label>{t(TITLE_PURCHASE_ORDER_04)}</label>
                </div>

                <TextField
                    // className={classes.invoiceInput}
                    classes={{ root: classes.invoiceInput }}
                    label={t(LABEL_INVOICE_NUMBER)}
                    name="purchaseOrder"
                    value={purchaseOrder}
                    onChange={(event) => setPurchaseOrder(event.target.value)}
                    variant="standard"
                />
            </div>


            {/* 03 */}
            <div className={classes.containerPicking1}>
                <div>
                    <div className={classes.headerText}>
                        <FiberManualRecordIcon className={classes.dot} />
                        <label>{t(TITLE_PICKING_UP_01)}</label>
                        <label>{t(TITLE_PICKING_UP_02)}</label>
                        <label>{t(TITLE_PICKING_UP_03)}</label>
                        <label>{t(TITLE_PICKING_UP_04)}</label>
                    </div>
                    {carga2?.map((item, index) => {
                        return (
                            <div className="cargo">
                                <div className={classes.containerCargo}>
                                    <TextField
                                        style={{ flex: 1, width: 300 }}
                                        label={t(TITLE_CARGO)}
                                        name="carga"
                                        variant="standard"
                                        value={item.carga}
                                        className={classes.cargo}
                                        onChange={(event) => mudarCampos(event, index)}
                                    />

                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            name='picture'
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={(event) => mudarCamposPicture(event, index)}
                                        />
                                        <Button
                                            className={classes.btnTakePicture}
                                            variant="contained"
                                            component="span"
                                            startIcon={<PhotoCamera />}
                                        >
                                            {t(BTN_TAKE_PICTURE)}
                                        </Button>
                                    </label>

                                    <label htmlFor="contained-button-file" style={{ marginLeft: '10px' }}>
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            multiple
                                            type="file"
                                            onChange={handleTakePicture}
                                        />
                                        <Button
                                            className={classes.btnTakePicture}
                                            variant="contained"
                                            component="span"
                                        >
                                            {t(BTN_TITLE_BUTTOM_IMAGE_DOWNLOAD)}
                                        </Button>
                                    </label>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            {/* 04 */}
            <div className={classes.containerDimension}>
                <div className={classes.headerText}>
                    <FiberManualRecordIcon className={classes.dot} />
                    <label>{t(TITLE_DIMENSIONS_01)}</label>
                    <label> {t(TITLE_DIMENSIONS_02)}</label>
                    <label> {t(TITLE_DIMENSIONS_03)}</label>
                    <label> {t(TITLE_DIMENSIONS_04)}</label>
                </div>

                {dimensao?.map((item, index) => {
                    return (
                        <div className="cargo">
                            <div className={classes.containerCargoInput1} key={index}>
                                <TextField
                                    className={classes.cargoInput}
                                    label={t(LABEL_HIGHT)}
                                    name="altura"
                                    variant="standard"
                                    onChange={(event) => mudarDimensao(event, index)}
                                    value={item.altura}
                                    type="number"
                                />
                                <TextField
                                    className={classes.cargoInput}
                                    label={t(LABEL_WIDTH)}
                                    name="largura"
                                    variant="standard"
                                    onChange={(event) => mudarDimensao(event, index)}
                                    value={item.largura}
                                    type="number"
                                />
                                <TextField
                                    className={classes.cargoInput}
                                    label={t(LABEL_DEPTH)}
                                    name="profundidade"
                                    variant="standard"
                                    onChange={(event) => mudarDimensao(event, index)}
                                    value={item.profundidade}
                                    type="number"
                                />

                                <div className="vertical" style={{ marginLeft: '50px' }}>
                                    <FormControlLabel
                                        classes={{ label: classes.labelSwitch }}
                                        control={
                                            <Switch
                                                checked={dimensao[index].feetOrCentimeter === 'feet'}
                                                name='feetOrCentimeter'
                                                value="feet"
                                                classes={{
                                                    root: classes.switchSize
                                                }}
                                                onChange={(event) => mudarDimensao(event, index)}
                                            />
                                        }
                                        label={t(DIMENSION_FEET)}
                                    />
                                    <FormControlLabel
                                        classes={{ label: classes.labelSwitch }}
                                        control={
                                            <Switch
                                                classes={{
                                                    root: classes.switchSize
                                                }}
                                                checked={dimensao[index].feetOrCentimeter === 'centimeter'}
                                                name='feetOrCentimeter'
                                                value="centimeter"
                                                onChange={(event) => mudarDimensao(event, index)}
                                            />
                                        }
                                        label={t(DIMENSION_CENTIMETER)}
                                    />
                                </div>

                                <TextField
                                    className={classes.cargoInput}
                                    label={t(LABEL_WEIGHT)}
                                    name="peso"
                                    variant="standard"
                                    type="number"
                                    onChange={(event) => mudarDimensao(event, index)}
                                />

                                <div>
                                    <FormControlLabel
                                        classes={{ label: classes.labelSwitch }}
                                        control={
                                            <Switch
                                                classes={{
                                                    root: classes.switchSize
                                                }}
                                                checked={dimensao[index].lbsOrKgs === 'lbs'}
                                                name='lbsOrKgs'
                                                value="lbs"
                                                onChange={(event) => mudarDimensao(event, index)}
                                            />
                                        }
                                        label={t(DIMENSION_LBS)}
                                    />
                                    <FormControlLabel
                                        classes={{ label: classes.labelSwitch }}
                                        control={
                                            <Switch
                                                classes={{
                                                    root: classes.switchSize
                                                }}
                                                checked={dimensao[index].lbsOrKgs === 'kgs'}
                                                name='lbsOrKgs'
                                                value="kgs"
                                                onChange={(event) => mudarDimensao(event, index)}
                                            />
                                        }
                                        label={t(DIMENSION_KGS)}
                                    />
                                </div>

                            </div>
                        </div>
                    );
                })}

                <div style={{ /*backgroundColor: 'yellow'*/ width: '50px' }}>
                    <div className={classes.border} onClick={adicionar} >
                        <div className={classes.borderNumber}>+</div>
                    </div>
                    <div onClick={remover}
                        className={classes.border} style={{ marginTop: '10px', color: '#fff', backgroundColor: '#bebebe' }} /*onClick={handleAddDimension} */>
                        <ContentCopyOutlinedIcon style={{ alignSelf: 'center' }} />
                    </div>
                </div>

            </div>




            {/* 05 */}
            <div className={classes.containerPicking2}>
                <div className="cargo">
                    <div className={classes.containerCargoInput}>
                        <TextField
                            style={{ width: '150px' }}
                            label={t(TITLE_TOTAL_OBJ)}
                            name="carga"
                            variant="standard"
                            className={classes.cargo}
                        />
                        <TextField
                            style={{ width: '150px' }}
                            label={t(TITLE_VOLUME)}
                            name="carga"
                            variant="standard"
                        />
                        <TextField
                            style={{ width: '150px' }}
                            label={t(TOTAL_WEIGHT)}
                            variant="standard"
                            value={totalWeight}
                        />
                    </div>
                </div>
            </div>



            {/* 06 */}
            <div className={classes.containerMainCars}>
                <div className={classes.containerCars}>
                    {CONFIG_IMG_CARS.map(({ nome, image, description, id }) => (
                        <div
                            className={classes.detailsCars}
                            key={id}
                            onClick={() => handleClickCar(nome, id)}
                        >
                            <div className={classes.containerImgCar}>
                                <div className={classes.selectedCar}>
                                    <Checkbox checked={verifyChecked(id) === id} />
                                </div>
                                <img src={image} alt="details cars" />
                            </div>
                            <div className={classes.containerTextCars}>
                                <label>{nome} </label>
                                <label>{description} </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 07 */}
            <div className={classes.containerPicking}>
                <TextField
                    className={classes.observationInput}
                    label={t(LABEL_OBSERVATION)}
                    name="cargo"
                    variant="standard"
                    value={observation}
                    onChange={(event) => setObservation(event.target.value)}
                />
            </div>

            {/* 08 */}
            <div className={classes.containerPicking}>
                <div className={classes.btnFooter}>
                    <Button
                        variant="contained"
                        onClick={() => dispatch(setPath("/home/user/ordem/create/delivery-details"))}
                    >
                        {t(BTN_BACK_ORDERS_ORDERS_DETAIL)}
                    </Button>
                    <Button /*disabled={checkFields()}*/
                        variant="contained" onClick={handleSubmit}  >
                        {t(BTN_NEXT_ORDERS_ORDERS_DETAIL)}
                    </Button>
                </div>
            </div>
        </div>
    );
}