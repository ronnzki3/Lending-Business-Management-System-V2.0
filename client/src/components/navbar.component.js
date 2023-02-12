import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component{

    render(){

        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to={'/'} className="navbar-brand text-info fs-1" >CLIIMS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link active" aria-current="page" >Dashboard</Link>
                    </li> 
                    <li className="nav-item">
                        <Link to={'/lists'} className="nav-link" aria-current="page" >Client Lists</Link>
                    </li>                      
                    <li className="nav-item">
                        <Link to={'/new'} className="nav-link" >Add New Client</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link ms-5 text-danger" >Logout</Link>
                    </li>
                    </ul>                  
                </div>
                </div>
            </nav>
            
        )
    }
}