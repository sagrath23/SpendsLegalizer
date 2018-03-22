// var solverModel = require('../models/solver');
var greedyLegalizeDocuments = require("../models/legalize");
var legalizer = {};
// controller that handles request to solve a rubik cube
legalizer.legalize = function(req, res) {
  var status;

  if (!req.body) {
    res.status(400);
    status =  {
      status: "error",
      error: "No Bills or Tickets sent to legalize."
    }
  } else {
    const objectResult = greedyLegalizeDocuments(req.body.bonos, req.body.facturas);

    status = {
      status: "Ok",
      result: objectResult
    }
  }

  res.send(status);
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
