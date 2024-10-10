import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
  InputGroup,
  InputRightElement,
  Checkbox,
  Flex,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/v1/api/token', 
        `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.data.access_token) {
        const cookieOptions = {
          secure: true,
          sameSite: 'strict',
          expires: rememberMe ? 30 : 1
        };
        Cookies.set('auth_token', response.data.access_token, cookieOptions);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

        toast({
          title: "Login bem-sucedido",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        navigate('/dashboard');
      }
    } catch (error) {
      let errorMessage = "Ocorreu um erro ao fazer login";
      if (error.response && error.response.data) {
        errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : JSON.stringify(error.response.data);
      }
      toast({
        title: "Erro no login",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      p={8} 
      maxWidth="400px" 
      margin="auto" 
      mt={20} 
      borderWidth={1} 
      borderRadius="lg" 
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing={6} align="stretch">
        <VStack>
          <Icon as={FaLock} w={10} h={10} color="blue.500" />
          <Heading size="xl">Login</Heading>
        </VStack>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu endereço de email"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input 
                type={showPassword ? "text" : "password"}
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                  <Icon as={showPassword ? FaEyeSlash : FaEye} />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Flex justify="space-between" align="center" mt={4}>
            <Checkbox isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
              Lembrar-me
            </Checkbox>
            <Link color="blue.500" href="#" fontSize="sm">
              Esqueceu a senha?
            </Link>
          </Flex>
          <Button 
            type="submit" 
            colorScheme="blue" 
            mt={6} 
            width="full"
            isLoading={isLoading}
            loadingText="Entrando..."
          >
            Entrar
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Não tem uma conta? <Link color="blue.500" href="#">Cadastre-se</Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default LoginPage;