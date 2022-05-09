import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './style.css';
import abi from './utils/waveContract.json';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const contractAddress = '0xB194eaa00586B868793fF8b46de20C5357ca1490';
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Please install Metamask!');
      } else {
        console.log('We have Ethereum object', ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Authorized account has found', account);
        setCurrentAccount(account);
      } else {
        console.log('No authorized account has found!');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Metamask has found!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const waveTxn = await wavePortalContract.wave();
        console.log('Minning... ', waveTxn.hash);

        await waveTxn.wait();
        console.log('Minned -- ', waveTxn.hash);

        let count = await wavePortalContract.getTotalWaves();
        console.log('Retrieving wave numbers...', count.toNumber());
      } else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">Hey There, 💪🏼 let's hack web3!</div>

        <div className="bio">
          It's a simple use case project for studing purpose, and my first dapp
          on Web3!
        </div>

        <button className="waveButton" onClick={wave}>
          🙋🏻‍♀️🙋‍♀️🙋‍♀️🙋🏽‍♀️🙋🏽‍♀️🙋🏿‍♀️ Let's wave for people 🙋🏼‍♂️🙋🏻‍♂️🙋🏽‍♂️🙋🏾‍♂️🙋🏿‍♂️🙋🏻‍♂️
        </button>

        {!currentAccount && (
          <button className="connectWalletButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
