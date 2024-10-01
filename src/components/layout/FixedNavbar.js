import React, { useState, useEffect } from 'react';
import { Box, Flex, Button, Link } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';

const FixedNavbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="white"
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <Flex
          px={4}
          py={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex flexDirection="row" justifyContent="center" alignItems="center">
            <Link as={ScrollLink} to="hero" smooth={true} duration={500}>
              <Button colorScheme="brand" variant="ghost" mr={2}>
                Início
              </Button>
            </Link>
            <Link as={ScrollLink} to="features" smooth={true} duration={500}>
              <Button colorScheme="brand" variant="ghost" mr={2}>
                Produtos
              </Button>
            </Link>
            <Link as={ScrollLink} to="benefits" smooth={true} duration={500}>
              <Button colorScheme="brand" variant="ghost" mr={2}>
                Benefícios
              </Button>
            </Link>
            <Link as={ScrollLink} to="pricing" smooth={true} duration={500}>
              <Button colorScheme="brand" variant="ghost" mr={2}>
                Planos e Preços
              </Button>
            </Link>
          </Flex>
          <Link as={ScrollLink} to="contact" smooth={true} duration={500}>
            <Button colorScheme="brand">Contato</Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default FixedNavbar;