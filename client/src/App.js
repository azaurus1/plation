import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import PredictionHandlerContract from "./contracts/PredictionHandler.json";
import PredictionContract from "./contracts/Prediction.json";
import RecentPredictions from "./Predictions";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import CurrentPrediction from "./CurrentPrediction";

const mdTheme = createTheme();

class App extends Component {
  state = {web3:null, accounts:null, PredictionHandler: null, PastEvents: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const PredictionHandler = new web3.eth.Contract(PredictionHandlerContract.abi,"0xD1eaD19342FC9B0DDC969c6f3FEe1Daa49A1FBb8");
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({web3, accounts, PredictionHandler: PredictionHandler},this.getPastEvents);
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
    }
  };

  getPastEvents = async () => {
    const {PredictionHandler, PastEvents} = this.state;
    let options = {filter: {},fromBlock: 0,toBlock: 'latest'};
    PredictionHandler.getPastEvents('predictionCreated', options).then(results => console.log(results));
    PredictionHandler.getPastEvents('predictionCreated', options).then(results => this.setState({PastEvents:results}));
    console.log(this.state.PastEvents);
  };

  render() {
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div className="App">
              <h1>Prediction Market for CPI</h1>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {CurrentPrediction()}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {RecentPredictions(this.state.PastEvents)}
                </Paper>
              </Grid>
            </div>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
