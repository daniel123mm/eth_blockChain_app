const Web3 = require('web3');
const Miner = require('web3-eth-miner');
const abi = require('./ABI/country_ABI.json');
const blockChain = require('./blockChain_call');
const etherumUrl = 'http://localhost:8545';
const address = '0x539EF89964fded7C715054923A80B9fDfe272457';
const password = "daniel";
const contractAddress = '0x14a44e93db17d126101b516cE1CB0756Fc3cD51a';

//connected to etherum node
var web3 = new Web3();
function connected(){
    web3.setProvider(new web3.providers.HttpProvider(etherumUrl));
    console.log("Connected to etherum node at " + etherumUrl + "\n");
}

function unlockAccount(account, password){
    return web3.eth.personal.unlockAccount(account,password)
}

exports.insertNewCountry = async function(name, capital, img, desc){
    connected();
    var unlock = await unlockAccount(address, password);
    var id = await blockChain.getTotalCountries();
    var success = false;
    if(unlock){
        var contractInstance = new web3.eth.Contract(abi,contractAddress);
        console.log("Insert new data...");
        await contractInstance.methods.insertCountry(parseInt(id) + 1, name, capital,img, desc).send({from:address}).then(async(receipt)=>{
            console.log(receipt);
            success = receipt.status;
        });
        return success;
    }else{
        return success;
    }
  
}

exports.updateCountry = async function(id, name, capital, img, desc){
    connected();
    var unlock = await unlockAccount(address, password);
    var success = false;
    if(unlock){
        var contractInstance = new web3.eth.Contract(abi,contractAddress);
        console.log("Update data....");
        await contractInstance.methods.updateCounties(parseInt(id) , name, capital,img, desc).send({from:address}).then(async(receipt)=>{
            console.log(receipt);
            success = receipt.status;
        });
        return success;
    }else{
        return success;
    }
}

