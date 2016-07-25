import store from '../../core/store.js';
import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Links from '../../components/Links';
class LinksPage extends React.Component {

  componentDidMount() {
    document.title = 'Trump Anxiety Hotline Links';
  }

  render() {
    return (
      <Layout>
        <Links />
      </Layout>
    );
  }

}

export default LinksPage;
