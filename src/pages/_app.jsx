// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports

import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Spinner Import

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'


// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'


// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'
import NextAuthProvider from 'src/context/NextAuthProvider'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClientSetup from 'src/utils/querySetup'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
    Router.events.on('routeChangeStart', () => {
        NProgress.start()
    })
    Router.events.on('routeChangeError', () => {
        NProgress.done()
    })
    Router.events.on('routeChangeComplete', () => {
        NProgress.done()
    })
}



// ** Configure JSS & ClassName
const App = props => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    // Variables
    const contentHeightFixed = Component.contentHeightFixed ?? false

    const getLayout =
        Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
    const setConfig = Component.setConfig ?? undefined


    return (
        <NextAuthProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClientSetup}>
                    <CacheProvider value={emotionCache}>
                        <ReactQueryDevtools initialIsOpen={false} />
                        <Head>
                            <title>{`haji`}</title>
                            <meta
                                name='description'
                                content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
                            />
                            <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
                            <meta name='viewport' content='initial-scale=1, width=device-width' />
                        </Head>
                        <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                            <SettingsConsumer>
                                {({ settings }) => {
                                    return (
                                        <ThemeComponent settings={settings}>
                                            <WindowWrapper>
                                                {getLayout(<Component {...pageProps} />)}
                                            </WindowWrapper>
                                            <ReactHotToast>
                                                <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                                            </ReactHotToast>
                                        </ThemeComponent>
                                    )
                                }}
                            </SettingsConsumer>
                        </SettingsProvider>
                    </CacheProvider>
                </QueryClientProvider>
            </Provider>
        </NextAuthProvider>
    )
}



export default App
