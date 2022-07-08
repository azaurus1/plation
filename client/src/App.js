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
import LastPrediction from "./LastPrediction";
import { ContentPasteSearchOutlined } from "@mui/icons-material";
import ButtonAppBar from "./AppBar";
import { themeOptions } from "./Theme";
import Title from './Title';
import Categories from "./Categories";
import About from "./About";


const mdTheme = createTheme(themeOptions);

class App extends Component {
  state = {web3:null, accounts:null, PredictionHandler: null, PastEvents: [], LastPrediction:[] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const PredictionHandler = new web3.eth.Contract(PredictionHandlerContract.abi,"0x122dF77D0069667EFA788aD78650630cb7e8170d");
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
    PredictionHandler.getPastEvents('predictionCreated', options).then(results => this.setState({PastEvents:results},this.getLastPrediction));
  };

  getLastPrediction = async () =>{
    const {web3, PastEvents, LastPrediction} = this.state;
    const recentArr = {};
    const recent = this.state.PastEvents[this.state.PastEvents.length - 1];
    //console.log('Last Prediction');
    const Prediction = new web3.eth.Contract(PredictionContract.abi,recent.returnValues._predictionAddress);
    const totalPool = await Prediction.methods.totalPool().call();
    const overPool = await Prediction.methods.overPool().call();
    const underPool = await Prediction.methods.underPool().call();
    recentArr["address"] = recent.returnValues._predictionAddress;
    recentArr["totalPool"]=totalPool;
    recentArr["overPool"]=overPool;
    recentArr["underPool"]=underPool;
    this.setState({LastPrediction:recentArr});
  }
  
  render() {
    return (
      <ThemeProvider theme={mdTheme}>
        {ButtonAppBar(this.state)}
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container maxWidth='false' sx={{ml:10,mr:10}}>
            <div className="App">
              <Grid item container spacing={5} xs={12} sx={{mt: -4, mb: 4}}>
                <Grid item xs={6}>
                  <Title>LAST PREDICTION</Title> 
                  <Paper elevation={6} sx={{ p: 2, display: 'flex', flexDirection: 'column', height:400 }}>  
                    {LastPrediction(this.state)}
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Title>CURRENT PREDICTION</Title> 
                  <Paper elevation={6} sx={{ p: 2, display: 'flex', flexDirection: 'column', height:400 }}>
                    {CurrentPrediction(this.state)}
                  </Paper>
                </Grid>
              </Grid>
              <Grid sx={{ mt: 4, mb: 4 }}>
                <Title>CATEGORY PREDICTIONS</Title> 
                <Categories />
              </Grid>
              <Grid sx={{ mt: 4, mb: 4 }}>
                <Title>ABOUT</Title> 
                <About />
              </Grid>
            </div>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
