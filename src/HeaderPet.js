import React from 'react';
import './HeaderPet.css';
import { makeStyles } from '@material-ui/core/styles';
import veterinaria from './img/veterinaria.png';
import adiestrador from './img/adiestrador.png'
import refugios from './img/refugios.png';
import petshop from './img/petshop.png';
import Avatar from '@material-ui/core/Avatar';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';






const useStyles = makeStyles((theme) => ({
   button: {
     margin: theme.spacing(1),
     backgroundColor: '#1770a0',
     padding:'5px',
     color:'white',
   },
 }));

const HeaderPet = () => {
   const classes = useStyles();
    return ( 
        
      <nav className="header">
                
        
         <h1 className="header__name"> Tienda de mascotas</h1>

        

         <div className="header__search">
            <input type="text" className="header__searchInput" placeholder= "Buscar..." />
           
          </div> 
          {/*Link*/}

       <div className="header__section">  
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
       
        
        <img src={petshop} alt="" className="header__icons"/> 
        
       
        </div>

         
        
    
           {/*Link*/}
          
          
          <div className="header__avatar"> 
          <Avatar/>  
          </div>
         
       </div>
                
    </nav>   

        
      
    

        );
}
 
export default HeaderPet;