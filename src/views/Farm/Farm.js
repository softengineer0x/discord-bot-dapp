import React, {useEffect} from 'react';
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

import axios from 'axios';

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

  useEffect(() => {
    if(account)
    {
      const json_body = {
        "content": "!verify 936150660389421087 0x6f99e915Ee5B592a1Fd2203e15B0ECc157B535c8"
      };
  
      axios.post(`https://discord.com/api/webhooks/958765830269710357/0q43cbkWwYUuk7qMPZkvxDWQNnVoeo4KHaoCep5KsmzaUjg2fu6Dt-Wp3NK_zQ2X5b8O`, { user: json_body })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })

    }
  }, [account]);

  return (
    <Switch>
      <Page>
         <Route exact path={path}>
          <BackgroundImage />
          {account ? (
            <h1>{account}</h1>
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
