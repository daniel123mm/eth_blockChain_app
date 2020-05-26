pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Countries {
    
    struct Country{
        string name;
        string capital;
        string img;
        string describe;
    }
    

    mapping(uint=>Country) countries;
    Country country;
    uint id;
    
    constructor () public {
        id = 0;
    }
    
    function insertCountry(string memory name, string memory capital, string memory img, string memory describe) public{
       ///uint index = id;
       countries[id] = Country({
           name:name,
           capital:capital,
           img:img,
           describe:describe
       });
       //countryList.push(countries[index]);
       id++;
    }
   
    /*
    function getAllCountries() public view returns(Country[] memory){
        return countryList;
    }
    */
    
    
    function getTotalCountries() public view returns(uint){
        return id;
    }

    function updateCounties(uint index,string memory img, string memory describe) public{
        countries[index].img = img;
        countries[index].describe = describe;
            
    }
    
    
    function getCountry(uint index) public view returns(Country memory){
        return countries[index];
    }
}