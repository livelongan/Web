import { getColorStore } from '../common'

export const YellowRedDarkColor = `
    --scroll-color: hsl(0, 0%, 100%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2); 
    --kendo-color-border: hsl(0, 0%, 80%, 0.2);

    --color-theme: hsl(0, 100%, 30%);
    --color-theme-border: hsl(0, 100%, 15%);
    --color-theme-hover: hsl(0, 0%, 60%);
    --color-theme-on-surface: hsl(206, 10%, 85%, 1);
    --kendo-color-border-alt: hsl(49, 98%, 49%, 1);

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

    --kendo-color-primary-subtle: hsl(49, 98%, 94%, 1);
    --kendo-color-primary-subtle-hover: hsl(49, 98%, 90%, 1);
    --kendo-color-primary-subtle-active: hsl(49, 98%, 86%, 1);
    --kendo-color-primary: hsl(49, 98%, 49%, 1);
    --kendo-color-primary-hover: hsl(49, 98%, 69%, 1);
    --kendo-color-primary-active: hsl(49, 98%, 39%, 1);
    --kendo-color-primary-emphasis: hsl(49, 98%, 32%, 1);
    --kendo-color-primary-on-subtle: hsl(49, 98%, 22%, 1);
    --kendo-color-on-primary:  hsl(0, 100%, 30%);
    --kendo-color-primary-on-surface: hsl(40, 98%, 39%, 1);

    --kendo-color-info-subtle: hsl(225, 85%, 94%, 1);
    --kendo-color-info-subtle-hover: hsl(225, 85%, 92%, 1);
    --kendo-color-info-subtle-active: hsl(225, 85%, 88%, 1);
    --kendo-color-info: hsl(0, 100%, 10%);
    --kendo-color-info-hover: hsl(0, 100%, 60%);
    --kendo-color-info-active: hsl(0, 100%, 50%);
    --kendo-color-info-emphasis: hsl(0, 100%, 40%);
    --kendo-color-info-on-subtle: hsl(0, 100%, 10%);
    --kendo-color-on-info: hsl(49, 98%, 49%, 1);
    --kendo-color-info-on-surface: hsl(0, 100%, 10%);
`
export const YellowRedDarkPalette = getColorStore(YellowRedDarkColor, 'dark')
