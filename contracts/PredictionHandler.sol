pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "./Prediction.sol";
import "./InflationFeed.sol";

contract PredictionHandler is ConfirmedOwner {

    Prediction public predictionContract;
    InflationFeed public inflationFeed;
    uint256 public inflation;
    uint256 public predictionIndex;
    uint256 public inflIndex;
    mapping(uint256 => address) public predictions;

    event predictionCreated(uint256 _predictionIndex, address _predictionAddress);

    function deployPrediction() public onlyOwner{
        inflation = inflationFeed.inflation();
        predictionContract = new Prediction(inflation);
        predictions[predictionIndex] = address(predictionContract);
        emit predictionCreated(predictionIndex,address(predictionContract));
        predictionIndex += 1;
    }

    function openPrediction(address _predictionAddress) public onlyOwner{
        predictionContract = Prediction(_predictionAddress);
        predictionContract.openPredictions();
    }

    function closePrediction(address _predictionAddress) public onlyOwner{
        predictionContract = Prediction(_predictionAddress);
        predictionContract.closePredictions();
    }

    constructor(address _inflationFeedAddress) ConfirmedOwner(msg.sender) {
        inflationFeed = InflationFeed(_inflationFeedAddress);
    }   

}