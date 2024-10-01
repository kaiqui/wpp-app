import React from 'react';
import { SimpleGrid, Heading, Text, VStack, HStack, Icon, Box, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaChartLine } from 'react-icons/fa';

const MotionBox = motion(Box);

const FeatureCard = ({ title, description, icon, index, subFeatures }) => (
  <MotionBox
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <VStack 
      align="start" 
      spacing={6} 
      bg="white" 
      p={8} 
      borderRadius="xl" 
      boxShadow="xl"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
      height="100%"
      maxWidth="500px"
      margin="0 auto"
    >
      <Icon as={icon} fontSize="4xl" color="accent.500" />
      <Heading as="h3" size="lg" color="gray.800">{title}</Heading>
      <Text color="gray.600" fontSize="lg">{description}</Text>
      <Box pt={4}>
        <Heading as="h4" size="md" color="gray.700" mb={2}>Inclui análise de dados:</Heading>
        <VStack align="start" spacing={2}>
          {subFeatures.map((feature, idx) => (
            <HStack key={idx} spacing={2}>
              <Icon as={FaChartLine} color="brand.500" />
              <Text color="gray.600">{feature}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </VStack>
  </MotionBox>
);

const Features = () => {
  return (
    <Container maxW="container.xl">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2" size="2xl" textAlign="center" mb={16} color="gray.800">
          Nossos Produtos 🚀
        </Heading>
      </MotionBox>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} justifyItems="center">
        <FeatureCard
          icon={FaRobot}
          title="Bot Agatha"
          description="Automatize seu atendimento com Agatha, nossa assistente virtual inteligente para WhatsApp."
          index={0}
          subFeatures={[
            "Análise de engajamento dos usuários",
            "Relatórios de desempenho do bot",
            "Insights sobre padrões de conversa"
          ]}
        />
        <FeatureCard
          icon={FaBrain}
          title="Automação LLM"
          description="Leve a automação ao próximo nível com nosso serviço baseado em LLM para atendimento ao cliente."
          index={0}
          subFeatures={[
            "Análise semântica das conversas",
            "Métricas de satisfação do cliente",
            "Identificação de tópicos recorrentes"
          ]}
        />
      </SimpleGrid>
    </Container>
  );
};

export default Features;