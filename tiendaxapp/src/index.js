import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Productos } from './components/productos/Productos'

const Routing = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/productos" component={Productos} />
      </Switch>
      <Footer />
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);