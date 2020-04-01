var URL = 'http://127.0.0.1:8080/';
var stop = false;
var list = [];

// Script to open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
   
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

function insert(){
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById('insertForm').style.display = 'block';
}

function update(){
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById('updateForm').style.display = 'block';
}

//get list from server
var app = angular.module('myApp',['angular.filter']);
app.controller('customersCtrl', function($scope, $http){
    httpRequest("getCountryList", "GET", "");
    $scope.confirm = function() {
        var name = document.getElementById("cname").value;
        var capital = document.getElementById("capitalName").value;
        var img = document.getElementById("imgURL").value;
        var des = document.getElementById("describe").value;
        var obj = {"name":name,"capital":capital,"img":img,"des":des};
        httpRequest("newCountry","POST",obj);
        document.getElementById("insertForm").style.display = "none";
    };

    $scope.updateConfirm = function() {
        var select = document.getElementById("country");
        var id = select.selectedIndex + 1;
        var name = select.options[select.selectedIndex].text;
        var capital = document.getElementById("updateCapital").value;
        var img = document.getElementById("updateImgURL").value;
        var des = document.getElementById("updateDescribe").value;
        var obj = {"id":id, "name":name, "capital":capital, "img":img, "des":des};
        httpRequest("updateCountry","PUT",obj);
        document.getElementById("updateForm").style.display = "none";
    }

    function httpRequest(api, method, obj){
        $http({
            method : method,
            url : URL +　api,
            data: obj,
            dateType:"json",
            async : false
        }).then(function success(response) {
            if(api == "getCountryList"){
                $scope.countryList = response.data;
                console.log($scope.countryList)

            }else{
                httpRequest("getCountryList", "GET", "");
            }
            console.log(response);
        }, function error(error) {
            console.log(error);
        });
    }

});