import React,{useContext,useState} from 'react'
import { apiContext } from "../contexts/ApiContext";
import {Card,CardContent,CardActions,Grid,Typography,Box,Link,Snackbar,Slide} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import * as timeago from "timeago.js";
import {CopyIcon} from '@primer/octicons-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link as LINK } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    outercontainer:{
        margin:'3rem 0',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
    },
   cardContainer:{
        // display:'flex',
        // flexDirection:'row',
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
        // margin:'auto'
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
    boxes:{
        // width:'150px',
        background:theme.palette.secondary.dark,
        color:theme.palette.secondary.contrastText,
        border:`2px solid ${theme.palette.secondary.dark}`,
        borderRadius:'15px',
        padding:'12px',
        margin:'1rem'       
    },
    clipboard:{
        margin:'10px 0',
        
    },
    command:{
        // background:theme.palette.secondary.dark,
        background:'#e4ddd0',
        color:theme.palette.secondary.dark,
        // color:'#e4ddd0',
        border:`1px solid black`,
       
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

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

export default function Packages() {
    const classes = useStyles();
    const { fetchedPackages,fetchRepos,getPackDownloads,getCommits } = useContext(apiContext);
    const [copySuccess, setCopySuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCopy = (props)=>{
        setCopySuccess(!copySuccess);
        setOpen(true);
        return <Slide {...props} direction="right"/>
    }

    const fetchData = (reponame,pname)=>{
        fetchRepos(reponame)
        getPackDownloads(pname)
        getCommits(reponame)
        
    }

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
                                    <div className={classes.clipboard}>
                                        <CopyToClipboard text={`npm install ${pack.package.name}`}
                                        onCopy={handleCopy}> 
                                            <Box className={classes.wrapIcon}>
                                            <span className={classes.command} >{`npm install ${pack.package.name}`}</span> 
                                            <div className={classes.iconbtn}><CopyIcon fill='secondary'  /></div>
                                            <Snackbar
                                                anchorOrigin={{vertical:'top',horizontal:'right'}}
                                                open={open}
                                                onClose={()=>setOpen(false)}
                                                autoHideDuration={5000}
                                                TransitionComponent={Slide}
                                                message="Copied successfully!"                            
                                            />
                                            </Box>                                                                              
                                        </CopyToClipboard>
                                    </div>
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
                                <Link href={pack.package.links.homepage} size="small" >
                                    Home
                                </Link>
                                <Link href={pack.package.links.npm} size="small" >
                                    npm
                                </Link>
                                <Link href={pack.package.links.repository} size="small" >
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
