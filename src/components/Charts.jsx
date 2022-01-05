import React,{useContext} from 'react'
import {Box,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { apiContext } from '../contexts/ApiContext'
// import { AreaChart, Area, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import { Chart as ChartJS,CategoryScale,LinearScale,LineElement,Title,Tooltip,PointElement} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, Title,PointElement, Tooltip);

export const options = {
    responsive: true,
    // maintainAspectRatio: false,
    scales: {
        x: {
          grid: {
            borderColor: 'grey',
           
          }
        },
        y:{
            grid: {
                borderColor: 'grey',
               
              } 
        }
      },
    plugins: {
      title: {
        display: true,
        text: "last week/month downloads"
      },
      tooltip:{
        displayColors:false
      },
     
    }
  };

const useStyles = makeStyles((theme)=>({
    statsContainer:{
        // width:'100%',
        display:'grid',
        gridTemplateColumns:'auto auto',
        gap:'1.8rem',
        // flexDirection:'row',
        // justifyContent:'space-between',
        [theme.breakpoints.down(767)]:{
            gridTemplateColumns:'auto '
        },
        [theme.breakpoints.between(768,1025)]:{
            gap:'1rem'
        }
        
    },
    outerchartbox:{
        width:433,
        margin:'0 1rem',
        padding:'15px',
        background:theme.palette.secondary.main,
        border:theme.palette.secondary.main,
        borderRadius:'10px',
        [theme.breakpoints.down(767)]:{
            width:300,
            margin:0,
            padding:'8px'
        },
        ['@media (width:280px)']:{
            width:230
        },
        ['@media (width:320px)']:{
            width:250
        },
        ['@media (width:540px)']:{
            width:427
        },
        ['@media (width:768px)']:{
            width:300
        },
        ['@media (width:820px)']:{
            width:340
        },
        ['@media (width:912px)']:{
            width:340
        },
        ['@media (width:1024px)']:{
            width:420
        }
        
    },
    chartContainer:{
        width:400,
        [theme.breakpoints.down(767)]:{
            width:260
        },
        ['@media (width:280px)']:{
            width:230
        },
        ['@media (width:320px)']:{
            width:250
        },
        ['@media (width:540px)']:{
            width:380
        },
        ['@media (width:768px)']:{
            width:270
        },
        ['@media (width:820px)']:{
            width:300
        },
        ['@media (width:912px)']:{
            width:300
        },
        // margin:'1rem',
        // background:theme.palette.secondary.dark
        // border:'2px solid #ccc'
    }
}))

export default function Charts() {
    const classes = useStyles();
    const {weeklyDownloads,monthlyDownloads} = useContext(apiContext)

    const weeklyData = {
        labels:weeklyDownloads?.map((wd) => wd.day),
        datasets:[
            {
                label:'Weekly Downloads',
                data:weeklyDownloads?.map((wdata) => wdata.downloads),
                borderColor:"#fce290",
                pointRadius: 2,
                tension:0.2
            }
        ],
    }
    const monthlyData = {
        labels:monthlyDownloads?.map((md) => md.day),
        datasets:[
            {
                label:'Monthly Downloads',
                data:monthlyDownloads?.map((mdata) => mdata.downloads),
                borderColor:"#fce290",
                pointRadius: 2,
                // pointHoverBorderColor:'red',
                tension:0.2
            }
        ]
    }
    return (
        <div style={{padding:'1rem 0'}}>
            <Box className={classes.statsContainer}>
                <Box className={classes.outerchartbox}>
                    {/* <Box className={classes.innerchartbox}> */}
                    <Typography variant='h6' style={{color:'#fce290'}} >Weekly downloads</Typography>
                    <Box className={classes.chartContainer}>
                        <Line options={options} data={weeklyData} />
                    </Box>
                    {/* </Box> */}
                </Box>
                <Box className={classes.outerchartbox}>
                    {/* <Box className={classes.innerchartbox}> */}
                    <Typography variant='h6' style={{color:'#fce290'}} >Monthly downloads</Typography>
                    <Box className={classes.chartContainer}>
                        <Line options={options} data={monthlyData} />
                    </Box>
                    {/* </Box> */}
                </Box>
                
            </Box>
        </div>
    )
}
