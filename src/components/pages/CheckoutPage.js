import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  useToast,
  Container,
  Image,
  Divider,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.5 0H5.5C2.46243 0 0 2.46243 0 5.5V34.5C0 37.5376 2.46243 40 5.5 40H34.5C37.5376 40 40 37.5376 40 34.5V5.5C40 2.46243 37.5376 0 34.5 0ZM25.9833 16.0833C25.9833 14.3058 27.4225 12.8667 29.2 12.8667C30.9775 12.8667 32.4167 14.3058 32.4167 16.0833C32.4167 17.8608 30.9775 19.3 29.2 19.3C27.4225 19.3 25.9833 17.8608 25.9833 16.0833ZM7.58333 16.0833C7.58333 14.3058 9.02249 12.8667 10.8 12.8667C12.5775 12.8667 14.0167 14.3058 14.0167 16.0833C14.0167 17.8608 12.5775 19.3 10.8 19.3C9.02249 19.3 7.58333 17.8608 7.58333 16.0833ZM20 25.9833C17.2831 25.9833 15.0833 23.7835 15.0833 21.0667H24.9167C24.9167 23.7835 22.7169 25.9833 20 25.9833Z"
      fill="#635BFF"
    />
  </svg>
);

const ProductDisplay = () => (
  <Container maxW="container.sm" py={8}>
    <VStack spacing={8} align="stretch">
      <HStack justifyContent="space-between">
        <Logo />
        <Text fontSize="sm" color="gray.500">Powered by Stripe</Text>
      </HStack>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <VStack spacing={4} align="stretch">
          <Heading as="h3" size="lg">Starter plan</Heading>
          <Text>$20.00 / month</Text>
          <Divider />
          <Text fontSize="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl eget ultricies aliquam, nunc sapien aliquet urna.
          </Text>
          <form action="/create-checkout-session" method="POST">
            <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
            <Button type="submit" colorScheme="purple" width="full">
              Subscribe
            </Button>
          </form>
        </VStack>
      </Box>
    </VStack>
  </Container>
);

const SuccessDisplay = ({ sessionId }) => (
  <Container maxW="container.sm" py={8}>
    <VStack spacing={8} align="stretch">
      <HStack justifyContent="space-between">
        <Logo />
        <Text fontSize="sm" color="gray.500">Powered by Stripe</Text>
      </HStack>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <VStack spacing={4} align="stretch">
          <Heading as="h3" size="lg">Thanks for your order!</Heading>
          <Text>We appreciate your business! A confirmation email will be sent to your email address.</Text>
          <form action="/create-portal-session" method="POST">
            <input type="hidden" id="session-id" name="session_id" value={sessionId} />
            <Button type="submit" colorScheme="purple" width="full">
              Manage your billing information
            </Button>
          </form>
        </VStack>
      </Box>
    </VStack>
  </Container>
);

const Message = ({ message }) => (
  <Container maxW="container.sm" py={8}>
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Text>{message}</Text>
    </Box>
  </Container>
);

const CheckoutPage = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
      toast({
        title: "Order canceled",
        description: "You can continue shopping and checkout when you're ready.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [location.search, toast]);

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return <Message message={message} />;
  }
};

export default CheckoutPage;