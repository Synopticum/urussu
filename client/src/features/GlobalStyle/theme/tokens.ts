const tokens = {
  fonts: {
    primary: 'Arial, sans-serif',
    secondary: 'Times New Roman, serif',
  },
  colors: {
    'black-1': '#111',
    'black-2': '#555',
    'black-3': '#999',
    'white-1': '#fff',
    'white-2': '#ddd',
    'white-3': '#aaa',
    'blue-1': '#337ab7',
    'red-1': '#b00',
    'yellow-1': '#fff7da',
  },
  shadows: {
    'shadow-1': '1px 1px 3px rgba(0, 0, 0, 0.5)',
    'shadow-2': '3px 3px 6px rgba(0, 0, 0, 0.3)',
  },
};

export type ColorName = keyof typeof tokens.colors;
export type FontName = keyof typeof tokens.fonts;
export type ShadowName = keyof typeof tokens.shadows;

export type Tokens = typeof tokens;

export default tokens;