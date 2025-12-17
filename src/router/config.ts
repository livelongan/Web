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
    path: 'book',
    url: 'book',
    name: 'BookPage',
    title: 'Book',
  },
  {
    path: 'ways-of-seeing',
    url: 'ways-of-seeing',
    name: 'WaysOfSeeing',
    title: 'Ways of Seeing',
  },
  // {
  //   path: 'chapter',
  //   url: 'chapter',
  //   name: 'ChapterPage',
  //   title: 'Chapter',
  // },
  // {
  //   path: 'chapter/:id',
  //   url: 'chapter',
  //   name: 'ChapterDetails',
  //   title: 'Chapter Details',
  //   showInMenu: false,
  // },
  {
    path: 'paragraph',
    url: 'paragraph',
    name: 'ParagraphPage',
    title: 'Paragraph',
  },
  {
    path: 'paragraph/:id',
    url: 'paragraph',
    name: 'ParagraphPage',
    title: 'Paragraph',
    showInMenu: false,
  },
]
