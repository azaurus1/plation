import * as React from 'react';
import Typography from '@mui/material/Typography';
import ChainlinkBadge from './ChainlinkBadge';
import { Grid } from '@mui/material';

export default function About() {
    return (
      <React.Fragment>
        <Typography variant="body1" color="secondary" gutterBottom>
            plation is one of the winners of Truflation's sponsorship prize for the Chainlink Spring 2022 Hackathon. plation's main and sole purpose is to provide
            opportunities as a prediction market for inflation on the blockchain, this allows for those with ideas on the future of the inflation rate to bet on that idea.
        </Typography>
        <Typography variant="body1" color="secondary">
            An explanation on how plation works:
        </Typography>
        <ol style={{color:'#BABABA'}}>
          <li>   
            Users bet on a prediction contract for a certain amount for whether inflation will rise in the next cycle, or will drop. The wagers are pooled together.
          </li>
          <li>
            Once the prediction timeframe is over, a keeper contract will request the handler contract to close the prediction and begin payouts based on the inflation index from the oracle.
          </li>
          <li>
            Depending on the result, winning betters will receive their initial wagers + their share of the losing wager pool. (The share is derived from the initial wagers share of the pool e.g. if inflation rises, and a person bet 1 eth in the over pool and they constituted 50% of the over pool, they would recieve 50% of the under pool)
          </li>
        </ol>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <ChainlinkBadge />
          </Grid>
          <Grid item xs={6}>
            <ChainlinkBadge />
          </Grid>
        </Grid>
      </React.Fragment>
    );
}