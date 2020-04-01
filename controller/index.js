const blockChain = require('../model/blockChain_call');
const transcation = require('../model/blockChain_send');
var fs = require('fs');

exports.getIndex = async function(req, res)
{
    res.render("index");
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


exports.testPost = async function(req,res){
    var data = req.body;
    console.log(data.name);
    console.log(data.capital);
    console.log(data.img);
    console.log(data.des);
    res.send("200");
}



