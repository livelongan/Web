import { getColorStore } from '../common'

export const NavyMagentaDarkColor = `
    --scroll-color: hsl(0, 0%, 100%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2); 
    --kendo-color-border: hsl(0, 0%, 80%, 0.2);

    --color-theme: hsl(221, 88%, 15%, 1);
    --color-theme-border: hsl(221, 88%, 15%, 1);
    --color-theme-hover: hsl(0, 0%, 60%);
    --color-theme-on-surface: hsl(344, 10%, 85%, 1);
    --kendo-color-border-alt: hsl(344, 97%, 59%);

    --kendo-color-surface-alt: hsl(0, 0%, 20%, 1);
    --kendo-color-surface: hsl(0, 0%, 16%, 1);
    --kendo-color-subtle: hsl(228, 2%, 56%);
    --kendo-color-on-app-surface: hsl(0, 0%, 80%, 1);
    
    --kendo-color-base-subtle: hsl(217, 7%, 21%, 1);
    --kendo-color-base-subtle-hover: hsl(217, 7%, 40%, 1);
    --kendo-color-base-subtle-active: hsl(0, 0%, 84%, 1);
    --kendo-color-base: hsl(217, 7%, 21%, 1);
    --kendo-color-on-base: hsl(0, 0%, 80%, 1);
    --kendo-color-base-on-surface: hsl(0, 0%, 64%, 1);
    --kendo-color-base-hover: hsl(0, 0%, 29%, 1);
    --kendo-color-base-active: hsl(218, 14%, 20%, 1);
    --kendo-color-base-emphasis: hsl(0, 0%, 76%, 1);
    --kendo-color-base-on-subtle: hsl(0, 0%, 24%, 1);

    --kendo-color-primary-subtle: hsl(344, 97%, 92%);
    --kendo-color-primary-subtle-hover: hsl(344, 97%, 94%);
    --kendo-color-primary-subtle-active: hsl(344, 97%, 88%);
    --kendo-color-primary: hsl(344, 97%, 59%);
    --kendo-color-primary-hover: hsl(344, 97%, 65%);
    --kendo-color-primary-active: hsl(344, 97%, 55%);
    --kendo-color-primary-emphasis: hsl(344, 97%,50%);
    --kendo-color-primary-on-subtle: hsl(344, 97%, 45%);
    --kendo-color-on-primary: hsl(221, 88%, 8%, 1);
    --kendo-color-primary-on-surface: hsl(344, 97%, 60%);

    --kendo-color-info-subtle: hsl(221, 88%, 94%, 1);
    --kendo-color-info-subtle-hover: hsl(221, 88%, 92%, 1);
    --kendo-color-info-subtle-active: hsl(221, 88%, 88%, 1);
    --kendo-color-info: hsl(221, 88%, 15%, 1);
    --kendo-color-info-hover: hsl(221, 88%, 30%, 1);
    --kendo-color-info-active: hsl(221, 88%, 28%, 1);
    --kendo-color-info-emphasis: hsl(221, 88%, 25%, 1);
    --kendo-color-info-on-subtle: hsl(221, 88%, 15%, 1);
    --kendo-color-on-info: hsl(344, 97%, 98%);
    --kendo-color-info-on-surface: hsl(221, 88%, 15%, 1);
`

export const NavyMagentaDarkPalette = getColorStore(NavyMagentaDarkColor, 'dark')
