import React, {Component, useState} from 'react';
// import {Link} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';


const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker className="form-control pickdate" name="releasedate" selected={startDate} onChange={(date) => setStartDate(date)} />
    );
  };



export default class ClientNew extends Component{   

    constructor(props){
        super(props);

        this.state = {
            fname : "",
            mname : "",
            lname : "",
            address : "",
            contact : "",
            loantype: "",
            loanamount:0,
            loanterm:"",
            client_id:"",
            releasedate:"",
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onBack = this.onBack.bind(this);

        
    }

    onDateChanges(){
        this.setState({
            releasedate : document.querySelector(".pickdate").value
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

        const clientData ={
            fname : this.state.fname,
            mname : this.state.mname,
            lname : this.state.lname,
            address : this.state.address,
            contact : this.state.contact
        }

        axios.post(`${process.env.REACT_APP_SERVER_URI}/client/new-client` ,clientData)
            // .then( res => window.location="/")
            // .then(res=> console.log('saved'+ res.data))
            .then(res =>
                   this.onSaved(res.data)
                )
            .catch( err => console.log(err))
    }


    onSaved(id){                

        const loanData ={
            client_id : id,
            loantype : this.state.loantype,
            loanamount : this.state.loanamount,
            loanterm : this.state.loanterm,
            releasedate: document.querySelector(".pickdate").value,
        }

        axios.post(`${process.env.REACT_APP_SERVER_URI}/loan/new-loan`,loanData)       
        .then(res =>
                window.location="/loan/"+id
            )
        .catch( err => console.log(err))
    }


    onNext(){
        document.getElementById("client-container").style.display="none";
        document.querySelector("#loan-container").classList.remove("d-none");
    }


    onBack(){
        document.getElementById("client-container").style.display="block";
        document.querySelector("#loan-container").classList.add("d-none");
    }

   

    render(){       
        
        return(
            <div className='container-fluid bg-success bg-gradient p-5 vw-100'>
                <div className="container w-50 shadow-lg p-5 mb-5 bg-white rounded">              

                <form onSubmit={this.onSubmit}>               
                <div id="client-container">         
                        <h3 className='fw-bold text-info text-center'>Add New Client</h3>     

                        
                        <div className='form-group'>
                            <label className="form-label">First name</label>
                            <input type="text" className='form-control' data-name="fname" onChange={this.onInputChange} required />
                        </div>
                        <br/>
                        <div className='form-group'>
                            <label className="form-label">Middle name</label>
                            <input type="text" className='form-control' data-name="mname" onChange={this.onInputChange} required />
                        </div>
                        <br/>
                        <div className='form-group'>
                            <label className="form-label">Last name</label>
                            <input type="text" className='form-control' data-name="lname" onChange={this.onInputChange} required />
                        </div>
                        <br/>
                        <div className='form-group'>
                            <label className="form-label">Address</label>
                            <input type="text" className='form-control' data-name="address" onChange={this.onInputChange} required />
                        </div>
                        <br/>
                        <div className='form-group'>
                            <label className="form-label">Contact</label>
                            <input type="text" className='form-control' data-name="contact" onChange={this.onInputChange} />
                        </div>

                        <br/>
                        <br/>                      
                        <div className='clearfix p-2'>
                                    <button className='btn btn-outline-primary btn-md float-end px-5 py-2' type='button' onClick={()=>this.onNext()}>Next</button>     
                        </div>
                                      
                </div> 

                <div id="loan-container" className='d-none'>
                        <h3 className='fw-bold text-info text-center'>Loan Details</h3>
                        
                        <div className='form-group'>
                            <label className="form-label">Date Release</label>
                            <Example  />
                        </div>
                        <br/>
                        <div className='form-group'>
                            <label className="form-label">Loan Type</label>
                            {/* <input type="text" className='form-control' data-name="loantype" onChange={this.onInputChange} required /> */}
                            <select data-name="loantype" onChange={this.onInputChange} className="form-select">
                                <option selected>CHOOSE...</option>
                                <option>SALARY</option>
                                <option>PENSION</option>
                            </select>
                        </div>
                        <br/>
                        <div className='form-group'>
                            <label className="form-label">Loan Amount</label>
                            <input type="text" className='form-control' data-name="loanamount" onChange={this.onInputChange} required />
                        </div>
                        <br/>
                        <div className='form-group'>
                            <label className="form-label">Loan Term (# of Days)</label>
                            <input type="text" className='form-control' data-name="loanterm" onChange={this.onInputChange} required />
                        </div>
                        <br/>
                        <br/>
                        <div className='clearfix p-2'>
                                <button className='btn btn-outline-warning btn-md float-start px-5 py-2' type='button' onClick={()=>this.onBack()}>Back</button> 

                                <button className='btn btn-outline-primary btn-md float-end px-5 py-2' type='submit'>Submit</button>
                        </div>
                </div>
                </form>

                </div>
            </div>
        )
    }
}