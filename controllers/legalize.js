// var solverModel = require('../models/solver');
var greedyLegalizeDocuments = require("../models/legalize");
var legalizer = {};
// controller that handles request to solve a rubik cube
legalizer.legalize = function(req, res) {

  if (!req.body.state) {
    res.status(400);
    res.send({
      status: "error",
      error: "No Bills or Tickets sent to legalize."
    });
  }

  var result = {text: "Hola Mundo!!"};

  if (result) {
    var response = {
      result
    };
    res.send(response);
  } else {
    res.send({
      status: "error",
      error: "Error occured while Legalizing documents." 
    });
  }
};

legalizer.test = function(req, res) {
  res.status(200);
  const tickets = [3,6,2];
  const bills = [5,1,7,3];
  const objectResult = greedyLegalizeDocuments(tickets, bills);

  res.send({
    status: "Ok",
    result: objectResult
  });
};

module.exports = legalizer;
