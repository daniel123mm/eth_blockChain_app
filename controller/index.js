const blockChain = require('../model/blockChain_call');
const transcation = require('../model/blockChain_send');
const record = require('../model/blockChain_trans_record');
var fs = require('fs');

exports.getIndex = async function(req, res)
{
    res.render("index");
}

exports.getRecord = async function(req, res)
{
    res.render("record");
}

exports.getCountryList = async function(req, res){
    var data = await blockChain.getCountryList(); 
    //Sconsole.log(data);
    res.send(data);
}

exports.getTotalCountries = async function(req, res){
    var data = await blockChain.getTotalCountries(); 
    //console.log(data);
    res.send(data);
}

exports.insertNewCountry = async function(req,res){
    console.log(req.body);
    var data = req.body;
    var success = await transcation.insertNewCountry(data.name, data.capital, data.img, data.des);
    if(success){
        res.sendStatus(201);
    }else{
        res.sendStatus(404);
    }
}

exports.updateCountry = async function(req, res){
    console.log(req.body);
    var data = req.body;
    var success = await transcation.updateCountry(data.id,data.name, data.capital, data.img, data.des);
    if(success){
        res.sendStatus(201);
    }else{
        res.sendStatus(404);
    }
}

exports.getBlockInfo = async function(req,res){
    var num = await record.getBlockNumber();
    var data = await record.getBlockInfo(num - 10, num); 
    res.send(data);
}

exports.getTranscationInfo = async function(req,res){
    var num = await record.getBlockNumber();
    var list = await record.getBlockInfo(1, num);
    var transList = [];
    for(var i = 0;i < list.length;i++){
        if(list[i].transactions.length > 0){
            for(var j = 0;j < list[i].transactions.length;j++){
                var trans = await record.getTransaction(list[i].transactions[j]);
                transList.push(trans);
            }
        }
    }
    res.send(transList);
}


exports.testPost = async function(req,res){
    var data = req.body;
    console.log(data.name);
    console.log(data.capital);
    console.log(data.img);
    console.log(data.des);
    res.send("200");
}



