
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Images, Colors } from '../../../contants';
import "./styles.scss"
import {
    Divider,
    ModalNewOffer,
    ModalCancelOrder,
    BasicBreadcrumbs,
    ModalShowImages,
    HeaderHome
} from '../../../components';
import {
    PATH_SEE_MORE,
    TITLE_OPEN_REQUEST,
    TITLE_IN_PROGRESS_REQUEST,
    TITLE_CANCELED_REQUEST,
    MSG_UNANSWERED,
    TITLE_PICKUP,
    TITLE_DROPOFF,
    MSG_PICKUP_DETAILS,
    TITLE_BILL_TO,
    TITLE_DATE_ORDER_DETAIL,
    TITLE_TIME,
    TITLE_COMPANY_NAME,
    TITLE_CONTACT_NAME,
    TITLE_EMAIL,
    TITLE_PHONE,
    TITLE_ADRESS,
    TITLE_ZIPCODE,
    TITLE_CITY,
    TITLE_STATE,
    TITLE_DELIVERY_DETAILS,
    TITLE_ORDER_DETAILS,
    TITLE_BTN_CANCEL_ORDER,
    TITLE_BTN_EDIT_OFFER,
    ORDER_DETAILS_BTN_BACK,
    ORDER_DETAILS_MSG_CANCELED_ORDER
} from '../../../config/ConfigDefault';
import { useSelector, useDispatch } from 'react-redux';
import { listOrder, setStatus } from '../../../redux/createOrder.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        alignSelf: 'center',
        width: '90%',
        height: '100vh',
        fontFamily: 'Roboto'
        // marginTop: '10px',
    },
    title: ({ status }) => ({
        color: theme.palette.primary.BRANCO,
        backgroundColor: status === 'Canceled' ? '#EA6766' : status === 'Open request' ? '#6ed949' : theme.palette.primary.AMARELO,
      
        //backgroundColor: status === 'In progress' && ,
        width: '108px',
        height: '22px',
        borderRadius: '16px',
        padding: '7px 5px'
    }),

    unanswered: {
        display: 'flex',
        backgroundColor: theme.palette.primary.AZUL,
        padding: '10px',
        borderRadius: '10px',
        color: theme.palette.primary.BRANCO,
        marginTop: '20px',
        alignItems: 'center',
        cursor: 'pointer',
        '& .circle': {
            width: '32px',
            height: '32px',
            backgroundColor: theme.palette.primary.BRANCO,
            borderRadius: '50%',
            color: theme.palette.primary.AZUL,
            fontWeight: 'bold',
            fontSize: '22px',
            lineHeight: '26px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10px'
        },
        '& h4': {
            fontWeight: 'bold',
            fontSize: '22px',
            lineHeight: '26px'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '5px',
            marginTop: '10px',
            '& .circle': {
                width: '25px',
                height: '25px',
                fontSize: '19px',
                marginRight: '10px'
            },
            '& h4': {
                fontWeight: 'bold',
                fontSize: '19px'
            }
        }
    },
    containerProduct: {
        border: `5px solid ${theme.palette.primary.AMARELO}`,
        margin: '15px 0',
        padding: '30px',
        borderRadius: '10px',
        position: 'relative',
        '& .containerPickupDropoff': {
            display: 'flex',
            marginBottom: '5px',
            '& .pickup': {
                color: theme.palette.primary.AMARELO,
                marginRight: '10px',
                fontSize: '16px',
                lineHeight: '19px'
            },
            '& .pickupDetail': {
                color: theme.palette.primary.CINZA60,
                fontSize: '16px',
                lineHeight: '19px'
            }
        },
        '& .productDetail': {
            color: theme.palette.primary.CINZA60,
            fontSize: '16px',
            lineHeight: '19px',
            marginTop: '10px',
            width: '80%'
        },
        '& .productImg': {
            display: 'flex',
            position: 'absolute',
            right: '100px',
            top: '15px',
            cursor: 'pointer',
            '& img': {
                position: 'absolute'
            },
            '& img:nth-child(2)': {
                transform: 'rotate(30deg)'
            }
        },
        [theme.breakpoints.down('sm')]: {
            margin: '10px 0',
            padding: '20px',
            '& .containerPickupDropoff': {
                display: 'flex',
                marginBottom: '5px',
                '& .pickup': {
                    marginRight: '10px',
                    fontSize: '10px' + ' !important',
                    lineHeight: '19px'
                },
                '& .pickupDetail': {
                    fontSize: '10px' + ' !important',
                    lineHeight: '19px'
                }
            },
            '& .productDetail': {
                fontSize: '10px' + ' !important',
                lineHeight: '19px',
                marginTop: '10px',
                width: '80%'
            },
            '& .productImg': {
                right: '55px',
                top: '40px',
                '& img': {
                    width: '40px'
                }
            }
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: '10px',
        '& .detailsWrap': {
            '& .detailsOrdem': {
                color: theme.palette.primary.CINZA80,
                margin: '10px 0',
                fontFamily: 'Roboto',
                lineHeight: '16px',
                fontWeight: 'normal',
                [theme.breakpoints.down('sm')]: {
                    fontSize: '12px' + ' !important'
                }
            },
            '& .divider': {
                color: 'red' + '!important',
                fontSize: '16px',
                lineHeight: '19px',
                fontWeight: 'normal',
                [theme.breakpoints.down('sm')]: {
                    marginBottom: '10px'
                }
            }
        },
        '& .confirmationDetails': {
            '& .horizontal': {
                color: theme.palette.primary.CINZA80,
                fontFamily: 'Open Sans',
                lineHeight: '16px',
                fontWeight: 'normal',
                marginBottom: '10px',
                '& label:nth-of-type(1)': {
                    marginRight: '10px'
                },
                '& label:nth-of-type(2)': {
                    marginRight: '100px'
                },
                '& label:nth-of-type(3)': {
                    marginRight: '7px'
                },
                '& label:nth-of-type(4)': {
                    marginRight: '100px'
                }
            },

            [theme.breakpoints.down('sm')]: {
                '& .horizontal': {
                    marginBottom: '5px',
                    '& label:nth-of-type(1)': {
                        marginRight: '5px' + '!important'
                    },
                    '& label:nth-of-type(2)': {
                        marginRight: '20px' + '!important'
                    },
                    '& label:nth-of-type(3)': {
                        marginRight: '5px' + '!important'
                    },
                    '& label:nth-of-type(4)': {
                        marginRight: '20px' + '!important'
                    }
                }
            }
        }
    },
    btnOrders: (props) => ({
        '& .btnCancelOrder': {
            backgroundColor: props.status === 'Canceled' ? '#EA6766' : theme.palette.primary.AMARELO
        },
        '& button': {
            backgroundColor: theme.palette.primary.AMARELO,
            width: '290px',
            height: '34.86px'
        },
        '& button:nth-child(1)': {
            marginRight: '30px'
        },
        '& .back': {
            display: 'flex',
            justifyContent: 'flex-end',
            '& button': {
                backgroundColor: theme.palette.primary.CINZA30,
                width: '111px',
                height: '35px'
            }
        },

        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            '& button': {
                width: '100%',
                height: '34.86px'
            },
            '& button:nth-child(2)': {
                margin: '15px 0'
            },
            '& .back': {
                display: 'flex',
                flexDirection: 'column' + '!important',
                justifyContent: 'center' + '!important',
                marginBottom: '10px',
                '& button': {
                    backgroundColor: theme.palette.primary.CINZA30,
                    width: '100%' + '!important'
                    // height: '35px',
                }
            }
        }
    })
}));

export default () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [modalOffer, setModalOffer] = useState(false);
    const [modalCancelOrder, setModalCancelOrder] = useState(false);
    const [modalShowImages, setModalShowImages] = useState(false);
    const resultRedux = useSelector(function (state) {
        return state.order
    });
    const { detalhe_entrega, detalhe_retirada, usuario, status } = resultRedux.orderListed;
    const classes = useStyles({ status });

    useEffect(() => {
        dispatch(listOrder(id));
        dispatch(setStatus()) // depois remover
        console.log( resultRedux.orderListed )
    }, [dispatch, id]);

    const handleModalShowImages = (valor) => {
        setModalShowImages(valor);
    };

    const handleOpenOffer = (valor) => {
        setModalOffer(valor);
    };

    const handleCancelOffer = (valor) => {
        setModalCancelOrder(valor);
    };

    const ProductDetails = () => (
        <div className={classes.containerProduct}>
            <div className="containerPickupDropoff">
                <div className="pickup">{t(TITLE_PICKUP)}:</div>
                <div className="pickupDetail"> {detalhe_retirada?.endereco} </div>
            </div>
            <div className="containerPickupDropoff">
                <div className="pickup">{t(TITLE_DROPOFF)}:</div>
                <div className="pickupDetail">{detalhe_entrega?.endereco}</div>
            </div>
            <div className="productDetail">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a consectetur lectus.
                Vivamus augue velit, dictum at malesuada et.
            </div>
            <div className="productImg" onClick={() => handleModalShowImages(true)}>
                <img src={Images.box} alt="box" />
                <img src={Images.box} alt="box" />
                <img src={Images.box} alt="box" />
            </div>
        </div>
    );


    const Unanswered = () => (
        <div className={classes.unanswered} onClick={() => handleOpenOffer(true)}>
            <div className="circle">1</div>
            <h4>{t(MSG_UNANSWERED)}</h4>
        </div>
    );

    const DETALHE_RETIRADA_DATA = new Date(detalhe_retirada?.data).toLocaleDateString('pt-BR');
    const DETALHE_ENTREGA_DATA = new Date(detalhe_entrega?.data).toLocaleDateString('pt-BR');

    let Content;

    // if (resultRedux.statusOrderListed === 'success') {

    // }

    // if (resultRedux.statusOrderListed === 'failed') {
    //     Content = <div>não encontrado/not found/no encontrado</div>;
    // }

    // if (resultRedux.statusOrderListed === 'loading') {
    //     return <div>Loading</div>;
    // }

    Content = (
        <>
            <ModalNewOffer handleOpenOffer={handleOpenOffer} modalOffer={modalOffer} />
            
            <ModalCancelOrder
                handleCancelOffer={handleCancelOffer}
                modalCancelOrder={modalCancelOrder}
                usuarioId={usuario}
                ordemId={id}
            />
            <ModalShowImages
                modalShowImages={modalShowImages}
                handleModalShowImages={handleModalShowImages}
            />
            <div className={classes.container}>
                <label className={classes.title}>
                    {status === 'Open request' && t(TITLE_OPEN_REQUEST)}{' '}
                    {status === 'In progress' && t(TITLE_IN_PROGRESS_REQUEST)}{' '}
                    {status === 'Canceled' && t(TITLE_CANCELED_REQUEST)}{' '}
                </label>
                {status !== 'Canceled' && <Unanswered />}

                <ProductDetails />
                <div className={classes.details}>
                    {/* 1 parte */}
                    <div className="detailsWrap">
                        <Divider
                            textAlign="left"
                            className="divider"
                            colorDivider={Colors.AMARELO}
                            colorText={Colors.CINZA80}
                        >
                            {t(MSG_PICKUP_DETAILS)}
                        </Divider>
                        <div className="confirmationDetails">
                            <div className="horizontal">
                                <label>{t(TITLE_BILL_TO)}:</label>
                                <label>{detalhe_retirada?.conta}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_DATE_ORDER_DETAIL)}:</label>
                                <label>{DETALHE_RETIRADA_DATA}</label>
                                <label>{t(TITLE_TIME)}:</label>
                                <label>{detalhe_retirada?.hora}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_COMPANY_NAME)}:</label>
                                <label>{detalhe_retirada?.empresa}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_CONTACT_NAME)}:</label>
                                <label>{detalhe_retirada?.contato}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_EMAIL)}:</label>
                                <label>{detalhe_retirada?.email}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_PHONE)}:</label>
                                <label>{detalhe_retirada?.telefone}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_ADRESS)}:</label>
                                <label>{detalhe_retirada?.endereco}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_CITY)}:</label>
                                <label>{detalhe_retirada?.cidade}</label>
                                <label>{t(TITLE_STATE)}:</label>
                                <label>{detalhe_retirada?.estado}</label>
                                <label>{t(TITLE_ZIPCODE)}:</label>
                                <label>{detalhe_retirada?.cep}</label>
                            </div>
                        </div>
                    </div>

                    {/* 2 parte */}
                    <div className="detailsWrap">
                        <Divider
                            textAlign="left"
                            className="divider"
                            colorDivider={Colors.AMARELO}
                            colorText={Colors.CINZA80}
                        >
                            {t(TITLE_DELIVERY_DETAILS)}
                        </Divider>
                        <div className="confirmationDetails">
                            <div className="horizontal">
                                <label>{t(TITLE_BILL_TO)}:</label>
                                <label>{detalhe_entrega}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_DATE_ORDER_DETAIL)}:</label>
                                <label>{DETALHE_ENTREGA_DATA}</label>
                                <label>{t(TITLE_TIME)}:</label>
                                <label>{detalhe_entrega}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_COMPANY_NAME)}:</label>
                                <label>{detalhe_entrega?.empresa}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_CONTACT_NAME)}:</label>
                                <label>{detalhe_entrega?.contato}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_EMAIL)}:</label>
                                <label>{detalhe_entrega?.email}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_PHONE)}:</label>
                                <label>{detalhe_entrega?.telefone}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_ADRESS)}:</label>
                                <label>{detalhe_entrega?.endereco}</label>
                            </div>
                            <div className="horizontal">
                                <label>{t(TITLE_CITY)}:</label>
                                <label>{detalhe_entrega?.cidade}</label>
                                <label>{t(TITLE_STATE)}:</label>
                                <label>{detalhe_entrega?.estado}</label>
                                <label>{t(TITLE_ZIPCODE)}:</label>
                                <label>{detalhe_entrega?.cep}</label>
                            </div>
                        </div>
                    </div>

                    {/* 3 parte */}
                    <div className="detailsWrap">
                        <Divider
                            textAlign="left"
                            className="divider"
                            colorDivider={Colors.AMARELO}
                            colorText={Colors.CINZA80}
                        >
                            {t(TITLE_ORDER_DETAILS)}
                        </Divider>
                        <div className="detailsOrdem">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a
                                consectetur lectus. Vivamus augue velit, dictum at malesuada et.
                            </p>
                        </div>
                    </div>

                    <div className={classes.btnOrders}>
                        <Button
                            className="btnCancelOrder"
                            variant="contained"
                            onClick={() => (status === 'Canceled' ? false : handleCancelOffer(true))}
                        >
                            {status === 'Canceled' ? t(ORDER_DETAILS_MSG_CANCELED_ORDER) : t(TITLE_BTN_CANCEL_ORDER)}
                        </Button>
                        <Button variant="contained" onClick={() => navigate('/homeUsers')}>
                            {t(TITLE_BTN_EDIT_OFFER)}
                        </Button>
                        <div className="back">
                            <Button variant="contained" onClick={() => navigate('/homeUsers')}>
                                {t(ORDER_DETAILS_BTN_BACK)}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="container-homeUsers">
            <HeaderHome />
            <BasicBreadcrumbs path={t(PATH_SEE_MORE)} />
            {Content}
        </div>
    );
}
