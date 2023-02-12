import React, {Component, useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';


//equivalent of props.match.params.id in Version5
function withParams(Component) {
    return (props) => <Component {...props} params={useParams()} />;
}



const DatePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker className="form-control paydate" name="paymentdate" selected={startDate} onChange={(date) => setStartDate(date)} />
    );
  };



export class PaymentNew extends Component{   

    constructor(props){
        super(props);

        this.state = {
            lname: "",
            fname:"",
            client_id : "",
            loan_id : "",
            paymentdate : "",
            particular : "",
            debit : 0,
            credit: 0,            
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
            
    }

    componentDidMount(){    

        axios.get(`${process.env.REACT_APP_SERVER_URI}/client/lists/` +this.props.params.id)
        .then(res => {
            this.setState({
                client_id: res.data._id,
                lname: res.data.lname + ",",
                fname: res.data.fname + " " + res.data.fname,
            })
        })
        .catch(err=>console.log(err))


        axios.get(`${process.env.REACT_APP_SERVER_URI}/client/loan/` +this.props.params.id)
            .then(res => {
                this.setState({
                    loan_id: res.data._id,
                })
            })
            .catch(err=>console.log(err))    
    }

    onDateChanges(){
        this.setState({
            paymentdate : document.querySelector(".pickdate").value
        })
    }

    onInputChange(e){
        this.setState({
            [e.target.dataset.name] : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        // console.log(this.state);

        const paymentData ={
            client_id : this.state.client_id,
            loan_id : this.state.loan_id,
            particular:this.state.particular,
            paymentdate : document.querySelector(".paydate").value,
            debit : this.state.debit,
            credit : this.state.credit
        }

        // console.log(paymentData);

        axios.post(`${process.env.REACT_APP_SERVER_URI}/client/payment/new-payment/`+this.props.params.id, paymentData)
            // .then( res => window.location="/")
            // .then(res=> console.log('saved'+ res.data))
            .then(res =>
                    window.location="/loan/"+ res.data        
                )
            .catch( err => console.log(err))
    }   

    render(){       
        
        return(
            <div className='container-fluid bg-success bg-gradient p-5 vw-100'>
                <div className="container w-50 shadow-lg p-5 mb-5 bg-white rounded">              

                    <form onSubmit={this.onSubmit}>               
                    <div id="client-container">         
                            <h3 className='text-center text-success fw-bold'>ADD PAYMENT</h3>

                            <span className='fw-lighter'>Client's Name:</span> <br/>
                            <span className='fw-bold text-primary'>{this.state.lname}</span>  &nbsp;
                            <span className='fw-bold fst-italic text-primary'>{this.state.fname}</span>

                            <br/><br/>

                            <div className='form-group'>
                                <label className="form-label">Date</label>
                                <DatePickerComponent  />
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label className="form-label">Particular</label>
                                <input type="text" className='form-control' data-name="particular" onChange={this.onInputChange} required />
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label className="form-label">Debit</label>
                                <input type="text" className='form-control' data-name="debit" onChange={this.onInputChange} />
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label className="form-label">Credit</label>
                                <input type="text" className='form-control' data-name="credit" onChange={this.onInputChange} />
                            </div>
                            <br/>               
                            <div className='clearfix'>
                                <Link to={'/loan/'+this.state.client_id} className="btn btn-outline-danger btn-md px-5 py-2 float-start">Cancel</Link>
                                <button type='submit' className="btn btn-outline-primary btn-md px-5 py-2 float-end">Save Payment</button>     
                            </div>               
                    </div> 
                    </form>

                </div>
            </div>
        )
    }
}



//equivalent of props.match.params.id in Version5
export default withParams(PaymentNew);