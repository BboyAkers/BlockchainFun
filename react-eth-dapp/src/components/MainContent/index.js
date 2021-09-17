import React, { useState } from 'react';
import { ethers } from 'ethers';

import Greeter from '../../artifacts/contracts/Greeter.sol/Greeter.json'
import './MainContent.css';

const MainContent = ({ provider }) => {

  const greeterContractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  const [greeting, setGreetingMessage] = useState('')
  const [accounts, setAccounts] = useState();
  const [text, setText] = useState('')
  const { ethereum } = window;

  const requestAccounts = async () => {
    const accountList = await ethereum.request({
      method: 'eth_requestAccounts',
    })
    if (accountList) {
      setAccounts(accountList);
      return;
    }
    throw new Error(accountList)
  }

  const fetchGreeting = async () => {
    try {
      const contract = new ethers.Contract(greeterContractAddress, Greeter.abi, provider)
      const contractData = await contract.greet()
      setText(`Contract Greeting Message: ${contractData}`)
    }
    catch (error) {
      setText(error)
    }
  }

  const updateGreeting = async () => {
    if (!greeting) return

    try {
      await requestAccounts()
      const signer = provider.getSigner();
      const updatedContract = new ethers.Contract(greeterContractAddress, Greeter.abi, signer);
      const transaction = await updatedContract.setGreeting(greeting)
      setGreetingMessage('')
      setText('')
      await transaction.wait()
      fetchGreeting()
    } catch (error) {
      setText(error.message)
    }
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
      <p>{text}</p>
    </div>
  )
};

export default MainContent;