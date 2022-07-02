import React from 'react';
import { Box,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import images from '../../public/images';

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
        <img src={images.pagenotfound} alt='page-not-fouond' className={classes.pageimage} />
        <Typography variant='h5' style={{color:'#5d5d5d'}}>Oops! Page not found</Typography> 
    </Box>
  )
}
