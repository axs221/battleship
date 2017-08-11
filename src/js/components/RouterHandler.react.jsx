import React from 'react';
import { Redirect } from 'react-router-dom';
import RouterStore from '../stores/RouterStore';

class RouterHandler extends React.Component {
  state = {};

  componentDidMount() {
    RouterStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    RouterStore.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.forceUpdate();
  }

  render() {
    const url = RouterStore.getUrl();
    if (url) {
      return <Redirect to={url} />;
    }
    return null;
  }
}

module.exports = RouterHandler;
