import React from 'react'
import { Link } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import { Box,Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const font = "'Nunito', sans-serif ";
const useStyles = makeStyles((theme)=>({
    topcontainer:{
        // height:'100vh',
        // background:theme.palette.primary.dark
    },
    headingbox:{
        color:theme.palette.primary.light,
        padding:'1rem',
        marginTop:'2rem',
        
    },
    heading:{
        fontFamily:font
    },
    packagelist:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        background:'#e3d7c1',
        padding:'5rem 4rem'
    },
    categorybox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        background:'#5d4a32',
        padding:'5rem 1rem'
    },
    listheading:{
        margin:'auto',
        width: '50%'
    },
    screenshot:{
        position:'relative',
        width:'400px',
        height:'300px',
        padding:'1rem',
        margin:'1rem',
        border:`2px solid ${theme.palette.primary.main}`,
        // background:theme.palette.primary.main
    },
    upperscreenshot:{
        width:'400px',
        height:'300px',
        // padding:'1rem',
        margin:'1rem',
        position: 'absolute',
        // right: '-2rem',
        // border:`2px solid ${theme.palette.primary.main}`,
        // background:'black'
        // overflow:'hidden'
    }
}))

export default function LandingPage() {
    const classes = useStyles();
    return (
        <div>
            <Box className={classes.topcontainer}>
                <Box className={classes.headingbox}>
                    <Typography  variant='h4' className={classes.heading}> An extensive collection of open source packages to browse through.</Typography>
                    <Typography variant='h6' className={classes.heading}>Choose the package that best matches your application</Typography>
                </Box>
                <SearchBar />
                <Link to='/home' style={{textDecoration:'none'}}>
                    <Button variant="outlined" color="primary" style={{margin:'5rem auto 8rem'}}>Explore</Button>
                </Link> 
            </Box>
            <Box className={classes.packagelist} >
                <Box className={classes.listheading}>
                <Typography variant='h4'>Select from a number of packages </Typography>
                </Box>
                <Box className={classes.screenshot}>
                    <Box className={classes.upperscreenshot}>
                        <img src='../.././assets/list.png' alt='packageslist' style={{width:'450px',height:'350px'}} />
                    </Box>
                </Box>       
            </Box>

            <Box className={classes.categorybox} >
                <Box className={classes.screenshot}>
                    <Box className={classes.upperscreenshot}>
                    <img src='../.././assets/catgories.png' alt='topics' style={{width:'450px',height:'350px'}} />
                    </Box>
                </Box>   
                <Box className={classes.listheading}>
                    <Typography variant='h4'>Browse through a wide range of categories.</Typography>
                </Box>
                   
            </Box>

            <Box className={classes.packagelist} >
                <Box className={classes.listheading}>
                <Typography variant='h4'> Learn about the packages through their statistics and 
                metrics. </Typography>
                </Box>
                <Box className={classes.screenshot}>
                    <Box className={classes.upperscreenshot}>
                    <img src='../.././assets/charts.png' alt='charts' style={{width:'450px',height:'350px'}} />
                    </Box>
                </Box>       
            </Box>
        </div>
    )
}
