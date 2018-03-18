// var solverModel = require('../models/solver');
var legalize = require("../models/legalize")
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
    legalize.legalize({},{})
    if (!req.body.state) {
        res.status(400);
        res.send({
          status: "error",
          error: "No Bills or Tickets sent to legalize."
        });
      }
    
      var result = {text: "Servicio respondiendo!!"};
    
      if (result) {
        var response = {
          result: result
        }
        res.send(response);
      } else {
        res.send({
          status: "error",
          error: "Error occured while Legalizing documents."
        });
      } 
};

module.exports = legalizer;
