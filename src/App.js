import logo from './logo.svg';
import './App.css';
import { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal';
import { wallets } from './components/constants'

import {useWallet} from 'use-wallet';
// import { DeFiWeb3Connector } from "deficonnect";

const Cancel = 'cancel.svg';

function App() {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '20%',
      height: '500px',
      borderRadius: '15px',
      background: 'rgba(0, 0, 0, 0.95)',
      paddingTop: '10px',
      minWidth:'250px', 
    },
  }

  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.6)'
  Modal.defaultStyles.overlay.zIndex = "1000000";

  const {account, connect} = useWallet();

  const [isOpen, setOpen] = useState(false)
  // const { account, chainId, activate, deactivate } = useWeb3React();
  const supportNetworkId = 4;
  
  const walletModalOpen = async () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const connectwallet = () => {
    setOpen(true);
  }

  const handleLogin = async (wname) => {

    if (wname === 'Metamask') 
    { 
      // await activate(injected);
      console.log("Metamask!!!");
      connect('injected');
    } 
    else 
    {
      // await activate(injected)
      console.log("Defi Connect!!!");
      // const connector = new DeFiWeb3Connector({
      //   supportedChainIds: [1],
      //   rpc: {
      //     1: "https://mainnet.infura.io/v3/INFURA_API_KEY",
      //     25: "https://evm.cronos.org/", // cronos mainet
      //   },
      //   pollingInterval: 15000,
      // });
      // connector.activate();
      // const provider = await connector.getProvider();
      // const web3 = new Web3(provider);
    }
    setOpen(false)
  }


  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={connectwallet}
        >
          Connect Wallet
        </a>
      </header>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        onRequestClose={closeModal}
      >
        <div style={{ borderBottom: '1px solid silver', padding: '3px' }}>
          <img
            src={Cancel}
            style={{
              background: 'transparent',
              width: '25px',
              color: 'white',
              border: '0',
              float: 'right',
            }}
            onClick={closeModal}
          />
          <br />
          <br />
          Connect Wallet
        </div>
        <br />
        {wallets.map((wallet) => (
          <div
            key={wallet.name}
            className="wallet-modal__list__item"
            onClick={() => handleLogin(wallet.name)}
          >
            <p className="font-size-14">{wallet.name}</p>
            <img src={wallet.icon} alt={wallet.name} />
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default App;
