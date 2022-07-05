import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import Subtitle from './Subtitle';
import Typography from '@mui/material/Typography';

export default function Category(props) {
    return (
      <React.Fragment>
        <Paper>
            <Grid container sx={{p:2, height:250}}>
                <Grid item xs={12}>
                    <Subtitle>{props}</Subtitle>
                </Grid>
                <Grid item xs={12}>
                    <Typography align="center" color="tertiary">COMING SOON!</Typography>
                </Grid>
            </Grid>
        </Paper>
      </React.Fragment>
    );
}