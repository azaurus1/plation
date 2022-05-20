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
    address payable payableOwner;

    event AddressBetOver(address _bettingAddress);
    event AddressBetUnder(address _bettingAddress);

    function betOver() public payable {
        require(status == Status.Open, "The prediction is closed!");
        require(msg.value > 0, "You must bet more than 0!");
        require(!bets[msg.sender].entered, "You have already entered!");
        bets[msg.sender] = Bet(BetType.Over,msg.value, true);
        overPool += msg.value;
        emit AddressBetOver(msg.sender);
    }

    function betUnder() public payable {
        require(status == Status.Open, "The prediction is closed!");
        require(msg.value > 0, "You must bet more than 0!");
        require(!bets[msg.sender].entered, "You have already entered!");
        bets[msg.sender] = Bet(BetType.Under,msg.value, true);
        underPool += msg.value;
        emit AddressBetUnder(msg.sender);
    }

    function openPredictions() public onlyOwner {
        status = Status.Open;
    }

    function closePredictions() public onlyOwner {
        require(status == Status.Open, "This prediction is already closed!");
        status = Status.Closed;
        payableOwner = payable(address(owner()));
        payableOwner.transfer(address(this).balance);
    }

    function totalPool() public view returns(uint256){
        return (address(this).balance);
    }

    constructor(uint256 _inflIndex) ConfirmedOwner(msg.sender) {
        status = Status.Closed;
        inflIndex = _inflIndex;
    }




}