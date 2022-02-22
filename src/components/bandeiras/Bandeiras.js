import React, { memo, useState } from 'react';
import './Bandeiras.scss';
import { Images } from '../../contants';
import { useTranslation } from 'react-i18next';

const CONFIG = [
  {
    id: '1',
    nome: 'Brasil',
    source: Images.FLAGBRAZIL,
    translate: 'pt-BR',
  },
  {
    id: '2',
    nome: 'Usa',
    source: Images.FLAGUSA,
    translate: 'en-US',
  },
  {
    id: '3',
    nome: 'Spain',
    source: Images.FLAGSPAIN,
    translate: 'es-ES',
  },
];

const Bandeiras = () => {
  const { i18n } = useTranslation();

  const [id, setId] = useState(1);

  return (
    <div className="container-flag">
      {CONFIG.map((item) => (
        <div
          key={item.id}
          className={id === item.id ? 'background-flag active' : 'background-flag'}
          onClick={() => {
            i18n.changeLanguage(item.translate);
            setId(item.id);
          }}
        >
          <img
            src={item.source}
            alt={'Bandeira de cada país para tradução'}
            className="image-flag"
          />
        </div>
      ))}
    </div>
  );
};

export default memo(Bandeiras);
