import React, {Component} from 'react';
import { useParams, Link} from 'react-router-dom';
import axios from 'axios';


//equivalent of props.match.params.id in Version5
function withParams(Component) {
return (props) => <Component {...props} params={useParams()} />;
}


const PaymentsData = props =>{
    return(
        <tr>
            <td>{props.payments.paymentdate.substring(0,10)}</td>
            <td>{props.payments.particular}</td>
            <td>{props.payments.debit}</td>
            <td>{props.payments.credit}</td>
            <td>0</td>
            <td>                
                {/* <Link to={'/edit/'+props.payments._id} className="btn btn-outline-success btn-sm">Edit</Link> &nbsp; */}
                <a href="# " onClick={()=>{props.deletePayments(props.payments._id)}} className="btn btn-outline-danger btn-sm">Delete</a>
            </td>
        </tr>       
    )
}



export class LoanDetails extends Component{

    constructor(props){
        super(props);

        this.state = {
            client_id:"",
            lastname:"",
            fname:"",
            address:"",
            contact:"",
            releasedate:"",
            loantype:"",
            loanterm:"",
            loanamount:"",
            loan_id:"",
            payments:[],
        }

        this.deletePayments = this.deletePayments.bind(this);

    }

    componentDidMount(){
        //fetch clients info
        axios.get(`${process.env.REACT_APP_SERVER_URI}/client/lists/`+this.props.params.id)
            .then(res => {
                this.setState({
                    client_id: res.data._id,
                    lastname: res.data.lname + ", ",
                    fname:  res.data.fname + " " + res.data.mname,
                    address: res.data.address,
                    contact: res.data.contact,
                })
            })
            .catch(err =>{
                console.log(err);
            })

        //fetch loan info
        axios.get(`${process.env.REACT_APP_SERVER_URI}/client/loan/` +this.props.params.id)
            .then(res => {
                this.setState({
                    loan_id:res.data._id,
                    releasedate: res.data.releasedate.substring(0,10),
                    loantype: res.data.loantype,
                    loanterm: res.data.loanterm,
                    loanamount: res.data.loanamount,
                })
            })
            .catch(err =>{
                console.log(err);
            })

        //fetch payments info
        axios.get(`${process.env.REACT_APP_SERVER_URI}/client/payment/` +this.props.params.id)
            .then(res=>{
                this.setState({ payments : res.data });
                // console.log(res.data)
            })
    }


    deletePayments(id){
        axios.delete(`${process.env.REACT_APP_SERVER_URI}/client/payment/` +id)
            .then( res => console.log(res.data))
            this.setState({
                payments : this.state.payments.filter(el => el._id !== id)
            })
    }



    loanDetails(){
        return this.state.payments.map( currentPayments =>{
            return <PaymentsData payments={currentPayments} deletePayments={this.deletePayments} key={currentPayments._id} />
        })
    }
    

    render(){
        return(
            <div className="container w-100 p-3 mb-5 bg-white rounded">
                    <Link to={'/lists'} className="btn btn-outline-success btn-sm"> Go Back </Link>
                    <h3 className='fw-bold fs-3 text-center p-2 bg-dark bg-gradient text-warning mt-2'>Loan Details</h3>

                    <div className="d-flex flex-md-column shadow-lg flex-lg-row">
                        <div className='w-100 w-sm-100 w-md-100 w-lg-50 p-5'>
                            <h5>Client's Information</h5>
                            <table className="table table-bordered table-hover">                            
                            <tbody>
                               <tr>
                                    <td>
                                        <span className='fw-lighter'>Name:</span> <br/>
                                        <span className='fw-bold text-primary'>{this.state.lastname}</span> <br/>
                                        <span className='fst-italic text-primary'>{this.state.fname}</span> 
                                    </td>
                               </tr>
                               <tr>
                                    <td>
                                        <span className='fw-lighter'>Address:</span> <br/>
                                        <span className='fst-italic'>{this.state.address}</span>                                       
                                    </td>
                               </tr>
                               <tr>
                                    <td>
                                        <span className='fw-lighter'>Contact:</span> <br/>
                                        <span className='fst-italic'> {this.state.contact}</span>
                                    </td>
                               </tr>
                            </tbody>
                        </table>

                        </div>

                        <div className='w-100 w-sm-100 w-md-100 w-lg-50 p-5'>
                            <h5>Active Loan Details</h5>
                            <table className="table table-bordered table-hover">                            
                            <tbody>
                               <tr>
                                    <td className='fw-lighter'>
                                       Date Release
                                    </td>
                                    <td>
                                     {this.state.releasedate}
                                    </td>
                               </tr>   
                               <tr>
                                    <td className='fw-lighter'>
                                       Type
                                    </td>
                                    <td>
                                     {this.state.loantype}
                                    </td>
                               </tr>   
                               <tr>
                                    <td className='fw-lighter'>
                                       Term
                                    </td>
                                    <td>
                                     {this.state.loanterm} Days
                                    </td>
                               </tr>   
                               <tr>
                                    <td className='fw-lighter'>
                                       Amount
                                    </td>
                                    <td>
                                     {this.state.loanamount}
                                    </td>
                               </tr>   
                               <tr>
                                    <td className='fw-lighter'>
                                       Daily Due Amount
                                    </td>
                                    <td>
                                        0.00
                                    </td>
                               </tr>                              
                            </tbody>
                            </table>   
                        </div>
                    </div>

                    <div className='mt-5 shadow-lg p-5'>
                        <hr className='text-danger' />
                        <hr className='text-danger' />
                        <h4 className='text-center text-success'>LEDGER</h4>
                        <Link to={'/payment/new-payment/'+this.state.client_id} className="btn btn-outline-success btn-sm float-end mb-3">Add Payment</Link>
                        <div>
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                    <th>Date</th>
                                    <th>Particulars</th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                    <th>Balance</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {this.loanDetails()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
               
            </div>
        )
    }
}

//equivalent of props.match.params.id in Version5
export default withParams(LoanDetails);