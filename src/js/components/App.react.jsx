import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RouterHandler from './RouterHandler.react';

// child pages
import WelcomePage from './WelcomePage.react';
import GamePage from './GamePage.react';

const App = () => (
  <Router>
    <div>
      <RouterHandler />
      <Switch>
        <Route path="/game/:gameId" component={GamePage} />
        <Route path="/" component={WelcomePage} />
      </Switch>
    </div>
  </Router>
);

export default App;
