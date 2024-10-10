import React from 'react';
import { Box, Flex, Button, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function Navbar() {
  return (
    <Box as="nav" bg="white" boxShadow="sm" p={4}>
      <Flex justify="space-between" align="center">
        <Link as={RouterLink} to="/" fontWeight="bold">
          Logo
        </Link>
        <Flex>
          <Button as={RouterLink} to="/login" variant="ghost" mr={2}>
            Login
          </Button>
          <Button as={RouterLink} to="/create-account" colorScheme="blue">
            Criar Conta
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;