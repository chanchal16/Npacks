import React from 'react';
import pagenotfound from '../../assets/pagenotfound.svg';
import { Box,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    pagecontainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        minHeight:'100vh'
        
    },
    pageimage:{
        width:'15rem',
        height:'auto',
        marginBottom:'1rem'
    }
}))
export default function PageNotFound() {
    const classes = useStyles();
  return (
    <Box className={classes.pagecontainer}>
        <img src={pagenotfound} alt='page-not-fouond' className={classes.pageimage} />
        <Typography variant='h5' style={{color:'#5d5d5d'}}>Oops! Page not found</Typography> 
    </Box>
  )
}
