import React from 'react';
//import './Principal.scss';
import { TITLE_MAIN, LOGISTIC_MAIN, CONTENT_MAIN } from '../../config/ConfigDefault';
import { useTranslation } from 'react-i18next';

const Principal = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="title">
        <h1>{t(TITLE_MAIN)}</h1>
        <h2>{t(LOGISTIC_MAIN)}</h2>
      </div>
      <div className="separator" />
      <div className="content">
        <p>{t(CONTENT_MAIN)}</p>
      </div>
    </div>
  );
};

export default Principal;
