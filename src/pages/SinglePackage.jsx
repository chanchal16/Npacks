import React,{useContext} from 'react'
import {Box,Typography,Button,IconButton,Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { apiContext } from '../contexts/ApiContext'
import Charts from '../components/Charts';
import * as timeago from "timeago.js";
import { useHistory,useParams } from "react-router-dom";
import CBarChart from '../components/CBarChart';
import Loader from '../components/Loader';
import { PackageIcon,HomeFillIcon,MarkGithubIcon } from '@primer/octicons-react';
import Clipboard from '../components/Clipboard';
import images from '../../public/images';


const useStyles = makeStyles((theme)=>({
    pagecontainer:{
        padding:'1rem',
        margin:'0 3rem 3.2rem',
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
            backgroundColor:'#fce290'
        },
    },
    heading:{
        display:'grid',
        gridTemplateColumns:'60% auto',
        justifyContent:'space-between',
        textAlign:'left',
        margin:'0 5rem',
        paddingBottom: '2rem',
        borderBottom: '1px solid #df9a29',
        color:theme.palette.primary.main,
        ['@media (width:280px)']:{
            margin:'0 1.8rem'
        },
        ['@media (width:540px)']:{
            margin:'2rem 3rem 0'
        },
        [theme.breakpoints.down(768)]:{
            margin:'0 2rem',
            flexDirection:'column'
        },
        [theme.breakpoints.between(768,1025)]:{
            margin:0
        }
    },
    // links
    linksection:{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    links:{
        '&:hover':{
            color:theme.palette.primary.light
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
        width:'90%',
        display:'inline-flex',
        flexDirection:'row',
        justifyContent:'space-between',
        [theme.breakpoints.down(767)]:{
            display:'grid',
            gridTemplateColumns:'auto',
            gap:'1rem'                   
        },
        ['@media (width:768px)']:{
            display:'grid',
            gridTemplateColumns:'auto auto',
            gap:'3rem',
            marginRight:'10rem'
        },
        ['@media (width:820px)']:{
            display:'grid',
            gridTemplateColumns:'auto auto',
            gap:'3rem',
            marginRight:'12rem'
        },
        ['@media (width:912px)']:{
            display:'grid',
            gridTemplateColumns:'auto auto',
            gap:'3rem',
            marginRight:'8rem'
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
         marginTop:'1rem'
     },
     ['@media (width:280px)']:{
        width:200,
        height:'fit-content'
     },
     ['@media (width:320px)']:{
        width:220,
     },
     ['@media (width:540px)']:{
        width:402,
        height:'fit-content'
     },
     ['@media (width:768px)']:{
        width:280,
        height:'fit-content'
      },
      ['@media (width:820px)']:{
          width:330
      },
        ['@media (width:912px)']:{
        width:330
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
    },
    spanel:{
        color:theme.palette.secondary.contrastText
    },
  
    lowerOuterBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        bottom:0,      
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
        marginTop:'8px',
        [theme.breakpoints.down(767)]:{
            fontSize:'1rem',
            marginTop:0
        },
        ['@media (width:540px)']:{
            fontSize:'1.2rem'
        },
        [theme.breakpoints.between(768,1025)]:{
            fontSize:'1rem',
            marginTop:0
        }
    },
    nodata:{
        width:420,
        height:300,
        padding:'20px',
        color:'#fce290',
        background:theme.palette.secondary.main,
        border:theme.palette.secondary.main,
        borderRadius:'10px',
      },
    imgdiv:{
        margin:'1rem',
        padding:'2rem'
    },
    nodataimg:{
        width:150,
        margin:'auto'
    }
 }))

export default function SinglePackage() {
    const classes = useStyles();
    let history = useHistory();
    const params = useParams();
    const {fetchedRepo,weeklyDownloads,fetchedPackages} = useContext(apiContext)

    // get current package
    const fetchedPackage = fetchedPackages.find(pack=>pack?.package?.name === params?.name)
    
    function handleBackClick() {
        history.push("/packages");
    }

    return (
        <section >
            <Box className={classes.backbuttonbox}>
            <IconButton color='secondary' size="small" className={classes.backbtn} onClick={handleBackClick}>
                    <ArrowBackIcon />
            </IconButton>
            </Box>

            {
                weeklyDownloads ?
            <div className={classes.pagecontainer}>
            
            <Box className={classes.heading}>
                <Box>
                    <Box style={{display:'flex',gap:'1rem',alignItems:'center'}}>
                        <Typography variant='h5' style={{color:'#fcce28',margin:0}}>
                            {fetchedRepo?.name} 
                            
                        </Typography>
                        <Typography variant='h6' style={{color:'#5d5d5d'}}>v({fetchedPackage?.package?.version})</Typography>
                        <Clipboard packName={fetchedPackage?.package?.name}/>
                    </Box>
                    <span style={{color:'#ebd483'}}>{fetchedRepo?.description}</span>
                </Box>
                <section className={classes.linksection}>                 
                    <Box style={{display:'inline-grid',gridTemplateColumns:'auto auto auto',gap:'15px',alignSelf: 'end'}} >
                        <Link href={fetchedPackage?.package?.links?.homepage} size="small" target='_blank' className={classes.links}>
                            <HomeFillIcon size={24} />
                        </Link>
                        <Link href={fetchedPackage?.package?.links?.npm} size="small" target='_blank' className={classes.links}>
                            <PackageIcon size={24} />
                        </Link>
                        <Link href={fetchedPackage?.package?.links?.repository} size="small" target='_blank' className={classes.links}>
                            <MarkGithubIcon size={24} />
                        </Link>
                    </Box> 
                    <Box className={classes.publishbox}>
                        <Typography variant='h6' style={{color:'#5d5d5d',alignSelf:'end'}}>Last published: {timeago.format(fetchedPackage?.package?.date)}</Typography>
                    </Box>
                </section>   
            </Box>           
            
            <Box className={classes.infocontainer}>
                <Charts />
                
                <Box className={classes.infoItemBox}>
                    <CBarChart />
                    {fetchedRepo?
                    <Box className={classes.gitinfo}>
                    <Link href={fetchedRepo?.homepage} target="_blank"> 
                        <Button style={{float:'right',color:'#fff99e'}}>Home</Button>
                    </Link>                       
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
                                <Typography className={classes.license}>{fetchedRepo?.license?.spdx_id}</Typography>
                            </Box>
                            <Box className={classes.lowerInnerBox}>
                                <span className={classes.spanel}>Updated at</span>
                                <Typography className={classes.updatedat}>{timeago.format(fetchedRepo?.updated_at)}</Typography>
                            </Box>
                        </Box> 
                    </Box>
                    :
                    <Box className={classes.nodata}>
                        <Typography style={{textAlign:'center'}}>No Data available</Typography>
                        <Box className={classes.imgdiv} >
                            <img className={classes.nodataimg} src={images.nodata} alt='no-data' />
                        </Box>
                    </Box>
                    }
                </Box>
            </Box> 
            </div>
            :
                <div style={{ margin:'auto',padding:'6rem'}}>
                    <Loader />
                </div>
            }
        </section>
    )
}
