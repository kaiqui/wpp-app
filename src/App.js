import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import theme from './theme';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ParallaxProvider>
        <Router>
          <Layout>
            <Home />
          </Layout>
        </Router>
      </ParallaxProvider>
    </ChakraProvider>
  );
}

export default App;
