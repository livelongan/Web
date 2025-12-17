import {
    bellIcon,
    buttonIcon,
    codeIcon,
    copyIcon,
    formElementIcon,
    tablePropertiesIcon,
} from '@progress/kendo-svg-icons'
import {
    iconCssViewer,
    iconKendoUI,
    iconReact,
    iconUserProfile,
    iconExcel,
    RouteItemProps,
} from '../components'
import {
    ReactPage,
    UserProfile,
    Buttons,
    SheetPage,
    Notify,
    Project,
    SvgViewer,
    CssViewer,
    Table,
    ProjectForm,
} from '../pages'

export const RouterMenus: RouteItemProps[] = [
    {
        path: '/project',
        text: 'Project',
        svgIcon: copyIcon,
        component: <Project />,
    },
    {
        path: '/project-form',
        text: 'Form',
        svgIcon: formElementIcon,
        component: <ProjectForm />,
    },
    {
        path: '/',
        text: 'Form',
        svgIcon: formElementIcon,
        component: <ProjectForm />,
        hidden: true,
    },
    {
        path: '/study',
        text: 'Study',
        items: [
            {
                path: '/svg-viewer',
                text: 'Svg Viewer',
                svgIcon: codeIcon,
                component: <SvgViewer />,
            },
            {
                path: '/css-viewer',
                text: 'Css Viewer',
                svgIcon: iconCssViewer,
                component: <CssViewer />,
            },
        ],
    },
    {
        path: '/sheet-page',
        text: 'Sheet',
        svgIcon: iconExcel,
        component: <SheetPage />,
    },
    {
        path: '/react-page',
        text: 'ReactPage',
        svgIcon: iconReact,
        component: <ReactPage />,
    },
    {
        path: '/buttons',
        text: 'Buttons',
        svgIcon: buttonIcon,
        component: <Buttons />,
    },
    {
        path: '/notification',
        text: 'Notification',
        svgIcon: bellIcon,
        component: <Notify />,
    },
    {
        path: '/table',
        text: 'Table',
        svgIcon: tablePropertiesIcon,
        component: <Table />,
    },
    {
        path: '/kendo-ui',
        text: 'Kendo UI',
        svgIcon: iconKendoUI,
        expanded: false,
        items: [
            {
                path: '/sheet-page',
                text: 'Sheet Page',
                svgIcon: iconExcel,
                component: <SheetPage />,
            },
            {
                path: '/react-page',
                text: 'ReactPage',
                svgIcon: iconReact,
                component: <ReactPage />,
            },
            {
                path: '/buttons',
                text: 'Buttons',
                svgIcon: buttonIcon,
                component: <Buttons />,
            },
            {
                path: '/notification',
                text: 'Notification',
                svgIcon: bellIcon,
                component: <Notify />,
            },
        ],
    },
    { separator: true },
    {
        path: '/user-profile',
        text: 'User Profile',
        svgIcon: iconUserProfile,
        component: <UserProfile />,
    },
    {
        path: '/group',
        text: 'Group',
        items: [
            {
                path: '/project',
                text: 'Project',
                svgIcon: copyIcon,
                component: <Project />,
            },
            {
                path: '/study',
                text: 'Study',
                items: [
                    {
                        path: '/svg-viewer',
                        text: 'Svg Viewer',
                        svgIcon: codeIcon,
                        component: <SvgViewer />,
                    },
                    {
                        path: '/css-viewer',
                        text: 'Css Viewer',
                        svgIcon: iconCssViewer,
                        component: <CssViewer />,
                    },
                ],
            },
            {
                path: '/table',
                text: 'Table',
                svgIcon: tablePropertiesIcon,
                component: <Table />,
            },
            {
                path: '/kendo-ui',
                text: 'Kendo UI',
                svgIcon: iconKendoUI,
                items: [
                    {
                        path: '/sheet-page',
                        text: 'Sheet Page',
                        svgIcon: iconExcel,
                        component: <SheetPage />,
                    },
                    {
                        path: '/react-page',
                        text: 'ReactPage',
                        svgIcon: iconReact,
                        component: <ReactPage />,
                    },
                    {
                        path: '/buttons',
                        text: 'Buttons',
                        svgIcon: buttonIcon,
                        component: <Buttons />,
                    },
                    {
                        path: '/notification',
                        text: 'Notification',
                        svgIcon: bellIcon,
                        component: <Notify />,
                    },
                ],
            },
            {
                path: '/user-profile',
                text: 'User Profile',
                svgIcon: iconUserProfile,
                component: <UserProfile />,
                hidden: true,
            },
        ],
        expanded: false,
    },
]
