import React from 'react'
import './App.css';

const Crypto = ({name, symbol, image, price, volume, high, low, change, marketCap}) => {
  return (
    <div className='coinInfo'>
      <div className='coinName'>
        <h2>{name}</h2>
        <p>{symbol.toUpperCase()}</p>
        <img src={image} alt= {symbol} height = "250px"/>
      </div>
      <div className='idf'>
        <form method="get" role="search" formTarget='_self'>
          <input autoComplete='off' name="q" placeholder='Search with Google...' title='Enter Search Here' type="text" />
        </form>
      </div>
      <div className='headings'>
        <table>
          <thead>
            <tr>
              <th>Price</th>
              <th>24h %</th>
              <th>Price High 24h</th>
              <th>Price Low 24h</th>
              <th>Market Cap</th>
              <th>Volume(24h)</th>
            </tr>
          </thead>
          <tbody></tbody>
          <tr>
            <td><p className='coinPrice'>$ {price.toLocaleString()}</p></td>
            <td>{change < 0 ? (
                  <p className='coinColorR'>{Math.round((change + Number.EPSILON) * 100) / 100}%</p>
                ) : (<p className='coinColorG'>{Math.round((change + Number.EPSILON) * 100) / 100}%</p>)
              }
            </td>
            <td><p className='coinHigh'>$ {high.toLocaleString()}</p></td>
            <td><p className='coinLow'>$ {low.toLocaleString()}</p></td>
            <td><p className='coinCap'>$ {marketCap.toLocaleString()}</p></td>
            <td><p className='coinVolume'>$ {volume.toLocaleString()}</p></td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Crypto;


