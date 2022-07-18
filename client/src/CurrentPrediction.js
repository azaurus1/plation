import * as React from 'react';
import Title from './Title';
import getWeb3 from "./getWeb3";
import PredictionHandlerContract from "./contracts/PredictionHandler.json";
import { Avatar, Divider } from '@mui/material';
import {ArrowUpward, CircleOutlined} from '@mui/icons-material';
import { ArrowDownward } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { blue, red, green } from '@mui/material/colors';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import RadialChart from './RadialChart.js';
import PredictionButtons from './PredictionButtons';
import CountdownTimer from './Countdown.js';



function preventDefault(event) {
  event.preventDefault();
}

//RADIAL GRAPH
// {RadialChart([parseInt(props.LastPrediction.overPool),parseInt(props.LastPrediction.underPool)])}

export default function CurrentPrediction(props) {
  if(props.length == 0){
    console.log('Loading');
    return 'Loading';
  }else{
    console.log(props);
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={7} sx={{pt:4}}>
          {RadialChart([parseInt(props.LastPrediction.overPool),parseInt(props.LastPrediction.underPool)])}
        </Grid>
        <Grid item xs={5}>
          {PredictionButtons(props)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
  }
}