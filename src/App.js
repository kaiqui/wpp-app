import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import theme from './theme';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import FormPage from './components/pages/FormPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ParallaxProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<FormPage />} />
            </Routes>
          </Layout>
        </Router>
      </ParallaxProvider>
    </ChakraProvider>
  );
}

export default App;
