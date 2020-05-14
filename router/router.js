var process = require("../controller/index")

exports.setRouters = function (app){
    app.get("/", process.getIndex);
    app.get("/record", process.getRecord);
    app.get("/getCountryList", process.getCountryList);
    app.get("/getTotalCountries", process.getTotalCountries);
    app.post("/newCountry", process.insertNewCountry);
    app.put("/updateCountry", process.updateCountry);
    app.get("/getBlockInfo", process.getBlockInfo);
    app.get("/getTranscationInfo", process.getTranscationInfo);
    app.post("/test", process.testPost);
}
