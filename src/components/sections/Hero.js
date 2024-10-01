import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, Image, Container, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Hero = () => {
  return (
    <Box 
      bg="brand.500" 
      color="text.light" 
      minHeight="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage="url('/images/banner-wpp.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        filter="brightness(0.7)"
        zIndex={0}
      />
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            maxW={{ base: 'full', md: '50%' }} 
            mb={{ base: 12, md: 0 }}
          >
            <VStack spacing={8} align="flex-start">
              <Heading as="h1" size="3xl" lineHeight="shorter">
                Revolucione seu Atendimento no WhatsApp
              </Heading>
              <Text fontSize="xl" fontWeight="medium" color="white">
                Soluções poderosas para transformar sua comunicação com clientes:
                Agatha e IA Experience
              </Text>
              <HStack spacing={4}>
                <Button colorScheme="accent" size="lg">
                  Teste Grátis
                </Button>
                <Button colorScheme="whiteAlpha" size="lg">
                  Saiba mais
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            maxW={{ base: 'full', md: '45%' }}
          >
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;