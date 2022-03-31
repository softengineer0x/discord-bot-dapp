import React from 'react';
import {useWallet} from 'use-wallet';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Bank from '../Bank';

import {Box, Container, Typography, Grid} from '@material-ui/core';

import {Alert} from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import FarmCard from './FarmCard';
import FarmImage from '../../assets/img/farm.png';
import {createGlobalStyle} from 'styled-components';

import useBanks from '../../hooks/useBanks';

import HomeImage from '../../assets/img/background.gif';
import LaunchCountdown from '../../components/LaunchCountdown';
import config from '../../config';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #d3c7b826;
  }
`;

const Farm = () => {
  const [banks] = useBanks();
  const {path} = useRouteMatch();
  const {account} = useWallet();
  const gsharesActive = Date.now() >= config.gsharesLaunchesAt.getTime();
  const activeBanks = banks.filter((bank) => !bank.finished && (gsharesActive || bank.sectionInUI !== 2));

  return (
    <Switch>
      <Page>
         <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <h1>Successfully connected at Wallet !</h1>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
        {!!account && !gsharesActive && <div style={{marginTop: '2rem'}}><LaunchCountdown deadline={config.gsharesLaunchesAt} description='GENESIS POOL'/></div>}
      </Page>
    </Switch>
  );
};

export default Farm;
