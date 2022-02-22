import React, { useEffect } from "react";
import "./styles.scss"
import { makeStyles } from '@mui/styles';
import { HeaderHome } from "../../../components";
import { BasicBreadcrumbs } from '../../../components';
import { useTranslation } from "react-i18next";
import { BREAD_CRUMBS_NEW_ORDER } from '../../../config/ConfigDefault';
import { Steps } from "../../../components";
import CreatePickupDetails from "./createPickupDetails";
import CreateDeliveryDetails from "./createDeliveryDetails";
import CreateOrderDetails from "./createOrderDetails";
import CreateConfirmation from "./createConfirmation";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflow: 'auto',
    },
    containerItems: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: theme.spacing(2) + ' !important',
    },
    containerMap: {
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        flex: 1,
        zIndex: 1,
    },
    space: {
        marginBottom: theme.spacing(2) + ' !important',
    },

    btnNewOrder: {
        backgroundColor: theme.palette.primary.AMARELO + ' !important',
        width: '290px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },

    design: ({ type }) => ({
        backgroundColor: type === 'driver' ? theme.palette.primary.AZUL : theme.palette.primary.AMARELO,
        width: '100%',
        height: '20%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
    }),
    StatusDriver: ({ statusDrive }) => ({
        backgroundColor: statusDrive ? '#6ed949' : theme.palette.primary.AZUL,
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.BRANCO,
        fontfamily: 'Roboto',
        fontSize: '16px',
        padding: '10px',
        borderRadius: '5px',

        '& :nth-child(1)': {
            marginRight: '10px',
        },
        '& label:nth-of-type(2)': {
            fontSize: '8px',
        },
    }),

    containerDelivery: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `0.4rem solid ${theme.palette.primary.AMARELO}`,
        position: 'relative',
        margin: theme.spacing(1, 0) + ' !important',
        zIndex: 999 + ' !important',

        [theme.breakpoints.down('md')]: {
            position: 'absolute',
            left: 0,
            top: 60,
            backgroundColor: theme.palette.primary.BRANCO,
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: theme.spacing(1, 2),
            zIndex: 999 + ' !important',
        },
    },
    HeaderMobile: {
        display: 'none',

        [theme.breakpoints.down('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.primary.AMARELO,
            padding: '10px',
            width: '100%',
            margin: theme.spacing(1, 0) + ' !important',
            borderRadius: '5px',
            color: theme.palette.primary.BRANCO,
        },
    },

    ballon: {
        position: 'relative',
        '& :nth-child(1)': {
            width: '209px',
            height: '123.46px',
            color: theme.palette.primary.AMARELO,
            position: 'relative',
        },
        '& :nth-child(2)': {
            position: 'absolute',
            left: 60,
            top: 40,
            fontSize: '11px',
            color: theme.palette.primary.BRANCO,
            alignSelf: 'center',
        },

        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    containerImg: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginRight: theme.spacing(7) + ' !important',
        cursor: 'pointer',
        '& img': {
            position: 'absolute',
            width: '47px',
            height: '65px',
        },
        '& :nth-child(2)': {
            transform: 'rotate(10deg)',
        },
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginRight: theme.spacing(0) + ' !important',
            marginBottom: theme.spacing(1) + ' !important',

            '& img': {
                position: 'relative',
            },
            '& :nth-child(2)': {
                transform: 'rotate(0deg)',
                marginLeft: theme.spacing(1) + ' !important',
            },
        },
    },
    details: {
        '& p': {
            margin: theme.spacing(1, 0) + ' !important',
            fontSize: '16px',
            color: '#898989',
            width: '80%',
        },
        [theme.breakpoints.down('md')]: {
            '& p': {
                fontSize: '10px',
                width: '100%',
            },
        },
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        fontfamily: 'Roboto',

        '& :nth-child(1)': {
            fontSize: '16px',
            color: theme.palette.primary.AMARELO,
            marginRight: theme.spacing(1) + ' !important',
        },
        '& :nth-child(2)': {
            fontSize: '16px',
            color: '#898989',
            marginRight: theme.spacing(1) + ' !important',
        },

        [theme.breakpoints.down('md')]: {
            '& :nth-child(1)': {
                fontSize: '10px',
            },
            '& :nth-child(2)': {
                fontSize: '10px',
            },
        },
    },
    ContainerButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: theme.spacing(3) + ' !important',
        '& button:nth-of-type(1)': {
            marginBottom: theme.spacing(1) + ' !important',
            backgroundColor: '#6ed949',
            width: '128px',
            fontSize: '11px',
        },
        '& button:nth-of-type(2)': {
            marginBottom: theme.spacing(1) + ' !important',
            backgroundColor: '#ea6766',
            width: '85px',
            fontSize: '11px',
        },
        [theme.breakpoints.down('md')]: {
            flexDirection: 'row',
            '& button:nth-of-type(1)': {
                marginRight: theme.spacing(1) + ' !important',
            },
        },
        [theme.breakpoints.down('sm')]: {
            '& button:nth-of-type(1)': {
                marginBottom: theme.spacing(1) + ' !important',
                backgroundColor: '#6ed949',
                width: '90px' + ' !important',
                fontSize: '7px',
            },
            '& button:nth-of-type(2)': {
                marginBottom: theme.spacing(1) + ' !important',
                backgroundColor: '#ea6766',
                width: '90px' + ' !important',
                fontSize: '7px',
            },
        },
    },
}));

export default () => {
    const { t } = useTranslation();
    const resultRedux = useSelector(function (state) {
        return state.order
    })

    useEffect(() => {

    })
    return (
        <div className="container-homeUsers">
            <HeaderHome />
            <BasicBreadcrumbs path={t(BREAD_CRUMBS_NEW_ORDER)} />
            <Steps />

            {
                resultRedux.pathActive === "/home/user/ordem/create" && <CreatePickupDetails />
            }

            {
                resultRedux.pathActive === "/home/user/ordem/create/delivery-details" && <CreateDeliveryDetails />
            }

            {
                resultRedux.pathActive === "/home/user/ordem/create/ordem-details" && <CreateOrderDetails />
            }

            {
                resultRedux.pathActive === "/home/user/ordem/create/confirmation" && <CreateConfirmation />
            }

        </div>

    );
}