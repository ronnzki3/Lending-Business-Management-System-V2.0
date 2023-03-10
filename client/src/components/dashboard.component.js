import React, {Component} from "react";
// import axios from 'axios';



export default class Dashboard extends Component{

       

    render(){
        return(         
            <div className="container p-3 mt-2 shadow-lg p-5 mb-5 rounded"> 
                <h3 className="text-center text-primary fw-bolder fs-1">COMMODITY Lending Investors, Inc. </h3>
                <h5 className="text-center text-info">Management System</h5>               
                <h3 className="mt-5 mb-5 fw-bold text-center text-warning bg-dark bg-gradient p-3">DASHBOARD</h3>

                <div className="container d-flex flex-column flex-sm-column flex-md-column flex-lg-row justify-content-center">
                
                
                    <div className="card mx-3" style={{width: "19rem"}}>                
                        <div className="card-body">
                            <h5 className="card-title fs-1 text-success fw-bolder text-center">649</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item text-center">Active Borrowers</li>
                        </ul>
                        <div className="card-body">
                            <a href="#" className="card-link text-end">See all</a>
                        </div>
                    </div>


                    <div className="card mx-3 my-5 my-lg-0" style={{width: "19rem"}}>                
                        <div className="card-body">
                            <h5 className="card-title fs-2 fw-bolder text-center">Collectibles</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Today: <span className="fw-bold text-primary">P73,560.00</span></li>
                            <li className="list-group-item">Current Week: <span className="fw-bold text-primary">P523,380.00</span></li>
                            <li className="list-group-item">Current Month: <span className="fw-bold text-primary">P2,830,440.00</span></li>
                        </ul>
                        <div className="card-body">
                            <a href="#" className="card-link text-end">See details</a>
                        </div>
                    </div>



                    <div className="card mx-3" style={{width: "19rem"}}>                
                        <div className="card-body">
                            <h5 className="card-title fs-2 fw-bolder text-danger text-center">Overdues</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Today: <span className="fw-bold text-danger">P13,120.00</span></li>
                            <li className="list-group-item">Current Week: <span className="fw-bold text-danger">P43,020.00</span></li>
                            <li className="list-group-item">Current Month: <span className="fw-bold text-danger">P115,060.00</span></li>
                        </ul>
                        <div className="card-body">
                            <a href="#" className="card-link text-end">See details</a>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}