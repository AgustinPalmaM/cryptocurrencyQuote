const cryptoCurrencySelect = document.querySelector('#criptomonedas');

document.addEventListener('DOMContentLoaded', () => {

  getCryptocurrencies();

})

function getCryptocurrencies() {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  fetch(url)
    .then(response => response.json())
    .then(data => fillSelectCryptoCurrency(data.Data))
    
    
}

function fillSelectCryptoCurrency(data) {
  data.forEach(crypto => {
    const { CoinInfo: { FullName, Name } } = crypto;
    const option = document.createElement('OPTION');
    option.value = Name;
    option.textContent = FullName;
    cryptoCurrencySelect.appendChild(option);
  })
  
  
}