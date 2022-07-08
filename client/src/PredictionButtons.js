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
import ModalButtons from './ModalButtons';
import ModalChart from './ModalChart';

  function BetOverModal(props) {
    const [values, setValues] = React.useState({
      amount: 0,
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleBet = async () => {
      const web3 = props.props.web3;
      const LastPrediction = props.props.LastPrediction;
      const accounts = props.props.accounts;
      const Prediction = new web3.eth.Contract(PredictionContract.abi,LastPrediction.address);
      console.log(`from:${accounts[0]}, gas:3000000, value:${web3.utils.toWei(values.amount,'ether')}`);
      const betOver = await Prediction.methods.betOver().send({from:accounts[0], gas:3000000, value:web3.utils.toWei(values.amount,'ether')});
      console.log(betOver);
    }

    const style = {
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: '#000000',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    return (
      <div>
        <Button onClick={handleOpen} variant="contained" fullWidth key="one" color="info" sx={{height:80,borderRadius: 2.5}}>Bet Over</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" color='secondary' component="h2">
                  Bet Over
                </Typography>
                <Divider/>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={7}>
                  {ModalChart([parseInt(props.props.LastPrediction.overPool),parseInt(props.props.LastPrediction.underPool)])}
                </Grid>
                <Grid item xs={5}>
                  <ModalButtons/>
                </Grid>
              </Grid>
              <Grid item sx={{mt:3}} xs={12}>
                <TextField
                    id="outlined-number"
                    label="Wager Amount"
                    type="number"
                    fullWidth
                    color='secondary'
                    InputProps={{
                      endAdornment: <InputAdornment position="end">eth</InputAdornment>,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={values.amount}
                    onChange={handleChange('amount')}
                  />  
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={3}>
                <Button variant="contained" onClick={handleBet} fullWidth color="info" >Place Bet</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" onClick={handleClose} fullWidth color="secondary" >Cancel</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }

  function BetUnderModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [values, setValues] = React.useState({
      amount: 0,
    });
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleBet = async () => {
      const web3 = props.props.web3;
      const LastPrediction = props.props.LastPrediction;
      const accounts = props.props.accounts;
      const Prediction = new web3.eth.Contract(PredictionContract.abi,LastPrediction.address);
      console.log(`from:${accounts[0]}, gas:3000000, value:${web3.utils.toWei(values.amount,'ether')}`);
      const betOver = await Prediction.methods.betUnder().send({from:accounts[0], gas:3000000, value:web3.utils.toWei(values.amount,'ether')});
      console.log(betOver);
    }

    const style = {
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
  
    return (
      <div>
        <Button onClick={handleOpen} variant="contained" fullWidth key="two" color="tertiary" sx={{height:80,borderRadius: 2.5}}>Bet Under</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <Grid spacing={2} container>
              <Grid item xs={12}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Bet Under
                </Typography>
                <Divider/>
              </Grid>
              <Grid item sx={{mt:3}} xs={12}>
                <TextField
                    id="outlined-number"
                    label="Wager Amount"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: <InputAdornment position="end">eth</InputAdornment>,
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={values.amount}
                    onChange={handleChange('amount')}
                  />
              </Grid>
              <Grid item xs={6}/>
              <Grid item xs={3}>
                <Button variant="contained" onClick={handleBet} fullWidth color="success" >Bet</Button>
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" onClick={handleClose} fullWidth color="error" >Cancel</Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    );
  }
 
  export default function PredictionButtons(props) {  
    return (
      <React.Fragment>
        <Box>
          <Grid container justifyContent="center" direction="column" sx={{mt:-1,pr:4}} rowSpacing={4}>
            <Grid item>
              <BetOverModal props={props}/>
            </Grid>
            <Grid item>
              <BetUnderModal props={props}/>
            </Grid>
            <Grid item>
              <Button variant="contained" href={"https://rinkeby.etherscan.io/address/"+props.LastPrediction.address} target="_blank" fullWidth key="three" sx={{height:80,borderRadius: 2.5}}>View</Button>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }