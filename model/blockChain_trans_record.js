const Web3 = require('web3');
const abi = require('./ABI/country_ABI.json');
const etherumUrl = 'http://localhost:8545';
const address = '0xba0706c582df3fc7c6824681e8fa265994e092b4';

//connected to etherum node
var web3 = new Web3();

function connected(){
    web3.setProvider(new web3.providers.HttpProvider(etherumUrl));
    console.log("Connected to etherum node at " + etherumUrl + "\n");

}

async function getblockInfo(accAddress,startBlockNumber,endBlockNumber){
    console.log("Searching for transactions to/from account \"" + accAddress + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
    var transList = []
    for(var i = startBlockNumber;i < endBlockNumber;i++){
        await web3.eth.getBlock(i).then(async(result)=>{
            if(result.transactions.length > 0){
                //console.log(result);
                for(var j = 0;j < result.transactions.length;j++){
                    var trans = await getTransaction(result.transactions[j]);
                    transList.push(trans);
                }
            }
        });
    }
    return transList;
}

async function getTransaction(transHash){
    var transaction = {};
    await web3.eth.getTransaction(transHash).then(async(result)=>{
        transaction = result;
    });
    return transaction;
}

async function getBlockNumber(){
    var totalBlock = 0;
    await web3.eth.getBlockNumber().then(async(result)=>{
        totalBlock = result;
    });
    return parseInt(totalBlock);
}

async function workFlow(){
    connected();
    var num = await getBlockNumber();
    //console.log(num);
    var list = await getblockInfo(address,1,num);
    console.log(list);
}

workFlow();
