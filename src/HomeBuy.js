import React from 'react';
import './HomeBuy.css';
import tienda_de_mascotas from './img/tienda_de_mascotas.png';

const HomeBuy = () => {
    return ( 
        
        <div className="HomeBuy__img">
            <div className="headerbuy__tienda">
        <img src={tienda_de_mascotas} alt="" className="headerbuy__img"/>
        </div>
            
        </div>
     );
}
 
export default HomeBuy;
            