import React, { useState, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Icon,
  HStack,
  Text,
  IconButton,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBuilding, FaLanguage, FaInfoCircle, FaPlus, FaTrash } from 'react-icons/fa';

const MotionBox = motion(Box);

const FormPage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    location: '',
    businessHours: {
      monday: { isOpen: false, open: '09:00', close: '18:00' },
      tuesday: { isOpen: false, open: '09:00', close: '18:00' },
      wednesday: { isOpen: false, open: '09:00', close: '18:00' },
      thursday: { isOpen: false, open: '09:00', close: '18:00' },
      friday: { isOpen: false, open: '09:00', close: '18:00' },
      saturday: { isOpen: false, open: '09:00', close: '18:00' },
      sunday: { isOpen: false, open: '09:00', close: '18:00' },
      holiday: { isOpen: false, open: '09:00', close: '18:00' },
    },
    businessDetails: {
      services: [],
      specialties: [],
      staff: [],
      acceptedInsurances: [],
      paymentMethods: [],
      averageServiceTime: null,
      appointmentPolicy: '',
      additionalDetails: {},
      productsOrServices: [],
    },
    communicationStyle: {
      tone: '',
      languages: [],
    },
    specialInstructions: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Estilos para inputs e selects
  const inputStyles = {
    bg: "white",
    border: "1px solid",
    borderColor: "gray.300",
    _hover: {
      borderColor: "gray.400",
    },
    _focus: {
      borderColor: "blue.500",
      boxShadow: "0 0 0 1px blue.500",
    },
  };

  // Adicione este estilo para os checkboxes
  const checkboxStyles = {
    bg: "white",
    borderColor: "gray.300",
    _checked: {
      bg: "blue.500",
      borderColor: "blue.500",
    },
  };

  // Adicione este estilo para os radio buttons
  const radioStyles = {
    bg: "white",
    borderColor: "gray.300",
    _checked: {
      bg: "blue.500",
      borderColor: "blue.500",
    },
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: { ...prev.businessHours[day], [field]: value }
      }
    }));
  };

  const handleBusinessDetailsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      businessDetails: { ...prev.businessDetails, [field]: value }
    }));
  };

  const handleCommunicationStyleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      communicationStyle: { ...prev.communicationStyle, [field]: value }
    }));
  };

  const addProductOrService = () => {
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        productsOrServices: [
          ...prev.businessDetails.productsOrServices,
          { name: '', description: '', price: null }
        ]
      }
    }));
  };

  const updateProductOrService = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        productsOrServices: prev.businessDetails.productsOrServices.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const removeProductOrService = (index) => {
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        productsOrServices: prev.businessDetails.productsOrServices.filter((_, i) => i !== index)
      }
    }));
  };

  

  const sendDataToAPI = async () => {
    try {
      const response = await axios.post('http://localhost:8000/v1/api/businesses', formData);
      console.log('Resposta da API:', response.data);
      // Adicione aqui a lógica para lidar com a resposta bem-sucedida
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      // Adicione aqui a lógica para lidar com erros
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataToAPI();
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const isCurrentStepValid = useCallback(() => {
    // Implemente a lógica de validação para cada etapa
    return true;
  }, []);

  

  const renderBusinessInfoForm = () => (
    <FormSection title="1. Dados Gerais do Negócio" icon={FaBuilding}>
      <FormControl isRequired>
        <FormLabel>Nome do Negócio</FormLabel>
        <Input {...inputStyles} 
          placeholder="Ex.: Pizzaria Rápida, Consultório Dr. Saúde" 
          value={formData.businessName}
          onChange={(e) => handleInputChange('businessName', e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Tipo de Negócio</FormLabel>
        <Select {...inputStyles}
          placeholder="Selecione o tipo de negócio"
          value={formData.businessType}
          onChange={(e) => handleInputChange('businessType', e.target.value)}
        >
          <option value="restaurante">Restaurante</option>
          <option value="consultorio">Consultório</option>
          <option value="clinica">Clínica</option>
          <option value="academia">Academia</option>
          <option value="estetica">Estética</option>
          <option value="outro">Outro</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Localização</FormLabel>
        <Input {...inputStyles} 
          placeholder="Ex.: Rua X, nº Y, Bairro Z" 
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <Accordion allowToggle defaultIndex={[0]}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <FormLabel mb="0">Horários de Funcionamento</FormLabel>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {Object.entries(formData.businessHours).map(([day, hours]) => (
                <HStack key={day} spacing={4} mb={2}>
                  <Checkbox
                    {...checkboxStyles}
                    isChecked={hours.isOpen}
                    onChange={(e) => handleBusinessHoursChange(day, 'isOpen', e.target.checked)}
                  >
                    {day === 'holiday' ? 'Feriados' : day.charAt(0).toUpperCase() + day.slice(1)}
                  </Checkbox>
                  {hours.isOpen && (
                    <>
                      <Input {...inputStyles}
                        type="time"
                        value={hours.open}
                        onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                        width="auto"
                        isRequired
                      />
                      <Text  color="gray.600">até</Text>
                      <Input {...inputStyles}
                        type="time"
                        value={hours.close}
                        onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                        width="auto"
                        isRequired
                      />
                    </>
                  )}
                </HStack>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </FormControl>
    </FormSection>
  );

  const renderBusinessDetailsForm = () => (
    <FormSection title="2. Detalhes do Negócio" icon={FaInfoCircle}>
      <FormControl>
        <FormLabel>Serviços Oferecidos</FormLabel>
        <Input {...inputStyles} 
          placeholder="Digite os serviços separados por vírgula"
          onChange={(e) => handleBusinessDetailsChange('services', e.target.value.split(',').map(s => s.trim()))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Especialidades</FormLabel>
        <Input {...inputStyles} 
          placeholder="Digite as especialidades separadas por vírgula"
          onChange={(e) => handleBusinessDetailsChange('specialties', e.target.value.split(',').map(s => s.trim()))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Equipe</FormLabel>
        <Input {...inputStyles} 
          placeholder="Digite os nomes dos membros da equipe separados por vírgula"
          onChange={(e) => handleBusinessDetailsChange('staff', e.target.value.split(',').map(s => s.trim()))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Convênios Aceitos</FormLabel>
        <Input {...inputStyles} 
          placeholder="Digite os convênios aceitos separados por vírgula"
          onChange={(e) => handleBusinessDetailsChange('acceptedInsurances', e.target.value.split(',').map(s => s.trim()))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Métodos de Pagamento</FormLabel>
        <Input {...inputStyles} 
          placeholder="Digite os métodos de pagamento separados por vírgula"
          onChange={(e) => handleBusinessDetailsChange('paymentMethods', e.target.value.split(',').map(s => s.trim()))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Tempo Médio de Atendimento (em minutos)</FormLabel>
        <Input {...inputStyles} 
          type="number"
          onChange={(e) => handleBusinessDetailsChange('averageServiceTime', parseInt(e.target.value))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Política de Agendamento</FormLabel>
        <Textarea {...inputStyles} 
          placeholder="Descreva a política de agendamento"
          onChange={(e) => handleBusinessDetailsChange('appointmentPolicy', e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Produtos ou Serviços</FormLabel>
        {formData.businessDetails.productsOrServices.map((item, index) => (
          <HStack key={index} spacing={4} mb={2}>
            <Input {...inputStyles}
              placeholder="Nome"
              value={item.name}
              onChange={(e) => updateProductOrService(index, 'name', e.target.value)}
            />
            <Input {...inputStyles}
              placeholder="Descrição"
              value={item.description}
              onChange={(e) => updateProductOrService(index, 'description', e.target.value)}
            />
            <Input {...inputStyles}
              placeholder="Preço"
              type="number"
              value={item.price}
              onChange={(e) => updateProductOrService(index, 'price', parseFloat(e.target.value))}
            />
            <IconButton
              icon={<FaTrash />}
              onClick={() => removeProductOrService(index)}
              size="sm"
              colorScheme="red"
            />
          </HStack>
        ))}
        <Button
          leftIcon={<FaPlus />}
          onClick={addProductOrService}
          size="sm"
          colorScheme="blue"
          mt={2}
        >
          Adicionar Produto/Serviço
        </Button>
      </FormControl>
    </FormSection>
  );

  const renderCommunicationStyleForm = () => (
    <FormSection title="3. Estilo de Comunicação" icon={FaLanguage}>
      <FormControl isRequired>
        <FormLabel>Tom de Comunicação</FormLabel>
        <RadioGroup onChange={(value) => handleCommunicationStyleChange('tone', value)} value={formData.communicationStyle.tone}>
          <Stack direction="row">
            <Radio {...radioStyles} value="formal">Formal</Radio>
            <Radio {...radioStyles} value="informal">Informal</Radio>
            <Radio {...radioStyles} value="profissional">Profissional</Radio>
            <Radio {...radioStyles} value="amigavel">Amigável</Radio>
            <Radio {...radioStyles} value="humoristico">Humorístico</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Idiomas de Atendimento</FormLabel>
        <Stack direction="column" spacing={2}>
          {['Português', 'Inglês', 'Espanhol'].map((lang) => (
            <Checkbox 
              {...checkboxStyles}
              key={lang}
              onChange={(e) => {
                const updatedLanguages = e.target.checked
                  ? [...formData.communicationStyle.languages, lang]
                  : formData.communicationStyle.languages.filter(l => l !== lang);
                handleCommunicationStyleChange('languages', updatedLanguages);
              }}
            >
              {lang}
            </Checkbox>
          ))}
          <Input {...inputStyles}
            placeholder="Outros idiomas (separados por vírgula)"
            onChange={(e) => {
              const otherLanguages = e.target.value.split(',').map(l => l.trim());
              const updatedLanguages = [...formData.communicationStyle.languages.filter(l => ['Português', 'Inglês', 'Espanhol'].includes(l)), ...otherLanguages];
              handleCommunicationStyleChange('languages', updatedLanguages);
            }}
          />
        </Stack>
      </FormControl>
    </FormSection>
  );

  const renderSpecialInstructionsForm = () => (
    <FormSection title="4. Instruções Especiais" icon={FaInfoCircle}>
      <FormControl>
        <FormLabel>Instruções Especiais (opcional)</FormLabel>
        <Textarea {...inputStyles} 
          placeholder="Ex.: Em caso de pedidos com mais de 5 itens, avisar que o tempo de espera pode ser maior." 
          value={formData.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
        />
      </FormControl>
    </FormSection>
  );

  return (
    <Box
      bg="brand.500"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage="url('/images/banner-wpp.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        filter="brightness(0.7)"
        zIndex={0}
      />
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Box
          bg="gray.50"
          borderRadius="xl"
          p={8}
          boxShadow="xl"
          color="gray.800"
        >
          <Heading as="h1" size="xl" marginBottom={6} textAlign="center" color="brand.500">
            Configuração de Negócio para LLM
          </Heading>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Progress
              value={(currentStep / totalSteps) * 100}
              mb={8}
              borderRadius="full"
              colorScheme="blue"
            />
            <form onSubmit={handleSubmit}>
              <VStack spacing={8} align="stretch">
                {currentStep === 1 && renderBusinessInfoForm()}
                {currentStep === 2 && renderBusinessDetailsForm()}
                {currentStep === 3 && renderCommunicationStyleForm()}
                {currentStep === 4 && renderSpecialInstructionsForm()}
                <HStack justifyContent="space-between">
                  {currentStep > 1 && (
                    <Button onClick={prevStep} variant="outline" colorScheme="blue">
                      Anterior
                    </Button>
                  )}
                  {currentStep < totalSteps ? (
                    <Button 
                      onClick={nextStep} 
                      isDisabled={!isCurrentStepValid()}
                      colorScheme="blue"
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      colorScheme="blue" 
                      size="lg"
                      isDisabled={!isCurrentStepValid()}
                    >
                      Enviar
                    </Button>
                  )}
                </HStack>
              </VStack>
            </form>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
};

const FormSection = React.memo(({ title, icon, children }) => {
  return (
    <Box color="gray.800">
      <Heading as="h2" size="lg" marginBottom={6} color="gray.800" display="flex" alignItems="center">
        <Icon as={icon} mr={2} color="blue.500" />
        {title}
      </Heading>
      <VStack spacing={6} align="stretch">
        {children}
      </VStack>
    </Box>
  );
});

export default FormPage;