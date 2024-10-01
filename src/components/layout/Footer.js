import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.100" py={4}>
      <Flex maxW="container.xl" mx="auto" px={4} justify="space-between" align="center">
        <Text>&copy; 2023 WppApp. Todos os direitos reservados.</Text>
        <Flex>
          <Text mr={4}>Termos de Uso</Text>
          <Text>Política de Privacidade</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;