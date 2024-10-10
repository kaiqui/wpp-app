import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import theme from './theme';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import FormPage from './components/pages/FormPage';
import LoginPage from './components/pages/LoginPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import CreateAccountPage from './components/pages/CreateAccountPage';
import CheckoutPage from './components/pages/CheckoutPage';
import DashboardPage from './components/pages/DashboardPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ParallaxProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </Layout>
        </Router>
      </ParallaxProvider>
    </ChakraProvider>
  );
}

export default App;
