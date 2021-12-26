import React,{useState,useEffect,useContext,useRef} from 'react'
import { Box,Link,Button,Typography,Divider, Breadcrumbs } 
from '@material-ui/core';
import { apiContext } from '../contexts/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Packages from '../pages/Packages';
import DialogBox from './DialogBox';
import Loader from './Loader';

const useStyles = makeStyles((theme)=>({
    categorycontainer:{
        // width:'80%',       
        justifyContent:'space-evenly',
        background:theme.palette.secondary.main,
        border:`2px solid ${theme.palette.secondary.main}`,
        borderRadius:'20px',
        margin:'1rem 3rem',
        padding:'1rem'
    },
    box:{
        width:'100px',
        // border:'2px solid gray',
        // cursor:'pointer'
    },
    topic:{
        width:'100%',
        background:'transparent',
        border:'none',
        color:theme.palette.primary.contrastText,
        margin:'0 0 5px',
        cursor:'pointer'
    }
}))

export default function Home() {
    const classes = useStyles();
    const {fetchPackages,fetchedPackages} = useContext(apiContext)   
    const [topic, setTopic] = useState('bundler');
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('bundler');
    const [title,setTitle] = useState('Build tool')

    const fetchTopicPackages = (value,topictitle) => {
        setTopic(value);
        console.log("topic", topic);
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

    return (
        <div>
            <Box style={{margin:'20px'}} >
                <Button variant="outlined" color="primary" onClick={handleClick} style={{marginLeft:'85%'}} >
                Categories
                </Button>
            </Box>
            <div style={{margin:'1rem auto 0 2rem'}}>
                <Breadcrumbs color='primary'>
                    <Typography variant='h5' color='primary'>Category</Typography>
                    <Typography  variant='h5' color='primary'>
                        {title}
                    </Typography>
                    <Typography variant='h5' color='primary'>{selectedValue}</Typography>
                </Breadcrumbs>
            </div>
            
            <Box >
                <DialogBox selectedValue={selectedValue} title={title} open={open} onClose={fetchTopicPackages} />
            </Box>
            
            {!fetchedPackages ?
                <Box style={{minHeight:'100vh', margin:'auto',padding:'5rem'}}>
                    <Loader />
                </Box>
                
                :
                <Box>
                    <Packages />
                </Box>
            }
            
        </div>
    )
}
