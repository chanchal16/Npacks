import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PersonIcon from '@material-ui/icons/Person';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Box,Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const font = "'Nunito', sans-serif ";
const useStyles = makeStyles((theme)=>({
    footer:{
        background:theme.palette.secondary.main,
        padding:'3rem',
        bottom:0,
    },
    socials:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    links:{
        margin:'12px',
        '&:hover':{
            color:theme.palette.primary.light
        }
    }
}))

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Box className={classes.socials}>
                <Link href='https://github.com/chanchal16' target="_blank" className={classes.links}>
                    <GitHubIcon />
                </Link>
                <Link href='https://www.linkedin.com/in/rajput07/' target="_blank" className={classes.links}>
                    <LinkedInIcon />
                </Link>
                <Link href='https://twitter.com/chanchal16_' target="_blank" className={classes.links}>
                    <TwitterIcon />
                </Link>
                <Link href='https://chanchal.netlify.app/' target="_blank" className={classes.links}>
                    <PersonIcon />
                </Link>
            </Box>
        </div>
    )
}
