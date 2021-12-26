import React from 'react'
import { Link } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import { Box,Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Fade,Zoom} from "react-awesome-reveal";


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
        padding:'3rem 4rem'
    },
    categorybox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        // background:'#5d4a32',
        padding:'3rem 1rem'
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
        borderLeft: '2px solid #df9a29',
        borderTop: '2px solid #df9a29',
        // border:`2px solid ${theme.palette.primary.main}`,
        // background:theme.palette.primary.main
    },
    upperscreenshot:{
        width:'400px',
        height:'300px',
        // padding:'1rem',
        margin:'1rem',
        position: 'absolute',
        right: '0rem',
        top:0
        // border:`2px solid ${theme.palette.primary.main}`,
        // background:'black'
        // overflow:'hidden'
    },
    metricscontainer:{
        background:'#e3d7c1',
        padding:'2rem'
    },
    chartscontainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        margin:'1rem'
    }
}))

export default function LandingPage() {
    const classes = useStyles();
    return (
        <div>
            <Box className={classes.topcontainer}>
                <Box className={classes.headingbox}>
                    <Fade >
                    <Typography  variant='h4' className={classes.heading}>
                         An extensive collection of open source packages to browse through.
                    </Typography>
                    <Typography variant='h6' className={classes.heading}>
                        Choose the package that best matches your application
                    </Typography>
                    </Fade>
                </Box>
                
                {/**search bar */}
                <SearchBar />

                <Link to='/home' style={{textDecoration:'none'}}>
                    <Button variant="outlined" color="primary" style={{margin:'5rem auto 8rem'}}>
                        Explore
                    </Button>
                </Link> 
            </Box>

            {/**packagaes section */}
            <Box className={classes.packagelist} >         
                <Box className={classes.listheading}>
                    <Fade direction='left'>
                        <Typography variant='h4'>Select from a number of packages </Typography>
                    </Fade>
                </Box>          
                <Zoom>
                    <Box className={classes.screenshot}>             
                        <Box className={classes.upperscreenshot}>
                            <img src='../.././assets/list.png' alt='packageslist' 
                            style={{width:'450px',height:'350px'}} />
                        </Box>           
                    </Box> 
                </Zoom>   
            </Box>

            {/**category section */}
            <Box className={classes.categorybox} >
                <Zoom>
                    <Box className={classes.screenshot}>
                        <Box className={classes.upperscreenshot}>
                        <img src='../.././assets/catgories.png' alt='topics' style={{width:'450px',height:'350px'}} />
                        </Box>
                    </Box> 
                </Zoom> 
                <Box className={classes.listheading}>
                    <Fade direction='right'>
                        <Typography variant='h4' color='primary'>Browse through a wide range of categories.</Typography>
                    </Fade>
                </Box>                
            </Box>

            {/**charts section */}
            <Box className={classes.metricscontainer} >
                <Fade>
                    <Typography variant='h5'>Learn about the packages through their statistics and 
                    metrics.</Typography>
                </Fade>

                <Fade delay={300} cascade>
                    <Box className={classes.chartscontainer}>
                            <Box className={classes.charts}>
                                <img src='../.././assets/charts.png' alt='charts' 
                                style={{width:'500px',height:'350px'}} />
                            </Box>
                            <Box className={classes.charts}>
                                <img src='../.././assets/vue.png' alt='charts' 
                                style={{width:'500px',height:'350px'}} />
                            </Box>
                    </Box> 
                </Fade>       
            </Box>
        </div>
    )
}
