import styled from 'styled-components';
import { Layout } from 'antd';

import media from './media';
const { Content } = Layout;

export const ContentX = styled(Content)`
  padding: 20px 50px 0px;

  ${media.mobile`
    padding: 20px 20px 0px;
    `}
`;
