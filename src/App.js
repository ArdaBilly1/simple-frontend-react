import React, {Component} from 'react';
// import List from './List';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BiodataIndex from './biodata/BiodataIndex';
import BiodataCreate from './biodata/BiodataCreate';
import BiodataDetail from './biodata/BiodataDetail';
import BiodataEdit from './biodata/BiodataEdit';
import './App.css';

class App extends Component {
 

  render(){
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path='/' component={BiodataIndex}/>
      <Route exact path='/create' component={BiodataCreate}/>
      <Route path='/detail/:id' component={BiodataDetail}/>
      <Route path='/edit/:id' component={BiodataEdit}/>
      </Switch>
    </BrowserRouter>
  );
 }
}

export default App;
