import React,{useState,useContext,useCallback,useEffect} from 'react'
import { apiContext } from '../contexts/ApiContext'
import { Link } from "react-router-dom";
import { Box,Dialog,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import images from '../../public/images';

const useStyles = makeStyles((theme)=>({
   
    searchInput:{
        width:'90%',
        color:'white',
        padding:'1rem',
        zIndex:1,
        background:theme.palette.secondary.main,
        border:`2px solid ${theme.palette.secondary.main}`,
        borderRadius:'30px',
        margin:'1rem auto',
        fontSize:'18px',
        [theme.breakpoints.down(768)]:{
            width:'80%',
            fontSize:'15px'
        }
    },
    popover:{
        width:'100%',
        overflow: 'auto',    
        zIndex:12,
        left:0,
    },
    outerpackbox:{
       margin:'10px'
    },
    packlist:{
       fontSize:'15px',
        width:'80%',
        padding:'1rem',
        margin:'auto',
        background:theme.palette.secondary.main,
        border:`1.5px solid ${theme.palette.secondary.main}`,
        borderRadius:'15px',
        '&:hover':{
            border:`1.5px solid ${theme.palette.primary.main}`,
            borderRadius:'15px',
        },
        [theme.breakpoints.down(768)]:{
            width:'70%'
        }
    },
    nodataDiv:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        margin:'1rem',
        color:theme.palette.secondary.main
    },
    nodataimg:{
        width:'7rem',
        margin:'1rem'
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

export default function SearchModal({openModal,setOpenModal}) {
    const classes = useStyles();
    const {fetchedPackages,setFetchedPackages,fetchPackages,fetchRepos,getPackDownloads,getCommits} 
    = useContext(apiContext)
    const [text,setText] = useState('')

    useEffect(() => {
        setFetchedPackages([])
    }, [])
    
    // search for the packages
    const getSearchResults = (value)=>{
        setText(value)
        fetchPackages(value)
    }
    const debounceOnChange = useCallback(
        debounce(getSearchResults, 100), []);
        
    // fetch data when clicked on package through search
    const fetchData = (reponame,pname)=>{
        fetchRepos(reponame)
        getPackDownloads(pname)
        getCommits(reponame)     
    }
    
    const handleClickAway = () => {
        setText('')
        setOpenModal(false)
        setFetchedPackages([])
    };
    
    return (
        <Dialog className='search-container' onClose={handleClickAway} open={openModal}>         
            <input type='search' value={text} placeholder='search packages' className={classes.searchInput} 
            onChange={(e)=>debounceOnChange(e.target.value)} />
                <Box className={classes.popover}>
                    {
                        fetchedPackages.length >0?
                        (<>
                        {fetchedPackages?.map(fp=>{
                            const reponame = fp.package.links.repository
                            const pname = fp.package.name
                            return(
                                <div key={fp.package.name} className={classes.outerpackbox}>      
                                    <Box className={classes.packlist}>
                                        <Link to={`/packages/${fp.package.name}`} key={fp.package.name} 
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
                        </>):(
                        <Box className={classes.nodataDiv}>
                            <Typography variant='h5'>
                                no data available
                            </Typography>
                            <Box className={classes.imgdiv} >
                                <img className={classes.nodataimg} src={images.nodata} alt='no-data' />
                            </Box>
                        </Box>
                    )
                    }
                </Box> 
        </Dialog>
    )
}
