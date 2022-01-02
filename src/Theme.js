// import { createTheme} from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
const theme = createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        light:'#d9b74d',
        main:  '#df9a29',  
        dark: '#a76a1d' ,         
        contrastText: '#d9b74d'
      },
      secondary: {
        main: '#1c1c1c',
        dark:'#050505',
        contrastText: '#5d5d5d',
      },
      neutral:{
          main:'#fefae0ff',
          contrastText:'#EBEBEB'
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });

export default theme;