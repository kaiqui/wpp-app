import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#E6F0FF',
    100: '#B8D5FF',
    200: '#8ABAFF',
    300: '#5C9FFF',
    400: '#2E84FF',
    500: '#0069FF', // Cor principal
    600: '#0054CC',
    700: '#003F99',
    800: '#002A66',
    900: '#001533',
  },
  accent: {
    50: '#FFF5E6',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // Cor de destaque
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
  },
  background: {
    light: 'rgba(255, 255, 255, 0.9)',
    dark: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    light: '#FFFFFF',
    dark: '#1A202C',
  }
};

const fonts = {
  heading: '"Poppins", sans-serif',
  body: '"Inter", sans-serif',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'full',
    },
    variants: {
      solid: (props) => ({
        bg: `${props.colorScheme}.500`,
        color: 'white',
        _hover: {
          bg: `${props.colorScheme}.600`,
        },
      }),
      outline: (props) => ({
        borderColor: `${props.colorScheme}.500`,
        color: `${props.colorScheme}.500`,
        _hover: {
          bg: `${props.colorScheme}.50`,
        },
      }),
    },
  },
};

const theme = extendTheme({
  colors,
  fonts,
  components,
  styles: {
    global: {
      body: {
        bg: 'background.light',
        color: 'text.dark',
      },
    },
  },
});

export default theme;