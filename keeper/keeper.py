from email.policy import strict
from tracemalloc import start
from web3.auto import Web3
import os, json, time, threading

def handle_opened(event):
    start_time = time.time()
    closeTime = start_time + timePeriod

    openDict[event['args']['_predictionAddress']] = start_time
    
    print(openDict)

def handle_closed(event):
    print(event)

def log_loop(event_filter, poll_interval):
    while True:
        for event in event_filter.get_new_entries():
            handle_opened(event=event)
            time.sleep(poll_interval)


#Init 
Priv = os.getenv('PRIV_KEY')
Provider = os.getenv('RPC')
w3 = Web3(Web3.HTTPProvider(Provider))
openDict = {}
timePeriod = 86400


#Contracts Addresses
PredictionHandlerAddr = '0xd798158512eC1947dc33C87C82cCCD3f19C67A3f'

#ABI
with open('./keeper/contracts/PredictionHandler.json') as f:
    PredictionHandlerABI = (json.load(f))['abi']

#Contract
PredictionHandler = w3.eth.contract(address=PredictionHandlerAddr,abi=PredictionHandlerABI)

#Event Filters
predictionCreated_filter = PredictionHandler.events.predictionCreated.createFilter(fromBlock=0,toBlock='latest')
predictionOpened_filter = PredictionHandler.events.predictionOpened.createFilter(fromBlock=0,toBlock='latest')
predictionClosed_filter = PredictionHandler.events.predictionClosed.createFilter(fromBlock=0,toBlock='latest')

#Loop
log_loop(predictionOpened_filter,2)
#log_loop(predictionClosed_filter,2)




