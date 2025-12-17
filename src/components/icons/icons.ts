import { SVGIcon } from '@progress/kendo-svg-icons'

export const iconLight: SVGIcon = {
    name: 'light',
    content: `<path d="m4.506 3.226-1.2-1.193-.939.94 1.194 1.193.945-.94ZM2.666 7h-2v1.334h2V7Zm6-6.633H7.334v1.967h1.332V.367Zm4.967 2.605-.94-.94L11.5 3.227l.94.94 1.193-1.194Zm-2.139 9.135 1.194 1.2.939-.94-1.201-1.193-.932.933ZM13.334 7v1.334h2V7h-2ZM8 3.666c-2.207 0-4 1.795-4 4 0 2.207 1.793 4 4 4s4-1.793 4-4c0-2.205-1.793-4-4-4Zm-.666 11.3h1.332V13H7.334v1.967ZM2.367 12.36l.94.942L4.5 12.099l-.94-.94-1.193 1.2Z"></path>`,
    viewBox: '0 0 16 16',
}
export const iconDark: SVGIcon = {
    name: 'dark',
    content: `<path d="M8.654 14c1.85 0 3.541-.842 4.66-2.222.166-.204.257-.048 0 0a4.7 4.7 0 0 1-5.583-4.616c0-1.692.635-3.703 2.107-4.54A.281.281 0 0 0 9.75 2.1 6 6 0 1 0 8.654 14Z"></path>`,
    viewBox: '0 0 16 16',
}
export const iconFullscreen: SVGIcon = {
    name: 'fullscreen-out',
    content: `<path d="M11 1H15V5H14V2.70709L9.35353 7.35356L8.64642 6.64645L13.2929 2H11V1Z"></path><path d="M5 15L1 15L1 11L2 11L2 13.2929L6.64647 8.64644L7.35358 9.35355L2.70712 14H5V15Z"></path>`,
    viewBox: '0 0 16 16',
}
export const iconFullscreenExit: SVGIcon = {
    name: 'fullscreen-exit',
    content: `<path d="M3.35358 8.64644H7.35358V12.6464H6.35358V10.3535L1.70711 15L1 14.2929L5.64645 9.64644H3.35358V8.64644Z"></path><path d="M12.6464 7.35356L8.64642 7.35356L8.64642 3.35356L9.64642 3.35356V5.64647L14.2929 1L15 1.70711L10.3535 6.35356H12.6464V7.35356Z"></path>`,
    viewBox: '0 0 16 16',
}
export const iconMenuCollapsed: SVGIcon = {
    name: 'menu-collapsed',
    content: `<path d="M480 32v66H32V32zM32 192v66h448v-66zm448 160H32v66h448z"></path>`,
    viewBox: '0 0 512 512',
}
export const iconMenuExpanded: SVGIcon = {
    name: 'menu-expanded',
    // content: `<path d="M358 62v66H32V62zM32 222v66h228v-66zm320 160H32v66h320z" /><path d="m483.941 382.059,-126.06 -126.06, 126.06 -126.061, L450 96, 290 255.999 ,450 416z" />`,
    content: `<path d="M358 62v66H32V62zM32 222v66h228v-66zm320 160H32v66h320z" /><path d="m340 256 132-128v256z" />`,
    viewBox: '0 0 512 512',
}
export const iconRequired: SVGIcon = {
    name: 'required',
    content: `<path d="M442.6 299.7 352 247.4V352h-64V247.4l-90.6 52.3-32-55.4L256 192l-90.6-52.3 32-55.4 90.6 52.3V32h64v104.6l90.6-52.3 32 55.4L384 192l90.6 52.3zM80 384c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48 z" />`,
    viewBox: '0 0 512 512',
}
export const iconSuccess: SVGIcon = {
    name: 'required',
    content: `<path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />`,
    viewBox: '0 0 24 24',
}
export const iconWarning: SVGIcon = {
    name: 'required',
    content: `<path d="M12 5.99 19.53 19H4.47zM12 2 1 21h22zm1 14h-2v2h2zm0-6h-2v4h2z" />`,
    viewBox: '0 0 24 24',
}
export const iconMessage: SVGIcon = {
    name: 'required',
    content: `<path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />`,
    viewBox: '0 0 24 24',
}
export const iconError: SVGIcon = {
    name: 'required',
    content: `<path d="M14.59 8 12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />`,
    viewBox: '0 0 24 24',
}
export const iconKendoUI: SVGIcon = {
    name: 'kendo-ui',
    content: `<path fill="#5ce500" d="M11.2 14.9L0 21.3l17.4 10.1v20.1l11.2-6.4c.5-.3.9-1 .9-1.6V24.4L13 14.9c-.5-.3-1.3-.3-1.8 0z"></path><path fill="#5ce500" d="M12.1 48.4V34.5L0 41.5zM25 .2c-.5-.3-1.3-.3-1.8 0L10.7 7.4l24.1 13.9v27.9L47.3 42c.5-.3.9-1 .9-1.6V13.6L25 .2z">`,
    viewBox: '0 0 49 60.3',
}
export const iconCssViewer: SVGIcon = {
    name: 'css-viewer',
    content: `<path fill="#e97608" d="m64 32 30.2 384L256 480l161.8-64L448 32zm65.6 82h250.3l-4.9 48.9L255.4 214h115.9L358 366.1l-102.1 29.7-102.4-30.2-6.6-76.6h50.9l3.3 39.7 54.4 13.8.5-.1v-.1l56.3-15.8 3.9-64.4H143.7l-3.8-47.8 123-51.2H135.7z"></path>`,
    viewBox: '0 0 512 512',
}
export const iconUserProfile: SVGIcon = {
    name: 'userProfile',
    content: `<path fill="var(--kendo-color-primary)" d="M352 128c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96m-96 128c-106 0-192 86-192 192 0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32 0-106-86-192-192-192"/>`,
    viewBox: '0 0 512 512',
}

export const iconReact: SVGIcon = {
    name: 'react',
    content: `<circle color="rgb(88, 196, 220)" cx="0" cy="0" r="2" fill="currentColor"></circle><g color="rgb(88, 196, 220)"  stroke="currentColor" stroke-width="1" fill="none"><ellipse color="rgb(88, 196, 220)"  rx="10" ry="4.5"></ellipse><ellipse color="rgb(88, 196, 220)"  rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse color="rgb(88, 196, 220)"  rx="10" ry="4.5" transform="rotate(120)"></ellipse></g>`,
    viewBox: '-10.5 -9.45 21 18.9',
}
export const iconExcel: SVGIcon = {
    name: 'excel',
    content: `<path color="hsl(147.22, 77.14%,27.45%)" d="m288 304 64 112h-48l-48-84.5-31.5 52.5H256v32h-96l64-112-64-112h48l48 84 48-84h48zm64-272H96c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V128zm64 416H96V64h224v96h96z" />`,
    viewBox: '0 0 512 512',
}
