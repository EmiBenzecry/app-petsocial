import React, {useState} from 'react';
import './Signup.css';
import img_signup from './img/img_signup.jpg';
import { auth } from './firebase.js';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(2),
       
        '& label.Mui-focused': {
          color: '#0e86c7',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#0e86c7',
        },
    },
   
  },

}));
  
       
       

const Signup = () => {
    const classes = useStyles();
    const [nombre,setNombre] = useState ('');
    const [apellido,setApellido] = useState ('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory('');

    const signup = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({ 
                        displayName: nombre + " " + apellido
                    }).then((s) => {
                        history.push("/")
                    }) 
                
            })
            .catch((e) => {
                alert(e.message);
            })
    }
  

      
    return (
    <div className="singup__container">

      <form className={classes.root} >
      <div>
          <center>
          <img src={img_signup} alt="" className="signup__img" />
          </center>
      </div>
      <center>
        <TextField 
            className="login__input"
            id="standard-basic" 
            label="Nombre" 
            type="text"
            value={nombre}
            onChange={(e) => setNombre (e.target.value)}
           

        />
         </center>

         <center>
        <TextField 
            className="login__input"
            id="standard-basic" 
            label="Apellido" 
            type="text"
            value={apellido}
            onChange={ (e) => setApellido (e.target.value)}

        />
         </center>

        <center>
        <TextField 
            className="login__input"
            id="standard-basic" 
            label="Email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
           

        />
         </center>

           <center>
             <TextField 
                className="login__input"
                id="standard-basic" 
                label="Contraseña" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
                
            />
            </center>

           

            <center>
            <Button type="submit" className="signup__button" onClick={signup}>Registrate</Button>
            </center>
        </form>
    </div> 
        
     );
}
 
export default Signup;