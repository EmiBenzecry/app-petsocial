import React,{useState} from 'react';
import './Login.css';
import Signup from './Signup'
import { auth } from './firebase.js';
import { useHistory } from 'react-router-dom';
import img_login from './img/img_login.jpg';
import login_vet from './img/login_vet.png';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';


function getModalStyle() {
  const top = 50 ;
  const left = 50; 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



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
   paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[10],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Login =() => {
  const classes = useStyles();
 
  
  //Login
  const [email, setEmail] = useState('');
  const history = useHistory('');
  const [password, setPassword] = useState('');
  //Modal
  const [modalStyle] = useState(getModalStyle);
  const [open,setOpen] = useState(false);

  const login = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(auth)
            history.push("/");
        })
      .catch((e) => {
          if (
              e.message ===
              "The password is invalid or the user does not have a password."
          ) {
              alert("Contraseña incorrecta");
          } else if (
              e.message ===
              "There is no user record corresponding to this identifier. The user may have been deleted."
          ) {
              history.push("/register");
              window.scrollTo({
                  top: document.body.scrollHeight,
                  left: 0,
                  behavior: "smooth",
              });
          } else {
              alert(e.message);
          }
      })
    };

   

   

    

    
    return ( 

      
     <div className="container">
        <center>
          <h1 className="container__name">Social Pet</h1>
          </center>
          <center>
          <h2 className="container__description">La red social de las mascotas </h2>
          </center>

     <div className="socialpet__container">


       <div className="login__left">
       
       <img src={login_vet} alt=" " className="socialpet__vet" />
       
       </div>  


       <div className="login__right"> 
            <center>
                <img src = {img_login} alt="" className="login__img"/> 
            </center>
           
        <form className={classes.root} >
            
            
            <center>
            <TextField 
                className="login__input"
                id="standard-basic" 
                label="Email" 
                type="email"
                onChange={(e) => setEmail(e.target.value)} 

            />
             </center>

             <center>
             <TextField 
                className="login__input"
                id="standard-basic" 
                label="Contraseña" 
                type="password"
                onChange={(e) => setPassword(e.target.value)} 
                
            />
            </center>
           
            <center>
                <button type="submit" className="login__login" onClick={login}>Ingresar</button>
            </center>
           
            <center>
                <h3 className="login__text">¿Aun no tienes una cuenta?</h3>
            </center>

            <center>
                        
               <button type="button" className="login__createNewAccount" onClick={() => setOpen(true)}  >Registrate</button>
                   
            </center>
            <center>
            <Modal
            open={open}
            onClose={()=> setOpen (false)}
            
            >
             <div style={modalStyle} className={classes.paper}>
       
                 <Signup/>
       
            </div>
            </Modal>
            </center>
      </form>
    </div>
  </div> 
  </div> 
        )
}

 
export default Login