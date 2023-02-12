import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


import Navbar from './components/navbar.component';
import ClientList from './components/client-list.component';
import ClientEdit from './components/client-edit.component';
import ClientNew from './components/client-new.component';
import LoanDetails from './components/loandetails.component';
import PaymentNew from './components/payment-new.component';
import Login from './components/login.component';
import axios from 'axios';
import Dashboard from './components/dashboard.component';


function App() {

  axios.defaults.withCredentials=true;

    const [logIncorrect, setLogIncorrect]=useState(false);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URI}/client/dashboard`)
    .then(res=>{
          console.log(res.data)
        if(res.data==="login"){
          setLogIncorrect(true);
        }
    })
  }, [] );


  // const isLogged=() => {
  //   if (logIncorrect === true) {
  //     setLogIncorrect(false);
  //     console.log("dsadsadsadas ")
  //     window.location = "/user/user-login";
  //   }
  // }

  
  return (
    <Router>
        {logIncorrect===false ?
       <Login /> : 
            <>
              <Navbar />
              <br/>
              <Routes>            
                  <Route path="/" exact element={<Dashboard />} />
                  <Route path="/lists" element={<ClientList />} />
                  <Route path="/edit/:id" element={<ClientEdit/>} />
                  <Route path="/new" element={<ClientNew/>} />
                  <Route path="/loan/:id" element={<LoanDetails/>} />
                  <Route path="/payment/new-payment/:id" element={<PaymentNew/>} />
                  {/* <Route path="/user/user-login" element={<Login/>} /> */}
              </Routes>  
            </>
      }
    </Router>
  );
}

export default App;
