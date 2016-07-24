import {connect} from 'react-redux';
import React from 'react';
import Header from './Header';
import s from './Layout.css';
import store from '../../core/store.js';

class Layout extends React.Component {

  constructor(props) {
      super(props);
  }

  componentDidMount() {
      window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }




  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref={node => (this.root = node)}>
        <div className="mdl-layout__inner-container">
          <Header>
            <span className="mdl-layout-title" onClick={() => {window.location.href=window.location.origin}} style={{cursor: 'pointer'}}>Trump Anxiety Hotline</span>
            <div className="mdl-layout-spacer"></div>
          </Header>
          <div className="mdl-layout__drawer">
            <span className="mdl-layout-title">Menu</span>
            <nav className="mdl-navigation" style={{cursor: 'pointer'}}>
              <div className="mdl-navigation__link" onClick={() => {window.location.href="/messages"}}>Start a Conversation</div>
              <div className="mdl-navigation__link">Analytics</div>
              <div className="mdl-navigation__link">Quick Links</div>
              <div className="mdl-navigation__link">Donate</div>
              <div className="mdl-navigation__link">Volunteer</div>
              <div className="mdl-navigation__link">About</div>
              <div className="mdl-navigation__link">Buy a Hat</div>
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
