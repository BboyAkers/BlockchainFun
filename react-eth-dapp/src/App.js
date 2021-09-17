import React, { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import MainContent from './components/MainContent'
import ErrorContent from './components/ErrorContent'
import loadingSvg from './images/loading.svg'
import './App.css';


const App = () => {

  const [provider, setProvider] = useState([]);
  const [isLoading, setLoading] = useState([true]);


  // Alternative to using @metamask/detect-provider
  // const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any')


  const checkEthereumProvider = async () => {
    const detectedProvider = await detectEthereumProvider()
    setLoading(false)
    setProvider(detectedProvider)
  }

  checkEthereumProvider()


  return (
    <div className="App">
      {isLoading ? <div><div><img className="loading-spinner" src={loadingSvg} alt="loading spinner" /><h2>Loading.....</h2></div></div>
        : <div>

          {provider ? <MainContent provider={provider} /> : <ErrorContent />}

        </div>}
    </div>
  );
}

export default App;
