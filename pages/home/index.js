import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Content from '../../components/Content';
import { title } from './index.md';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class HomePage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout>
        <Content />
      </Layout>
    );
  }

}

export default HomePage;
