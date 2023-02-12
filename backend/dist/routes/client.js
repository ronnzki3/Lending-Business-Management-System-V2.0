"use strict";

var router = require('express').Router();
var Client = require("../models/client.model");
var Loan = require("../models/loan.model");
var Payment = require("../models/payment.model");
var User = require("../models/user.model");

//show all clients
router.route('/lists').get(function (req, res) {
  Client.find().then(function (client) {
    return res.json(client);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//count all clients
router.route('/lists/count').get(function (req, res) {
  Client.countDocuments().then(function (count) {
    return res.json(count);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//sum all clients loan,
router.route('/lists/sum_all').get(function (req, res) {
  Loan.aggregate([{
    $group: {
      _id: {
        $sum: "$loanamount"
      }
    }
  }]).then(function (count) {
    return res.json(count);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//show client details by id
router.route('/lists/:id').get(function (req, res) {
  Client.findById(req.params.id).then(function (client) {
    return res.json(client);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//show loan details by id
router.route('/loan/:id').get(function (req, res) {
  Loan.findOne({
    client_id: req.params.id
  }).then(function (loan) {
    return res.json(loan);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//user login
//find username and password
router.route('/user/user-login').post(function (req, res) {
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }).then(function (userd) {
    req.session.user = userd, res.json(userd);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//user logout
router.route('/user/user-logout').post(function (req, res) {
  res.cookie('userKey', 'none', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true
  });
  res.status(200).json('logout');
});


router.route('/dashboard').get(function (req, res) {
  if (req.session.user) {
    res.json("login");
  } else {
    res.json("not");
  }
});

//delete client
router.route('/delete/:id')["delete"](function (req, res) {
  Client.findByIdAndDelete(req.params.id).then(function (client) {
    return res.json('Client was deleted successfully.');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//add new client
router.route('/new-client').post(function (req, res) {
  var fname = req.body.fname;
  var mname = req.body.mname;
  var lname = req.body.lname;
  var address = req.body.address;
  var contact = req.body.contact;
  var newClient = new Client({
    fname: fname,
    mname: mname,
    lname: lname,
    address: address,
    contact: contact
  });
  newClient.save().then(function (client) {
    return res.json(client._id);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//add new payment
router.route('/payment/new-payment/:id').post(function (req, res) {
  var client_id = req.body.client_id;
  var loan_id = req.body.loan_id;
  var paymentdate = req.body.paymentdate;
  var particular = req.body.particular;
  var debit = req.body.debit;
  var credit = req.body.credit;
  var newPayment = new Payment({
    client_id: client_id,
    loan_id: loan_id,
    paymentdate: paymentdate,
    particular: particular,
    debit: debit,
    credit: credit
  });
  newPayment.save().then(function (pay) {
    return res.json(pay.client_id);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//add new user
router.route('/user/new-user').post(function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var newUser = new User({
    username: username,
    password: password
  });
  newUser.save().then(function (user) {
    return res.json('User added');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//delete payments
router.route('/payment/:id')["delete"](function (req, res) {
  Payment.findByIdAndDelete(req.params.id).then(function (payment) {
    return res.json('Payment was deleted successfully.');
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//show Payments lists of id
router.route('/payment/:id').get(function (req, res) {
  Payment.find({
    client_id: req.params.id
  }).sort({
    paymentdate: -1
  }).then(function (payment) {
    return res.json(payment);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});

//update client
router.route('/edit/:id').post(function (req, res) {
  //fetch client first
  Client.findById(req.params.id).then(function (client) {
    //update
    client.fname = req.body.fname;
    client.mname = req.body.mname;
    client.lname = req.body.lname;
    client.address = req.body.address;
    client.contact = req.body.contact;
    client.save().then(function () {
      return res.json('Client details successfully updated');
    })["catch"](function (err) {
      return res.status(400).json('Error: ' + err);
    });
  })["catch"](function (err) {
    return res.status(400).json('Error:' + err);
  });
});
module.exports = router;