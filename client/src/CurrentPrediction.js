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
      <Title>Current Prediction</Title>
      <Typography component="p" variant="h4">
        {props.address}
      </Typography>
      <Divider/>
      <Grid container>
        <Grid item xs={6}>
          {RadialChart([parseInt(props.overPool),parseInt(props.underPool)])}
        </Grid>
        <Grid item xs={3}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: green[500] }}>
                <ArrowUpward />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Over Pool"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body"
                    color="text.primary"
                  >
                    {props.overPool} wei
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[500] }}>
                  <ArrowDownward />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Under Pool"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {props.underPool} wei
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[500] }}>
                    <CircleOutlined />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Total Pool"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {props.totalPool} wei
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>  
        </List>
        </Grid>
        <Grid item xs={3}>
          {PredictionButtons(props)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
  }
}