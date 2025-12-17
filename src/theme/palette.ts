import { red } from '@mui/material/colors'

export const PALETTE = {
  primary: {
    main: '#eb0249', // 主要颜色
    // light: '#3d57d8', // 浅色版本 (悬停、背景)
    // dark: '#3d57d8', // 深色版本 (按下、强调)
    contrastText: '#ffffff', // 对比文字颜色
  },
  secondary: {
    main: '#000e33',
    // light: '#4db6ac',
    // dark: '#00695c',
    contrastText: '#ffffff',
  },
  tertiary: {
    main: '#ff4081',
    // light: '#ff79b0',
    // dark: '#c60055',
    contrastText: '#ffffff',
  },
  error: {
    main: red.A400, // 错误颜色 (#ff1744)
    // light: '#ff5983',
    // dark: '#d50000',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ff9800',
    // light: '#ffb74d',
    // dark: '#f57c00',
    contrastText: '#ffffff',
  },
  info: {
    main: '#2196f3',
    // light: '#64b5f6',
    // dark: '#1976d2',
    contrastText: '#ffffff',
  },
  success: {
    main: '#4caf50',
    // light: '#81c784',
    // dark: '#388e3c',
    contrastText: '#ffffff',
  },
  // 设置全局文本颜色
  text: {
    title: '#1a1a1a',
    primary: '#000921',
    secondary: '#797f77',
    disabled: '#bdc7bd',
  },
  // 背景颜色设置
  background: {
    default: '#ffffff', // 背景色
    paper: '#f8f9fa', // 前景色
  },
  divider: '#d9dfda',
  dividerPrimary: '#eb0249',
  grey: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#000000',
  },
}
