import React, {Component} from 'react';
// import List from './List';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Homepage from './Homepage';

import BiodataIndex from './biodata-lumen/BiodataIndex';
import BiodataCreate from './biodata-lumen/BiodataCreate';
import BiodataDetail from './biodata-lumen/BiodataDetail';
import BiodataEdit from './biodata-lumen/BiodataEdit';

import BiodataIndexLara from './biodata-lara/BiodataIndex';
import BiodataCreateLara from './biodata-lara/BiodataCreate';
import BiodataDetailLara from './biodata-lara/BiodataDetail';
import BiodataEditLara from './biodata-lara/BiodataEdit';

import './App.css';

class App extends Component {
 

  render(){
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path='/' component={Homepage}/>

      {/* INI ROUTER PUNYA LUMEN */}
      <Route exact path='/lumen' component={BiodataIndex}/>
      <Route exact path='/lumen/create' component={BiodataCreate}/>
      <Route path='/lumen/detail/:id' component={BiodataDetail}/>
      <Route path='/lumen/edit/:id' component={BiodataEdit}/>

      {/* INI ROUTER PUNYA LARAVEL */}
      <Route exact path='/lara' component={BiodataIndexLara}/>
      <Route exact path='/lara/create' component={BiodataCreateLara}/>
      <Route path='/lara/detail/:id' component={BiodataDetailLara}/>
      <Route path='/lara/edit/:id' component={BiodataEditLara}/>

      </Switch>
    </BrowserRouter>
  );
 }
}

export default App;
