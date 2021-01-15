import React from 'react';
import { Layout } from 'antd';
import UploadComponent from './components/UploadComponent';
import './App.css';
import ImageContainer from './components/ImageContainer';
import SearchBar from './components/SearchBar';
import LabelContainer from './components/LabelContainer';
const { Header, Footer, Content } = Layout;

const App = () => (
  <div>
    <Layout>
      <Layout>
        <Header>
          <div>
            <h1 style={{color: 'white', textAlign: 'center'}}>Image Repo</h1>
          </div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <SearchBar />
          <ImageContainer/>
          <UploadComponent/>
        </Content>
        <Content style={{ padding: '0 50px' }}>
          <LabelContainer>
            
          </LabelContainer>
        </Content>
        <Footer style={{ textAlign: 'center' }}>na.wu</Footer>
      </Layout>
  </Layout>
  </div>
);

export default App;