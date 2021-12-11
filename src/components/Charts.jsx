import React,{useContext} from 'react'
import {Box,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { apiContext } from '../contexts/ApiContext'
import { AreaChart, Area, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

const useStyles = makeStyles((theme)=>({
    statsContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        width:450,
        // margin:'2rem',
        background:theme.palette.secondary.main
    },
    chartContainer:{
        width:380,
        margin:'1rem',
        // border:'2px solid #ccc'
    }
}))

export default function Charts() {
    const classes = useStyles();
    const {weeklyDownloads,monthlyDownloads} = useContext(apiContext)
    return (
        <div>
            <Box className={classes.statsContainer}>
                <Typography variant='h6' style={{color:'#fce290'}} >Weekly downloads</Typography>
                <Box className={classes.chartContainer}>
                    <ResponsiveContainer width="99%" aspect={3}>
                        <AreaChart
                            data={weeklyDownloads}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fce290" stopOpacity={0.23} />
                                <stop offset="95%" stopColor="#fce290" stopOpacity={0} />
                            </linearGradient>
                            </defs>
                            <XAxis dataKey="day" style={{fontSize:'10px'}} />
                            <YAxis style={{fontSize:'10px'}} />
                            {/* <CartesianGrid strokeDasharray="3 3" vertical={false} /> */}
                            <Tooltip wrapperStyle={{fontSize:'10px'}} />
                            <Area
                            type="monotone"
                            dataKey="downloads"
                            stroke="#fce290"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
                <Typography variant='h6' style={{color:'#fce290'}} >Monthly downloads</Typography>
                <Box className={classes.chartContainer}>
                    <ResponsiveContainer width="99%" aspect={3}>
                        <AreaChart
                            data={monthlyDownloads}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fce290" stopOpacity={0.23} />
                                <stop offset="95%" stopColor="#fce290" stopOpacity={0} />
                            </linearGradient>
                            </defs>
                            <XAxis dataKey="day" style={{fontSize:'10px'}} />
                            <YAxis style={{fontSize:'10px'}} />
                            <CartesianGrid  vertical={false} horizontal={false} />
                            <Tooltip wrapperStyle={{fontSize:'10px'}} />
                            <Area
                            type="monotone"
                            dataKey="downloads"
                            stroke="#fce290"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </div>
    )
}
