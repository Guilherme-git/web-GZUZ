import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: 'white',
      BRANCO: '#FFFFFF',
      CINZA00: '#FAFAFA',
      CINZA10: '#F1F1F1',
      CINZA30: '#DADADA',
      CINZA301: '#CCCCCC',
      CINZA40: '#BEBEBE',
      CINZA50: '#969696',
      CINZA60: '#888888',
      CINZA70: '#787878',
      CINZA80: '#5B5B5B',
      CINZA90: '#313131',
      AMARELO: '#FAC312',
      GOLD: '#A68432',
      AZUL: '#162F80',
    },
  },
});

export default theme = responsiveFontSizes(theme);
