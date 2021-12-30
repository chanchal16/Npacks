import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
    },
    
    circle: {
      strokeLinecap: 'round',
    },
  }));

export default function Loader(props) {
    const classes = useStyles();
    return (
        <div style={{margin:'auto'}} >
           
            <CircularProgress
                variant="indeterminate"
                disableShrink
                size={50}
                thickness={4}
                color='primary'
                
            />
        </div>
    )
}
