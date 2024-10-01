import React from 'react';
import { Box, Heading, Text, SimpleGrid, VStack, Icon, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaChartBar, FaClock, FaUserFriends, FaRocket } from 'react-icons/fa';

const MotionBox = motion(Box);

const BenefitCard = ({ title, description, icon, index }) => (
  <MotionBox
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <VStack
      align="start"
      spacing={4}
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="md"
      height="100%"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
    >
      <Icon as={icon} fontSize="3xl" color="brand.500" />
      <Heading as="h3" size="md" color="gray.800">{title}</Heading>
      <Text color="gray.600">{description}</Text>
    </VStack>
  </MotionBox>
);

const Benefits = () => {
  const benefits = [
    {
      icon: FaChartBar,
      title: "Insights Poderosos",
      description: "Tome decisões baseadas em dados com nossa análise avançada de IA dos seus chats do WhatsApp."
    },
    {
      icon: FaClock,
      title: "Economia de Tempo",
      description: "Automatize tarefas repetitivas com o Bot Agatha e foque no que realmente importa."
    },
    {
      icon: FaUserFriends,
      title: "Atendimento Personalizado",
      description: "Ofereça experiências únicas aos seus clientes com nossa solução de automação LLM."
    },
    {
      icon: FaRocket,
      title: "Escalabilidade",
      description: "Cresça seu negócio sem preocupações, nossas soluções escalam com você."
    }
  ];

  return (
    <Box width="100%" py={16}>
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          mb={12}
        >
          <Heading as="h2" size="xl" textAlign="center" color="gray.800">
            Benefícios 🎁
          </Heading>
        </MotionBox>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} justifyItems="center">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Benefits;