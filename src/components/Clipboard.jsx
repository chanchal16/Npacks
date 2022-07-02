import React,{useState} from 'react'
import {CopyIcon} from '@primer/octicons-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Snackbar,Box,Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    clipboard:{
        margin:'10px 0',
        
    },
    command:{
        // background:theme.palette.secondary.dark,
        background:'#444',
        color:'#fff',
        // color:'#e4ddd0',
        border:`1px solid black`,
        borderRadius:'3px',
        padding:'4px'
       
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
}))

export default function Clipboard({packName}) {
    const classes = useStyles();
    const [copySuccess, setCopySuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCopy = (props)=>{
        setCopySuccess(!copySuccess);
        setOpen(true);
        return <Slide {...props} direction="right"/>
    }
  return (
    <div  className={classes.clipboard}>
        <CopyToClipboard text={`npm install ${packName}`}
            onCopy={handleCopy}> 
                <Box className={classes.wrapIcon}>
                <span className={classes.command} >{`npm install ${packName}`}</span> 
                <div className={classes.iconbtn}><CopyIcon fill='secondary'  /></div>
                <Snackbar
                    anchorOrigin={{vertical:'top',horizontal:'right'}}
                    open={open}
                    onClose={()=>setOpen(false)}
                    autoHideDuration={3000}
                    TransitionComponent={Slide}
                    message="Copied successfully!🎉"                            
                />
                </Box>                                                                              
        </CopyToClipboard>
    </div>
  )
}
