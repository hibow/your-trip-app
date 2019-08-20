import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#455A64',
      second: '#e3f2fd'
    },
    secondary: {
      main: '#19857b',
    },
    card: {
      main: '#ECEFF1',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#E0E0E0',
    },
  },
});

export default theme;
