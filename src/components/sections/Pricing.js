import React, { useState } from 'react';
import { Box, Heading, Text, Button, VStack, HStack, List, ListItem, ListIcon, SimpleGrid, Switch, Flex, Container } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

const PriceCard = ({ title, price, features, isPopular }) => (
  <Box
    borderWidth={2}
    borderColor={isPopular ? "brand.500" : "gray.200"}
    borderRadius="xl"
    p={8}
    position="relative"
    bg="white"
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
  >
    {isPopular && (
      <Text
        position="absolute"
        top="-4"
        right="50%"
        transform="translateX(50%)"
        bg="brand.500"
        color="white"
        fontSize="sm"
        fontWeight="bold"
        px={4}
        py={2}
        borderRadius="full"
      >
        Mais popular
      </Text>
    )}
    <VStack spacing={6} align="stretch">
      <Heading as="h3" size="lg" textAlign="center" color="gray.800">
        {title}
      </Heading>
      <HStack justify="center" spacing={1}>
        <Text fontSize="4xl" fontWeight="bold" color="brand.500">
          R$
        </Text>
        <Text fontSize="6xl" fontWeight="bold" color="brand.500">
          {price}
        </Text>
        <Text fontSize="2xl" color="gray.500">/mês</Text>
      </HStack>
      <Button 
        colorScheme="brand" 
        size="lg" 
        bg={isPopular ? "brand.500" : "white"}
        color={isPopular ? "white" : "brand.500"}
        borderColor="brand.500"
        borderWidth={2}
        _hover={{
          bg: isPopular ? "brand.600" : "brand.50",
        }}
      >
        Começar agora
      </Button>
      <List spacing={4}>
        {features.map((feature, index) => (
          <ListItem key={index} color="gray.600">
            <ListIcon as={FaCheckCircle} color="green.500" />
            {feature}
          </ListItem>
        ))}
      </List>
    </VStack>
  </Box>
);

const Pricing = () => {
  const [selectedProduct, setSelectedProduct] = useState('agatha');
  const [isAnnual, setIsAnnual] = useState(false);

  const products = {
    agatha: {
      name: "Bot Agatha",
      plans: {
        basic: { price: "69", features: ["Até 500 membros", "Resumo diário", "Chatbot básico", "Suporte por email"] },
        standard: { price: "109", features: ["Até 1025 membros", "Resumo em tempo real", "Chatbot avançado", "Suporte prioritário", "Análise de engajamento"] },
        premium: { price: "189", features: ["Até 2050 membros", "Recursos personalizados", "API completa", "Gerente de conta dedicado", "Treinamento personalizado"] }
      }
    },
    llm: {
      name: "Automação LLM",
      plans: {
        basic: { price: "99", features: ["Até 1.000 interações/mês", "Modelo de linguagem básico", "Análise semântica básica", "Suporte por email"] },
        standard: { price: "199", features: ["Até 5.000 interações/mês", "Modelo de linguagem avançado", "Análise de satisfação do cliente", "API para integrações", "Suporte prioritário"] },
        premium: { price: "399", features: ["Interações ilimitadas", "Modelo de linguagem premium", "Análise preditiva de tópicos", "API avançada", "Suporte 24/7", "Treinamento personalizado"] }
      }
    }
  };

  const handleProductChange = () => {
    setSelectedProduct(selectedProduct === 'agatha' ? 'llm' : 'agatha');
  };

  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <Heading as="h2" size="2xl" textAlign="center" mb={6} color="gray.800">
          Oferecemos o plano perfeito para cada etapa da sua comunidade
        </Heading>
        <Flex justify="center" align="center" mb={8}>
          <Text 
            mr={4} 
            fontWeight="bold" 
            color={selectedProduct === 'agatha' ? 'brand.500' : 'gray.500'}
            cursor="pointer"
            onClick={() => setSelectedProduct('agatha')}
          >
            Bot Agatha
          </Text>
          <Switch 
            size="lg" 
            colorScheme="brand" 
            isChecked={selectedProduct === 'llm'}
            onChange={handleProductChange}
          />
          <Text 
            ml={4} 
            fontWeight="bold" 
            color={selectedProduct === 'llm' ? 'brand.500' : 'gray.500'}
            cursor="pointer"
            onClick={() => setSelectedProduct('llm')}
          >
            Automação LLM
          </Text>
        </Flex>
        <Flex justify="center" width="100%" flexDirection="column" alignItems="center">
          <Box width="300px" mb={2}>
            <Switch 
              size="lg" 
              colorScheme="brand" 
              isChecked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
          </Box>
          {isAnnual && (
            <Text fontSize="sm" fontWeight="bold" color="green.500">
              (Economize 2 meses)
            </Text>
          )}
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="container.xl" mx="auto">
          {Object.entries(products[selectedProduct].plans).map(([planType, planDetails], index) => (
            <PriceCard
              key={planType}
              title={planType.charAt(0).toUpperCase() + planType.slice(1)}
              price={isAnnual ? planDetails.price * 10 : planDetails.price}
              features={planDetails.features}
              isPopular={index === 1}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Pricing;