pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "./PredictionHandler.sol";

contract Prediction is ConfirmedOwner {
    enum BetType{
        Over,
        Under
    }
    struct Bet {    
        BetType Type;
        uint256 Amount;
        bool entered;
    }

    enum Status{
        Open,
        Closed
    }

    uint256 public index;
    uint256 public overPool;
    uint256 public underPool;
    uint256 public inflIndex;
    Status public status;
    mapping(address => Bet) public bets;

    function betOver() public payable {
        require(status == Status.Open, "The prediction is closed!");
        require(msg.value > 0, "You must bet more than 0!");
        require(!bets[msg.sender].entered, "You have already entered!");
        bets[msg.sender] = Bet(BetType.Over,msg.value, true);
        overPool += msg.value;
    }

    function betUnder() public payable {
        require(status == Status.Open, "The prediction is closed!");
        require(msg.value > 0, "You must bet more than 0!");
        require(!bets[msg.sender].entered, "You have already entered!");
        bets[msg.sender] = Bet(BetType.Under,msg.value, true);
        underPool += msg.value;
    }

    function openPredictions() public onlyOwner {
        status = Status.Open;
    }

    function closePredictions() public onlyOwner {
        status = Status.Closed;
    }

    function payout(string memory _result) public onlyOwner {
        if (keccak256(abi.encodePacked(_result)) == keccak256(abi.encodePacked("UNDER"))){
            //Under


        } else if (keccak256(abi.encodePacked(_result)) == keccak256(abi.encodePacked("OVER"))){
            //Over

        } else {
            // No change in rate
        }
    }

    function totalPool() public view returns(uint256){
        return (address(this).balance);
    }

    constructor(uint256 _inflIndex) ConfirmedOwner(msg.sender) {
        status = Status.Closed;
        inflIndex = _inflIndex;
    }




}