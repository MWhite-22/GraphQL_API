import React, { Component } from 'react';
import '../styles/App.css';
import LinksList from './LinksList';
import CreateLink from './CreateLink';
import Header from './Header';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={LinksList} />
            <Route exact path="/create" component={CreateLink} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
