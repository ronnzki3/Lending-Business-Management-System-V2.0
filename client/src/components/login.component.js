import axios from "axios";
import React, { Component } from "react";



export default class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            loggedErr:false,
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onInputChange(e){
        this.setState({
            [e.target.dataset.name]: e.target.value
        });
    }

    customStyle = ()=>{
        return{
            backgroundColor: "black",
        }
    }


    handleSubmit(e){
        e.preventDefault();

        const loginData ={
            username:this.state.username,
            password:this.state.password
        }
        // console.log(loginData);
       axios.post(`${process.env.REACT_APP_SERVER_URI}/client/user/user-login` ,loginData)
       .then(res=>
                // console.log(res.data)
                this.onLogged(res.data)
                )
       .catch(err => console.log(err));
    }

    onLogged(param){
        if(param==null){                     
            this.setState({
                loggedErr:true
            })            
            // console.log("Incorrect user name/password." + this.state.loggedErr); 
        }else{            
            console.log(param);
            window.location="/"
        }
    }

    render(){

      
        return(

            <div className="container-fluid">
                
                <div className="vh-100 row">

                    <div className="col-md-4 p-md-5 p-lg-5 order-md-1 " style={{backgroundColor: "#262626"}}>
                            <h3 className="text-white mt-5 text-center p-2"><span className="fw-bolder fs-1 text-success d-block">   COMMODITY   </span> <span className="fs-4 text-secondary d-block">Lending Investors, Inc.</span></h3>

                            <div className="row d-flex flex-column pt-1 pb-5">
                                <div className="lend-icon1 mx-auto mt-2"></div>
                                <div className="lend-icon2 mx-auto mt-5"></div>
                                <div className="lend-icon3 mx-auto mt-5"></div>
                                <div className="lend-icon5 mx-auto mt-5"></div>
                            </div>
                    </div>

                    <div className="col-md-8 order-first order-md-2" style={{backgroundColor: "#B6EAF8"}}>
                           <div className="col-md-5 border mx-auto d-flex flex-column p-5 bg-white rounded mt-sm-0 mt-md-5">
                                <div className="lend-icon4"></div>
                                <h4>Log in to CLIIMS</h4>
                                <br/>
                                {
                                    this.state.loggedErr===true ? <span className="text-danger">Incorrect user name or password.</span> : null
                                }
                                <form onSubmit={this.handleSubmit}>
                                    <input className="form-control mb-2" data-name="username" onChange={this.onInputChange} name="username" type="text" placeholder="user name" autoComplete="off"/>                                    
                                    <input className="form-control mb-2" data-name="password" onChange={this.onInputChange} name="password" type="password" placeholder="password" autoComplete="off"/>
                                    <button className="bg-success w-100 p-2 text-white" type="submit">Log in</button>
                                    
                                </form>
                           </div>
                    </div>

                </div>
                

            </div>

        )

    }

}