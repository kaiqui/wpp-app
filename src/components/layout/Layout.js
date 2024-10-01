import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import FixedNavbar from './FixedNavbar';

const Layout = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />
      <FixedNavbar />
      <Box flex={1}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;