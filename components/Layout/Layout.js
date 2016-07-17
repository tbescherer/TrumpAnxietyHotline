/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Header from './Header';
import s from './Layout.css';

class Layout extends React.Component {

  constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.state = {
          loggedIn: !!firebase.auth().currentUser
      }
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  login() {
      let authProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(authProvider);
      this.setState({loggedIn: true});
  }

  logout() {
      this.setState({loggedIn: false});
      return firebase.auth().signOut();

  }

  renderAuth() {
      if (this.state.loggedIn) {
          return (
              <button onClick={this.logout} className="mdl-button mdl-js-button mdl-button--raised">
                  Logout
              </button>
          )
      } else {
          return (
              <button onClick={this.login} className="mdl-button mdl-js-button mdl-button--raised">
                  Login
              </button>
          )
      }
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <Header>
            <span className="mdl-layout-title">React Firebase Demo App</span>
            <div className="mdl-layout-spacer"></div>
            {this.renderAuth()}
          </Header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Menu</span>
            <nav className="mdl-navigation">
              <div className="mdl-navigation__link">Do Nothing</div>
            </nav>
          </div>
          <main className="mdl-layout__content">
            <div className={s.content} {...this.props} />
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
