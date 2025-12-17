import { getColorStore } from '../common'

export const PinkGreyColor = `
    --scroll-color: hsl(0, 0%, 100%, 0.2);
    --color-overlay: hsl(0, 0%, 100%, 0.5);
    --color-hover: hsl(0, 0%, 100%, 0.2); 
    --kendo-color-border: hsl(325,94%,60%,0.2);

    --color-theme: hsl(231,15%,18%);
    --color-theme-border: hsl(325,94%,60%,0.2);
    --color-theme-hover: hsl(325,94%,70%);
    --color-theme-on-surface: hsl(265, 89%, 78%);
    --kendo-color-border-alt: hsl(24, 92%, 74%, 1);

    --kendo-color-surface-alt: hsl(231,15%,18%); 
    --kendo-color-surface: hsl(231,15%,18%);
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

    --kendo-color-primary-subtle: hsl(325,88%,96%);
    --kendo-color-primary-subtle-hover: hsl(325,88%,92%);
    --kendo-color-primary-subtle-active: hsl(325,88%,90%);
    --kendo-color-primary: hsl(325,94%,70%);
    --kendo-color-primary-hover: hsl(325,88%,78%);
    --kendo-color-primary-active: hsl(325,90%,78%);
    --kendo-color-primary-emphasis: hsl(325,90%,78%);
    --kendo-color-primary-on-subtle: hsl(325,90%,78%);
    --kendo-color-on-primary: hsl(325,90%,6%);
    --kendo-color-primary-on-surface: hsl(325,90%,40%);

    --kendo-color-info-subtle: hsl(225, 85%, 94%, 1);
    --kendo-color-info-subtle-hover: hsl(225, 85%, 92%, 1);
    --kendo-color-info-subtle-active: hsl(225, 85%, 88%, 1);
    --kendo-color-info: hsl(325,88%,78%);
    --kendo-color-info-hover: hsl(225, 85%, 46%, 1);
    --kendo-color-info-active: hsl(225, 85%, 28%, 1);
    --kendo-color-info-emphasis: hsl(225, 85%, 36%, 1);
    --kendo-color-info-on-subtle: hsl(225, 85%, 16%, 1);
    --kendo-color-on-info: hsl(49, 98%, 49%, 1);
    --kendo-color-info-on-surface: hsl(221, 88%, 15%, 1);
`

export const PinkGreyPalette = getColorStore(PinkGreyColor)
