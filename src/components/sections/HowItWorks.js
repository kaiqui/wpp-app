import React from 'react';
import { Box, Heading, Text, VStack, HStack, Icon, SimpleGrid } from '@chakra-ui/react';
import { FaRobot, FaChartLine, FaBell, FaUsers } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description }) => (
  <VStack
    align="start"
    spacing={4}
    p={6}
    bg="white"
    borderRadius="lg"
    boxShadow="md"
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
  >
    <Icon as={icon} fontSize="3xl" color="brand.500" />
    <Heading as="h3" size="md" color="gray.800">
      {title}
    </Heading>
    <Text color="gray.600">{description}</Text>
  </VStack>
);

const HowItWorks = () => {
  return (
    <Box py={16}>
      <Heading as="h2" size="xl" textAlign="center" mb={6} color="text.dark">
        Como funciona 🛠️
      </Heading>
      <Text fontSize="xl" textAlign="center" mb={12} color="gray.600">
        Gerenciar comunidades no WhatsApp não precisa ser difícil. Nossa plataforma oferece ferramentas poderosas para simplificar seu trabalho.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        <FeatureCard
          icon={FaRobot}
          title="Automação Inteligente"
          description="Utilize nossos bots para automatizar tarefas repetitivas e melhorar a eficiência do seu atendimento."
        />
        <FeatureCard
          icon={FaChartLine}
          title="Análise de Dados"
          description="Obtenha insights valiosos sobre o engajamento e comportamento dos membros da sua comunidade."
        />
        <FeatureCard
          icon={FaBell}
          title="Notificações Personalizadas"
          description="Configure alertas e lembretes para manter sua comunidade informada e engajada."
        />
        <FeatureCard
          icon={FaUsers}
          title="Gestão de Membros"
          description="Gerencie facilmente os membros do grupo, identificando os mais ativos e os que precisam de atenção."
        />
      </SimpleGrid>
    </Box>
  );
};

export default HowItWorks;