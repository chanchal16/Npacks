import React,{useState,useContext} from 'react'
import { Box,Link,Button,Typography,List,ListItem,ListItemText,Dialog,DialogTitle,ClickAwayListener } 
from '@material-ui/core';
import { apiContext } from '../contexts/ApiContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    accordiondiv:{
        display:'flex',
        flexDirection:'row'
    },
    details:{
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap'
    },
}))

export default function DialogBox({onClose, selectedValue, open}) {
    const classes = useStyles()
    const {topicsArr} = useContext(apiContext) 
    const handleClose = () => {
        onClose(selectedValue);
      };
    
      const handleListItemClick = (value) => {
        onClose(value);
      };
    return (
        <div>
             <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                <div className={classes.accordiondiv}>
                    {
                        topicsArr?.map((topic)=>{
                            return(
                                <div key={topic.title} className={classes.details}>
                                    <Typography variant='h5'>{topic.title} </Typography>
                                    <List>
                                    {
                                        topic.topics?.map((t)=>{
                                            return(
                                                <div className={classes.topicsbox}>
                                                    <ListItem button onClick={()=>handleListItemClick(t.name)} key={t.id}>                                              
                                                        <ListItemText primary={t.name} />
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
