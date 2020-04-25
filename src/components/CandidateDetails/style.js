import styled from 'styled-components';
import { Col } from 'antd';

import media from '../UIElements/media';

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;

  h1 {
    margin-bottom: 0;

    ${media.mobile`
      font-size: 22px;
    `}
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LinksContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  font-size: 18px;
`;

export const ColX = styled(Col)`
  ${media.mobile`
    order: -1 !important;
  `}
`;

export const CollapseIcon = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const InfoContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
