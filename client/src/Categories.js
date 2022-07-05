import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import Category from './Category';

export default function Categories() {
    return (
      <React.Fragment>
        <Grid container spacing={5}>
          <Grid item xs={3}>
            {Category('FUEL')}
          </Grid>
          <Grid item xs={3}>
            {Category('CLOTHING')}
          </Grid>
          <Grid item xs={3}>
            {Category('FOOD')}
          </Grid>
          <Grid item xs={3}>
            {Category('HOUSING')}
          </Grid>
        </Grid>
      </React.Fragment>
    );
}