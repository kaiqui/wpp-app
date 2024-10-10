import React from 'react';
import { Box, VStack, Heading, Text, Button, List, ListItem, Flex } from '@chakra-ui/react';

const PricingCard = ({ title, monthlyPrice, annualPrice, description, features, buttonText, popularPlan, isAnnual }) => {
  const price = isAnnual ? annualPrice : monthlyPrice;

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      p={8}
      bg="white"
      boxShadow={popularPlan ? "xl" : "md"}
      position="relative"
      transform={popularPlan ? { lg: "scale(1.05)" } : "none"}
      zIndex={popularPlan ? 1 : 0}
      width="100%"
      maxWidth="350px"
    >
      {popularPlan && (
        <Box
          position="absolute"
          top="-3"
          right="-3"
          bg="blue.500"
          color="white"
          fontSize="sm"
          fontWeight="bold"
          px={3}
          py={1}
          borderRadius="md"
        >
          Most Popular
        </Box>
      )}
      <VStack spacing={6} align="stretch">
        <VStack align="stretch" spacing={2}>
          <Heading size="lg">{title}</Heading>
          <Text color="gray.500" fontSize="sm">{description}</Text>
        </VStack>
        <VStack align="stretch" spacing={1}>
          <Flex align="baseline">
            <Text fontSize="5xl" fontWeight="bold">${price}</Text>
            <Text fontSize="xl" color="gray.500" ml={2}>{isAnnual ? '/year' : '/month'}</Text>
          </Flex>
          <Text fontSize="sm" color="gray.500">{isAnnual ? 'Billed annually' : 'Billed monthly'}</Text>
        </VStack>
        <Button colorScheme={popularPlan ? "blue" : "gray"} size="lg" w="full">
          {buttonText}
        </Button>
        <List spacing={3}>
          {features.map((feature, index) => (
            <ListItem key={index} display="flex" alignItems="center">
              <Text color="green.500" mr={2} fontWeight="bold">✓</Text>
              <Text>{feature}</Text>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default PricingCard;