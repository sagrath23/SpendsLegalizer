// var solverModel = require('../models/solver');
var legalizeDocuments = require("../models/legalize");
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
  const promise = legalizeDocuments(tickets, bills);

  promise.then((result) => {
    const objectResult = {
      bonos: [],
      facturas: []
    };

    tickets.map((item, index) => {
      const value = parseInt(result[index]);
      if (value === 1){
        objectResult.bonos.push(item);
      }
    });

    bills.map((item, index) => {
      const value = parseInt(result[index + tickets.length]);
      if(value === 1) {
        objectResult.facturas.push(item);
      }
    });

    res.send({
      status: "Ok",
      result: objectResult
    });
  });
};

module.exports = legalizer;
