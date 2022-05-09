pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract InflationFeed is ChainlinkClient,ConfirmedOwner{
    using Chainlink for Chainlink.Request;

    uint256 public inflation;
    address public oracle;
    bytes32 public jobId;
    uint256 public fee;

    constructor(address _link) ConfirmedOwner(msg.sender){
        setChainlinkToken(_link);
        oracle = 0x17dED59fCd940F0a40462D52AAcD11493C6D8073;
        jobId = "b04c2a85143c43089c1befe7c41dea93";
        fee = 1 * 10 ** 16;
    }

    function requestInflationData() public returns (bytes32 requestId){
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _inflation) public recordChainlinkFulfillment(_requestId) {
        inflation = _inflation;
    }

    function getChainlinkToken() public view returns (address){
        return chainlinkTokenAddress();
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))),"Unable to transfer");
    }

}