import logo from './logo.svg';
import './App.css';
// import { useState, useEffect } from "react";
// import axios from "axios";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Map from './components/Map';
import Assessment from './components/Assessment';
import News from './components/News';
import Login from './components/Login';
import Register from './components/Register';



function App() {

  return (
    <Router>
      <Route path='/' exact component={Dashboard} />
      <Route path='/map' exact component={Map} />
      <Route path='/assessment' exact component={Assessment} />
      <Route path='/news' exact component={News} />
      <Route path='/login' exact component={Login} />
      <Route path='/Register' exact component={Register} />
    </Router>
  );
}

export default App;
