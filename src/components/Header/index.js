import React from 'react';
import { Layout } from 'antd';

import { Logo } from './style';

const { Header: AntHeader } = Layout;

const Header = () => (
  <AntHeader style={{ width: '100%', backgroundColor: '#1890FF' }}>
    <Logo>Resume Database</Logo>
  </AntHeader>
);

export default Header;
