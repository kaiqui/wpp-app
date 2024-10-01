import React from 'react';
import { Box, Heading, Text, VStack, HStack, Avatar, Icon, SimpleGrid, Container, Flex } from '@chakra-ui/react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Parallax } from 'react-scroll-parallax';

const TestimonialCard = ({ name, role, content, avatarSrc }) => (
  <Flex
    direction="column"
    justify="space-between"
    bg="white"
    boxShadow="md"
    borderRadius="lg"
    p={6}
    height="full"
    transition="all 0.3s"
    _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
  >
    <VStack align="start" spacing={4}>
      <Icon as={FaQuoteLeft} w={8} h={8} color="brand.500" />
      <Text fontSize="md" color="gray.600">{content}</Text>
    </VStack>
    <HStack spacing={4} mt={4}>
      <Avatar src={avatarSrc} name={name} />
      <VStack align="start" spacing={0}>
        <Text fontWeight="bold" color="gray.700">{name}</Text>
        <Text fontSize="sm" color="gray.500">{role}</Text>
      </VStack>
    </HStack>
  </Flex>
);

const Testimonials = () => {
  return (
    <Box py={16} bg="white">
  <Container maxW="container.xl">
    <Heading as="h2" size="2xl" textAlign="center" mb={12} color="gray.800">
      O que nossos clientes dizem 💬
    </Heading>
    
    {/* Alinhando o conteúdo centralmente */}
    <Flex justify="center">
      <SimpleGrid 
        columns={{ base: 1, md: 3 }} 
        spacing={10} 
        maxW="100%" // Garantindo que o grid ocupe 100% da largura disponível
        justifyItems="center" // Alinhando os itens dentro das colunas
        alignItems="center" // Centralizando verticalmente
      >
          <TestimonialCard
            name="Rafael Fernandes"
            role="Gestor de Comunidade"
            content="O resumo gera valor à comunidade, principalmente para quem não tem tempo de acompanhar sempre, e otimiza a gestão do grupo, permitindo mais tempo para focar no relacionamento com os membros."
            avatarSrc="/path-to-avatar1.jpg"
          />

          <TestimonialCard
            name="Neto Camargo"
            role="Empreendedor Digital"
            content="Qualquer pessoa buscando construir uma comunidade no WhatsApp vai encontrar os mesmos desafios: Gestão complexa e falta de ferramentas de engajamento. Esta plataforma muda completamente esse jogo."
            avatarSrc="/path-to-avatar2.jpg"
          />

          <TestimonialCard
            name="Sebastian Baltazar"
            role="Administrador de Grupo"
            content="Ter um bot que nos ajude a organizar os conteúdos dentro de uma comunidade é um sucesso fenomenal e 'querido' com muito carinho por todos os membros."
            avatarSrc="/path-to-avatar3.jpg"
          />
      </SimpleGrid>
    </Flex>
  </Container>
</Box>

  );
};

export default Testimonials;