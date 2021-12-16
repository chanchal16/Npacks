import React,{useContext,useEffect} from 'react'
// import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import { apiContext } from '../contexts/ApiContext';
import {Box,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Chart as ChartJS,CategoryScale,LinearScale, BarElement,Title,Tooltip} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "last year commits grouped by weeks"
    }
  }
};

const useStyles = makeStyles((theme)=>({
  statsContainer:{
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

export default function CBarChart() {
  const classes = useStyles();
    const{commits} = useContext(apiContext)
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
          data: commits?.map((tc) => tc?.total),
          backgroundColor: "#fce290"
        }
      ]
    };
    return (
        <div>
            <Box className={classes.statsContainer}>
              <Box className={classes.chartContainer}>
                <Bar options={options} data={data} />
              </Box>
            </Box>
        </div>
    )
}
