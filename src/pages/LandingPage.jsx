import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div>
            <Link to='/home' style={{textDecoration:'none'}}>
                <Button variant="outlined" color="primary" style={{marginTop:'5rem'}}>Browse</Button>
            </Link> 
        </div>
    )
}
