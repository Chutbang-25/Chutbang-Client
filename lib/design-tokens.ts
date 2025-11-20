/**
 * 디자인 시스템 토큰
 * 색상, 타이포그래피, 간격, 그림자 등의 디자인 토큰을 정의합니다.
 */

export const colors = {
    primary: {
        50: '#edeffb',
        100: '#c8cff1',
        200: '#aeb7eb',
        300: '#8996e2',
        400: '#7282dc',
        500: '#4f63d3',
        600: '#485ac0',
        700: '#384696',
        800: '#2b3674',
        900: '#212a59',
    },
    secondary: {
        50: '#eefbee',
        100: '#c9f1c9',
        200: '#afebaf',
        300: '#8ae28b',
        400: '#73dc75',
        500: '#50d352',
        600: '#49c04b',
        700: '#39963a',
        800: '#2c742d',
        900: '#225922',
    },
    grey: {
        50: '#f2f2f2',
        100: '#d8d8d8',
        200: '#c5c5c5',
        300: '#aaaaaa',
        400: '#999999',
        500: '#808080',
        600: '#747474',
        700: '#5b5b5b',
        800: '#464646',
        900: '#363636',
    },
} as const;

export const typography = {
    fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        mono: ['Pretendard', 'monospace'],
    },
    fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },
} as const;

export const spacing = {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
} as const;

export const borderRadius = {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
} as const;

export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
} as const;

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;
