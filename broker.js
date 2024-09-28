// Finnhub API Key
const API_KEY = 'cr9thk9r01qp5d51cej0cr9thk9r01qp5d51cejg';

async function fetchMarketData() {
    try {
        const btcResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=BTC-USD&token=${API_KEY}`);
        const btcData = await btcResponse.json();

        const niftyResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=NSE:NIFTY50&token=${API_KEY}`);
        const niftyData = await niftyResponse.json();

        const bankNiftyResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=NSE:BANKNIFTY&token=${API_KEY}`);
        const bankNiftyData = await bankNiftyResponse.json();

        document.querySelectorAll('.market-item .price')[0].textContent = `${btcData.c} USD`;
        document.querySelectorAll('.market-item .price')[1].textContent = `${niftyData.c} INR`;
        document.querySelectorAll('.market-item .price')[2].textContent = `${bankNiftyData.c} INR`;
    } catch (error) {
        console.error('Error fetching market data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchMarketData);
