import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const font = "'Nunito', sans-serif ";
const useStyles = makeStyles((theme)=>({
    appbar: {
        color:theme.palette.secondary.dark,
        background:theme.palette.primary.main,
        
    },
    navtitle:{
        fontFamily:font,
        fontWeight:'bold',
        color:theme.palette.secondary.dark,
        textDecoration:'none'
         
    }
  }));

export default function Nav() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar> 
                    <img src='../.././assets/fireflake.svg' alt='applogo' width={42} />            
               <Link to='/' className={classes.navtitle}><Typography variant="h5" >
                    Eligo
                </Typography></Link> 
                </Toolbar>
            </AppBar> 
        </div>
    )
}
