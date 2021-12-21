import React from 'react'
import { Link } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import { Box,Button, Typography } from '@material-ui/core';

export default function LandingPage() {
    return (
        <div>
            <SearchBar />
            <Link to='/home' style={{textDecoration:'none'}}>
                <Button variant="outlined" color="primary" style={{marginTop:'5rem'}}>Browse</Button>
            </Link> 
            <Box >
                <Typography>more content </Typography>
            </Box>
        </div>
    )
}
