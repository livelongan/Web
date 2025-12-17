import { getColorStore } from '../common'

export const GoldenOrchidColor = `
    --scroll-color: hsl(0, 0%, 0%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2);   
    --kendo-color-border: hsl(206, 27%, 0%, 0.2);

    --color-theme: hsl(206, 27%, 17%, 1);
    --color-theme-border: hsl(206, 27%, 17%, 1);
    --color-theme-hover: hsl(0, 0%, 90%, 1);
    --color-theme-on-surface: hsl(0, 0%, 95%, 1);
    --kendo-color-border-alt: hsl(24, 92%, 74%, 1);

    --kendo-color-surface:hsl(0, 0%, 96%, 1);
    --kendo-color-surface-alt: hsl(0, 0%, 98%, 1);
    --kendo-color-subtle: hsl(228, 2%, 46%);
    --kendo-color-on-app-surface: hsl(0, 0%, 12%, 1);
 
    --kendo-color-base-subtle: hsl(0, 0%, 96%, 1);
    --kendo-color-base-subtle-hover: hsl(0, 0%, 94%, 1);
    --kendo-color-base-subtle-active: hsl(0, 0%, 92%, 1);
    --kendo-color-base: hsl(0, 0%, 95%, 1);
    --kendo-color-on-base: hsl(206, 27%, 17%, 1);
    --kendo-color-base-hover: hsl(0, 0%, 90%, 1);
    --kendo-color-base-active: hsl(0, 0%, 70%, 1);
    --kendo-color-base-emphasis: hsl(0, 0%, 60%, 1);
    --kendo-color-base-on-subtle: hsl(206, 27%, 17%, 1);

    --kendo-color-primary-subtle: hsl(24, 92%, 96%, 1);
    --kendo-color-primary-subtle-hover: hsl(24, 92%, 94%, 1);
    --kendo-color-primary-subtle-active: hsl(24, 92%, 90%, 1);
    --kendo-color-primary: hsl(24, 92%, 74%, 1);
    --kendo-color-primary-hover: hsl(24, 92%, 40%, 1);
    --kendo-color-primary-active: hsl(24, 92%, 64%, 1);
    --kendo-color-primary-emphasis: hsl(24, 92%, 28%, 1);
    --kendo-color-primary-on-subtle: hsl(24, 92%, 50%, 1);
    --kendo-color-on-primary: hsl(206, 27%, 17%, 1);
    --kendo-color-primary-on-surface: hsl(24, 92%, 46%, 1);

    --kendo-color-info-subtle: hsl(206, 27%, 60%, 1);
    --kendo-color-info-subtle-hover: hsl(206, 27%, 50%, 1);
    --kendo-color-info-subtle-active: hsl(206, 27%, 40%, 1);
    --kendo-color-info: hsl(206, 27%, 17%, 1);
    --kendo-color-info-hover: hsl(206, 27%, 30%, 1);
    --kendo-color-info-active: hsl(206, 27%, 26%, 1);
    --kendo-color-info-emphasis: hsl(206, 27%, 12%, 1);
    --kendo-color-info-on-subtle: hsl(206, 27%, 10%, 1);
    --kendo-color-on-info: hsl(24, 92%, 74%, 1);
    --kendo-color-info-on-surface: hsl(206, 27%, 8%, 1);
`

export const GoldenOrchidPalette = getColorStore(GoldenOrchidColor)
