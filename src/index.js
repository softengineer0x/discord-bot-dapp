import React from 'react'
import { render } from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Web3ReactProvider } from '@web3-react/core'
import getLibrary from './utils/getLibrary' 
import WalletConnect from "./components/wallet/walletconnect";

render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <React.StrictMode>
          <App />
          {/* <WalletConnect/> */}
      </React.StrictMode>
    </Web3ReactProvider>,
  document.getElementById('root'),
)

reportWebVitals()
