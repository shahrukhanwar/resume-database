import React from 'react';
import { Layout } from 'antd';

import Header from './components/Header';
import CandidateList from './components/CandidateList';
import { ContentX } from './components/UIElements';

const { Footer } = Layout;

const App = () => {
  return (
    <>
      <Header />
      <ContentX>
        <CandidateList />
      </ContentX>
      <Footer style={{ textAlign: 'center' }}>
        ©2020 Created by Shahrukh Anwar
      </Footer>
    </>
  );
};

export default App;
