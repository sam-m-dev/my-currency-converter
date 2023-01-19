import './App.css'
import { useEffect, useState } from 'react'
import React from 'react'
import Select from 'react-select'
import ConversionForm from './components/ConversionForm';
import DisplayConversion from './components/DisplayConversion';
import img from './assets/exchange.svg'

let currencyInfo;
// let currencyArray = new Array();
let loading;


function App() {


  const [allCurrencies, setAllCurrencies] = useState([]);
  const [amountToConvert, setAmountToConvert] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isConversionLoading, setConversionIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [resultConversion, setResultConversion] = useState('');
  const [isConversionDone, setIsConversionDone] = useState(false);

  const alertAmountContainer = document.getElementById('alertMessageAmount');
  const currencyErrorMessage = 'Please enter a currency';
  const amountErrorMessage = 'Please enter a valid amount';
  const alertType = 'danger';
  const currencyFromId = 'alertOriginCurrency';
  const currencyToId = 'alertDestinationCurrency';
  const amountId = 'alertMessageAmount';
  const messageFromId = 'errorOriginCurrency';
  const messageToId = 'errorDestinationCurrency';

  const [currencyValue1, setCurrencyValue1] = useState({
    // selectOptions: [],
    // id: "",
    // name: ''
  })

  const [currencyValue2, setCurrencyValue2] = useState({
    // selectOptions: [],
    // id: "",
    // name: ''
  })

  const valueSelected1 = (selectedOption) => {
    //console.log("valueSelected1: " + selectedOption.value);
    setCurrencyValue1(selectedOption.value);
    clearErrors(currencyFromId);
  }

  const valueSelected2 = (selectedOption) => {
    // console.log("valueSelected2" + selectedOption.value);
    setCurrencyValue2(selectedOption.value);
    clearErrors(currencyToId);
  }

  const setAmount = (e) => {
    // console.log(isNaN(e.target.value));
    if (isNaN(e.target.value)) {
      alertMessageAmount(amountErrorMessage, alertType)
    } else {
      setAmountToConvert(e.target.value)
      clearErrors(amountId)
    }
  }

  const alertMessageAmount = (message, type) => {
    const wrapper = document.createElement('div')
    const amountError = document.getElementById('alert-error');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div class="message" id="alert-error">${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('')


    // When error message is generated the conatiner will have child nodes
    // So, if message is already displayed don't display it again
    if (alertAmountContainer.hasChildNodes() === false || amountError == null) {
      alertAmountContainer.append(wrapper)
    }
  }

  const alertMessageCurrency = (message, type, currencyMissing, messageId) => {
    //const alertMessageCurrency = (message, type, currencyMissing, messageAlert) => {
    const currencyError = document.getElementById(currencyMissing)
    const alertMessage = document.getElementById(messageId);
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div id="${messageId}">${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('')

    console.log("childnode" + currencyError.children.length);
    console.log(alertMessage);
    //if message already displayed dont display it again
    if (currencyError.hasChildNodes() === false || alertMessage == null) {

      currencyError.append(wrapper)
    }
  }

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=currencies,flags')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false)
          setAllCurrencies(result)

        },
        (error) => {
          setIsLoading(false)
          setErrorMessage(error)
        },
      )
  }, [])

  function conversion(currency1, currency2, amountInput) {

    const API_KEY = '62e007a045241fd8f591e565';
    let convResult;

    setConversionIsLoading(true);

    if (isNaN(amountInput) === false) {

      loading = true;
      console.log("before fetch conversion loading?" + loading)
      fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currency1}/${currency2}/${amountInput}`,
        {
          method: 'GET',
        },
      )
        .then((data) => data.json())
        .then(
          (result) => {
            console.log(result.conversion_result)
            convResult = result.conversion_result
            setResultConversion(result.conversion_result)
            setIsConversionDone(true);
            setConversionIsLoading(false);
            loading = false;

          },
          (error) => { },
        )
    } else {
      alert('The amount must be a number')
    }

    return convResult
  }

  //Clear error messages
  function clearErrors(errorId) {
    const errorContainer = document.getElementById(errorId)

    if (errorContainer.hasChildNodes()) {
      errorContainer.replaceChildren()
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if ((Object.entries(currencyValue1).length !== 0 && Object.entries(currencyValue2).length !== 0 && amountToConvert > 0)) {
      console.log(currencyValue1, currencyValue2, amountToConvert, isConversionLoading)
      conversion(currencyValue1, currencyValue2, amountToConvert, isConversionLoading)

    } else {
      if (Object.entries(currencyValue1).length === 0 && Object.entries(currencyValue2).length === 0) {
        alertMessageCurrency(currencyErrorMessage, alertType, currencyFromId, messageFromId)
        alertMessageCurrency(currencyErrorMessage, alertType, currencyToId, messageToId)
      } else if (Object.entries(currencyValue1).length === 0) {
        alertMessageCurrency(currencyErrorMessage, alertType, currencyFromId, messageFromId)

      } else if (Object.entries(currencyValue2).length === 0) {
        alertMessageCurrency(currencyErrorMessage, alertType, currencyToId, messageToId)
      } else if (typeof currencyValue1 == "string" && typeof currencyValue1 == "string") {

        if (currencyValue1 === '' && currencyValue2 === '') {
          alertMessageCurrency(currencyErrorMessage, alertType, currencyFromId, messageFromId)
          alertMessageCurrency(currencyErrorMessage, alertType, currencyToId, messageToId)
        } else if (currencyValue1 === '') {
          alertMessageCurrency(currencyErrorMessage, alertType, currencyFromId, messageFromId)
        } else if (currencyValue2 === '') {
          alert('please enter destination currency' + amountToConvert)
          alertMessageCurrency(currencyErrorMessage, alertType, currencyToId, messageToId)
        }
      }
      if (
        amountToConvert === '' ||
        amountToConvert === undefined ||
        amountToConvert <= 0
      ) {
        alertMessageAmount(amountErrorMessage, alertType)
      }
    }

  }

  return (
    <div className="App-wrapper">
<div className="header-content-wrapper">
      <header className="App-header"> 
        <div className="App-header-wrapper row"> 
          <div className="App-title col-8 col-sm-9 col-md-12">
            <h1>Currency Converter</h1> 
          </div>

          <div className="App-image col-4 col-sm-3 col-md-12">
            <img src={img} alt="decorative illustration"/>
          </div>
        </div>
      </header>
      {/* <div className="content-wrapper col-12 col-md-6"> */}

        {/* <div className="conversion-wrapper "> */}
          <ConversionForm
            currenciesAll={allCurrencies}
            // currencyInput1={handleChange}
            currencyInput1={valueSelected1}
            currencyInput2={valueSelected2}
            amountInput={amountToConvert}
            amountSet={setAmount}
            conversionResult={resultConversion}
            setConversionResult={setResultConversion}
            submitConversion={handleSubmit}
          ></ConversionForm>
          <DisplayConversion
            isConverted={isConversionDone}
            loadingStatus={isConversionLoading}
            amountConverted={amountToConvert}
            convResult={resultConversion}
            convertedFrom={currencyValue1}
            convertedTo={currencyValue2}
          ></DisplayConversion>
      {/* </div> */}
        {/* </div> */}

      </div>
      <footer className="App-footer col-12">
        <p>Made with React</p>
      </footer>
    </div>
  )
}


export default App
 