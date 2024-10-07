import React from 'react';
import { Box, Flex, Button, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" bg="headerBg" color="headerColor" py={4}>
      <Flex maxW="container.xl" mx="auto" alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Box fontWeight="bold" fontSize="xl">
            Your Logo
          </Box>
        </Link>
        <Flex>
          <Link to="/">
            <Button variant="ghost" mr={2}>
              Home
            </Button>
          </Link>
          <Link to="/form">
            <Button variant="ghost" mr={2}>
              Form
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;