import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { Box,Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Fade,Zoom} from "react-awesome-reveal";
import SearchModal from '../components/SearchModal';
import images from '../../public/images'

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
        color:'#e3d7c1',
        [theme.breakpoints.down('md')]:{
            fontSize:'15px'
        }
    },
    searchbtn:{
        width:'60%',
        color:theme.palette.secondary.light,
        textAlign:'start',
        padding:'1rem',
        zIndex:1,
        background:theme.palette.secondary.main,
        border:`2px solid ${theme.palette.secondary.main}`,
        borderRadius:'30px',
        margin:'7% 10% 2%',
        fontSize:'18px',
        [theme.breakpoints.down(768)]:{
            width:'80%',
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
        padding:'3rem 1rem',
        [theme.breakpoints.down(768)]:{
            flexDirection:'column',
            padding:'1rem'
        }
    },
    listheading:{
        margin:'auto',
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
    const[openModal,setOpenModal] = useState(false)
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
                    <button className={classes.searchbtn} onClick={()=>setOpenModal(true)} >
                    Search packages</button>
                    <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
                </Box>

                <Link to='/packages' style={{textDecoration:'none'}}>
                    <Button variant="outlined" color="primary" style={{margin:'5rem auto 8rem'}}>
                        Explore
                    </Button>
                </Link> 
            </Box>

            {/**packagaes section */}
            <Box className={classes.packagelist} >         
                <Box className={classes.listheading}>
                    <Fade direction='left' triggerOnce='true'>
                        <p>Select from a number of packages </p>
                    </Fade>
                </Box>          
                <Zoom triggerOnce='true' >
                    <Box className={classes.screenshot}>             
                        <Box className={classes.upperscreenshot}>
                            <img src={images.list} alt='packageslist' 
                            className={classes.images} />
                        </Box>           
                    </Box> 
                </Zoom>   
            </Box>

            {/**category section */}
            <Box className={classes.categorybox} >
                <Zoom triggerOnce='true'>
                    <Box className={classes.screenshot}>
                        <Box className={classes.upperscreenshot}>
                        <img src={images.categories} alt='topics' className={classes.images} />
                        </Box>
                    </Box> 
                </Zoom> 
                <Box className={classes.listheading}>
                    <Fade direction='right' triggerOnce='true'>
                        <p style={{color:'#df9a29'}}>Browse through a wide range of categories.</p>
                    </Fade>
                </Box>                
            </Box>

            {/**charts section */}
            <Box className={classes.metricscontainer} >
                <Fade triggerOnce='true'>
                    <p >Learn about the packages through their statistics and 
                    metrics.</p>
                </Fade>

                <Fade delay={300} cascade triggerOnce='true'>
                    <Box className={classes.chartscontainer}>
                        <Box className={classes.charts}>
                            <img src={images.react} alt='charts' 
                            className={classes.images} />
                        </Box>
                        <Box className={classes.charts}>
                            <img src={images.tailwind} alt='charts' 
                            className={classes.images} />
                        </Box>
                    </Box> 
                </Fade>       
            </Box>
        </div>
    )
}
