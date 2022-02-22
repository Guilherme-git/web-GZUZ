import React from "react";
import { RoutesMain } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/Theme';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translationEN, translationPT, translationES } from './contants';

function App() {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translationEN,
      },
      pt: {
        translation: translationPT,
      },
      es: {
        translation: translationES,
      },
    },
    lng: 'pt',
    fallbackLng: 'pt',

    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoutesMain />
    </ThemeProvider>



  );
}

export default App;
