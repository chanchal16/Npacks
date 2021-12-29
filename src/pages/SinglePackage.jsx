import React,{useContext} from 'react'
import {Box,Typography,Button,IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { apiContext } from '../contexts/ApiContext'
import Charts from '../components/Charts';
import * as timeago from "timeago.js";
import { useHistory } from "react-router-dom";
import CBarChart from '../components/CBarChart';
import Loader from '../components/Loader';
import { PackageIcon } from '@primer/octicons-react';

const useStyles = makeStyles((theme)=>({
    pagecontainer:{
        padding:'1rem',
        margin:'50px',
        height:'100%',
        [theme.breakpoints.down(767)]:{
            padding:0,
            margin:0
        }
    },
    backbuttonbox:{
        margin:'1rem',
        padding:'2rem',
        [theme.breakpoints.down(767)]:{
            margin:'1rem 0'
        }
    },
    backbtn:{
        float:'left',
        background:theme.palette.primary.main,
        '&:hover':{
            backgroundColor:'rgb(252, 211, 77,0.8)'
        },
    },
    heading:{
        textAlign:'left',
        margin:'0 5rem',
        ['@media (width:280px)']:{
            margin:'0 1.8rem'
        },
        ['@media (width:540px)']:{
            margin:'2rem 3rem 0'
        },
        [theme.breakpoints.down(768)]:{
            margin:'0 2rem'
        },
        [theme.breakpoints.between(768,1025)]:{
            margin:0
        }
    },
    infocontainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
        position:'relative',
        margin:'20px',
        [theme.breakpoints.down(767)]:{
            flexDirection:'column',
            margin:'1.8rem'
        },
        [theme.breakpoints.between(411,415)]:{
            marginLeft:'3rem'
        },
        ['@media (width:280px)']:{
            marginLeft:'1rem'
        },
        ['@media (width:360px)']:{
            marginLeft:'1.2rem'
        },
        ['@media (width:540px)']:{
            marginLeft:'2.7rem'
        }
    },
    infoItemBox:{
        margin:'1.3rem 0',
        // padding:'1rem'
        width:'90%',
        display:'inline-flex',
        flexDirection:'row',
        justifyContent:'space-between',
        [theme.breakpoints.down(767)]:{
            display:'grid',
            gridTemplateColumns:'auto',
            gap:'1rem'
            // flexDirection:'column', 
                    
        },
        ['@media (width:768px)']:{
            display:'grid',
            gridTemplateColumns:'auto auto',
            gap:'3rem',
            marginRight:'10rem'
        },
        ['@media (width:1024px)']:{
            display:'grid',
            gridTemplateColumns:'auto auto',
            gap:'3rem',
            marginRight:'11rem'
        }
    },
    gitinfo:{
     width:420,
     height:295,
     color:theme.palette.primary.contrastText,
     background:theme.palette.secondary.main,
     border:theme.palette.secondary.main,
     borderRadius:'10px',
     textAlign:'left',
     padding:'22px',
     [theme.breakpoints.down(767)]:{
         width:280,        
        //  height:250,
         marginTop:'1rem'
     },
     ['@media (width:280px)']:{
        width:200,
        height:'fit-content'
     },
     ['@media (width:320px)']:{
        width:220,
        // height:280
     },
     ['@media (width:540px)']:{
        width:402,
        height:'fit-content'
     },
     ['@media (width:768px)']:{
        width:280,
        height:'fit-content'
      },
      ['@media (width:1024px)']:{
        width:400,
        height:'fit-content'
      }
    },
    desc:{
        padding:'8px 0'
    },
    countsbox:{
         alignSelf: 'flex-start',
         display:'grid',
         gridTemplateColumns: '120px auto',
         gridTemplateRows: 'repeat(3, 20px)',
         gap: '4px 12px',
         // margin:'15px 0'
    },
    spanel:{
        color:theme.palette.secondary.contrastText
    },
  
    lowerOuterBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        // margin:'1rem',
        bottom:0,
        //  position:'absolute'
        
    },
    lowerInnerBox:{
        margin:'2rem 1rem 0',
        [theme.breakpoints.down(767)]:{
            marginTop:'1.5rem'
        },
        ['@media (width:768px)']:{
            marginTop:' 1rem '
        }
    },
    license:{
        fontSize:'2.1rem',
        [theme.breakpoints.down(767)]:{
            fontSize:'1rem'
        },
        ['@media (width:280px)']:{
            fontSize:'0.8rem'
        },
        ['@media (width:540px)']:{
            fontSize:'1.4rem'
        },

        [theme.breakpoints.between(768,1025)]:{
            fontSize:'1.2rem'
        },
        
    },
    updatedat:{
        fontSize:'1.4rem',
        [theme.breakpoints.down(767)]:{
            fontSize:'1rem'
        },
        ['@media (width:540px)']:{
            fontSize:'1.2rem'
        },
        [theme.breakpoints.between(768,1025)]:{
            fontSize:'1rem'
        }
    }
 }))

export default function SinglePackage() {
    const classes = useStyles();
    let history = useHistory();

    const {fetchedRepo,weeklyDownloads} = useContext(apiContext)
    console.log('repo',fetchedRepo)
    
    function handleBackClick() {
        history.push("/home");
    }

    return (
        <div >
            <Box className={classes.backbuttonbox}>
            <IconButton color='secondary' size="small" className={classes.backbtn} onClick={handleBackClick}>
                    <ArrowBackIcon />
            </IconButton>
            </Box>

            {
                weeklyDownloads ?
            <div className={classes.pagecontainer}>
            
            <Box className={classes.heading}>
                <h3 style={{color:'#fcce28',margin:0}}>{fetchedRepo?.name}</h3>
                <span style={{color:'#ebd483'}}>{fetchedRepo?.description}</span>
            </Box>
           
            <Box className={classes.infocontainer}>
                {/* <Box > */}
                    <Charts />
                {/* </Box> */}
                
                <Box className={classes.infoItemBox}>
                    <CBarChart />
                {/* </Box> */}
                {/* <Box className={classes.infoItemBox}> */}
                <Box className={classes.gitinfo}>
                   <a href={fetchedRepo?.homepage} target="_blank"> 
                    <Button  style={{float:'right',color:'#fff99e'}}>Home</Button>
                   </a>                       
                    <Typography variant='h5'> <PackageIcon/> {fetchedRepo?.name}</Typography>               
                    <small style={{padding:'10px 0'}}>&lt; &gt; {fetchedRepo?.language}</small>
                    
                    <Typography className={classes.desc}>{fetchedRepo?.description}</Typography>
                    <Box className={classes.countsbox}> 
                        <span className={classes.spanel}>Open issues</span>                     
                        <Typography> {fetchedRepo?.open_issues}</Typography> 
                        <span className={classes.spanel}>Network</span>                    
                        <Typography> {fetchedRepo?.network_count}</Typography>
                        <span className={classes.spanel}>Subscribers </span>
                        <Typography> {fetchedRepo?.subscribers_count}</Typography>                
                    </Box>
                   
                    <Box className={classes.lowerOuterBox}>
                        <Box className={classes.lowerInnerBox}>
                            <span className={classes.spanel}>License</span>
                            <Typography className={classes.license}>{fetchedRepo?.license.spdx_id}</Typography>
                        </Box>
                        <Box className={classes.lowerInnerBox}>
                            <span className={classes.spanel}>Updated at</span>
                            <Typography className={classes.updatedat}>{timeago.format(fetchedRepo?.updated_at)}</Typography>
                        </Box>
                    </Box> 
                </Box>
                </Box>
            </Box> 
            </div>
            :
                <div style={{minHeight:'100vh', margin:'auto',padding:'auto'}}>
                    <Loader />
                </div>
            }
        </div>
    )
}
