import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    appbar: {
        color:theme.palette.secondary.dark,
        background:theme.palette.primary.dark,
        
    },
  }));

export default function Nav() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>             
                <Typography variant="h6">
                    N-packs
                </Typography>
                </Toolbar>
            </AppBar> 
        </div>
    )
}
