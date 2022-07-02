import React,{useContext,useEffect} from 'react'
import { apiContext } from "../contexts/ApiContext";
import {Card,CardContent,CardActions,Typography,Box,Link,Slide} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import * as timeago from "timeago.js";
import { Link as LINK } from "react-router-dom";
import Clipboard from '../components/Clipboard';


const useStyles = makeStyles((theme)=>({
    outercontainer:{
        margin:'3rem 0',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
    },
   cardContainer:{
        margin:'1rem',
        textAlign:'left'
        
    },
    card:{
        width:'350px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:'transparent',
        // background:theme.palette.secondary.main,
        border:`1.5px solid ${theme.palette.primary.main}`,
        borderRadius:'20px',
        // margin:'auto',
        ['@media (width:320px)']: {
            width:'280px'
        },
        ['@media (width:360px)']: {
            width:'300px'
        },
        ['@media (width:280px)']: {
            width:'250px'
        },
        ['@media (width:540px)']: {
            width:'420px'
        },
        ['@media (width:768px)']: {
            width:'320px'
        }
    },
    boxheading:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    descdiv:{
        color:theme.palette.primary.contrastText,
    },
    outerBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    clipboard:{
        margin:'10px 0',
        
    },
    command:{
        background:'#444',
        color:'#fff',
        border:`1px solid black`,
        borderRadius:'3px',
        padding:'4px'
       
    },
    wrapIcon:{
        cursor:'pointer',
        verticalAlign: 'middle',
        display: 'inline-flex',
    },
    iconbtn:{
        padding:'3px',
        background:theme.palette.primary.light,
        
    },
    actionbtns:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        color:theme.palette.primary.dark,
        padding:' 0 8px 8px 8px'
    },
    publishbox:{
        display: 'inline-flex',
        alignItems:'center',
        padding: '0 7px',
        color:theme.palette.secondary.contrastText,
    }
}))

export default function Packages() {
    const classes = useStyles();
    const { fetchedPackages,fetchRepos,getPackDownloads,getCommits } = useContext(apiContext);

    const fetchData = (reponame,pname)=>{
        fetchRepos(reponame)
        getPackDownloads(pname)
        getCommits(reponame)      
    }

    useEffect(() => {
        fetchData()       
    }, [])

    return (
        
            <div className={classes.outercontainer}>
                {
                    fetchedPackages?.map(pack=>{
                        const reponame = pack.package.links.repository
                        const pname = pack.package.name
                        return(                    
                            <div className={classes.cardContainer} key={pack.package.name}>                     
                            <Card className={classes.card} >
                        
                                <CardContent className={classes.cardcontent}>
                                    <Box className={classes.boxheading}>
                                    <Typography  variant="h6" style={{color:'#fce290'}}>
                                        {pack.package.name}
                                        &nbsp;&nbsp;<small style={{color:'#5d5d5d'}}>v({pack.package.version})</small>
                                    </Typography> 
                                        <Clipboard packName={pack.package.name}/>
                                    </Box> 
                                    <LINK to={`/packages/${pack.package.name}`} key={pack.package.name} 
                            style={{textDecoration:'none'}} onClick={()=>fetchData(reponame,pname)}>                                                          
                                    <Box className={classes.descdiv}>
                                        <Typography style={{textAlign:'left',}}>
                                            {pack.package.description}
                                        </Typography>
                                    </Box>  
                                    </LINK>                                                      
                                </CardContent>
                                
                            
                                <CardActions className={classes.actionbtns}>
                                    <Box className={classes.publishbox}>
                                        <p>Last published:</p>&nbsp;
                                        <Typography variant='h6' > {timeago.format(pack.package.date)}</Typography>
                                    </Box>
                                    <Box style={{display:'inline-grid',gridTemplateColumns:'auto auto auto',gap:'8px'}} >
                                        <Link href={pack.package.links.homepage} size="small" target='_blank'>
                                            Home
                                        </Link>
                                        <Link href={pack.package.links.npm} size="small" target='_blank'>
                                            npm
                                        </Link>
                                        <Link href={pack.package.links.repository} size="small" target='_blank'>
                                            GitHub
                                        </Link>
                                    </Box>                                          
                                </CardActions>
                            </Card> 
                            </div>                            
                        )
                    })
                }               
            </div>
    )
}
