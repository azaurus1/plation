from multiprocessing.connection import wait
from web3.auto import Web3
import os, json, time, threading

def sendClose(address):
    #Build Transaction
    print(address)
    txn = PredictionHandler.functions.closePrediction(
        address
        ).buildTransaction(
            {
                'from':'0x0a29bd68d085CcFa30bDFf2c2ca849D5976a4C9D',
                'nonce':w3.eth.getTransactionCount('0x0a29bd68d085CcFa30bDFf2c2ca849D5976a4C9D')
            }
        )
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


def handle_opened(event):
    print(event['args']['_predictionAddress'])
    predictionAddr = str(event['args']['_predictionAddress'])
    time.sleep(5)
    sendClose(predictionAddr)


def handle_closed(event):
    print(event)

def log_loop(event_filter, poll_interval):
    while True:
        for event in event_filter.get_new_entries():
            print('New Prediction Opened')
            handle_opened(event=event)
            time.sleep(poll_interval)


#Init
global Priv 
global PredictionHandler

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




