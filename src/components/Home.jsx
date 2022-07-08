import React,{useState,useEffect,useContext} from 'react'
import { Box,Link,Button,Typography,IconButton,Breadcrumbs } 
from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { apiContext } from '../contexts/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Packages from '../pages/Packages';
import DialogBox from './DialogBox';
import Loader from './Loader';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
    categorycontainer:{     
        justifyContent:'space-evenly',
        background:theme.palette.secondary.main,
        border:`2px solid ${theme.palette.secondary.main}`,
        borderRadius:'20px',
        margin:'1rem 3rem',
        padding:'1rem',
    },
    box:{
        width:'100px',
    },
    topic:{
        width:'100%',
        background:'transparent',
        border:'none',
        color:theme.palette.primary.contrastText,
        margin:'0 0 5px',
        cursor:'pointer'
    },
    backbtn:{
        background:theme.palette.primary.main,
        '&:hover':{
            backgroundColor:'#fce290'
        },
        [theme.breakpoints.down('md')]:{
            float:'left'
        },
    },
    categorybtn:{
        marginLeft:'85%',
        [theme.breakpoints.down(768)]:{
           marginLeft:'60%'
        },
        ['@media (width:280px)']: {
            marginLeft:'50%'
        }
    },
    outerbreadcrumdiv:{
        margin:'1rem auto 0 2rem',
        [theme.breakpoints.down(768)]:{
            margin:'1rem auto 0 1rem'
        }
    },
    breadcrums:{
        fontSize:'12px',
        color:theme.palette.primary.main
    }
}))

export default function Home() {
    const classes = useStyles();
    let history = useHistory();

    const {fetchPackages,fetchedPackages} = useContext(apiContext)   
    const [topic, setTopic] = useState('bundler');
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('bundler');
    const [title,setTitle] = useState('Build tool')

    const fetchTopicPackages = (value,topictitle) => {
        setTopic(value);
        fetchPackages(value);
        setOpen(false);
        setSelectedValue(value);
        setTitle(topictitle)     
    };

    useEffect(() => {
        fetchPackages(topic);     
    }, []);

    const handleClick= () => {
        setOpen(true);
      };

    function handleBackClick() {
        history.push("/");
    }

    return (
        <div>
            <Box style={{margin:'20px'}} >
                <IconButton color='secondary' size="small" className={classes.backbtn} onClick={handleBackClick}>
                    <ArrowBackIcon />
                </IconButton>
                <Button variant="outlined" color="primary" onClick={handleClick} className={classes.categorybtn} >
                Categories
                </Button>

            </Box>
            <div className={classes.outerbreadcrumdiv}>
                <Breadcrumbs className={classes.breadcrums}>
                    <Typography variant='h5' >Category</Typography>
                    <Typography  variant='h5' >
                        {title}
                    </Typography>
                    <Typography variant='h5'>{selectedValue}</Typography>
                </Breadcrumbs>
            </div>
            
            <Box >
                <DialogBox selectedValue={selectedValue} title={title} open={open} onClose={fetchTopicPackages} />
            </Box>
            
            {fetchedPackages.length===0 ?(
                <Box style={{minHeight:'100vh', margin:'auto',padding:'7rem'}}>
                    <Loader />
                </Box>
            )
                :(
                <Box>
                    <Packages />
                </Box>)
            }
            
        </div>
    )
}
