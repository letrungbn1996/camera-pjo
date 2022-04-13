import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '../providers/UserProvider'
import { AppProvider } from '../providers/AppProvider'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useStore } from '../store'
import { useBodyClass } from '../hooks/useBodyClass'
import { useEffect } from 'react'

const store = useStore
const persistor = persistStore(store)

let colorLightPrimary = '#f6f9fd'
let colorPrimary = '#468cd2'
if (process.env.NEXT_PUBLIC_PRODUCT_ID === 'KHA') {
    colorLightPrimary = '#fdf3f6'
    colorPrimary = '#c92859'
}
const themeOptions = {
    palette: {
        primary: {
            light: colorLightPrimary,
            main: colorPrimary,
            contrastText: '#ffffff',
        },
    },
}
const theme = createTheme(themeOptions)

function MyApp({ Component, pageProps }: AppProps) {
    // パスを見てdata-page属性にセットする値を変えるフック処理
    useBodyClass()
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <AppProvider>
                    <ThemeProvider theme={theme}>
                        <UserProvider>
                            <Component {...pageProps} />
                        </UserProvider>
                    </ThemeProvider>
                </AppProvider>
            </PersistGate>
        </Provider>
    )
}
export default MyApp
