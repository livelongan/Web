import { getColorStore } from '../common'

export const VioletColor = `
    --scroll-color: hsl(0, 0%, 100%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2); 
    --kendo-color-border: hsl(264, 28%, 48%,0.2);

    --color-theme: hsl(262, 24%, 85%);
    --color-theme-border: hsl(264, 28%, 48%,0.2);
    --color-theme-hover: hsl(264, 28%, 48%);
    --color-theme-on-surface: hsl(264, 28%, 48%);
    --kendo-color-border-alt: hsl(264, 28%, 48%,0.4);

    --kendo-color-surface-alt: hsl(0, 0%,96%, 1); 
    --kendo-color-surface: hsl(0, 0%, 96%, 1);
    --kendo-color-subtle: hsl(228, 2%, 56%);
    --kendo-color-on-app-surface: hsl(264, 28%, 25%, 1);

     --kendo-color-base-subtle: hsl(0, 0%, 96%, 1);
    --kendo-color-base-subtle-hover: hsl(0, 0%, 94%, 1);
    --kendo-color-base-subtle-active: hsl(0, 0%, 92%, 1);
    --kendo-color-base: hsl(0, 0%, 95%, 1);
    --kendo-color-on-base: hsl(230, 70%, 17%, 1);
    --kendo-color-base-hover: hsl(0, 0%, 90%, 1);
    --kendo-color-base-active: hsl(0, 0%, 70%, 1);
    --kendo-color-base-emphasis: hsl(0, 0%, 60%, 1);
    --kendo-color-base-on-subtle: hsl(230, 70%, 16%, 1);

    --kendo-color-primary-subtle: hsl(101, 100%, 30%);
    --kendo-color-primary-subtle-hover: hsl(101, 100%, 30%);
    --kendo-color-primary-subtle-active: hsl(101, 100%, 30%);
    --kendo-color-primary: hsl(101, 100%, 30%);
    --kendo-color-primary-hover: hsl(101, 100%, 36%);
    --kendo-color-primary-active: hsl(101, 100%, 30%);
    --kendo-color-primary-emphasis: hsl(101, 100%, 20%);
    --kendo-color-primary-on-subtle: hsl(101, 100%, 30%);
    --kendo-color-on-primary: hsl(0, 0%, 96%, 1);
    --kendo-color-primary-on-surface: hsl(101, 100%, 30%);

    --kendo-color-info-subtle: hsl(264, 28%, 48%);
    --kendo-color-info-subtle-hover: hsl(264, 28%, 48%);
    --kendo-color-info-subtle-active:hsl(264, 28%, 48%);
    --kendo-color-info: hsl(264, 28%, 48%);
    --kendo-color-info-hover: hsl(264, 28%, 48%);
    --kendo-color-info-active: hhsl(264, 28%, 48%);
    --kendo-color-info-emphasis: hsl(264, 28%, 48%);
    --kendo-color-info-on-subtle: hsl(264, 28%, 48%);
    --kendo-color-on-info: hsl(264, 28%, 48%);
    --kendo-color-info-on-surface: hsl(264, 28%, 48%);
`

export const VioletPalette = getColorStore(VioletColor)
