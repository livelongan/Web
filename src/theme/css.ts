import { GAP, MODAL_TITLE_HEIGHT } from '../constants'

export const DialogModalCss = `
    .k-window-titlebar {
        position: relative;
        padding: 0;
        height: ${MODAL_TITLE_HEIGHT}px; 
        padding-left: ${GAP.middle}px;
        color: var(--color-theme-on-surface);
        
    }
    .k-window-title {
        padding: 0;
        font-weight: 500;
    }
    .k-window-title:hover {
        cursor: move;
    }
    .k-dialog .k-window-title:hover {
        cursor: default;
    }
    .k-window-titlebar-actions {
        position: absolute;
        right: 0;
        top: 0;
        margin: 0;
        margin-right: 1px;
        margin-top: 1px;
    }
    .k-window-titlebar-actions .k-button {
        border-radius: 0;
        border: none !important;
        box-shadow: none !important;
        height:${MODAL_TITLE_HEIGHT}px; 
        width: 40px;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    .k-window-titlebar-actions .k-button:hover::before,
    .k-window-titlebar-actions .k-button.k-hover::before {
        opacity: 1;
        background-color: var(--color-theme-hover);
    }
    .k-window-titlebar-actions .k-button:hover,
    .k-window-titlebar-actions .k-button.k-hover {
        color: var(--color-theme);
    }
    .k-window-titlebar-actions .k-button:hover::after {
        box-shadow: none !important;
    }
    .k-window-titlebar-actions .k-button::before{ 
        bottom: 0;
    }
    .k-window-titlebar-actions .k-button:after {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .k-window-content {
        overflow: hidden;
        padding: 0;
    }
    .k-actions {
        gap: ${GAP.large}px;
        padding: ${GAP.XL / 2}px ${GAP.large}px;
        margin-top: ${GAP.normal}px; 
    } 
        
`
