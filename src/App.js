import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Crypto from './Crypto';

function App() {
  const [trend, setTrend] = useState(null);
  const [cryptos, setCrypto] = useState([]);
  const [news, setNews] = useState([]);
  const [find, setFind] = useState('');
  const [coinName, setName] = useState('');
  const [coinSymbol, setSymbol] = useState('');
  const [coinImage, setImage] = useState('');
  const [coinPrice, setPrice] = useState('');
  const [coinVolume, setVolume] = useState('');
  const [coinHigh, setHigh] = useState('');
  const [coinLow, setLow] = useState('');
  const [coinChange, setChange] = useState('');
  const [coinMarket, setMarket] = useState('');

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/search/trending')
    .then((response) => response.json())
    .then(setTrend)
    .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCrypto(res.data);
    })
    .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
    try {
        const res1 = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${coinName}&api-key=ovpAfBAZAisqc1bCybOPI1G8FQPS2XJU`)
        const articles = await res1.json()
        setNews(articles.response.docs)
      } catch (error) {
        console.log(error);
      }
    }
    fetchArticles()
  }, [coinName]);
   

  const handleChange = e => {
    const node = document.querySelector(".dataResult");
    setFind(e.target.value);
    document.querySelector(".SInput").addEventListener("keyup", function(e) {
      if (e.key === "Enter") {
        document.querySelector(".new").style.display = "block";
        document.querySelector(".showCoin").style.display = "none";
        document.querySelector(".move").style.margin = "-250px auto -40px";
        node.style.display = "none";  
        node.style.height = "180px";
        node.style.position = "relative";
      } else {
        document.querySelector(".SInput").style.marginBottom = "0px";
        node.style.display = "block";
        node.style.marginBottom = "-174px";
        document.querySelector(".move").style.marginBottom = "0px";
      }
    });
    document.querySelector(".SInput").addEventListener("keydown", function(e) {
      if (e.key === '40') {
        document.querySelector("a").style.backgroundColor = "rgb(233, 233, 233)";
      }
    });
  };

  const cryptoFilter = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(find.toLowerCase())
  );

  if (!trend) return null;

  const handleClick = (name, symbol, image, price, volume, high, low, change, market) => {
    document.querySelector(".showCoin").style.display = "block";
    document.querySelector(".new").style.display = "none";
    document.querySelector("#txt").value = "";
    setName(name);
    setSymbol(symbol);
    setImage(image);
    setPrice(price);
    setVolume(volume);
    setHigh(high);
    setLow(low);
    setChange(change);
    setMarket(market);
  }

  return (
    <div className="App">
      <div className="Search">
        <div className='move'>
          <h1>FindYourCrypto</h1>
          <div className="SInput">
            <input id="txt" type="text" placeholder="Search..." autoFocus onChange={handleChange} autoComplete="off"
            onClick={() => {
              const menu = document.querySelector(".dataResult");
              if (menu.style.display === "block") {
                menu.style.display = "none";
              } else {
                menu.style.display = "block";
                document.querySelector(".SInput").style.marginBottom = "0px";
              };
            }}></input>
          </div>
          <div className="dataResult">
            {cryptoFilter.slice(0, 15).map(crypto => {
              return (
              <a className="dataItem" href = {"#showCoin"} 
              onClick = {() => {
                 handleClick(crypto.name, crypto.symbol, crypto.image, crypto.current_price, crypto.total_volume, crypto.high_24h, crypto.low_24h, 
                 crypto.price_change_percentage_24h, crypto.market_cap);
                 document.querySelector(".move").style.margin = "-250px auto -40px";
                 document.body.addEventListener('click', () => {
                  document.querySelector(".dataResult").style.display = "none";
                 }); 
              }}>
              <p>{crypto.name}</p>
              </a>
              )
            })}
          </div>
        </div>
        <div className="new">
          {cryptoFilter.map(crypto => {
            return (
              <div className='coin'>
                <p>{crypto.name}</p>
                <img src={crypto.image} alt= {crypto.symbol} height = "100px" 
                onClick = {() => {
                  handleClick(crypto.name, crypto.symbol, crypto.image, crypto.current_price, crypto.total_volume, crypto.high_24h, crypto.low_24h, 
                    crypto.price_change_percentage_24h, crypto.market_cap);
                }}/>
              </div>
              );
          })}
        </div>
        <div className='showCoin'>
          <Crypto
            name = {coinName}
            symbol = {coinSymbol}
            image = {coinImage}
            price = {coinPrice}
            volume = {coinVolume}
            high = {coinHigh}
            low = {coinLow}
            change = {coinChange}
            marketCap = {coinMarket}
          />
          <h2 id="coinTitle">News About {coinName}</h2>
          <div className='container'>
            {news.slice(0, 5).map((article) => {
              const {
                abstract,
                headline: {main},
                byline: {original},
                web_url,
                _id,
              } = article
              return (           
                <div className='coinNews' onClick={() => {
                  window.open(web_url, '_blank').focus();
                }}>
                  <article key = {_id}>
                    <h3>{main}</h3>                    
                    <img src="https://bitcoinexchangeguide.com/wp-content/uploads/2018/08/Bitcoin-Blockchain-and-Cryptocurrency-News-For-August-24-VIDEO-Recap.jpg" height = "260px" alt = {coinName}></img>
                    <p>{abstract}</p>
                    <br></br>
                    <p><strong>{original}</strong></p>
                  </article>
                </div>
            )
            })}
          </div>
        </div>
      </div>
    </div>
    
  );
}


export default App;
