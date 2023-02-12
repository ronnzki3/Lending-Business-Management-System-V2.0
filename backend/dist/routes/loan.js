"use strict";

var router = require('express').Router();
var Loan = require("../models/loan.model");

// //show loan details by id
// router.route('/loan/:id').get((req, res)=>{
//     Loan.findById(req.params.id)
//     .then(loan => res.json(loan))
//     .catch(err => res.status(400).json(err));
// });

//add new loan
router.route('/new-loan').post(function (req, res) {
  var client_id = req.body.client_id;
  var loantype = req.body.loantype;
  var loanamount = req.body.loanamount;
  var loanterm = req.body.loanterm;
  var releasedate = req.body.releasedate;
  var newLoan = new Loan({
    client_id: client_id,
    loantype: loantype,
    loanterm: loanterm,
    loanamount: loanamount,
    releasedate: releasedate
  });
  newLoan.save().then(function (loan) {
    return res.json('Loan successfully added.');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});
module.exports = router;