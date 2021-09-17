import React from 'react';
import downloadButton from '../../images/download-metamask.png';
import './ErrorContent.css';

const ErrorContent = () => {
  return (
    <div>
      <div>
        <h2>You need a web3 browser like MetaMask to use this site and manage cryptocurrencies.</h2>
        <a href="https://metamask.io">
          <img className="downloadButton" src={downloadButton} alt="Download MetaMask" />
        </a>
      </div>
    </div>
  )
}

export default ErrorContent;