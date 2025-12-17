import { getColorStore } from '../common'

export const PinkGreyDarkColor = `
    --scroll-color: hsl(0, 0%, 100%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2); 
    --kendo-color-border: hsl(194, 65%, 52%, 0.4);

    --color-theme: hsl(0, 0%, 9%);
    --color-theme-border: hsl(194, 65%, 52%, 0.4);
    --color-theme-hover: hsl(194, 65%, 42%);
    --color-theme-on-surface: hsl(0, 79%, 63%);
    --kendo-color-border-alt: hsl(24, 92%, 74%, 1);

    --kendo-color-surface-alt: hsl(0, 0%, 9%);
    --kendo-color-surface: hsl(0, 0%, 9%);
    --kendo-color-subtle: hsl(228, 2%, 56%);
    --kendo-color-on-app-surface: hsl(0, 0%, 60%, 1);

    --kendo-color-base-subtle: hsl(217, 7%, 21%, 1);
    --kendo-color-base-subtle-hover: hsl(217, 7%, 40%, 1);
    --kendo-color-base-subtle-active: hsl(0, 0%, 84%, 1);
    --kendo-color-base: hsl(217, 7%, 21%, 1);
    --kendo-color-on-base: hsl(0, 0%, 80%, 1);
    --kendo-color-base-on-surface: hsl(0, 0%, 64%, 1);
    --kendo-color-base-hover: hsl(0, 0%, 20%, 1);
    --kendo-color-base-active: hsl(218, 14%, 20%, 1);
    --kendo-color-base-emphasis: hsl(0, 0%, 76%, 1);
    --kendo-color-base-on-subtle: hsl(0, 0%, 24%, 1);

    --kendo-color-primary-subtle: hsl(194, 65%, 42%);
    --kendo-color-primary-subtle-hover: hsl(194, 65%, 42%);
    --kendo-color-primary-subtle-active: hsl(194, 65%, 42%);
    --kendo-color-primary: hsl(194, 65%, 42%);
    --kendo-color-primary-hover: hsl(194, 65%, 42%);
    --kendo-color-primary-active: hsl(194, 65%, 42%);
    --kendo-color-primary-emphasis: hsl(194, 65%, 42%);
    --kendo-color-primary-on-subtle: hsl(194, 65%, 42%);
    --kendo-color-on-primary: hsl(206, 27%, 17%, 1);
    --kendo-color-primary-on-surface: hsl(194, 65%, 42%);
  
    --kendo-color-info-subtle: hsl(194, 65%, 42%);
    --kendo-color-info-subtle-hover: hsl(194, 65%, 42%);
    --kendo-color-info-subtle-active: hsl(194, 65%, 42%);
    --kendo-color-info: hsl(194, 65%, 42%);
    --kendo-color-info-hover: hsl(194, 65%, 42%);
    --kendo-color-info-active: hsl(194, 65%, 42%);
    --kendo-color-info-emphasis: hsl(194, 65%, 42%);
    --kendo-color-info-on-subtle: hsl(194, 65%, 42%);
    --kendo-color-on-info: hsl(206, 27%, 17%, 1);
    --kendo-color-info-on-surface: hsl(194, 65%, 42%);
`

export const PinkGreyDarkPalette = getColorStore(PinkGreyDarkColor, 'dark')
