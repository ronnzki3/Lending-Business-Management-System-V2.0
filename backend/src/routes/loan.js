const router = require('express').Router();
let Loan = require('../models/loan.model');


// //show loan details by id
// router.route('/loan/:id').get((req, res)=>{
//     Loan.findById(req.params.id)
//     .then(loan => res.json(loan))
//     .catch(err => res.status(400).json(err));
// });


//add new loan
router.route('/new-loan').post((req, res)=>{
    const client_id = req.body.client_id;
    const loantype = req.body.loantype;
    const loanamount = req.body.loanamount;
    const loanterm = req.body.loanterm;
    const releasedate = req.body.releasedate;


    const newLoan = new Loan({
        client_id,
        loantype,
        loanterm,
        loanamount,
        releasedate,
    });
    

    newLoan.save()
    .then( loan => res.json('Loan successfully added.'))
    .catch( err => res.status(400).json(err));

});



module.exports = router;