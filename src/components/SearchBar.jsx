import React,{useState,useContext,useCallback} from 'react'
import { apiContext } from '../contexts/ApiContext'
import { Link } from "react-router-dom";
import { Box,Typography,Dialog } from '@material-ui/core';
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
        margin:'10% 10% 2%',
        fontSize:'18px'
    },
    popover:{
        width:'100%',
        position:'absolute',
        zIndex:1,
        left:0,
        background:'rgba(0,0,0,0.1)'
    },
    outerpackbox:{
        // width:'60%',
       margin:'10px'
    },
    packlist:{
       fontSize:'18px',
        width:'55%',
        padding:'2rem',
        margin:'auto',
        border:`1.5px solid ${theme.palette.primary.main}`,
        borderRadius:'15px'
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
    const {fetchedPackages,fetchPackages,fetchRepos,getPackDownloads,getCommits} = useContext(apiContext)
    const [text,setText] = useState()
    const getSearchResults = (value)=>{
        setText(value)
        fetchPackages(text)
        console.log('callback')
    }
    const debounceOnChange = useCallback(
        debounce(getSearchResults, 400), []);

    const fetchData = (reponame,pname)=>{
        fetchRepos(reponame)
        getPackDownloads(pname)
        getCommits(reponame)
        
    }
    
    return (
        <div className={classes.outercontainer}>
            <input value={text} type='search' placeholder='search packages' className={classes.searchInput} 
            onChange={(e)=>debounceOnChange(e.target.value)} />
                <Box className={classes.popover}>
                {
                    fetchedPackages?.map(fp=>{
                        const reponame = fp.package.links.repository
                        const pname = fp.package.name
                        return(
                            <div key={fp.package.name} className={classes.outerpackbox}>
                                <Link to={`/packages/${fp.package.name}`} key={fp.package.name} 
                            style={{textDecoration:'none'}} onClick={()=>fetchData(reponame,pname)}>
                                <Box className={classes.packlist}>
                                <Typography variant='h5' style={{color:'#fce290',textAlign:'left'}}>{fp.package.name}</Typography>
                                </Box> 
                                </Link>
                            </div>
                        )
                    })
                }
                </Box>
        </div>
    )
}
