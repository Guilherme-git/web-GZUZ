import React from 'react';
//import './Principal.scss';
import { TITLE_MAIN, LOGISTIC_MAIN, CONTENT_MAIN } from '../../config/ConfigDefault';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    width: '100%',
    fontWeight: 'normal'
  },
  title: {
    fontFamily: 'sans-serif'
  },
  subTitle: {
    fontFamily: 'sans-serif',
    color: '#5B5B5B',
  },
  divider: {
    backgroundColor: '#162F80',
    height: '4px',
    width: '210px',
    margin: 'auto',
    borderRadius: '5px'
  },
  content: {
    margin: 'auto',
    paddingLeft: '100px',
    paddingRight: '100px',
  },
  contentText: {
    textAlign: 'center'
  }
}));

const Principal = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.title}>{t(TITLE_MAIN)}</h1>
        <h2 className={classes.subTitle}>{t(LOGISTIC_MAIN)}</h2>
      </div>
      <div className={classes.divider}></div>
      <div />
      <div className={classes.content}>
        <p className={classes.contentText}>{t(CONTENT_MAIN)}</p>
      </div>
    </div>
  );
};

export default Principal;
