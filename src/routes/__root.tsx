/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { NotFound } from '@/components/NotFound'
import appCss from '@/styles/app.css?url'
import { MantineProvider, createTheme, localStorageColorSchemeManager } from '@mantine/core'
import type { QueryClient } from '@tanstack/react-query'
import { Header } from '@/components/Header'
import { links, meta, scripts } from '@/common'
import 'normalize.css'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta,
    links: [{ rel: 'stylesheet', href: appCss }, ...links],
    scripts,
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

// 自定义主题， 复写Mantine的默认配置
const theme = createTheme({})

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
})

// 所有的provider都在这里嵌套
const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="dark"
      cssVariablesSelector="html"
    >
      {children}
    </MantineProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Header />
          <hr />
          {children}
        </Providers>
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
