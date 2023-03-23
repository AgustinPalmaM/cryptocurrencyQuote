const cryptoCurrencySelect = document.querySelector('#criptomonedas');
const currency = document.querySelector('#moneda');
const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');

const searchObject = {
  currency: '',
  cryptoCurrency: ''
}

document.addEventListener('DOMContentLoaded', () => {

  getCryptocurrencies();

  form.addEventListener('submit', submitForm );
  cryptoCurrencySelect.addEventListener( 'change', readValue );
  currency.addEventListener( 'change', readValue );

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

function submitForm(e) {
  e.preventDefault();

  const { currency, cryptoCurrency } = searchObject;

  if (currency === '' || cryptoCurrency === '') {
    showAlert('You should select both fields');
    return;
  }

  callAPI();
}

function readValue(e) {
  searchObject[e.target.name] = e.target.value;
  
}

function showAlert(message) {
  const alertExist = document.querySelector('.error');
  if(!alertExist) {

    const divAlert = document.createElement('DIV');
    divAlert.classList.add('error');
    divAlert.textContent = message;
    form.appendChild(divAlert);
  
    setTimeout(() => {
      divAlert.remove();
    },1500)

  }
}

function callAPI() {
  const { currency, cryptoCurrency } = searchObject;
  url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ cryptoCurrency }&tsyms=${ currency }`

  showSpinner();
  
  setTimeout(() => {
    
    fetch(url)
    .then(response => response.json())
    .then(data => showQuoteHtml(data.DISPLAY[cryptoCurrency][currency]))
  },800)

}

function showQuoteHtml(quoteResponseApi) {
  cleanHTML(result);

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = quoteResponseApi;
  const { currency, cryptoCurrency } = searchObject;
  
  const price = document.createElement('P');
  price.classList.add('precio', 'results');
  price.textContent = 'Current price is: ';
  const spanPrice = document.createElement('SPAN');
  spanPrice.textContent = PRICE;
  price.appendChild(spanPrice);

  const highPrice = document.createElement('P');
  highPrice.classList.add('results')
  highPrice.textContent = 'Max Price: ';
  const spanHighPrice = document.createElement('SPAN');
  spanHighPrice.textContent = HIGHDAY;
  highPrice.appendChild(spanHighPrice);

  const minPrice = document.createElement('P');
  minPrice.classList.add('results')
  minPrice.textContent = 'Min Price: ';
  const spanMinPrice = document.createElement('SPAN');
  spanMinPrice.textContent = LOWDAY;
  minPrice.appendChild(spanMinPrice);

  const varPrice = document.createElement('P');
  varPrice.classList.add('results')
  varPrice.textContent = 'Price variation last 24 hours: ';
  const spanVarPrice = document.createElement('SPAN');
  spanVarPrice.textContent = `${CHANGEPCT24HOUR}%`;
  varPrice.appendChild(spanVarPrice);

  const lastUpdate = document.createElement('P');
  lastUpdate.classList.add('results')
  lastUpdate.textContent = 'Last update: ';
  const spanLastUpdate = document.createElement('SPAN');
  spanLastUpdate.textContent = LASTUPDATE;
  lastUpdate.appendChild(spanLastUpdate);

  result.appendChild(price);
  result.appendChild(highPrice);
  result.appendChild(minPrice);
  result.appendChild(varPrice);
  result.appendChild(lastUpdate);

}

function cleanHTML(target) {
  while(target.firstElementChild) {
    target.firstElementChild.remove();
  }
}

function showSpinner() {
  cleanHTML(result);
  const spinner = document.createElement('DIV');
  spinner.classList.add('spinner');

  spinner.innerHTML = `
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  `

  result.appendChild(spinner)
}