# plation

An on-chain prediction market for inflation using Truflations inflation oracle. A winner for the truflation sponsor prize for the Chainlink Hackathon Spring 2022.

# Design
System design overview:

![plation drawio](https://user-images.githubusercontent.com/59070507/168420979-c52a03ea-cea3-48cb-b524-552924c4f152.png)

## Setup 

1. Deploy Inflation oracle contract
2. Deploy InflationUpkeep keeper with Inflation oracle address from 1.
3. Deploy PredictionHandler contract
4. Deploy a prediction with the PredictionHandler function
5. Deploy the PredictionUpkeep contract 
6. Use the setKeeper function on the PredictionHandler to set the Keeper to the address of the PredictionUpkeep contract from 5.
7. Set up both keepers at keepers.chain.link
8. Once both keepers have run once, start the keeper.py script with the PredictionHandlerAddr and InflationOracleAddr addresses set to the addresses from steps 3 and 1 respectively
9. Now run npm start in the client folder
10. You should now have the system set up!

Gas limits for the keepers:

Prediction Keeper: 1,250,000

Inflation Keeper: 130,000

# Prediction payout model
1. Users bet on a prediction contract for a certain amount for whether inflation will rise in the next cycle, or will drop. The wagers are pooled together.
2. Once the prediction timeframe is over, a keeper contract will request the handler contract to close the prediction and begin payouts based on the inflation index from the oracle.
3. Depending on the result, winning betters will receive their initial wagers + their share of the losing wager pool. (The share is derived from the initial wagers share of the pool e.g. if inflation rises, and a person bet 1 eth in the over pool and they constituted 50% of the over pool, they would recieve 50% of the under pool)

# An example
**Person 1 thinks inflation will rise**

**Person 2 thinks inflation will drop**

**Person 3 thinks inflation will rise**

========================================

**Person 1 bets 2 ETH (Pot: 2 ETH)**

**Person 2 bets 5 ETH (Pot: 7 ETH)**

**Person 3 bets 8 ETH (Pot: 15 ETH)**

========================================

**OVER WAGERS = 10 ETH
	Of Over Wagers:
    • Person 1 makes up 20%
    • Person 3 makes up 80%**

**UNDER WAGERS = 7 ETH
	Of Under Wagers:
    • Person 2 makes up 100%**

**If inflation rises: 
	Person 1 gets 2 ETH + 20% of losers wagers (1.4 ETH)
	Person 3 gets 7 ETH + 80% of losers wagers (5.6 ETH)**
  
**If inflation drops:
	Person 2 gets 7 ETH + 100% of losers wagers (10 ETH)**
	
# Python Keeper architecture

![KeeperArchitecture drawio](https://user-images.githubusercontent.com/59070507/168991482-969a284a-5db5-467e-a168-7a318d92b050.png)

Python keeper that keeps track of timings of predictions, listens for the prediction closed event being emitted on the handler contract and orders the prediction handler to payout the winnings. 

# Chainlink Keepers

![Untitled Diagram drawio](https://user-images.githubusercontent.com/59070507/170045009-53688008-eef2-4a72-863b-b50170acdee5.png)

Two chainlink keepers, both with 24 hour intervals, one for closing the last prediction and one for requesting latest inflation oracle information. Should be started out of sync so that inflation oracle is always updated ahead of the new prediction.

