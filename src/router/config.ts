import type { RouterProps } from './types'

export const ROUTES: RouterProps[] = [
  {
    path: '/',
    url: 'home/welcome',
    name: 'WelcomePage',
    title: 'Welcome',
    index: true,
  },
  {
    path: 'playground',
    url: 'playground',
    name: 'Playground',
    title: 'Playground',
  },
  {
    path: 'paragraph',
    url: 'paragraph',
    name: 'ParagraphPage',
    title: 'Paragraph',
  },
]
