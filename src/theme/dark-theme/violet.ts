import { getColorStore } from '../common'

export const VioletDarkColor = `
    --scroll-color: hsl(0, 0%, 100%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2); 
    --kendo-color-border: hsl(264, 28%, 52%, 0.4);

    --color-theme: hsl(264, 28%, 22%);
    --color-theme-border: hsl(264, 28%, 52%, 0.4);
    --color-theme-hover: hsl(264, 28%, 62%);
    --color-theme-on-surface: hsl(228, 2%, 86%);
    --kendo-color-border-alt: hsl(114, 76%, 40%);;

    --kendo-color-surface-alt: hsl(264, 28%, 22%);
    --kendo-color-surface: hsl(264, 28%, 22%);
    --kendo-color-subtle: hsl(228, 2%, 56%);
    --kendo-color-on-app-surface: hsl(264, 28%, 90%, 1);

    --kendo-color-base-subtle: hsl(217, 7%, 21%, 1);
    --kendo-color-base-subtle-hover: hsl(217, 7%, 40%, 1);
    --kendo-color-base-subtle-active: hsl(0, 0%, 84%, 1);
    --kendo-color-base: hsl(264, 28%, 25%);
    --kendo-color-on-base: hsl(0, 0%, 80%, 1);
    --kendo-color-base-on-surface: hsl(0, 0%, 64%, 1);
    --kendo-color-base-hover: hsl(264, 28%, 35%, 1);
    --kendo-color-base-active: hsl(218, 14%, 20%, 1);
    --kendo-color-base-emphasis: hsl(0, 0%, 76%, 1);
    --kendo-color-base-on-subtle: hsl(0, 0%, 24%, 1);

    --kendo-color-primary-subtle: hsl(114, 76%, 94%);
    --kendo-color-primary-subtle-hover: hsl(114, 76%, 92%);
    --kendo-color-primary-subtle-active: hsl(114, 76%, 90%);
    --kendo-color-primary: hsl(114, 76%, 50%);
    --kendo-color-primary-hover: hsl(114, 76%, 40%);
    --kendo-color-primary-active: hsl(114, 76%, 50%);
    --kendo-color-primary-emphasis: hsl(114, 76%, 50%);
    --kendo-color-primary-on-subtle: hsl(114, 76%, 50%);
    --kendo-color-on-primary: hsl(206, 27%, 17%, 1);
    --kendo-color-primary-on-surface: hsl(114, 76%, 50%);
  
    --kendo-color-info-subtle: hsl(264, 28%, 85%);
    --kendo-color-info-subtle-hover: hsl(264, 28%, 85%);
    --kendo-color-info-subtle-active: hsl(264, 28%, 85%);
    --kendo-color-info: hsl(264, 28%, 85%);
    --kendo-color-info-hover: hsl(264, 28%, 85%);
    --kendo-color-info-active: hsl(264, 28%, 85%);
    --kendo-color-info-emphasis: hsl(264, 28%, 85%);
    --kendo-color-info-on-subtle: hsl(264, 28%, 85%);
    --kendo-color-on-info: hsl(264, 28%, 12%);
    --kendo-color-info-on-surface: hsl(264, 28%, 85%);
`

export const VioletDarkPalette = getColorStore(VioletDarkColor, 'dark')
