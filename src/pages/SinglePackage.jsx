import React,{useContext} from 'react'
import {Box,Typography,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { apiContext } from '../contexts/ApiContext'
import Charts from '../components/Charts';
import * as timeago from "timeago.js";
import {RepoForkedIcon,EyeIcon,StarIcon} from '@primer/octicons-react'

const useStyles = makeStyles((theme)=>({
    infocontainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        position:'relative'
    },
    gitinfo:{
     width:450,
     color:theme.palette.primary.contrastText,
     background:theme.palette.secondary.main,
     textAlign:'left',
     padding:'15px'
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
    infoouterbox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:'0.2rem',
        padding:'1rem 0'
    },
    innerbox:{
        textAlign:'center',
        border:'2px solid #fce290',
        borderRadius:'20px',
        padding:' 2px 20px'
    },
    lowerOuterBox:{
     display:'flex',
     flexDirection:'row',
     justifyContent:'flex-start',
     // margin:'1rem',
     bottom:0,
     position:'absolute'
    },
    lowerInnerBox:{
        margin:'1rem'
    }
 }))

export default function SinglePackage() {
    const classes = useStyles();
    const {fetchedRepo} = useContext(apiContext)
    console.log('repo',fetchedRepo)
    return (
        <div>
           <h2 style={{color:'white'}}>single package</h2>
            <p style={{color:'white'}}>name: {fetchedRepo?.name}</p>
            <Box className={classes.infocontainer}>
                <Charts />
                <Box className={classes.gitinfo}>
                   <a href={fetchedRepo?.homepage} target="_blank"> <Button  style={{float:'right',color:'#fff99e'}}>Home</Button></a>
                    <Typography variant='h5'>{fetchedRepo?.name}</Typography>                 
                    <small style={{padding:'10px 0'}}>{fetchedRepo?.language}</small>
                    
                    <Typography className={classes.desc}>{fetchedRepo?.description}</Typography>
                    <Box className={classes.countsbox}> 
                        <span className={classes.spanel}>Open issues</span>                     
                        <Typography> {fetchedRepo?.open_issues}</Typography> 
                        <span className={classes.spanel}>Network</span>                    
                        <Typography> {fetchedRepo?.network_count}</Typography>
                        <span className={classes.spanel}>Subscribers </span>
                        <Typography> {fetchedRepo?.subscribers_count}</Typography>                
                    </Box>
                    <Box className={classes.infoouterbox}>
                        <Box className={classes.innerbox}>
                            <RepoForkedIcon  />
                            <Typography variant='h5'> {fetchedRepo?.forks}</Typography>
                        </Box>
                        <Box className={classes.innerbox}>
                            <StarIcon  />
                            <Typography variant='h5'> {fetchedRepo?.stargazers_count}</Typography>
                        </Box>
                        <Box className={classes.innerbox}>
                            <EyeIcon  />
                            <Typography variant='h5'>{fetchedRepo?.watchers}</Typography>
                        </Box>
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
            </Box> 
        </div>
    )
}
