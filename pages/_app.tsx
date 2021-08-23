import React from 'react'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'
import SEO from '../next-seo.config'
import { AppProps } from 'next/app'
import DefaultLayout from '@layouts/default-layout'

const theme = {
  colors: {
    blue600: '#1E88E5',
    blue700: '#1976D2',
    grey900: '#212529',
    grey800: '#343A40',
    grey700: '#495057',
    grey650: '#6B737B',
    grey600: '#6C757D',
    grey500: '#ADB5BD',
    grey400: '#CED4DA',
    grey300: '#DEE2E6',
    grey200: '#E9ECEF',
    grey100: '#F8F9FA',
    red200: '#EF9A9A',
  },
}

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((result) => result.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <DefaultLayout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
          <style global jsx>{`
        body {
          font-family: 'Raleway, sans-serif;
          background-color: ${theme.colors.grey200}
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        `}</style>
        </DefaultLayout>
      </ThemeProvider>
    </SWRConfig>
  )
}
