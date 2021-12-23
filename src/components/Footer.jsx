import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PersonIcon from '@material-ui/icons/Person';
import { Box,Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const font = "'Nunito', sans-serif ";
const useStyles = makeStyles((theme)=>({
    footer:{
        background:theme.palette.secondary.main,
        padding:'3rem'
    },
    socials:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        // margin:'auto'
    },
    links:{
        margin:'12px'
    }
}))

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Box className={classes.socials}>
                <Link href='' className={classes.links}>
                    <GitHubIcon />
                </Link>
                <Link href='' className={classes.links}>
                    <LinkedInIcon />
                </Link>
                <Link href='' className={classes.links}>
                    <PersonIcon />
                </Link>
            </Box>
        </div>
    )
}
