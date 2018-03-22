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
  } else {
    const objectResult = greedyLegalizeDocuments(req.body.tickets, req.body.bills);

    res.send({
      status: "Ok",
      result: objectResult
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
