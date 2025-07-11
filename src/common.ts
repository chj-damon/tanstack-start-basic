import { seo } from './utils/seo'

export const meta = [
  {
    charSet: 'utf-8',
  },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  },
  ...seo({
    title: 'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
    description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
  }),
]

export const scripts = [
  {
    src: '/customScript.js',
    type: 'text/javascript',
  },
]

export const links = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
  { rel: 'icon', href: '/favicon.ico' },
]
