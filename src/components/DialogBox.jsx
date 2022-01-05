import React,{useState,useContext} from 'react'
import { Box,Typography,List,ListItem,ListItemText,Dialog,DialogTitle} 
from '@material-ui/core';
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
    list:{
        padding:'0 16px',
        '&:hover':{
            backgroundColor:'rgb(252, 211, 77,0.1)'
        }

    }
   
}))

export default function DialogBox({onClose, selectedValue, title,open}) {
    const classes = useStyles()
    const handleClose = () => {
        onClose(selectedValue,title);
      };
    
      const handleListItemClick = (value,topictitle) => {
        onClose(value,topictitle);
      };
    return (
        <div>
             <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className='dialogbox'>
                <DialogTitle id="simple-dialog-title" style={{color:'#df9a29'}} >Categories</DialogTitle>
               
                <div className={classes.accordiondiv}>
                    {
                        topicsData?.map((topic)=>{
                            return(
                                <div key={topic.title} className={classes.details}>
                                    <Box style={{borderLeft:'4px solid #d97706',borderRadius:'5%',padding:'2px'}}>
                                    <Typography style={{fontSize:'17px',color:'#df9a29'}} >{topic.title} </Typography>
                                    </Box>
                                    <List>
                                    {
                                        topic.topics?.map((t)=>{
                                            return(
                                                <div className={classes.topicsbox} key={t.id}>
                                                    <ListItem button onClick={()=>handleListItemClick(t.name,topic.title)} className={classes.list} >                                              
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
