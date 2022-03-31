import React, {useEffect} from 'react';
// import WalletCard from './WalletCard';
import {Modal, List, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import metamaskLogo from '../../assets/img/metamask-fox.svg';
import walletConnectLogo from '../../assets/img/wallet-connect.svg';
import defiCriptoLogo from '../../assets/img/deficrypto.svg';
// import coingBaseLogo from '../../assets/img/coinbase_logo.jpeg';
import {useWallet} from 'use-wallet';

import Web3 from "web3";
import { DeFiWeb3Connector } from "deficonnect";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '400px',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

const WalletProviderModal = ({open, handleClose}) => {
  const classes = useStyles();
  const {account, connect, chainId} = useWallet();

  useEffect(() => {
    if (account) {
      handleClose();
    }
  });

const supportNetworkId = 4;


useEffect(() => {
(async () => {
    if (account && chainId ) {
    // if(supportNetworkId !== chainId)
    // {
    //   alert("Sorry, You are not in rinkeby now. Please try again after change your network. Thank you !");
    //   deactivate();
    // }
        

if (supportNetworkId !== chainId) {
    if(window.confirm("Your current Network is unsupportable. Would you like to change it") == true)
    {
    console.log(supportNetworkId.toString(16));
    try {
        await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + supportNetworkId.toString(16)}],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
        alert('add this chain id')
        }
    }
    }
}
    }
})();
},[chainId, account]);

  return (
    <Modal
      aria-labelledby="connect a wallet"
      aria-describedby="connect your crypto wallet"
      open={open}
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <h2>Connect Wallet</h2>
        <List component="nav" aria-label="main mailbox folders">
          <Button
            icon={<img src={metamaskLogo} alt="Metamask logo" style={{height: 32}} />}
            onClick={() => {
              connect('injected');
            }}
            title="Metamask"
          />
          <Button
            icon={<img src={walletConnectLogo} alt="Wallet Connect logo" style={{height: 24, color: 'white'}} />}
            onClick={() => {
              connect('walletconnect');
            }}
            title="WalletConnect"
          />
          <Button
            icon={<img src={defiCriptoLogo} alt="Crypto.com defiWallet logo" style={{height: 32, color: 'white'}} />}
            onClick={async () => {
              // connect('deficonnect');
                const connector = new DeFiWeb3Connector({
                  supportedChainIds: [1],
                  rpc: {
                    1: "https://mainnet.infura.io/v3/INFURA_API_KEY",
                    25: "https://evm.cronos.org/", // cronos mainet
                  },
                  pollingInterval: 15000,
                });
                connector.activate();
                const provider = await connector.getProvider();
                const web3 = new Web3(provider);
              }}
              title="Crypto.com Defi Wallet"
          />
        </List>
      </div>
    </Modal>
  );
};

export default WalletProviderModal;
