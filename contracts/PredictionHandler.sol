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
    address predictionAddress;
    mapping(uint256 => address) public predictions;
    address public keeper;

    event predictionCreated(uint256 _predictionIndex, address _predictionAddress);
    event predictionOpened(address _predictionAddress);
    event predictionClosed(address _predictionAddress);

    modifier ownerOrKeeper {
        require(msg.sender == owner() || msg.sender == keeper);
        _;
    }

    function deployPrediction() public ownerOrKeeper{
        inflation = inflationFeed.inflation();
        predictionContract = new Prediction(inflation);
        predictions[predictionIndex] = address(predictionContract);
        emit predictionCreated(predictionIndex,address(predictionContract));
        predictionIndex += 1;
        openPrediction(address(predictionContract));
    }

    function openPrediction(address _predictionAddress) internal ownerOrKeeper{
        predictionContract = Prediction(_predictionAddress);
        predictionContract.openPredictions();
        emit predictionOpened(address(predictionContract));
    }

    function closePrediction() public ownerOrKeeper{
        predictionAddress = address(predictionContract);
        predictionContract = Prediction(predictionAddress);
        predictionContract.closePredictions();
        emit predictionClosed(address(predictionContract));
        deployPrediction();
    }

    function payout(address payable _winnerAddress, uint256 _amount) public onlyOwner{
        _winnerAddress.transfer(_amount);
    }

    function setKeeper(address _keeperAddress) public onlyOwner{
        keeper = _keeperAddress;
    }

    constructor(address _inflationFeedAddress) ConfirmedOwner(msg.sender) {
        inflationFeed = InflationFeed(_inflationFeedAddress);
    }   

    receive() external payable {}

}