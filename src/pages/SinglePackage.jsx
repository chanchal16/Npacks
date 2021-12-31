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
    backbtn:{
        float:'left',
        background:theme.palette.primary.main,
        '&:hover':{
            backgroundColor:'rgb(252, 211, 77,0.8)'
        }
    },
    infocontainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
        position:'relative',
        margin:'20px'
    },
    infoItemBox:{
        margin:'1.3rem 0',
        // padding:'1rem'
        width:'90%',
        display:'inline-flex',
        flexDirection:'row',
        justifyContent:'space-between'
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
    // marginLeft:'1rem',
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
        margin:'2rem 1rem 0'
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
            <Box style={{margin:'1rem',padding:'2rem'}}>
            <IconButton color='secondary' size="small" className={classes.backbtn} onClick={handleBackClick}>
                    <ArrowBackIcon />
            </IconButton>
            </Box>

            {
                weeklyDownloads ?
            <div style={{padding:'1rem',margin:'50px',height:'100%'}}>
            
            <Box style={{textAlign:'left',margin:'0 5rem'}}>
                <h3 style={{color:'#fcce28',margin:0}}>{fetchedRepo?.name}</h3>
                <span style={{color:'#ebd483'}}>{fetchedRepo?.description}</span>
            </Box>
           
            <Box className={classes.infocontainer}>
                {/* <Box > */}
                    <Charts />
                {/* </Box> */}
                
                <Box className={classes.infoItemBox}>
                    <CBarChart />
                {fetchedRepo ? 
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
                            <Typography variant='h4'>{fetchedRepo?.license.spdx_id}</Typography>
                        </Box>
                        <Box className={classes.lowerInnerBox}>
                            <span className={classes.spanel}>Updated at</span>
                            
                            <Typography variant='h5'>{timeago.format(fetchedRepo?.updated_at)}</Typography>
                        </Box>
                    </Box> 
                </Box>
                :
                <Box className={classes.gitinfo}>
                    <Typography style={{margin:'auto',color:'#fce290',padding:'3rem',textAlign:'center'}}>
                        No data available
                    </Typography>
                </Box>
                }
                </Box>
            </Box> 
            </div>
            :
                <div style={{ margin:'auto',padding:'8rem'}}>
                    <Loader />
                </div>
            }
        </div>
    )
}
