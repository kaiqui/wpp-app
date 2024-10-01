import React from 'react';
import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box bg="white" boxShadow="sm" py={4}>
      <Flex maxW="container.xl" mx="auto" px={4} align="center">
        <Box fontWeight="bold" fontSize="xl">
          <Link to="/">WppApp</Link>
        </Box>
        <Spacer />
        <Flex>
          <Button as={Link} to="/beneficios" variant="ghost" mr={2}>
            Benefícios
          </Button>
          <Button as={Link} to="/planos" variant="ghost" mr={2}>
            Planos
          </Button>
          <Button as={Link} to="/contato" colorScheme="brand" variant="solid">
            Contato
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;