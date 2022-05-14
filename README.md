# plation

An on-chain prediction market for inflation using Truflations inflation oracle. An entry for the Chainlink Hackathon Spring 2022.

# Design
System design overview:

![plation drawio](https://user-images.githubusercontent.com/59070507/168420298-7084e601-a84a-48ea-8341-938360644f64.png)

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
