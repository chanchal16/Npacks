import React,{useState,useContext} from 'react'
import { Box,Link,Button,Typography,List,ListItem,ListItemText,Dialog,DialogTitle,DialogContent } 
from '@material-ui/core';
import { apiContext } from '../contexts/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import topicsData from '../TopicsData/TopicsData';

const useStyles = makeStyles((theme)=>({
    
    accordiondiv:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between'
    },
    details:{
        display:'flex',
        flexDirection:'column',
        // flexWrap:'wrap',
        margin: '15px'
    },
   
}))

export default function DialogBox({onClose, selectedValue, open}) {
    const classes = useStyles()
    const handleClose = () => {
        onClose(selectedValue);
      };
    
      const handleListItemClick = (value) => {
        onClose(value);
      };
    return (
        <div>
             <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className='dialogbox'>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
               
                <div className={classes.accordiondiv}>
                    {
                        topicsData?.map((topic)=>{
                            return(
                                <div key={topic.title} className={classes.details}>
                                    <Typography style={{fontSize:'17px',color:'#a76a1d'}} >{topic.title} </Typography>
                                    <List>
                                    {
                                        topic.topics?.map((t)=>{
                                            return(
                                                <div className={classes.topicsbox} key={t.id}>
                                                    <ListItem button onClick={()=>handleListItemClick(t.name)} style={{padding:'0 16px'}} >                                              
                                                        <ListItemText primary={t.name} className='listItem' />
                                                    </ListItem>
                                                </div>
                                            )
                                        })
                                    }
                                    </List>
                                </div>
                            )
                        })
                    }
                </div>
             
            </Dialog>
        </div>
    )
}
