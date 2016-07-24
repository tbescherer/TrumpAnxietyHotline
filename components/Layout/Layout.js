/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import {connect} from 'react-redux';
import React from 'react';
import Header from './Header';
import s from './Layout.css';
import store from '../../core/store.js';

class Layout extends React.Component {

  constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.state = {
          loggedIn: !!firebase.auth().currentUser
      }
  }

  componentWillMount() {
      this.listenPosts()
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  listenPosts = () => {
      store.dispatch({type: 'FETCH_POSTS'});
      let theState = store.getState();
      var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
      recentPostsRef.on('child_added', function(data){
          store.dispatch({type:'ADD_POST', data: {'posts': data.val()}});
      });
      recentPostsRef.on('child_removed', function(data){
          store.dispatch({type:'DELETE_POST', data: {'posts': data.val()}});
      })
  };

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
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <Header>
            <span className="mdl-layout-title">Trump Anxiety Hotline</span>
            <div className="mdl-layout-spacer"></div>
          </Header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Menu</span>
            <nav className="mdl-navigation">
              <div className="mdl-navigation__link">Analytics</div>
              <div className="mdl-navigation__link">Quick Links</div>
              <div className="mdl-navigation__link">Donate</div>
              <div className="mdl-navigation__link">Volunteer</div>
              <div className="mdl-navigation__link">About</div>
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
