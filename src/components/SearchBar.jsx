import React,{useState,useContext,useCallback} from 'react'
import { apiContext } from '../contexts/ApiContext'
import { Link } from "react-router-dom";
import { Box,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
   outercontainer:{
       position:'relative'
   },
    searchInput:{
        width:'60%',
        color:'white',
        padding:'1rem',
        background:theme.palette.secondary.main,
        border:`2px solid ${theme.palette.secondary.main}`,
        borderRadius:'30px',
        margin:'7% 10% 2%',
        fontSize:'18px',
        [theme.breakpoints.down(768)]:{
            width:'80%',
            fontSize:'15px'
            // margin:'7% 7% 2%'
        }
    },
    popover:{
        width:'100%',     
        position:'absolute',
        zIndex:1,
        left:0,
        background:'rgba(0,0,0,0.6)'
    },
    outerpackbox:{
        // width:'60%',
       margin:'10px'
    },
    packlist:{
       fontSize:'18px',
        width:'55%',
        padding:'1rem',
        margin:'auto',
        background:theme.palette.secondary.main,
        border:`1.5px solid ${theme.palette.secondary.main}`,
        borderRadius:'15px',
        '&:hover':{
            border:`1.5px solid ${theme.palette.primary.main}`,
            borderRadius:'15px',
            // backgroundColor:'rgb(252, 211, 77,0.1)'
        },
        [theme.breakpoints.down(768)]:{
            width:'70%'
        }
    }
}))

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

export default function SearchBar() {
    const classes = useStyles();
    const {fetchedPackages,fetchPackages,fetchRepos,getPackDownloads,getCommits} 
    = useContext(apiContext)
    const [text,setText] = useState('')
    const [open, setOpen] = useState(false);

    const getSearchResults = (value)=>{
        setText(value)
        fetchPackages(value)
        console.log('callback')
        setOpen(true)
    }
    const debounceOnChange = useCallback(
        debounce(getSearchResults, 100), []);

    const fetchData = (reponame,pname)=>{
        fetchRepos(reponame)
        getPackDownloads(pname)
        getCommits(reponame)     
    }
    
    const handleClickAway = () => {
        setOpen(false);
        setText('')
    };
    
    return (
        <div className={classes.outercontainer} onClick={handleClickAway}>         
            <input type='search' value={text} placeholder='search packages' className={classes.searchInput} 
            onChange={(e)=>debounceOnChange(e.target.value)} />
            <Box >
                 {open ? 
                    <Box className={classes.popover}>
                    {
                        fetchedPackages?.map(fp=>{
                            const reponame = fp.package.links.repository
                            const pname = fp.package.name
                            return(
                                <div key={fp.package.name} className={classes.outerpackbox}>      
                                    <Box className={classes.packlist}>
                                        <Link to={`/package/${fp.package.name}`} key={fp.package.name} 
                                style={{textDecoration:'none'}} onClick={()=>fetchData(reponame,pname)}>
                                            <Typography variant='h5' style={{color:'#fce290',textAlign:'left'}}>
                                                {fp.package.name}
                                            </Typography>
                                        </Link>
                                    </Box>                 
                                </div>
                            )
                        })
                    }
                    </Box> 
                 : null}  
            </Box>
        </div>
    )
}
