import React, { useState } from 'react';
import { ethers } from 'ethers';

import Greeter from '../../artifacts/contracts/Greeter.sol/Greeter.json'
import './MainContent.css';

const MainContent = ({ provider }) => {

  const greeterContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  const [greeting, setGreetingMessage] = useState()
  const [accounts, setAccounts] = useState();
  const requestAccounts = async () => {
    const accountList = await provider.request({ method: 'eth_requestAccounts' });
    setAccounts(accountList);
  }

  const fetchGreeting = async () => {
    try {
      const contract = new ethers.Contract(greeterContractAddress, Greeter.abi, provider)
      const contractData = await contract.greet()
      console.log("contract data:", contractData)
    }
    catch (error) {
      console.error(error)
    }
  }

  const updateGreeting = async () => {
    if (!greeting) return
    await requestAccounts()
    const signer = provider.getSigner();
    const updatedContract = new ethers.Contract(greeterContractAddress, Greeter.abi, signer);
    const transaction = await updatedContract.setGreetingMessage(greeting)
    await transaction.wait()
    fetchGreeting()
  }

  return (
    <div>
      <h1>Main Content Loaded</h1>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={updateGreeting}>Update Greeting</button>
      <input
        onChange={e => setGreetingMessage(e.target.value)}
        placeholder="Enter Text to set greeting"
      />
    </div>
  )
};

export default MainContent;