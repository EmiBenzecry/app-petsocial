import React from 'react';

import './HeaderHome.css';
import adiestrador from './img/adiestrador.png'
import veterinaria from './img/veterinaria.png'
import refugios from './img/refugios.png';
import petshop from './img/petshop.png';
import { useHistory } from 'react-router-dom';
import { auth } from './firebase.js';
import { Avatar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Link,BrowserRouter as Router, } from "react-router-dom";







const HeaderHome = ({ user }) => {

    const history = useHistory('');

    if (user === false) {
        history.push("/login")
    }

    const logout = (event) => {
        event.preventDefault();
        auth.signOut();
        history.push("/login");
        
    }   
    
    return ( 

<div className="headerhome">

     <div className="headerhome__left">
        <h1 className="headerhome__name">Social Pet</h1>
    </div>

    <nav className="headerhome__middle">
        <div className="headerhome__icons">
        <img src={adiestrador} alt="" className="header__icons"/>
        </div>

        <div className="headerhome__icons">
        <img src={refugios} alt="" className="header__icons"/>
        </div>

        <div className="headerhome__icons">
        <img src={veterinaria} alt="" className="header__icons"/>
        </div>

        <div className="headerhome__icons">
       
        <Link to="/homebuy">
        <img src={petshop} alt="" className="header__icons"/> 
        </Link> 
       
        </div>

    </nav>

     <div className="headerhome__right">
        <div className="headerhome__user">
        <h3 className="homeHeader__userName">{user?.displayName}</h3>
         </div>
         <div>
        <Avatar /> 
        </div>
        <section>
        <div className="dropdown">
        <ArrowDropDownIcon className="dropdown" />
        <div className="dropdown-content">
        <center>
        <a onClick={logout}><p>Cerrar sesion</p></a>
        </center>
        </div>
        </div>
        </section>
     </div>
    
       

</div>

        
 )

}
 
export default HeaderHome;
