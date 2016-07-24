import store from '../../core/store.js';
import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Messenger from '../../components/Messenger';
class HomePage extends React.Component {

  componentDidMount() {
    document.title = 'Trump Anxiety Hotline';
  }

  render() {
    return (
      <Layout>
        <Messenger />
      </Layout>
    );
  }

}

export default HomePage;
