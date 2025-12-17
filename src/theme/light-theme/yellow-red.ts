import { getColorStore } from '../common'

export const YellowRedColor = `
    --scroll-color: hsl(0, 0%, 0%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2);   
    --kendo-color-border: hsl(230, 70%, 0%, 0.2);

    --color-theme: hsl(230, 70%, 30%, 1);
    --color-theme-border: hsl(230, 70%, 30%, 1);
    --color-theme-hover: hsl(206, 10%, 90%, 1);
    --color-theme-on-surface: hsl(0, 0%, 95%, 1);
    --kendo-color-border-alt: hsl(49, 98%, 49%, 1);

    --kendo-color-surface:hsl(0, 0%, 96%, 1);
    --kendo-color-surface-alt: hsl(0, 0%, 98%, 1);
    --kendo-color-subtle: hsl(228, 2%, 46%);
    --kendo-color-on-app-surface: hsl(230, 70%, 20%, 1);
 
    --kendo-color-base-subtle: hsl(0, 0%, 96%, 1);
    --kendo-color-base-subtle-hover: hsl(0, 0%, 94%, 1);
    --kendo-color-base-subtle-active: hsl(0, 0%, 92%, 1);
    --kendo-color-base: hsl(0, 0%, 95%, 1);
    --kendo-color-on-base: hsl(230, 70%, 17%, 1);
    --kendo-color-base-hover: hsl(0, 0%, 90%, 1);
    --kendo-color-base-active: hsl(0, 0%, 70%, 1);
    --kendo-color-base-emphasis: hsl(0, 0%, 60%, 1);
    --kendo-color-base-on-subtle: hsl(230, 70%, 16%, 1);

    --kendo-color-primary-subtle: hsl(49, 98%, 94%, 1);
    --kendo-color-primary-subtle-hover: hsl(49, 98%, 90%, 1);
    --kendo-color-primary-subtle-active: hsl(49, 98%, 86%, 1);
    --kendo-color-primary: hsl(49, 98%, 49%, 1);
    --kendo-color-primary-hover: hsl(49, 98%, 35%, 1);
    --kendo-color-primary-active: hsl(49, 98%, 40%, 1);
    --kendo-color-primary-emphasis: hsl(49, 98%, 22%, 1);
    --kendo-color-primary-on-subtle: hsl(49, 98%, 22%, 1);
    --kendo-color-on-primary: hsl(230, 70%, 30%, 1);
    --kendo-color-primary-on-surface: hsl(40, 98%, 39%, 1);

    --kendo-color-info-subtle: hsl(230, 70%, 94%, 1);
    --kendo-color-info-subtle-hover: hsl(230, 70%, 92%, 1);
    --kendo-color-info-subtle-active: hsl(230, 70%, 88%, 1);
    --kendo-color-info: hsl(230, 70%, 26%, 1);
    --kendo-color-info-hover: hsl(230, 70%, 46%, 1);
    --kendo-color-info-active: hsl(230, 70%, 28%, 1);
    --kendo-color-info-emphasis: hsl(230, 70%, 36%, 1);
    --kendo-color-info-on-subtle: hsl(230, 70%, 16%, 1);
    --kendo-color-on-info: hsl(49, 98%, 49%, 1);
    --kendo-color-info-on-surface: hsl(230, 70%, 6%, 1);
`
export const YellowRedPalette = getColorStore(YellowRedColor)
