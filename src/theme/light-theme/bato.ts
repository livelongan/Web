import { getColorStore } from '../common'

export const BatoColor = `
    --scroll-color: hsl(0, 0%, 0%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2);   
    --kendo-color-border: hsl(194, 65%, 22%,0.4);

    --color-theme: hsl(205, 24%, 94%, 1);
    --color-theme-border: hsl(194, 65%, 22%,0.4);
    --color-theme-hover: hsl(194, 65%, 22%);
    --color-theme-on-surface: hsl(335, 82%, 46%);
    --kendo-color-border-alt: hsl(24, 92%, 74%, 1);

    --kendo-color-surface:hsl(0, 0%, 96%, 1);
    --kendo-color-surface-alt: hsl(205, 24%, 94%, 1);
    --kendo-color-subtle: hsl(228, 2%, 46%);
    --kendo-color-on-app-surface: hsl(0, 0%, 30%, 1);
 
    --kendo-color-base-subtle: hsl(0, 0%, 96%, 1);
    --kendo-color-base-subtle-hover: hsl(0, 0%, 94%, 1);
    --kendo-color-base-subtle-active: hsl(0, 0%, 92%, 1);
    --kendo-color-base: hsl(0, 0%, 95%, 1);
    --kendo-color-on-base: hsl(206, 27%, 17%, 1);
    --kendo-color-base-hover: hsl(205, 27%, 88%, 1);
    --kendo-color-base-active: hsl(0, 0%, 70%, 1);
    --kendo-color-base-emphasis: hsl(0, 0%, 60%, 1);
    --kendo-color-base-on-subtle: hsl(206, 27%, 17%, 1);

    --kendo-color-primary-subtle: hsl(194, 65%, 42%);
    --kendo-color-primary-subtle-hover: hsl(194, 65%, 42%);
    --kendo-color-primary-subtle-active: hsl(194, 65%, 42%);
    --kendo-color-primary: hsl(194, 65%, 22%);
    --kendo-color-primary-hover: hsl(194, 65%, 28%);
    --kendo-color-primary-active: hsl(194, 65%, 32%);
    --kendo-color-primary-emphasis: hsl(194, 65%, 12%);
    --kendo-color-primary-on-subtle: hsl(194, 65%, 42%);
    --kendo-color-on-primary: hsl(205, 24%, 94%, 1);
    --kendo-color-primary-on-surface: hsl(194, 65%, 32%);

    --kendo-color-info-subtle: hsl(194, 65%, 42%);
    --kendo-color-info-subtle-hover: hsl(194, 65%, 42%);
    --kendo-color-info-subtle-active: hsl(194, 65%, 42%);
    --kendo-color-info: hsl(194, 65%, 22%);
    --kendo-color-info-hover: hsl(194, 65%, 28%);
    --kendo-color-info-active: hsl(194, 65%, 32%);
    --kendo-color-info-emphasis: hsl(194, 65%, 12%);
    --kendo-color-info-on-subtle: hsl(194, 65%, 42%);
    --kendo-color-on-info: hsl(205, 24%, 94%, 1);
    --kendo-color-info-on-surface: hsl(194, 65%, 32%);
`
export const BatoPalette = getColorStore(BatoColor)
