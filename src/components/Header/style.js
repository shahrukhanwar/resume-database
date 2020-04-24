import styled from 'styled-components';

import media from '../UIElements/media';

export const Logo = styled.h1`
  color: #fff;
  font-weight: 700;
  ${media.mobile`
        font-size: 20px;
        text-align: center;
    `}
`;
