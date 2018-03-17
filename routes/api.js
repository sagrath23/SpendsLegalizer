var legalizer = require("../controllers/legalize");

var routesAPI = function(app) {
  
  //solver routes
  app.post("/legalize", legalizer.legalize);
  app.get("/legalize", legalizer.test);
};


module.exports = routesAPI;
