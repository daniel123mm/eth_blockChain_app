const Web3 = require('web3');
const path = require('path');
const fs = require('fs-extra');
const abi = require('./ABI/country_ABI.json');
const etherumUrl = 'http://localhost:8545';
const address = '0xba0706c582df3fc7c6824681e8fa265994e092b4';
const contractAddress = '0x16f376CAF73Bb2d4863c9EBB208510f40EC1360c';

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

