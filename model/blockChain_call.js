const Web3 = require('web3');
const path = require('path');
const fs = require('fs-extra');
const abi = require('./ABI/country_ABI.json');
const etherumUrl = 'http://localhost:8545';
const address = '0x539EF89964fded7C715054923A80B9fDfe272457';
const contractAddress = '0x14a44e93db17d126101b516cE1CB0756Fc3cD51a';

//connected to etherum node
var web3 = new Web3();

function connected(){
    web3.setProvider(new web3.providers.HttpProvider(etherumUrl));
    console.log("Connected to etherum node at " + etherumUrl + "\n");
}

exports.getCountryList = async function(){
    connected();
    var contractInstance = new web3.eth.Contract(abi,contractAddress);
	var list = [];
    await contractInstance.methods.getAllCountries().call({from:address}).then(async(result)=>{
        //console.log(result);
        for(var i = 0;i < result.length;i++){
            var counrty = {"id":result[i].id,"name":result[i].name,"capital":result[i].capital,"img":result[i].img,"des":result[i].describe};
            //console.log(counrty);
            list.push(counrty);
        }
    });
	return list;
}

exports.getTotalCountries = async function(){
    connected();
    var contractInstance = new web3.eth.Contract(abi,contractAddress);
	var number = 0;
    await contractInstance.methods.getTotalCountries().call({from:address}).then(async(result)=>{
        //console.log(result);
		number = result;
    });
    return number;
}

