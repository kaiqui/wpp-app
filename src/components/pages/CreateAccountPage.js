import React from 'react';
import { Box, VStack, Heading, Text } from '@chakra-ui/react';

function CreateAccountPage() {
  return (
    <Box p={8}>
      <VStack spacing={4} align="stretch">
        <Heading>Criar Conta</Heading>
        <Text>Formulário de criação de conta aqui...</Text>
      </VStack>
    </Box>
  );
}

export default CreateAccountPage;