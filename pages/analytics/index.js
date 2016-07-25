import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Analytics from '../../components/Analytics';
import { title } from './index.md';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class AnalyticsPage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout>
        <Analytics />
      </Layout>
    );
  }

}

export default AnalyticsPage;
