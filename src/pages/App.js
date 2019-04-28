import React, { Component } from 'react';
import Header from '../components/Header/Header'
import Menu from '../components/Menu/Menu'

class App extends Component {
  render() {
    return (
      <div className="App">
        {(this.props.children.props.location.pathname == "/") ? "" : <Header />}
        {(this.props.children.props.location.pathname == "/") ? "" : <Menu />}
        {this.props.children}
      </div>
    );
  }
}

export default App;
