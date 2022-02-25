import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';

import {
  STATUS_COMPLETE,
  STATUS_PROGRESS,
  STATUS_OPEN,
  STATUS_CANCELED,
  STATUS_QUEUED,
  TITLE_ORDERS,
  TITLE_DATE,
  TITLE_FROM,
  TITLE_TO,
  TITLE_DRIVER,
  TITLE_LOAD,
  BTN_SEE_MORE,
} from '../../../../config/ConfigDefault';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  border: {
    backgroundColor: '#162F80',
    borderRadius: '50%',
    height: '40px',
    width: '40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  containerMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  container: {
    width: '100%',
    borderRadius: '1rem',
    backgroundColor: theme.palette.primary.CINZA10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    zIndex: '1'
  },
  title: {
    width: '100%',
    padding: '1rem',
    borderBottom: '2px solid #E6E6E6',
    '& span': {
      color: theme.palette.primary.CINZA80,
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: 'bold',
      backdropFilter: 'blur(4px)'
    }
  },
  content: {
    overflow: 'auto',
    height: '200px'
  },
  containerPC: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  date: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #E6E6E6',
    padding: '10px',

    '& label': {
      color: theme.palette.primary.CINZA80,
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '19px'
    },
    '& span': {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '19px',
      color: theme.palette.primary.CINZA80
    },
    [theme.breakpoints.between('sm', 'md')]: {
      padding: '5px',

      '& label': {
        fontSize: '16px'
      },
      '& span': {
        fontSize: '13px'
      }
    }
  },
  status: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '16px',
    borderRight: '1px solid #E6E6E6',
    padding: '10px',
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '11px',
      padding: '5px'
    },
    width: '150px',
    textAlign: 'center'
  },
  queued: {
    backgroundColor: '#6ed949',
    borderRadius: '16px',
    padding: '5px',
    fontSize: '14px',
    color: theme.palette.primary.BRANCO,
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '7px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px'
    }
  },
  inprogress: {
    backgroundColor: theme.palette.primary.AMARELO,
    borderRadius: '16px',
    padding: '5px',
    fontSize: '14px',
    color: theme.palette.primary.BRANCO,
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '10px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px'
    }
  },
  complete: {
    backgroundColor: '#ea6766',
    borderRadius: '16px',
    padding: '5px',
    fontSize: '14px',
    color: theme.palette.primary.BRANCO,
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '10px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px'
    }
  },
  canceled: {
    backgroundColor: '#000',
    borderRadius: '16px',
    padding: '5px',
    fontSize: '14px',
    color: theme.palette.primary.BRANCO,
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '10px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px'
    }
  },
  queued: {
    backgroundColor: '#F997FF',
    borderRadius: '16px',
    padding: '5px',
    fontSize: '14px',
    color: theme.palette.primary.BRANCO,
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '10px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px'
    }
  },
  containerHorizontal: {
    borderRight: '1px solid #E6E6E6',
    padding: '10px',
    [theme.breakpoints.between('sm', 'md')]: {
      padding: '5px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '1px'
    }
  },
  containerVertical: {
    '& label': {
      color: theme.palette.primary.CINZA80,
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: '500',
      marginRight: '10px'
    },
    '& span': {
      color: theme.palette.primary.CINZA70,
      fontSize: '16px',
      lineHeight: '19px',
      fontWeight: 'normal'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      '& label': {
        fontSize: '10px',
        marginRight: '10px'
      },
      '& span': {
        fontSize: '10px'
      }
    },
    [theme.breakpoints.down('sm')]: {
      '& label': {
        fontSize: '13px'
      },
      '& span': {
        color: theme.palette.primary.CINZA70,
        fontSize: '13px'
      }
    }
  },
  containerBtn: {
    position: 'relative',
    marginRight: '10px',
    backgroundColor: theme.palette.primary.AMARELO + ' !important',
    '& button': {
      width: '85px',
      height: '30px',
      backgroundColor: theme.palette.primary.AMARELO,
      color: theme.palette.primary.BRANCO,
      border: 'none',
      borderRadius: '4px',
      fontSize: '13px',
      cursor: 'pointer'
    },
    '& span': {
      position: 'absolute'
    },

    [theme.breakpoints.between('sm', 'md')]: {
      '& button': {
        width: '65px',
        height: '25px',
        fontSize: '9px'
      }
    },
    [theme.breakpoints.down('sm')]: {
      '& button': {
        width: '55px',
        height: '25px',
        fontSize: '9px'
      }
    }
  },
  headerMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: theme.palette.primary.CINZA80
  },
  footer: {
    display: 'flex',
    flexDirection: 'column'
  },
  emptyData: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
    '& label': {
      fontSize: '16px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold'
    }
  }
}));


const rows = [
  { date: "08/23/2021", name: "Guilherme", status:"Open request" },
  { date: "08/23/2021", name: "Guilherme",status:"In progress" },
  { date: "08/23/2021", name: "Guilherme",status:"Canceled" },
  { date: "08/23/2021", name: "Guilherme",status:"Complete" },
  { date: "08/23/2021", name: "Guilherme", status:"Open request" },
  { date: "08/23/2021", name: "Guilherme",status:"In progress" },
  { date: "08/23/2021", name: "Guilherme",status:"Canceled" },
  { date: "08/23/2021", name: "Guilherme",status:"Complete" },
  { date: "08/23/2021", name: "Guilherme", status:"Open request" },
  { date: "08/23/2021", name: "Guilherme",status:"In progress" },
  { date: "08/23/2021", name: "Guilherme",status:"Canceled" },
  { date: "08/23/2021", name: "Guilherme",status:"Complete" },
  { date: "08/23/2021", name: "Guilherme", status:"Open request" },
  { date: "08/23/2021", name: "Guilherme",status:"In progress" },
  { date: "08/23/2021", name: "Guilherme",status:"Canceled" },
  { date: "08/23/2021", name: "Guilherme",status:"Complete" },
];

export default () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate()

  const ReturnStatus = (status) => {
    switch (status) {
      case 'Open request':
        return <div className={classes.queued}>{t(STATUS_OPEN)}</div>;
      case 'In progress':
        return <div className={classes.inprogress}>{t(STATUS_PROGRESS)}</div>;
      case 'Complete':
        return <div className={classes.complete}>{t(STATUS_COMPLETE)}</div>;
      case 'Canceled':
        return <div className={classes.canceled}>{t(STATUS_CANCELED)}</div>;
      default:
        return <div className={classes.queued}>{t(STATUS_QUEUED)}</div>;
    }
  };

  return (
    <div className={classes.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead style={{backgroundColor:'#F1F1F1' }}>
            <TableRow>
              <TableCell style={{ fontSize: 18 }}>{t(TITLE_ORDERS)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{backgroundColor:'#F1F1F1' }}>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <div>
                    <strong variant='h6'>{t(TITLE_DATE)}</strong>
                    <div>{row.date} </div>
                  </div>
                </TableCell>

                <TableCell component="th" scope="row">
                  <div className={classes.status}>{ReturnStatus(row.status)}</div>
                </TableCell>

                <TableCell component="th" scope="row">
                  <div>
                    <strong variant='h6'>{t(TITLE_FROM)}:</strong> <span>{row.date} </span>
                  </div>
                  <div>
                    <strong variant='h6'>{t(TITLE_TO)}:</strong> <span>{row.date} </span>
                  </div>
                </TableCell>

                <TableCell component="th" scope="row">
                  <div>
                    <strong variant='h6'>{t(TITLE_DRIVER)}:</strong> <span>{row.date} </span>
                  </div>
                  <div>
                    <strong variant='h6'>{t(TITLE_LOAD)}:</strong> <span>{row.date} </span>
                  </div>
                </TableCell>

                <TableCell component="th" scope="row">
                  <div className={classes.border}>
                    <div className={classes.borderNumber}>1</div>
                  </div>
                </TableCell>

                <TableCell component="th" scope="row">
                  <Button onClick={() => navigate('/home/user/ordem/view/1')}
                    className={classes.containerBtn} variant='contained'>{t(BTN_SEE_MORE)}</Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}