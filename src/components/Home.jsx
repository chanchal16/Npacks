import React,{useState,useEffect,useContext,useRef} from 'react'
import { Box,Link,Button,Typography,List,ListItem,ListItemText,Dialog,DialogTitle,ClickAwayListener } 
from '@material-ui/core';
import { apiContext } from '../contexts/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import Packages from '../pages/Packages';
import DialogBox from './DialogBox';

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
    const {fetchPackages} = useContext(apiContext)   
    const [topic, setTopic] = useState('bundler');
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('bundler');
    

    const fetchTopicPackages = (value) => {
        setTopic(value);
        console.log("topic", topic);
        fetchPackages(value);
        setOpen(false);
        setSelectedValue(value);
    };

    useEffect(() => {
        fetchPackages(topic);
    }, []);

    const handleClick= () => {
        setOpen(true);
      };

    return (
        <div>
        <Typography style={{textAlign:'left',margin:'15px 12px 0'}} variant='h5' color='primary'>JS Frameworks</Typography>
        <Button variant="outlined" color="primary" onClick={handleClick}>
        Categories
        </Button>
            <div >
            <DialogBox selectedValue={selectedValue} open={open} onClose={fetchTopicPackages} />
            </div>
        <Packages />
        </div>
    )
}
