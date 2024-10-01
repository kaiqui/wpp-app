import React from 'react';
import { Box, Heading, VStack, HStack, Button, Container, Text, Icon, Link } from '@chakra-ui/react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';

const ContactInfo = ({ icon, title, content }) => (
  <HStack spacing={4} align="flex-start">
    <Icon as={icon} fontSize="xl" color="brand.500" mt={1} />
    <VStack align="start" spacing={0}>
      <Text fontWeight="bold" color="gray.700">{title}</Text>
      <Text color="gray.600">{content}</Text>
    </VStack>
  </HStack>
);

const Contact = () => {
  const handleAgathaChatRedirect = () => {
    // Aqui você pode adicionar a lógica para redirecionar para o chat com a Agatha
    // Por exemplo, você pode usar uma URL do WhatsApp ou abrir um widget de chat
    window.open('https://wa.me/seu_numero_whatsapp', '_blank');
  };

  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <Heading as="h2" size="2xl" textAlign="center" mb={12} color="gray.800">
          Entre em Contato 📬
        </Heading>
        <Box 
          bg="white" 
          p={10} 
          borderRadius="xl" 
          boxShadow="xl"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap={10}
        >
          <VStack spacing={8} align="stretch" flex={1}>
            <Text fontSize="lg" color="gray.700">
              Estamos aqui para ajudar! Converse agora mesmo com a Agatha, nossa assistente virtual, ou use uma de nossas opções de contato abaixo.
            </Text>
            <Button 
              leftIcon={<FaWhatsapp />} 
              colorScheme="green" 
              size="lg" 
              onClick={handleAgathaChatRedirect}
            >
              Falar com a Agatha no WhatsApp
            </Button>
            <ContactInfo 
              icon={FaEnvelope} 
              title="Email" 
              content="contato@seudominio.com" 
            />
            <ContactInfo 
              icon={FaPhone} 
              title="Telefone" 
              content="+55 (11) 1234-5678" 
            />
            <ContactInfo 
              icon={FaMapMarkerAlt} 
              title="Endereço" 
              content="Rua Exemplo, 123 - São Paulo, SP" 
            />
          </VStack>
          <VStack spacing={6} align="stretch" flex={1}>
            <Heading as="h3" size="lg" color="gray.800">
              Por que falar com a Agatha?
            </Heading>
            <Text color="gray.600">
              A Agatha é nossa assistente virtual inteligente, treinada para:
            </Text>
            <VStack align="start" spacing={4}>
              <HStack>
                <Icon as={FaCheckCircle} color="green.500" />
                <Text>Responder suas dúvidas rapidamente</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="green.500" />
                <Text>Fornecer informações detalhadas sobre nossos serviços</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="green.500" />
                <Text>Agendar demonstrações com nossa equipe</Text>
              </HStack>
              <HStack>
                <Icon as={FaCheckCircle} color="green.500" />
                <Text>Oferecer suporte inicial para problemas comuns</Text>
              </HStack>
            </VStack>
            <Text color="gray.600" mt={4}>
              Experimente agora e veja como podemos ajudar você de forma rápida e eficiente!
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;