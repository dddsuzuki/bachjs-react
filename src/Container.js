import React from 'react';
import Context from './Context';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = this.store.state;
  }

  componentDidMount() {
    this.store.subscribe('onUpdate', this.onUpdate.bind(this));
  }

  componentWillUnmount() {
    this.store.unsubscribe('onUpdate', this.onUpdate.bind(this));
  }

  onUpdate(state) {
    this.setState(state);
  }

  dispatch = (action, payload) => {
    return this.store.dispatch(action, payload);
  }

  commit = (mutation, payload) => {
    return this.store.commit(mutation, payload);
  }

  subscribe = (event, callback) => {
    this.store.subscribe(event, callback);
  }

  unsubscribe = (event, callback) => {
    this.store.unsubscribe(event, callback);
  }

  render() {
    const context = {
      state: this.state,
      dispatch: this.dispatch,
      commit: this.commit,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    };

    return (
      <Context.Provider value={context}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Container;
