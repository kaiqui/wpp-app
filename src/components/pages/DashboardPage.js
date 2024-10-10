import React from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
} from '@chakra-ui/react';
import { FaUsers, FaChartLine, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';

// Componente para o Sidebar
const Sidebar = () => (
  <VStack
    width="250px"
    height="100vh"
    bg="blue.600"
    color="white"
    p={5}
    spacing={5}
    align="stretch"
  >
    <Heading size="md">Dashboard</Heading>
    <VStack align="stretch" spacing={3}>
      <HStack><Icon as={FaChartLine} /><Text>Visão Geral</Text></HStack>
      <HStack><Icon as={FaUsers} /><Text>Clientes</Text></HStack>
      <HStack><Icon as={FaCalendarAlt} /><Text>Agendamentos</Text></HStack>
      <HStack><Icon as={FaClipboardList} /><Text>Relatórios</Text></HStack>
    </VStack>
  </VStack>
);

// Componente para o Card de Estatísticas
const StatCard = ({ icon, label, value, helpText }) => (
  <Stat
    px={{ base: 2, md: 4 }}
    py={'5'}
    shadow={'xl'}
    border={'1px solid'}
    borderColor={'gray.200'}
    rounded={'lg'}
    bg="white"
  >
    <Flex justifyContent={'space-between'}>
      <Box pl={{ base: 2, md: 4 }}>
        <StatLabel fontWeight={'medium'} isTruncated>
          {label}
        </StatLabel>
        <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
          {value}
        </StatNumber>
      </Box>
      <Box
        my={'auto'}
        color={'gray.800'}
        alignContent={'center'}
      >
        <Icon as={icon} w={8} h={8} />
      </Box>
    </Flex>
    <StatHelpText>{helpText}</StatHelpText>
  </Stat>
);

// Componente principal do Dashboard
const DashboardPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex={1} p={8} bg="gray.100">
        <VStack spacing={8} align="stretch">
          <Heading size="lg">Visão Geral</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <StatCard icon={FaUsers} label="Clientes Totais" value="1,254" helpText="↗︎ 12% desde o último mês" />
            <StatCard icon={FaCalendarAlt} label="Agendamentos Hoje" value="42" helpText="↘︎ 5% desde ontem" />
            <StatCard icon={FaChartLine} label="Receita Mensal" value="R$ 54.200" helpText="↗︎ 8% desde o último mês" />
            <StatCard icon={FaClipboardList} label="Tarefas Pendentes" value="23" helpText="3 concluídas hoje" />
          </SimpleGrid>

          <Box bg="white" p={5} rounded="md" shadow="md">
            <Heading size="md" mb={4}>Próximos Agendamentos</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Cliente</Th>
                  <Th>Serviço</Th>
                  <Th>Data</Th>
                  <Th>Hora</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>João Silva</Td>
                  <Td>Corte de Cabelo</Td>
                  <Td>15/05/2023</Td>
                  <Td>14:00</Td>
                </Tr>
                <Tr>
                  <Td>Maria Oliveira</Td>
                  <Td>Manicure</Td>
                  <Td>15/05/2023</Td>
                  <Td>15:30</Td>
                </Tr>
                <Tr>
                  <Td>Carlos Santos</Td>
                  <Td>Barba</Td>
                  <Td>16/05/2023</Td>
                  <Td>10:00</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default DashboardPage;