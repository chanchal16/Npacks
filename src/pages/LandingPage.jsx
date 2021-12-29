import React from 'react'
import { Link } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import { Box,Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Fade,Zoom} from "react-awesome-reveal";


const font = "'Nunito', sans-serif ";
const useStyles = makeStyles((theme)=>({
    headingbox:{
        color:theme.palette.primary.light,
        padding:'1rem',
        marginTop:'2rem',
        
    },
    heading:{
        fontFamily:font,
        [theme.breakpoints.down('md')]:{
            fontSize:'18px'
        }
    },
    subheading:{
        fontFamily:font,
        [theme.breakpoints.down('md')]:{
            fontSize:'15px'
        }
    },
    images:{
        width:'450px',
        height:'350px',
        [theme.breakpoints.down('md')]:{
            width:'300px',
            height:'200px'
        },
        [theme.breakpoints.down(768)]:{
            width:'250px',
            height:'150px'
        },
        ['@media (width:280px)']: {
            width:'230px',
            height:'130px'
        }
    },
    packagelist:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        background:'#e3d7c1',
        padding:'3rem 4rem',
        [theme.breakpoints.down(768)]:{
            flexDirection:'column',
            padding:'1rem'
        }
    },
    categorybox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        // background:'#5d4a32',
        padding:'3rem 1rem',
        [theme.breakpoints.down(768)]:{
            flexDirection:'column',
            padding:'1rem'
        }
    },
    listheading:{
        margin:'auto',
        // width: '50%',
        fontSize:'2.1rem',
        [theme.breakpoints.down(768)]:{
            fontSize:'1.2rem',
            
        }
    },
    screenshot:{
        position:'relative',
        width:'400px',
        height:'300px',
        padding:'1rem',
        margin:'1rem',
        borderLeft: `2px solid ${theme.palette.primary.main}`,
        borderTop: `2px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down('md')]:{
            width:'300px',
            height:'200px',
            margin:'auto'        
        },
        [theme.breakpoints.down(768)]:{
            width:'250px',
            height:'150px',
            border:`2px solid ${theme.palette.primary.main}`
        },
        ['@media (width:280px)']: {
            width:'230px',
            height:'130px',
            padding:'0.5rem',
            margin:'0.5rem',
            border:'none'
        }
    },
    upperscreenshot:{
        width:'400px',
        height:'300px',
        // padding:'1rem',
        margin:'1rem',
        position: 'absolute',
        right: '0rem',
        top:0,
        [theme.breakpoints.down('md')]:{
            width:'300px',
            height:'200px'
        },
        [theme.breakpoints.down(768)]:{
            width:'250px',
            height:'150px'
        },
        ['@media (width:280px)']: {
            width:'230px',
            height:'130px',
        }
    },
    metricscontainer:{
        background:'#e3d7c1',
        padding:'2rem',
        fontSize:'1.8rem',
        [theme.breakpoints.down(768)]:{
            fontSize:'1.5rem'
        },
        ['@media (width:320px)']: {
            padding:'1rem',
            fontSize:'1.2rem'
        },
        ['@media (width:280px)']: {
            padding:'1rem',
            fontSize:'1.2rem'
        }
    },
    chartscontainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        margin:'1rem',
        [theme.breakpoints.down(768)]:{
            flexDirection:'column'
        },
        ['@media (width:280px)']: {
            margin:'auto'
        }
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
                    <Typography variant='h6' className={classes.subheading}>
                        Choose the package that best matches your application
                    </Typography>
                    </Fade>
                </Box>
                
                {/**search bar */}
                <Box className={classes.searchBar}>
                    <SearchBar />
                </Box>

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
                        <p>Select from a number of packages </p>
                    </Fade>
                </Box>          
                <Zoom>
                    <Box className={classes.screenshot}>             
                        <Box className={classes.upperscreenshot}>
                            <img src='../.././assets/list.png' alt='packageslist' 
                            className={classes.images} />
                        </Box>           
                    </Box> 
                </Zoom>   
            </Box>

            {/**category section */}
            <Box className={classes.categorybox} >
                <Zoom>
                    <Box className={classes.screenshot}>
                        <Box className={classes.upperscreenshot}>
                        <img src='../.././assets/catgories.png' alt='topics' className={classes.images} />
                        </Box>
                    </Box> 
                </Zoom> 
                <Box className={classes.listheading}>
                    <Fade direction='right'>
                        <p style={{color:'#df9a29'}}>Browse through a wide range of categories.</p>
                    </Fade>
                </Box>                
            </Box>

            {/**charts section */}
            <Box className={classes.metricscontainer} >
                <Fade>
                    <p >Learn about the packages through their statistics and 
                    metrics.</p>
                </Fade>

                <Fade delay={300} cascade>
                    <Box className={classes.chartscontainer}>
                            <Box className={classes.charts}>
                                <img src='../.././assets/charts.png' alt='charts' 
                                className={classes.images} />
                            </Box>
                            <Box className={classes.charts}>
                                <img src='../.././assets/vue.png' alt='charts' 
                                className={classes.images} />
                            </Box>
                    </Box> 
                </Fade>       
            </Box>
        </div>
    )
}
