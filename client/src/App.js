import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { contract: null, pastEvents: [] };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const instance = new web3.eth.Contract(
        [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_inflationFeedAddress",
                "type": "address"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferRequested",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "_predictionIndex",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "_predictionAddress",
                "type": "address"
              }
            ],
            "name": "predictionCreated",
            "type": "event"
          },
          {
            "inputs": [],
            "name": "acceptOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_predictionAddress",
                "type": "address"
              }
            ],
            "name": "closePrediction",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "deployPrediction",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "inflIndex",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "inflation",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "inflationFeed",
            "outputs": [
              {
                "internalType": "contract InflationFeed",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_predictionAddress",
                "type": "address"
              }
            ],
            "name": "openPrediction",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "predictionContract",
            "outputs": [
              {
                "internalType": "contract Prediction",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "predictionIndex",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "predictions",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ],
        "0xD1eaD19342FC9B0DDC969c6f3FEe1Daa49A1FBb8",
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ contract: instance, pastEvents: [] }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract, pastEvents } = this.state;

    let options = {
      filter: {
          value: ['1000', '1337']    //Only get events where transfer value was 1000 or 1337
      },
      fromBlock: 0,                  //Number || "earliest" || "pending" || "latest"
      toBlock: 'latest'
  };
  
    contract.getPastEvents('predictionCreated', options).then(results => this.setState({pastEvents:results}));
  };

  render() {
    return (
      <div className="App">
        <h1>Prediction Market for CPI</h1>
        {this.state.pastEvents.map(home => <div>{home}</div>)}
      </div>
    );
  }
}

export default App;
