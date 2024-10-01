import React from 'react';
import { VStack, Container, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import Features from '../sections/Features';
import Benefits from '../sections/Benefits';
import HowItWorks from '../sections/HowItWorks';
import Testimonials from '../sections/Testimonials';
import Pricing from '../sections/Pricing';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';

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
        <Pricing />
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