import React, { useState, useEffect } from 'react';

import MainContent from './components/MainContent'
import ErrorContent from './components/ErrorContent'
import loadingSvg from './images/loading.svg'
import './App.css';
import { ethers } from 'ethers';


const App = () => {

  const [provider, setProvider] = useState([]);
  const [isLoading, setLoading] = useState([true]);

  useEffect(() => {
    checkEthereumProvider();
  }, []);

  const checkEthereumProvider = async () => {
    const detectedProvider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    if (detectedProvider) {
      setLoading(false)
      console.log(detectedProvider)
      setProvider(detectedProvider)
      return;
    }
    console.error("Provider Not Detected");
  }


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
