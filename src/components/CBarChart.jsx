import React,{useContext,useEffect} from 'react'
// import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import { apiContext } from '../contexts/ApiContext';
import {Box,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Chart as ChartJS,CategoryScale,LinearScale, BarElement,Title,Tooltip} from "chart.js";
import { Bar } from "react-chartjs-2";
import {RepoForkedIcon,EyeIcon,StarIcon} from '@primer/octicons-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "last year commits grouped by weeks"
    },
    tooltip:{
      displayColors:false
    }
  }
};

const useStyles = makeStyles((theme)=>({
  statsContainer:{
    width:460,
    paddingTop:'12px',
    // margin:'2rem',
    background:theme.palette.secondary.main,
    border:theme.palette.secondary.main,
    borderRadius:'10px',
    // marginRight:'2rem'
    
  },

  chartContainer:{
      width:400,
      margin:'auto',
      // border:'2px solid #ccc'
  },
  infoouterbox:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop:'0.2rem',
      padding:'1rem 0'
  },
  innerbox:{
      textAlign:'center',
      color:theme.palette.primary.contrastText,
      border:'2px solid #fce290',
      borderRadius:'20px',
      padding:' 2px 20px'
  },
}))

export default function CBarChart() {
  const classes = useStyles();
    const{commits,fetchedRepo} = useContext(apiContext)   
    console.log('commits',commits)

    const unix = commits?.map((c) => {
        let date = new Date(c.week * 1000).toLocaleDateString("en-US");
        console.log("date", date);
        return date;
    });

    const labels = unix;
    const data = {
      labels,
      datasets: [
        {
          label:'commits',
          data: commits?.map((tc) => tc?.total),
          backgroundColor: "#fce290"
        }
      ]
    };

    return (
        <div>
          <Box className={classes.statsContainer}>
            <Box className={classes.outerchartbox}>
              <Typography variant='h6' style={{color:'#fce290'}} >Commits</Typography> 
                <Box className={classes.chartContainer}>
                  <Bar options={options} data={data} />
                </Box>
            </Box>
            
            <Box className={classes.infoouterbox}>
              <Box className={classes.innerbox}>
                  <RepoForkedIcon  />
                  <Typography variant='h5'> {fetchedRepo?.forks}</Typography>
              </Box>
              <Box className={classes.innerbox}>
                  <StarIcon  />
                  <Typography variant='h5'> {fetchedRepo?.stargazers_count}</Typography>
              </Box>
              <Box className={classes.innerbox}>
                  <EyeIcon  />
                  <Typography variant='h5'>{fetchedRepo?.watchers}</Typography>
              </Box>
            </Box>
          </Box>
        </div>
    )
}
