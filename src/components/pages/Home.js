import React, { useState } from 'react';
import { VStack, Container, Box, Flex, Heading, Switch, Text, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Benefits from '../sections/Benefits';
import HowItWorks from '../sections/HowItWorks';
import Testimonials from '../sections/Testimonials';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';
import PricingCard from '../sections/PricingCard';

const MotionBox = motion(Box);

const RoundedSection = ({ children, bg = "gray.50", id }) => (
  <MotionBox
    id={id}
    bg={bg}
    py={20}
    position="relative"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    _before={{
      content: '""',
      position: "absolute",
      top: "-50px",
      left: 0,
      right: 0,
      height: "50px",
      backgroundColor: bg,
      borderTopLeftRadius: "50%",
      borderTopRightRadius: "50%",
    }}
    _after={{
      content: '""',
      position: "absolute",
      bottom: "-50px",
      left: 0,
      right: 0,
      height: "50px",
      backgroundColor: bg,
      borderBottomLeftRadius: "50%",
      borderBottomRightRadius: "50%",
    }}
  >
    <Container maxW="container.xl" centerContent>
      {children}
    </Container>
  </MotionBox>
);

const Home = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      title: "Basic",
      monthlyPrice: 10,
      annualPrice: 100,
      description: "For small businesses",
      features: [
        "Basic features",
        "Up to 5 users",
        "10GB storage",
        "Email support"
      ],
      buttonText: "Start Basic",
      popularPlan: false
    },
    {
      title: "Pro",
      monthlyPrice: 20,
      annualPrice: 200,
      description: "For growing businesses",
      features: [
        "All Basic features",
        "Up to 20 users",
        "50GB storage",
        "Priority email support",
        "Advanced analytics"
      ],
      buttonText: "Start Pro",
      popularPlan: true
    },
    {
      title: "Enterprise",
      monthlyPrice: 30,
      annualPrice: 300,
      description: "For large organizations",
      features: [
        "All Pro features",
        "Unlimited users",
        "100GB storage",
        "24/7 phone support",
        "Custom integrations",
        "Dedicated account manager"
      ],
      buttonText: "Start Enterprise",
      popularPlan: false
    }
  ];

  return (
    <VStack spacing={0} align="stretch">
      <MotionBox
        id="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
      </MotionBox>
      <RoundedSection id="features" bg="gray.50">
        <Features />
      </RoundedSection>
      <RoundedSection id="benefits" bg="white">
        <Benefits />
      </RoundedSection>
      <RoundedSection id="howItWorks" bg="gray.50">
        <HowItWorks />
      </RoundedSection>
      <RoundedSection id="testimonials" bg="white">
        <Testimonials />
      </RoundedSection>
      <RoundedSection id="pricing" bg="gray.50">
        <Container maxW="container.xl" centerContent>
          <VStack spacing={12} width="100%">
            <VStack spacing={4}>
              <Heading as="h2" size="2xl" textAlign="center">
                Choose the Right Plan for You
              </Heading>
              <Text fontSize="xl" color="gray.600" textAlign="center">
                Select the perfect plan to suit your needs and budget
              </Text>
            </VStack>
            <Flex align="center" justify="center">
              <Text fontWeight="bold">Monthly</Text>
              <Switch 
                mx={4} 
                size="lg"
                isChecked={isAnnual} 
                onChange={() => setIsAnnual(!isAnnual)}
                colorScheme="blue"
              />
              <Text fontWeight="bold">Annual</Text>
              <Text ml={2} fontSize="sm" color="green.500" fontWeight="bold">
                (Save 20%)
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} width="100%">
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  title={plan.title}
                  monthlyPrice={plan.monthlyPrice}
                  annualPrice={plan.annualPrice}
                  description={plan.description}
                  features={plan.features}
                  buttonText={plan.buttonText}
                  popularPlan={plan.popularPlan}
                  isAnnual={isAnnual}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </RoundedSection>
      <RoundedSection id="faq" bg="white">
        <FAQ />
      </RoundedSection>
      <RoundedSection id="contact" bg="gray.50">
        <Contact />
      </RoundedSection>
    </VStack>
  );
};

export default Home;