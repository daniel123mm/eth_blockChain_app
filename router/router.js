var process = require("../controller/index")

exports.setRouters = function (app){
    app.get("/", process.getIndex);
    app.get("/getCountryList", process.getCountryList);
    app.get("/getTotalCountries", process.getTotalCountries);
    app.post("/newCountry", process.insertNewCountry);
    app.put("/updateCountry", process.updateCountry);
    app.post("/test", process.testPost);
}
