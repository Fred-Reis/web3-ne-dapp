import React from 'react';
import { ethers } from 'ethers';
import './style.css';

export default function App() {
  const wave = () => {
    console.log('oi');
  };

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
      </div>
    </div>
  );
}
