import React,{useContext} from 'react'
import { apiContext } from '../contexts/ApiContext';
import {Box,Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Chart as ChartJS,CategoryScale,LinearScale, BarElement,Title,Tooltip} from "chart.js";
import { Bar } from "react-chartjs-2";
import {RepoForkedIcon,EyeIcon,StarIcon} from '@primer/octicons-react'
import images from '../../public/images';


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
    background:theme.palette.secondary.main,
    border:theme.palette.secondary.main,
    borderRadius:'10px',
    [theme.breakpoints.down(767)]:{
      width:320
    },
    ['@media (width:280px)']:{
      width:240
    },
    ['@media (width:320px)']:{
      width:260
    },
    ['@media (width:540px)']:{
      width:450
    },
    ['@media (width:768px)']:{
      width:330
    },
    ['@media (width:820px)']:{
      width:360
    },
    ['@media (width:912px)']:{
      width:370
    },
    ['@media (width:1024px)']:{
      width:450,     
    }
  },

  chartContainer:{
      width:400,
      margin:'auto',
      [theme.breakpoints.down(767)]:{
        width:260
      },
      ['@media (width:280px)']:{
        width:240
      },
      ['@media (width:320px)']:{
        width:250
      },
      ['@media (width:540px)']:{
        width:380
      },
      ['@media (width:768px)']:{
        width:290
      },
      ['@media (width:820px)']:{
        width:360
      },
      ['@media (width:912px)']:{
        width:350
      },
      ['@media (width:1024px)']:{
        width:370
      }
  },
  infoouterbox:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-around',
      marginTop:'0.2rem',
      padding:'1rem 0',
      
  },
  innerbox:{
      textAlign:'center',
      color:theme.palette.primary.contrastText,
      border:'2px solid #fce290',
      borderRadius:'20px',
      padding:' 2px 20px',
      [theme.breakpoints.down(767)]:{
        padding:'2px 12px'
      },
      ['@media (width:540px)']:{
        padding:'2px 25px'
      }
  },
  gitinfoFont:{
    fontSize:'1.25rem',
    [theme.breakpoints.down(767)]:{
      fontSize:'1rem'
    }
  },
  nodata:{
    width:420,
    height:300,
    padding:'20px',
    color:'#fce290',
    background:theme.palette.secondary.main,
    border:theme.palette.secondary.main,
    borderRadius:'10px',
  },
  imgdiv:{
    margin:'1rem',
    padding:'2rem'
  },
  nodataimg:{
    width:150,
    margin:'auto'
  }
}))

export default function CBarChart() {
  const classes = useStyles();
    const{commits,fetchedRepo} = useContext(apiContext)   

    const unix = commits?.map((c) => {
        let date = new Date(c.week * 1000).toLocaleDateString("en-US");
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
          {fetchedRepo ?
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
                  <Typography className={classes.gitinfoFont}> {fetchedRepo?.forks}</Typography>
              </Box>
              <Box className={classes.innerbox}>
                  <StarIcon  />
                  <Typography className={classes.gitinfoFont}> {fetchedRepo?.stargazers_count}</Typography>
              </Box>
              <Box className={classes.innerbox}>
                  <EyeIcon  />
                  <Typography className={classes.gitinfoFont}>{fetchedRepo?.watchers}</Typography>
              </Box>
            </Box>
          </Box>
          :
          <Box className={classes.nodata}>
            <Typography>No Data available</Typography>
            <Box className={classes.imgdiv} >
              <img className={classes.nodataimg} src={images.empty} alt='no-data' /> 
            </Box>
          </Box>
          }
        </div>
    )
}
