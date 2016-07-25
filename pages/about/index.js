import React from 'react';
import Layout from '../../components/Layout';
import { title, html } from './index.md';

class AboutPage extends React.Component {

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout>
        <div style={{padding: '20px'}}>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Layout>
    );
  }

}

export default AboutPage;
