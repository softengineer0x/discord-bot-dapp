import React, {useEffect} from 'react';
import WalletCard from './WalletCard';
import {Modal, List} from '@material-ui/core';
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
  const {account, connect} = useWallet();

  useEffect(() => {
    if (account) {
      handleClose();
    }
  });

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
          <WalletCard
            icon={<img src={metamaskLogo} alt="Metamask logo" style={{height: 32}} />}
            onConnect={() => {
              connect('injected');
            }}
            title="Metamask"
          />
          <WalletCard
            icon={<img src={walletConnectLogo} alt="Wallet Connect logo" style={{height: 24, color: 'white'}} />}
            onConnect={() => {
              connect('walletconnect');
            }}
            title="WalletConnect"
          />
          <WalletCard
            icon={<img src={defiCriptoLogo} alt="Crypto.com defiWallet logo" style={{height: 32, color: 'white'}} />}
            onConnect={async () => {
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
