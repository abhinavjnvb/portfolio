import React, { Component } from 'react';
import './App.css';
import Profile from './Profile'
import Login from './login'
import {BrowserRouter , Route ,Switch} from 'react-router-dom'


export default class App extends Component {

  render(){
    return (
      <BrowserRouter>
      <div className="App">
      <Switch>
            <Route path='/profile' component={Profile}></Route>
            <Route path='/' component={Login}></Route>
      </Switch>
      </div>
      </BrowserRouter>
      
    );
  }
  
}


