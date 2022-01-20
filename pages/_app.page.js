import 'normalize.css/normalize.css'
import '../styles/global.css'
import { appWithTranslation } from 'next-i18next'

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)
