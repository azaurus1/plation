import * as React from 'react';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material';
import { Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { InputAdornment } from '@mui/material';
import getWeb3 from './getWeb3';
import PredictionContract from "./contracts/Prediction.json";

  function OverPool(props) {
    const [values, setValues] = React.useState({
      amount: 0,
      overEth: 0,
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handle = async () => {
      const web3 = props.props.web3;
      const over = await web3.utils.fromWei(props.props.LastPrediction.overPool);
      setValues({overEth:over});
    }
    
    return (
      <div>
        <Button onLoad={handle} variant="contained" fullWidth key="one" color="info" disableElevation={true} disableFocusRipple={true} disableRipple={true} sx={{height:80,borderRadius: 2.5, "&.MuiButtonBase-root:hover": {bgcolor: '#F46228', cursor: 'default'} }}>
          <Grid container>
            <Grid item container direction="column" xs={6} justifyContent='center'>
              Over Pool
            </Grid>
            <Grid item container direction="column" xs={6} justifyContent='center'>
              <Typography component="h2" variant="h6" color="tertiary" >
                {values.overEth} ETH
              </Typography>
            </Grid>
          </Grid>
        </Button>
      </div>
    );
  }

  function UnderPool(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = React.useState({
      amount: 0,
      underEth: 0,
    });
    
    return (
      <div>
        <Button variant="contained" fullWidth key="two" color="tertiary" disableElevation={true} disableFocusRipple={true} disableRipple={true} sx={{height:80,borderRadius: 2.5, "&.MuiButtonBase-root:hover": {bgcolor: '#FFFFFF', cursor: 'default'}}}>
        <Grid container>
          <Grid item container direction="column" xs={6} justifyContent='center'>
            Under Pool
          </Grid>
          <Grid item container direction="column" xs={6} justifyContent='center'>
            <Typography component="h2" variant="h6" color="primary" >
              {values.underEth} ETH
            </Typography>
          </Grid>
        </Grid>
        </Button>
      </div>
    );
  }

  function InflationRate(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = React.useState({
      amount: 0,
    });
    return (
      <div>
        <Button variant="contained" target="_blank" color='secondary' fullWidth key="three" disableElevation={true} disableFocusRipple={true} disableRipple={true} sx={{height:80,borderRadius: 2.5, "&.MuiButtonBase-root:hover": {bgcolor: '#BABABA', cursor: 'default'}}}>
          <Grid container>
            <Grid item container direction="column" xs={6} justifyContent='center'>
              <Typography variant="h8" color="tertiary" gutterBottom>
                Inflation Rate
              </Typography>
            </Grid>
            <Grid item container direction="column" xs={6} justifyContent='center'>
            <Typography component="h2" variant="h6" color="tertiary">
              12%
            </Typography>
            </Grid>
          </Grid>
        </Button>
      </div>
    );
  }
 
  export default function ModalButtons(props) {  
    return (
      <React.Fragment>
        <Box>
          <Grid container justifyContent="center" direction="column" sx={{mt:-1,pr:4}} rowSpacing={4}>
            <Grid item>
              <OverPool props={props}/>
            </Grid>
            <Grid item>
              <UnderPool props={props}/>
            </Grid>
            <Grid item>
              <InflationRate props={props}/>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }