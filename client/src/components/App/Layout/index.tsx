import React from 'react';
import { Link, Router } from '@reach/router';
import styled from 'styled-components';
import loadable from '@loadable/component';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import ErrorBoundary from '../../ErrorBoundary';
import Error404 from 'src/pages/Error404';

const Home = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/Home'));
const About = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/About'));
const ContactUs = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/ContactUs'));
const ChunkedPage = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/ChunkedPage'));

const Content = styled.div`
  flex: 1 0 0;
  display: flex;
  padding: 30px 50px;
`;

type Props = {};

const Layout: React.FC<Props> = () => {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary>
        <Content>
          <Router primary={false}>
            <Home path="/" />
            <About path="/about/" />
            <ContactUs path="/contact-us/" />
            <ChunkedPage path="/chunked-page/:id" />
            <Error404 default />
          </Router>
        </Content>
      </ErrorBoundary>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default Layout;
