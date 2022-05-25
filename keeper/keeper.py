from audioop import add
from web3.auto import Web3
import os, json, time, threading

def sendClose(address):
    #Build Transaction
    print('sending close to prediction: '+address)
    try:
        txn = PredictionHandler.functions.closePrediction(
            address
            ).buildTransaction(
                {
                    'from':'0x0a29bd68d085CcFa30bDFf2c2ca849D5976a4C9D',
                    'nonce':nonce
                }
            )
    except ValueError:
        print('Transaction Reverted')
        return None
    print('txn')
    print(txn)
    print('------------------')
    #Sign transaction with w3.eth.account.sign_transaction()
    signed_txn = w3.eth.account.sign_transaction(txn,Priv)
    print('signed txn')
    print(signed_txn)
    print('------------------')
    #Broadcast the transaction with send_raw_transaction()
    w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    incrementNonce()

def sendPayout(address,amount):
    print('sending payout to '+address)
    try:
        txn = PredictionHandler.functions.payout(
            address,
            amount
            ).buildTransaction(
                {
                    'from':'0x0a29bd68d085CcFa30bDFf2c2ca849D5976a4C9D',
                    'nonce': nonce
                }
            )
    except ValueError:
        print('Transaction Reverted')
        return None
    print('txn')
    print(txn)
    print('------------------')
    #Sign transaction with w3.eth.account.sign_transaction()
    signed_txn = w3.eth.account.sign_transaction(txn,Priv)
    print('signed txn')
    print(signed_txn)
    print('------------------')
    #Broadcast the transaction with send_raw_transaction()
    w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    incrementNonce()

def sendUpdateInflationOracle():
    print('Updating inflation oracle')
    try:
        txn = InflationOracle.functions.requestInflationData(
            ).buildTransaction(
                {
                    'from':'0x0a29bd68d085CcFa30bDFf2c2ca849D5976a4C9D',
                    'nonce':nonce
                }
            )
    except ValueError:
        print('Transaction Reverted')
        return None
    print('txn')
    print(txn)
    print('------------------')
    #Sign transaction with w3.eth.account.sign_transaction()
    signed_txn = w3.eth.account.sign_transaction(txn,Priv)
    print('signed txn')
    print(signed_txn)
    print('------------------')
    #Broadcast the transaction with send_raw_transaction()
    w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    incrementNonce()

def getBets(address):
    print('Getting bets for prediction: '+address)
    #init
    overBetters = []
    underBetters = []
    Prediction = w3.eth.contract(address=address,abi=PredictionABI)

    #Betting events on prediction
    betOver_filter = Prediction.events.AddressBetOver.createFilter(fromBlock=0,toBlock='latest')
    betUnder_filter = Prediction.events.AddressBetUnder.createFilter(fromBlock=0,toBlock='latest')

    #Get bets
    overBets = betOver_filter.get_all_entries()
    underBets = betUnder_filter.get_all_entries()

    #Sort addresses
    for i in overBets:
        overBetters += [i['args']['_bettingAddress']]    
    for e in underBets:
        underBetters += [e['args']['_bettingAddress']]

    return overBetters, underBetters

def getInflationIndex(address):
    Prediction = w3.eth.contract(address=address,abi=PredictionABI)
    return (Prediction.functions.inflIndex().call())

def getTotalPool(address):
    Prediction = w3.eth.contract(address=address,abi=PredictionABI)
    return (Prediction.functions.totalPool().call())

def getOverPool(address):
    Prediction = w3.eth.contract(address=address,abi=PredictionABI)
    return (Prediction.functions.overPool().call())

def getUnderPool(address):
    Prediction = w3.eth.contract(address=address,abi=PredictionABI)
    return (Prediction.functions.underPool().call())

def getBetAmount(predictionAddress,betterAddress):
    Prediction = w3.eth.contract(address=predictionAddress,abi=PredictionABI)
    return (Prediction.functions.bets(betterAddress).call())

def getLastOpenedPrediction():
    predictionOpened_filter = PredictionHandler.events.predictionOpened.createFilter(fromBlock=0,toBlock='latest')
    openedArr = predictionOpened_filter.get_all_entries()
    lastOpened = openedArr[-1]

    return lastOpened['args']['_predictionAddress']

def calculateAndSendPayout(closingInflation,newInflation,totalPool,overPool,underPool,overDict,underDict):
    winnerShare = {}
    payoutDict = {}
    #Inflation drops
    #under betters win
    if(closingInflation < newInflation):
        for i in underDict:
            share = (underDict[i]/underPool)
            winnerShare[i] = share
        #initial bets
        for i in underDict:
            payoutDict[i] = underDict[i]
        #shares of losing pool
        for winner in winnerShare:
            print(winner, winnerShare[winner]*overPool)
        #send payout transactions
        for payout in payoutDict:
            sendPayout(payout,payoutDict[payout])

    #Inflation rises
    #over betters win
    elif(closingInflation > newInflation):
        for i in overDict:
            share = (overDict[i]/overPool)
            winnerShare[i] = share
        #initial bets
        for i in overDict:
            payoutDict[i] = overDict[i]
        #shares of losing pool
        for winner in winnerShare:
            print(winner, winnerShare[winner]*underPool)
        #send payout transactions
        for payout in payoutDict:
            sendPayout(payout,payoutDict[payout])

    #inflation index hasnt changed
    #bets refunded
    else:
        print('no change in inflation')
        refundDict = {}
        for i in overDict:
            refundDict[i] = overDict[i]
        for e in underDict:
            refundDict[e] = underDict[e]

        for refund in refundDict:
            sendPayout(refund,refundDict[refund])
 
     
def handle_opened(event):
    print(event['args']['_predictionAddress'])
    predictionAddr = str(event['args']['_predictionAddress'])
    time.sleep(5)
    #sendClose(predictionAddr)


def handle_closed(event):
    #wait for oracle to update after closing thread requests inflation data
    #time.sleep(100)
    #new inflation index
    NewInflationIndex = InflationOracle.functions.inflation().call()
    #Last Closed Prediction
    LastClosed = event['args']['_predictionAddress']
    PredictionInflationIndex = getInflationIndex(LastClosed)
    totalPool = getTotalPool(LastClosed)
    overPool = getOverPool(LastClosed)
    underPool = getUnderPool(LastClosed)
    overDict = {}
    underDict = {}

    #Gather Betters
    overBetters, underBetters = getBets(LastClosed)
    for i in overBetters:
        overDict[i] = getBetAmount(LastClosed,i)[1]
    for e in underBetters:
        underDict[e] = getBetAmount(LastClosed,e)[1]

    #Calculate payouts and send payouts
    calculateAndSendPayout(PredictionInflationIndex,NewInflationIndex,totalPool,overPool,underPool,overDict,underDict)

    


def log_loop(event_filter, poll_interval):
    while True:
        for event in event_filter.get_new_entries():
            print('New Prediction Opened')
            handle_opened(event=event)
            time.sleep(poll_interval)

def listenerThread():
    print('Starting listener thread')
    predictionClosed_filter = PredictionHandler.events.predictionClosed.createFilter(fromBlock=0,toBlock='latest')
    while True:
        for event in predictionClosed_filter.get_new_entries():
            handle_closed(event=event)
            time.sleep(2)

def closerThread():
    print('Starting closer thread')
    while True:
    #Get last opened prediction
        lastPredicition = getLastOpenedPrediction()
        #Close last opened predicition
        sendClose(lastPredicition)
        #time.sleep(90)
        #update oracle
        sendUpdateInflationOracle()
        #time.sleep(90)
        #wait 24 hours (timePeriod) (86400)
        time.sleep(3600)

def incrementNonce():
    global nonce
    nonce = nonce + 1



#Init
#Globals
#global Priv 
#global PredictionHandler
#global InflationOracle
#global PredictionABI
#global LastClosed
#global nonce

Priv = os.getenv('PRIV_KEY')
Provider = os.getenv('RPC')
w3 = Web3(Web3.HTTPProvider(Provider))
openDict = {}
timePeriod = 86400
nonce = w3.eth.getTransactionCount('0x0a29bd68d085CcFa30bDFf2c2ca849D5976a4C9D')



#Contracts Addresses
PredictionHandlerAddr = '0x122dF77D0069667EFA788aD78650630cb7e8170d'
InflationOracleAddr = '0xCa4B1B05AA433Fc397959cEDdb897DBAFe9C8E87'

#ABI
with open('./keeper/contracts/PredictionHandler.json') as f:
    PredictionHandlerABI = (json.load(f))['abi']

with open('./keeper/contracts/InflationFeed.json') as f:
    InflationOracleABI = (json.load(f))['abi']

with open('./keeper/contracts/Prediction.json') as f:
    PredictionABI = (json.load(f))['abi']

#Contract
PredictionHandler = w3.eth.contract(address=PredictionHandlerAddr,abi=PredictionHandlerABI)
InflationOracle = w3.eth.contract(address=InflationOracleAddr,abi=InflationOracleABI)

#Event Filters
predictionCreated_filter = PredictionHandler.events.predictionCreated.createFilter(fromBlock=0,toBlock='latest')
predictionOpened_filter = PredictionHandler.events.predictionOpened.createFilter(fromBlock=0,toBlock='latest')
predictionClosed_filter = PredictionHandler.events.predictionClosed.createFilter(fromBlock=0,toBlock='latest')

#Loop
#log_loop(predictionOpened_filter,2)
#log_loop(predictionClosed_filter,2)
#overBetters, underBetters = getBets('0x06D4dfb5F4f45B1587CA6d60314579De520399b9')

if __name__ == '__main__':
    #Closer Thread no longer needed due to keeper contracts
    #threading.Thread(target=closerThread).start()
    threading.Thread(target=listenerThread).start()

#handle_closed({'args':{'_predictionAddress':'0x06D4dfb5F4f45B1587CA6d60314579De520399b9'}})





