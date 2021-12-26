import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'relative',
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
      color: '#1a90ff',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
    circle: {
      strokeLinecap: 'round',
    },
  }));

export default function Loader(props) {
    const classes = useStyles();
    return (
        <div >
           
            <CircularProgress
                variant="indeterminate"
                disableShrink
                size={40}
                thickness={4}
                color='primary'
                
            />
        </div>
    )
}
