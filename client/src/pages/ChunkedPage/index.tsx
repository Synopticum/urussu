import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import Page from 'src/features/Page';
import Controls from 'src/features/Page/Controls';
import Content from 'src/features/Page/Content';

const StyledChunkedPage = styled(Page)`
  position: relative;
  width: 100%;
  height: 100%;
`;

type Props = {
  id?: string;
} & RouteComponentProps;

const ChunkedPage: React.FC<Props> = ({ id }) => {
  return (
    <StyledChunkedPage>
      <Controls>asd</Controls>
      <Content>
        <div>chunked page {id}</div>
      </Content>
    </StyledChunkedPage>
  );
};

export default ChunkedPage;
