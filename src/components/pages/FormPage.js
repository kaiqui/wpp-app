import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Select,
  Checkbox,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Text,
  IconButton,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  UnorderedList,
  ListItem,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react';
import { AddIcon, ChevronRightIcon, ChevronLeftIcon, InfoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    location: '',
    businessHours: {
      monday: { isOpen: true, open: '09:00', close: '18:00' },
      tuesday: { isOpen: true, open: '09:00', close: '18:00' },
      wednesday: { isOpen: true, open: '09:00', close: '18:00' },
      thursday: { isOpen: true, open: '09:00', close: '18:00' },
      friday: { isOpen: true, open: '09:00', close: '18:00' },
      saturday: { isOpen: true, open: '09:00', close: '18:00' },
      sunday: { isOpen: false, open: '09:00', close: '18:00' },
      holiday: { isOpen: false, open: '09:00', close: '18:00' },
    },
    businessDetails: {
      services: [],
      paymentMethods: [],
      averageServiceTime: 30,
      appointmentPolicies: [],
      productsOrServices: [],
    },
    communicationStyle: {
      tone: '',
      languages: [],
    },
    specialInstructions: '',
  });

  const [otherInputs, setOtherInputs] = useState({
    businessType: '',
    services: [],
    paymentMethods: [],
    tone: '',
    languages: [],
    appointmentPolicies: [],
  });

  const toast = useToast();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const cancelRef = React.useRef();

  const [cep, setCep] = useState('');
  const [addressDetails, setAddressDetails] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  });

  const [addressNumber, setAddressNumber] = useState('');
  const [complement, setComplement] = useState('');

  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const totalTabs = 5;

  const [isLoading, setIsLoading] = useState(false);

  // Adicione esta função para atualizar o campo de localização
  const updateLocation = () => {
    const fullAddress = `${addressDetails.logradouro}, ${addressNumber}, ${complement}, ${addressDetails.bairro}, ${addressDetails.localidade} - ${addressDetails.uf}, ${cep}`.trim();
    handleInputChange('location', fullAddress);
  };

  const fetchAddressDetails = async (cep) => {
    if (cep.length !== 8) {
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        setAddressDetails({
          logradouro: response.data.logradouro,
          bairro: response.data.bairro,
          localidade: response.data.localidade,
          uf: response.data.uf,
        });
        updateLocation();
      } else {
        toast({
          title: "CEP não encontrado",
          description: "Por favor, verifique o CEP inserido.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        // Limpar os campos de endereço quando o CEP não for encontrado
        setAddressDetails({
          logradouro: '',
          bairro: '',
          localidade: '',
          uf: '',
        });
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      toast({
        title: "Erro ao buscar CEP",
        description: "Ocorreu um erro ao buscar as informações do CEP.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Limpar os campos de endereço em caso de erro
      setAddressDetails({
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
      });
    }
  };

  const handleCepChange = (e) => {
    const newCep = e.target.value.replace(/\D/g, '');
    setCep(newCep);
    if (newCep.length === 8) {
      fetchAddressDetails(newCep);
    } else {
      // Limpar os campos de endereço quando o CEP for apagado ou inválido
      setAddressDetails({
        logradouro: '',
        bairro: '',
        localidade: '',
        uf: '',
      });
    }
  };

  // Remova o useEffect para o CEP, pois agora estamos usando handleCepChange

  // Adicione useEffect para atualizar a localização quando os detalhes do endereço mudarem
  useEffect(() => {
    updateLocation();
  }, [addressDetails, addressNumber, complement, cep]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleOtherInput = (field, value) => {
    setOtherInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductOrServiceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        productsOrServices: prev.businessDetails.productsOrServices.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        ),
      },
    }));
  };

  const addProductOrService = () => {
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        productsOrServices: [
          ...prev.businessDetails.productsOrServices,
          { name: '', description: '', price: '' }
        ],
      },
    }));
  };

  const removeProductOrService = (index) => {
    setFormData(prev => ({
      ...prev,
      businessDetails: {
        ...prev.businessDetails,
        productsOrServices: prev.businessDetails.productsOrServices.filter((_, i) => i !== index),
      },
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      { name: 'Nome do Negócio', value: formData.businessName },
      { name: 'Tipo de Negócio', value: formData.businessType },
      { name: 'Localização', value: formData.location },
      { name: 'Horário de Funcionamento', value: Object.values(formData.businessHours).some(day => day.isOpen) },
      { name: 'Serviços', value: formData.businessDetails.services.length > 0 },
      { name: 'Métodos de Pagamento', value: formData.businessDetails.paymentMethods.length > 0 },
      { name: 'Tempo Médio de Serviço', value: formData.businessDetails.averageServiceTime > 0 },
      { name: 'Políticas de Agendamento', value: formData.businessDetails.appointmentPolicies.length > 0 },
      { name: 'Produtos ou Serviços', value: formData.businessDetails.productsOrServices.length > 0 },
      { name: 'Tom de Comunicação', value: formData.communicationStyle.tone },
      { name: 'Idiomas', value: formData.communicationStyle.languages.length > 0 },
    ];

    const emptyRequiredFields = requiredFields.filter(field => !field.value);
    setEmptyFields(emptyRequiredFields);

    return emptyRequiredFields.length === 0;
  };

  const handleNextTab = () => {
    if (currentTab < totalTabs - 1) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePrevTab = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsAlertOpen(true);
    } else {
      toast({
        title: "Campos obrigatórios não preenchidos",
        description: "Por favor, preencha todos os campos obrigatórios antes de enviar.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const confirmSubmit = async () => {
    setIsAlertOpen(false);
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:8000/v1/api/businesses', formData);
        console.log(response.data);
        toast({
          title: "Cadastro realizado com sucesso",
          description: "Seus dados foram enviados. Redirecionando para o dashboard...",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate('/dashboard');
        }, 3000);
      } catch (error) {
        console.error('Erro ao enviar dados:', error);
        toast({
          title: "Erro ao enviar dados",
          description: "Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Campos obrigatórios não preenchidos",
        description: "Por favor, preencha todos os campos obrigatórios antes de enviar.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const businessTypes = ['Salão de Beleza', 'Barbearia', 'Spa', 'Clínica de Estética', 'Outro'];
  const services = ['Corte de Cabelo', 'Coloração', 'Manicure', 'Pedicure', 'Depilação', 'Massagem', 'Outro'];
  const paymentMethods = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'PIX', 'Transferência Bancária', 'Outro'];
  const tones = ['Formal', 'Informal', 'Amigável', 'Profissional', 'Outro'];
  const languages = ['Português', 'Inglês', 'Espanhol', 'Francês', 'Outro'];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'holiday'];
  const appointmentPolicies = [
    'Agendamento obrigatório',
    'Aceita walk-ins',
    'Agendamento preferencial',
    'Agendamento online disponível',
    'Outro'
  ];

  return (
    <Box p={8} maxWidth="800px" margin="auto" mt={10}>
      <VStack spacing={8} align="stretch">
        <Heading>Cadastro de Negócio</Heading>
        <form onSubmit={(e) => e.preventDefault()}>
          <Tabs index={currentTab} onChange={setCurrentTab} isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Informações Básicas</Tab>
              <Tab>Horário de Funcionamento</Tab>
              <Tab>Detalhes do Negócio</Tab>
              <Tab>Produtos/Serviços</Tab>
              <Tab>Comunicação</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <FormControl isRequired>
                    <FormLabel>Nome do Negócio</FormLabel>
                    <Input 
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Tipo de Negócio</FormLabel>
                    <Select 
                      placeholder="Selecione o tipo de negócio"
                      value={formData.businessType}
                      onChange={(e) => {
                        handleInputChange('businessType', e.target.value);
                        if (e.target.value === 'Outro') {
                          handleOtherInput('businessType', '');
                        }
                      }}
                    >
                      {businessTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Select>
                    {formData.businessType === 'Outro' && (
                      <Input 
                        mt={2}
                        placeholder="Especifique o tipo de negócio"
                        value={otherInputs.businessType}
                        onChange={(e) => handleOtherInput('businessType', e.target.value)}
                      />
                    )}
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>CEP</FormLabel>
                    <Input 
                      value={cep}
                      onChange={handleCepChange}
                      placeholder="Digite o CEP"
                      maxLength={8}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Endereço</FormLabel>
                    <Flex>
                      <Input 
                        flex="3"
                        value={addressDetails.logradouro}
                        isReadOnly
                        placeholder="Rua/Avenida"
                        mr={2}
                      />
                      <Input 
                        flex="1"
                        value={addressNumber}
                        onChange={(e) => {
                          setAddressNumber(e.target.value);
                          updateLocation(); // Chame updateLocation quando o número for alterado
                        }}
                        placeholder="Número"
                      />
                    </Flex>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Complemento</FormLabel>
                    <Input 
                      value={complement}
                      onChange={(e) => {
                        setComplement(e.target.value);
                        updateLocation(); // Chame updateLocation quando o complemento for alterado
                      }}
                      placeholder="Apartamento, sala, etc. (opcional)"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Bairro</FormLabel>
                    <Input 
                      value={addressDetails.bairro}
                      isReadOnly
                      placeholder="Bairro"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Cidade</FormLabel>
                    <Input 
                      value={addressDetails.localidade}
                      isReadOnly
                      placeholder="Cidade"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Estado</FormLabel>
                    <Input 
                      value={addressDetails.uf}
                      isReadOnly
                      placeholder="Estado"
                    />
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                  {days.map((day) => (
                    <GridItem key={day} colSpan={2}>
                      <FormControl>
                        <Flex alignItems="center">
                          <Checkbox 
                            isChecked={formData.businessHours[day].isOpen}
                            onChange={(e) => handleBusinessHoursChange(day, 'isOpen', e.target.checked)}
                          >
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                          </Checkbox>
                        </Flex>
                        {formData.businessHours[day].isOpen && (
                          <Flex mt={2}>
                            <Input 
                              type="time"
                              value={formData.businessHours[day].open}
                              onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                              mr={2}
                            />
                            <Input 
                              type="time"
                              value={formData.businessHours[day].close}
                              onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                            />
                          </Flex>
                        )}
                      </FormControl>
                    </GridItem>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Serviços Oferecidos</FormLabel>
                    {services.map((service) => (
                      <Checkbox 
                        key={service} 
                        isChecked={formData.businessDetails.services.includes(service)}
                        onChange={(e) => {
                          const updatedServices = e.target.checked
                            ? [...formData.businessDetails.services, service]
                            : formData.businessDetails.services.filter(s => s !== service);
                          handleNestedInputChange('businessDetails', 'services', updatedServices);
                          if (service === 'Outro' && e.target.checked) {
                            handleOtherInput('services', [...otherInputs.services, '']);
                          }
                        }}
                      >
                        {service}
                      </Checkbox>
                    ))}
                    {formData.businessDetails.services.includes('Outro') && (
                      otherInputs.services.map((otherService, index) => (
                        <Flex key={index} mt={2}>
                          <Input 
                            placeholder="Especifique o serviço"
                            value={otherService}
                            onChange={(e) => {
                              const updatedOtherServices = [...otherInputs.services];
                              updatedOtherServices[index] = e.target.value;
                              handleOtherInput('services', updatedOtherServices);
                            }}
                          />
                          <IconButton
                            ml={2}
                            icon={<AddIcon />}
                            onClick={() => handleOtherInput('services', [...otherInputs.services, ''])}
                          />
                        </Flex>
                      ))
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Métodos de Pagamento</FormLabel>
                    {paymentMethods.map((method) => (
                      <Checkbox 
                        key={method} 
                        isChecked={formData.businessDetails.paymentMethods.includes(method)}
                        onChange={(e) => {
                          const updatedMethods = e.target.checked
                            ? [...formData.businessDetails.paymentMethods, method]
                            : formData.businessDetails.paymentMethods.filter(m => m !== method);
                          handleNestedInputChange('businessDetails', 'paymentMethods', updatedMethods);
                          if (method === 'Outro' && e.target.checked) {
                            handleOtherInput('paymentMethods', [...otherInputs.paymentMethods, '']);
                          }
                        }}
                      >
                        {method}
                      </Checkbox>
                    ))}
                    {formData.businessDetails.paymentMethods.includes('Outro') && (
                      otherInputs.paymentMethods.map((otherMethod, index) => (
                        <Flex key={index} mt={2}>
                          <Input 
                            placeholder="Especifique o método de pagamento"
                            value={otherMethod}
                            onChange={(e) => {
                              const updatedOtherMethods = [...otherInputs.paymentMethods];
                              updatedOtherMethods[index] = e.target.value;
                              handleOtherInput('paymentMethods', updatedOtherMethods);
                            }}
                          />
                          <IconButton
                            ml={2}
                            icon={<AddIcon />}
                            onClick={() => handleOtherInput('paymentMethods', [...otherInputs.paymentMethods, ''])}
                          />
                        </Flex>
                      ))
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Tempo Médio de Serviço (minutos)</FormLabel>
                    <NumberInput 
                      min={0} 
                      value={formData.businessDetails.averageServiceTime}
                      onChange={(value) => handleNestedInputChange('businessDetails', 'averageServiceTime', value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Política de Agendamento</FormLabel>
                    {appointmentPolicies.map((policy) => (
                      <Checkbox 
                        key={policy}
                        isChecked={formData.businessDetails.appointmentPolicies.includes(policy)}
                        onChange={(e) => {
                          const updatedPolicies = e.target.checked
                            ? [...formData.businessDetails.appointmentPolicies, policy]
                            : formData.businessDetails.appointmentPolicies.filter(p => p !== policy);
                          handleNestedInputChange('businessDetails', 'appointmentPolicies', updatedPolicies);
                          if (policy === 'Outro' && e.target.checked) {
                            handleOtherInput('appointmentPolicies', [...otherInputs.appointmentPolicies, '']);
                          }
                        }}
                      >
                        {policy}
                      </Checkbox>
                    ))}
                    {formData.businessDetails.appointmentPolicies.includes('Outro') && (
                      otherInputs.appointmentPolicies.map((otherPolicy, index) => (
                        <Flex key={index} mt={2}>
                          <Input 
                            placeholder="Especifique a política de agendamento"
                            value={otherPolicy}
                            onChange={(e) => {
                              const updatedOtherPolicies = [...otherInputs.appointmentPolicies];
                              updatedOtherPolicies[index] = e.target.value;
                              handleOtherInput('appointmentPolicies', updatedOtherPolicies);
                            }}
                          />
                          <IconButton
                            ml={2}
                            icon={<AddIcon />}
                            onClick={() => handleOtherInput('appointmentPolicies', [...otherInputs.appointmentPolicies, ''])}
                          />
                        </Flex>
                      ))
                    )}
                  </FormControl>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Heading size="md">Produtos ou Serviços</Heading>
                  {formData.businessDetails.productsOrServices.map((item, index) => (
                    <Box key={index} p={4} borderWidth={1} borderRadius="md">
                      <FormControl isRequired>
                        <FormLabel>Nome</FormLabel>
                        <Input 
                          value={item.name}
                          onChange={(e) => handleProductOrServiceChange(index, 'name', e.target.value)}
                        />
                      </FormControl>
                      <FormControl mt={2}>
                        <FormLabel>Descrição</FormLabel>
                        <Textarea 
                          value={item.description}
                          onChange={(e) => handleProductOrServiceChange(index, 'description', e.target.value)}
                        />
                      </FormControl>
                      <FormControl mt={2}>
                        <FormLabel>Preço</FormLabel>
                        <NumberInput 
                          value={item.price}
                          onChange={(value) => handleProductOrServiceChange(index, 'price', value)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                      <Button mt={2} colorScheme="red" onClick={() => removeProductOrService(index)}>
                        Remover
                      </Button>
                    </Box>
                  ))}
                  <Button onClick={addProductOrService} colorScheme="green">
                    Adicionar Produto/Serviço
                  </Button>
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Tom de Comunicação</FormLabel>
                    <Select 
                      placeholder="Selecione o tom de comunicação"
                      value={formData.communicationStyle.tone}
                      onChange={(e) => {
                        handleNestedInputChange('communicationStyle', 'tone', e.target.value);
                        if (e.target.value === 'Outro') {
                          handleOtherInput('tone', '');
                        }
                      }}
                    >
                      {tones.map((tone) => (
                        <option key={tone} value={tone}>{tone}</option>
                      ))}
                    </Select>
                    {formData.communicationStyle.tone === 'Outro' && (
                      <Input 
                        mt={2}
                        placeholder="Especifique o tom de comunicação"
                        value={otherInputs.tone}
                        onChange={(e) => handleOtherInput('tone', e.target.value)}
                      />
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Idiomas</FormLabel>
                    {languages.map((language) => (
                      <Checkbox 
                        key={language} 
                        isChecked={formData.communicationStyle.languages.includes(language)}
                        onChange={(e) => {
                          const updatedLanguages = e.target.checked
                            ? [...formData.communicationStyle.languages, language]
                            : formData.communicationStyle.languages.filter(l => l !== language);
                          handleNestedInputChange('communicationStyle', 'languages', updatedLanguages);
                          if (language === 'Outro' && e.target.checked) {
                            handleOtherInput('languages', [...otherInputs.languages, '']);
                          }
                        }}
                      >
                        {language}
                      </Checkbox>
                    ))}
                    {formData.communicationStyle.languages.includes('Outro') && (
                      otherInputs.languages.map((otherLanguage, index) => (
                        <Flex key={index} mt={2}>
                          <Input 
                            placeholder="Especifique o idioma"
                            value={otherLanguage}
                            onChange={(e) => {
                              const updatedOtherLanguages = [...otherInputs.languages];
                              updatedOtherLanguages[index] = e.target.value;
                              handleOtherInput('languages', updatedOtherLanguages);
                            }}
                          />
                          <IconButton
                            ml={2}
                            icon={<AddIcon />}
                            onClick={() => handleOtherInput('languages', [...otherInputs.languages, ''])}
                          />
                        </Flex>
                      ))
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Instruções Especiais</FormLabel>
                    <Textarea 
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                      placeholder="Adicione quaisquer instruções especiais ou informações adicionais aqui"
                    />
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
          
          <Flex justifyContent="space-between" mt={6}>
            <Button
              leftIcon={<ChevronLeftIcon />}
              onClick={handlePrevTab}
              isDisabled={currentTab === 0}
            >
              Anterior
            </Button>
            {currentTab < totalTabs - 1 ? (
              <Button
                rightIcon={<ChevronRightIcon />}
                onClick={handleNextTab}
                colorScheme="blue"
              >
                Próximo
              </Button>
            ) : (
              <Button onClick={handleSubmit} colorScheme="green">
                Enviar Cadastro
              </Button>
            )}
          </Flex>
        </form>
      </VStack>

      <Box mt={4} p={4} bg="blue.50" borderRadius="md" boxShadow="md">
        <Flex alignItems="center">
          <InfoIcon boxSize={6} color="blue.500" mr={3} />
          <VStack align="start" spacing={2}>
            <Text fontWeight="bold" fontSize="lg">Dica para um cadastro rápido:</Text>
            <Text>
              1. Navegue pelas abas usando os botões "Anterior" e "Próximo".
            </Text>
            <Text>
              2. Preencha todas as informações em cada aba antes de prosseguir.
            </Text>
            <Text>
              3. Revise seus dados na última aba antes de enviar o cadastro.
            </Text>
            <Text fontStyle="italic" color="blue.600">
              Estamos aqui para ajudar! Se tiver dúvidas, não hesite em nos contatar.
            </Text>
          </VStack>
        </Flex>
      </Box>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar envio
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja enviar o cadastro? Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                Cancelar
              </Button>
              <Button colorScheme="blue" onClick={confirmSubmit} ml={3}>
                Confirmar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {emptyFields.length > 0 && (
        <Box mt={4} p={4} bg="orange.100" borderRadius="md">
          <Text fontWeight="bold">Por favor, preencha os seguintes campos obrigatórios:</Text>
          <UnorderedList>
            {emptyFields.map((field, index) => (
              <ListItem key={index}>{field.name}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}

      <Modal isOpen={isLoading} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalBody display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={4}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Text color="white" fontWeight="bold">
                Enviando dados...
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default FormPage;