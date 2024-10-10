import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Image,
  VStack,
} from '@chakra-ui/react';

function ForgotPasswordPage() {
  const cardBgColor = useColorModeValue('white', 'gray.700');

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" 
          bgImage="url('/images/backgroups.jpg')" 
          bgSize="cover" bgPosition="center">
      <Box
        borderWidth={1}
        px={8}
        py={12}
        width="full"
        maxWidth="500px"
        borderRadius="15px"
        textAlign="center"
        boxShadow="xl"
        bg={cardBgColor}
        position="relative"
        overflow="hidden"
      >
        <Box position="absolute" top={0} left={0} right={0} height="5px" bgGradient="linear(to-r, blue.400, purple.500)" />
        
        <Image src="/logo192.png" alt="Logo" width="60px" mx="auto" mb={6} />

        <Heading fontSize="28px" mb={2} fontWeight="bold">Forgot Password</Heading>
        <Text fontSize="16px" color="gray.500" mb={8}>
          Enter your email to reset your password
        </Text>

        <VStack spacing={5}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" placeholder="Your email address" size="lg" />
          </FormControl>

          <Button colorScheme="blue" width="full" size="lg" boxShadow="md">
            RESET PASSWORD
          </Button>

          <Text fontSize="sm">
            Remember your password?{' '}
            <Button as="a" href="/login" variant="link" color="blue.400" fontWeight="medium">
              Back to Login
            </Button>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}

export default ForgotPasswordPage;