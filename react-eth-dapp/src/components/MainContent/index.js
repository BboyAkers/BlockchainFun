import React, { useState } from 'react';
import { ethers } from 'ethers';

import Greeter from '../../artifacts/contracts/Greeter.sol/Greeter.json'
import './MainContent.css';

const MainContent = ({ provider }) => {

  const greeterContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [greeting, setGreetingMessage] = useState('');
  const [account, setAccount] = useState();
  const [text, setText] = useState('');
  const { ethereum } = window;

  const requestAccounts = async () => {
    const requestedAccount = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    if (requestedAccount[0].length) {
      setAccount(requestedAccount);
      console.log(account)
      return;
    }
    throw new Error(requestedAccount);
  }

  const fetchGreeting = async () => {
    try {
      const contract = new ethers.Contract(greeterContractAddress, Greeter.abi, provider);
      const contractData = await contract.greet();
      setText(`Contract Greeting Message: ${contractData}`);
    }
    catch (error) {
      setText(error.message);
    }
  }

  const updateGreeting = async () => {
    if (!greeting) return;

    try {
      await requestAccounts();
      const signer = provider.getSigner();
      const updatedContract = new ethers.Contract(greeterContractAddress, Greeter.abi, signer);
      const transaction = await updatedContract.setGreeting(greeting);
      setGreetingMessage('');
      await transaction.wait();
      fetchGreeting();
    } catch (error) {
      setText(error.message);
    }
  }

  return (
    <div>
      <h1>Greeting Dapp</h1>
      <p><strong>{text}</strong></p>
      <button className="waves-effect waves-light btn" onClick={fetchGreeting}>Fetch Greeting</button>
      <input
        className="validate"
        onChange={e => setGreetingMessage(e.target.value)}
        placeholder="Enter Text to set greeting"
      />
      <button className="btn waves-effect waves-light" onClick={updateGreeting}>Update Greeting<i className="material-icons right">send</i></button>
    </div>
  )
};

export default MainContent;