import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const font = "'Nunito', sans-serif ";
const useStyles = makeStyles((theme)=>({
    appbar: {
        color:theme.palette.secondary.dark,
        background:theme.palette.primary.main,
        
    },
    navtitle:{
        fontFamily:font,
        fontWeight:'bold',
         
    }
  }));

export default function Nav() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar> 
                    <img src='../.././assets/fireflake.svg' alt='applogo' width={42} />            
                <Typography variant="h5" className={classes.navtitle}>
                    Eligo
                </Typography>
                </Toolbar>
            </AppBar> 
        </div>
    )
}
