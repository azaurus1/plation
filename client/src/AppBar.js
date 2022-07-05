import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Grid container >
                <Grid item xs={2}>
                    <Typography variant="h6" sx={{ ml: 10}}>
                        PLATION
                    </Typography>
                </Grid>
                <Grid item container xs={8} spacing={8}>
                    <Grid item>
                        <Button color="secondary">PREDICTIONS</Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary">CATEGORIES</Button>
                    </Grid>
                    <Grid item>
                        <Button color="secondary">ABOUT</Button>
                    </Grid>                   
                </Grid>
                <Grid item xs={2}>
                    <Button variant='contained' color="info" sx={{mr: 10}}>CONNECT WALLET</Button>   
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
