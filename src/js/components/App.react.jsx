import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RouterHandler from './RouterHandler.react';

// child pages
import WelcomePage from './WelcomePage.react';
import WaitingPage from './WaitingPage.react';
import JoinPage from './JoinPage.react';
import GamePage from './GamePage.react';

const App = () => (
  <Router>
    <div>
      <RouterHandler />
      <Switch>
        <Route path="/wait" component={WaitingPage} />
        <Route path="/join/:otherPeerId" component={JoinPage} />
        <Route path="/game" component={GamePage} />
        <Route path="/" component={WelcomePage} />
      </Switch>
    </div>
  </Router>
);

export default App;
