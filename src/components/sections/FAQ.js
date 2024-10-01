import React from 'react';
import { Box, Heading, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const FAQItem = ({ question, answer }) => (
  <AccordionItem border="none" mb={4}>
    <AccordionButton 
      bg="white" 
      _hover={{ bg: 'gray.50' }} 
      _expanded={{ bg: 'brand.500', color: 'white' }}
      borderRadius="full"
      boxShadow="md"
      p={4}
    >
      <Box flex="1" textAlign="left" fontWeight="semibold">
        {question}
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4} pt={6} px={6}>
      <Text color="gray.600">{answer}</Text>
    </AccordionPanel>
  </AccordionItem>
);

const FAQ = () => {
  const faqItems = [
    {
      question: "Como funciona a integração do Bot Agatha com o WhatsApp?",
      answer: "A integração é simples e rápida. Nossa equipe oferece suporte gratuito para configurar o Bot Agatha no seu WhatsApp Business. O processo leva cerca de 15 minutos e inclui tutoriais em vídeo para guiá-lo."
    },
    {
      question: "Quais são as vantagens de usar chatbots no atendimento?",
      answer: "Os chatbots oferecem atendimento 24/7, respostas instantâneas, automação de tarefas repetitivas e coleta de dados valiosos. Eles melhoram a eficiência do atendimento e a satisfação do cliente."
    },
    {
      question: "O Bot Agatha é personalizável para meu negócio?",
      answer: "Sim, o Bot Agatha é altamente personalizável. Você pode criar fluxos de conversa específicos, definir respostas automáticas e integrar com seus sistemas existentes para atender às necessidades únicas do seu negócio."
    },
    {
      question: "Como a análise de dados melhora meu atendimento ao cliente?",
      answer: "Nossa análise de dados fornece insights sobre padrões de conversa, tópicos frequentes e satisfação do cliente. Isso permite que você tome decisões informadas para melhorar seu atendimento e estratégias de negócio."
    },
    {
      question: "Existe um limite de mensagens ou conversas?",
      answer: "Os limites variam de acordo com o plano escolhido. Nossos planos são flexíveis e escaláveis, permitindo que você escolha a opção que melhor atende ao volume de interações do seu negócio."
    },
    {
      question: "Como garantem a segurança e privacidade dos dados?",
      answer: "Levamos a segurança muito a sério. Utilizamos criptografia de ponta a ponta, seguimos as melhores práticas de segurança da indústria e estamos em conformidade com as regulamentações de proteção de dados, como a LGPD."
    }
  ];

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={8} as={MotionBox} 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2" size="2xl" textAlign="center" color="text.dark">
          Perguntas Frequentes ❓
        </Heading>
        <Text fontSize="xl" color="gray.600" maxW="2xl">
          Encontre respostas para as dúvidas mais comuns sobre nossos serviços. Se você não encontrar o que procura, não hesite em nos contatar.
        </Text>
        <Accordion allowMultiple width="100%" as={MotionBox}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {faqItems.map((item, index) => (
            <MotionBox key={index} variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}>
              <FAQItem question={item.question} answer={item.answer} />
            </MotionBox>
          ))}
        </Accordion>
      </VStack>
    </Container>
  );
};

export default FAQ;