import styled from 'styled-components';

import media from '../UIElements/media';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SearchContainer = styled.div`
  align-self: center;
  width: 50%;

  ${media.tablet`
    width: 75%;
  `}

  ${media.mobile`
    width: 100%;
  `}
`;
