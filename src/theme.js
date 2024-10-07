import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Poppins", sans-serif',
    body: '"Poppins", sans-serif',
  },
  colors: {
    brand: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3',
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: 'md',
        },
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: 'md',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.800',
        color: props.colorMode === 'light' ? 'gray.800' : 'white',
      },
    }),
  },
  semanticTokens: {
    colors: {
      headerBg: { default: 'white', _dark: 'gray.800' },
      headerColor: { default: 'gray.800', _dark: 'white' },
      footerBg: { default: 'gray.100', _dark: 'gray.700' },
      footerColor: { default: 'gray.600', _dark: 'gray.200' },
      cardBg: { default: 'white', _dark: 'gray.700' },
      cardBorder: { default: 'gray.200', _dark: 'gray.600' },
      inputBg: { default: 'white', _dark: 'gray.700' },
      inputBorder: { default: 'gray.300', _dark: 'gray.600' },
    },
  },
});

export default theme;