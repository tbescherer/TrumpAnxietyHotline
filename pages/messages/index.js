import store from '../../core/store.js';
import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Messenger from '../../components/Messenger';
import { title } from './index.md';
class HomePage extends React.Component {

  componentDidMount() {
    document.title = title;
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
