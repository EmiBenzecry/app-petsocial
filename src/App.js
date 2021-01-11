import React,{useState} from 'react';
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { auth } from './firebase.js';
import Login from './Login';
import Signup from './Signup'
import HeaderHome from './HeaderHome';
import HeaderPet from './HeaderPet';
import Posts from './Posts'
import Search from './component/Search';
import HomeBuy from './HomeBuy';

function App() {

  const [user, setUser] = useState([]);

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser)
    } else {
      setUser(false);
    }
  })
  return (
    <div className="App">
     <Router>
    
      <Switch>
        <Route path="/login"> 
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <HeaderHome user={user}/>
          <Search/>
          <div className="app__posts">
          <Posts  user={user} />
          </div>
        </Route>
        <BrowserRouter>
        <Route path="/homebuy">
        <HeaderPet />
      <HomeBuy/>
    </Route>
  </BrowserRouter>    
       
      </Switch>
    </Router>
         
  </div>       
  );
}

export default App;
