import * as React from 'react';
import Title from './Title';
import getWeb3 from "./getWeb3";
import PredictionHandlerContract from "./contracts/PredictionHandler.json";
import { Avatar } from '@mui/material';
import {ArrowUpward, CircleOutlined} from '@mui/icons-material';
import { ArrowDownward } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { blue, red, green } from '@mui/material/colors';
import { Paper } from '@mui/material';
import { CardHeader } from '@mui/material';
import { Divider } from '@mui/material';



function preventDefault(event) {
  event.preventDefault();
}

export default function CurrentPrediction(props) {
  if(props.length == 0){
    console.log('Loading');
    return 'Loading';
  }else{
  return (
    <React.Fragment>
        <Paper>
        <Title>Current Prediction</Title>
        {props.address}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={2}>
                <CardHeader avatar={
                <Avatar sx={{ bgcolor: green[500] }}>
                    <ArrowUpward />
                </Avatar>
                }
                title = {"Over Pool"}
                />
            </Grid>
            <Grid item xs={10}>
              {props.overPool}
            </Grid>
            <Grid item xs={2}>
            <CardHeader avatar={
                <Avatar sx={{ bgcolor: red[500] }}>
                    <ArrowDownward />
                </Avatar>
                }
                title = {"Under Pool"}
                />
            </Grid>
            <Grid item xs={10}>
              {props.underPool}
            </Grid>
            <Grid item xs={2}>
                <CardHeader avatar={
                <Avatar sx={{ bgcolor: blue[500] }}>
                    <CircleOutlined />
                </Avatar>
                }
                title = {"Total Pool"}
                />
            </Grid>
            <Grid item xs={10}>
              {props.totalPool}
            </Grid>
        </Grid>
        </Paper>
    </React.Fragment>
  );
  }
}