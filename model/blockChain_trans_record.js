const Web3 = require('web3');
const etherumUrl = 'http://localhost:8545';

//connected to etherum node
var web3 = new Web3();

function connected(){
    web3.setProvider(new web3.providers.HttpProvider(etherumUrl));
    console.log("Connected to etherum node at " + etherumUrl + "\n");
}

exports.getBlockInfo = async function(startBlockNumber,endBlockNumber){
    connected();
    console.log("Searching within blocks "  + startBlockNumber + " to " + endBlockNumber);
    var blockList = []
    for(var i = startBlockNumber;i < endBlockNumber;i++){
        await web3.eth.getBlock(i).then(async(result)=>{
            //console.log(result);
            blockList.push(result);
        });
    }
    return blockList;
}

exports.getTransaction = async function(transHash){
    connected();
    var transaction = {};
    await web3.eth.getTransaction(transHash).then(async(result)=>{
        transaction = result;
    });
    return transaction;
}

exports.getBlockNumber = async function(){
    connected();
    var totalBlock = 0;
    await web3.eth.getBlockNumber().then(async(result)=>{
        totalBlock = result;
    });
    return parseInt(totalBlock);
}

/*
async function workFlow(){
    var num = await getBlockNumber();
    //console.log(num);
    var list = await getblockInfo(address,1,num);
    //console.log(list);
    var transList = [];
    for(var i = 0;i < list.length;i++){
        if(list[i].transactions.length > 0){
            for(var j = 0;j < list[i].transactions.length;j++){
                var trans = await getTransaction(list[i].transactions[j]);
                transList.push(trans);
            }
        }
    }
    //console.log(transList);
}
*/
//workFlow();
