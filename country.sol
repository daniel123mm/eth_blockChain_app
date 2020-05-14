pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Countries {
    
    struct Country{
        uint id;
        string name;
        string capital;
        string img;
        string describe;
    }
    
    Country[] countries;
    
    constructor () public {
        Country memory c = Country({
            id:1,
            name:"Taiwan",
            capital:"Taipei",
            img:"",
            describe:""
        });
        countries.push(c);
    }
    
    function insertCountry(uint _id, string memory _name, string memory _capital, string memory _img, string memory _describe) public{
        Country memory c = Country({
            id:_id,
            name:_name,
            capital:_capital,
            img:_img,
            describe:_describe
        });
        countries.push(c);
    }
    
    function getAllCountries() public view  returns(Country[] memory){
        return countries;
    }
    
    function getCountries() public view returns (uint[] memory, string[] memory, string[] memory, string[] memory, string[] memory){
        uint [] memory id = new uint[](countries.length);
        string[] memory name = new string[](countries.length);
        string[] memory capital = new string[](countries.length);
        string[] memory img = new string[](countries.length);
        string[] memory describe = new string[](countries.length);
        for(uint i = 0;i < countries.length;i++){
            Country storage country = countries[i];
            id[i] = country.id;
            name[i] = country.name;
            capital[i] = country.capital;
            img[i] = country.img;
            describe[i] = country.describe;
        }
        return (id,name,capital,img,describe);
    }
    
    function getTotalCountries() public view returns(uint){
        return countries.length;
    }
    
    function updateCounties(uint _id, string memory _name, string memory _capital, string memory _img, string memory _describe) public{
        bytes memory nameLength = bytes(_name);
        bytes memory capitalLength = bytes(_capital); 
        bytes memory imgLength = bytes(_img); 
        bytes memory describeLength = bytes(_describe); 

        if(!(nameLength.length == 0)){
            countries[_id - 1].name = _name;
        }
        if(!(capitalLength.length == 0)){
            countries[_id - 1].capital = _capital;
        }
        if(!(imgLength.length == 0)){
            countries[_id - 1].img = _img;
        }
        if(!(describeLength.length == 0)){
            countries[_id - 1].describe = _describe;
        }
    }
}