import '../../styles/globals.scss'
import { AppProps } from 'next/app'

import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <AuthProvider> 
    <Component {...pageProps} />
  </AuthProvider>
  )//Incluindo provider para que nosso contexto seja utilizado em qualquer pagina do site
}

export default MyApp
