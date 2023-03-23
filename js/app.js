const cryptoCurrencySelect = document.querySelector('#criptomonedas');
const currency = document.querySelector('#moneda');
const form = document.querySelector('#formulario');

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

  if (currency === '' || cryptoCurrency || '') {
    showAlert('You should select both fields');
    return;
  }
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

