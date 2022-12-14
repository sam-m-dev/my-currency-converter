import './App.css'
import { useEffect, useState } from 'react'


let currencyInfo
let currencyArray = new Array()
let loading;
function App() {



  const [allCurrencies, setAllCurrencies] = useState([])
  const [currencyValue1, setCurrencyValue1] = useState('')
  const [currencyValue2, setCurrencyValue2] = useState('')
  const [amountToConvert, setAmountToConvert] = useState(0)
 const [isLoading, setIsLoading] = useState(true)
  const [isConversionLoading, setConversionIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [resultConversion, setResultConversion] = useState('')
  const [isConversionDone, setIsConversionDone] = useState(false)

  const alertAmountContainer = document.getElementById('alertMessageAmount')
  const currencyErrorMessage = 'Please enter a currency'
  const amountErrorMessage = 'Please enter a valid amount'
  const alertType = 'danger'
  const currencyFromId = 'alertOriginCurrency'
  const currencyToId = 'alertDestinationCurrency'
  const amountId = 'alertMessageAmount'

  const valueSelected1 = (e) => {
    // console.log(e.target.value);
    setCurrencyValue1(e.target.value)
    clearErrors(currencyFromId)
  }

  const valueSelected2 = (e) => {
    console.log(e.target.value)
    setCurrencyValue2(e.target.value) 
    clearErrors(currencyToId)
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
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('')

    // console.log(alertAmountContainer.hasChildNodes());
    // When error message is generated the conatiner will have child nodes
    // So, if message is already displayed don't display it again
    if (alertAmountContainer.hasChildNodes() === false) {
      alertAmountContainer.append(wrapper)
    }
  }

  const alertMessageCurrency = (message, type, currencyMissing) => {
    const currencyError = document.getElementById(currencyMissing)
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('')

    //if message already displayed dont display it again
    if (currencyError.hasChildNodes() === false) {
      currencyError.append(wrapper)
    }
  }

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=currencies')
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
            loading=false;
            // setConversionIsLoading(false);
            console.log("loading"+loading)
            // setIsConversionDone(true)
           // console.log("conversion done?" + isConversionDone)
          },
          (error) => {},
        )
    } else {
      alert('The amount must be a number')
    }

    return convResult
  }

  //Clear error messages
  function clearErrors(errorId) {
    const errorContainer = document.getElementById(errorId)
    //console.log(errorContainer);

    if (errorContainer.hasChildNodes()) {
      errorContainer.replaceChildren()
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    // console.log(currencyValue1);

    if (currencyValue1 === '' && currencyValue2 === '') {
      alertMessageCurrency(currencyErrorMessage, alertType, currencyFromId)
      alertMessageCurrency(currencyErrorMessage, alertType, currencyToId)
    } else if (currencyValue1 === '') {
      alertMessageCurrency(currencyErrorMessage, alertType, currencyFromId)
    } else if (currencyValue2 === '') {
      alert('please enter destination currency' + amountToConvert)
      alertMessageCurrency(currencyErrorMessage, alertType, currencyToId)
    }

    if (
      amountToConvert === '' ||
      amountToConvert === undefined ||
      amountToConvert <= 0
    ) {
      alertMessageAmount(amountErrorMessage, alertType)
    } else {
      conversion(currencyValue1, currencyValue2, amountToConvert,isConversionLoading)
    }

    //console.log("test" + amountToConvert)
  }
  return (
    <div className="App">
      <div className="content-wrapper">
      <header className="App-header">
        <h1>Currency Converter</h1>
      </header>
      <div className="conversion-wrapper">
        <ConversionForm
          currenciesAll={allCurrencies}
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
      </div>
        <footer className="App-footer">
          <p>Made with React</p>
        </footer>
      </div>
    </div>
  )
}

function addToArray(currencyToAddObject) {


  if (currencyArray.some(currency => currency.codeCurrency === currencyToAddObject.codeCurrency)) {

  }else{
      currencyArray.push(currencyToAddObject);
  }

}


function ConversionForm({
  amountInput,
  amountSet,
  currenciesAll,
  currencyInput2,
  currencyInput1,
  conversionResult,
  setConversionResult,
  submitConversion,
}) {
  return (
    <section className="converter-section">
      <div className="form-wrapper">
        <form className="needs-validation">
          <DropdownButtons
            currenciesList={currenciesAll}
            selection1={currencyInput1}
            selection2={currencyInput2}
          ></DropdownButtons>
          <AmountToConvert
            amount={amountInput}
            setAmount={amountSet}
          ></AmountToConvert>
          <SubmitBtn handleSubmit={submitConversion}></SubmitBtn>
        </form>
      </div>
    </section>
  )
}

function DropdownButtons({ currenciesList, selection1, selection2 }) {
 //console.log(currenciesList);
  for (let i = 0; i < currenciesList.length; i++) {
    let currencyItem = currenciesList[i]
    let currencyInfo = currencyItem.currencies
  

    if (currencyInfo !== undefined) {
      let currencyObject = {
        codeCurrency: currencyInfo[0]['code'],
        name: currencyInfo[0]['name']
      }
      //some countries have more than one currency
      if (currencyInfo.length <= 1) {
  
       // addToArray(currencyInfo[0]['code'], currencyInfo[0]['name'])
        addToArray(currencyObject)
      } else if (currencyInfo.length === 2) {
       // addToArray(currencyInfo[0]['code'],currencyInfo[0]['name'])
        addToArray(currencyObject)
        let currencyObject2 = {
          codeCurrency: currencyInfo[0]['code'],
          name: currencyInfo[0]['name']
        }
        addToArray(currencyObject2)
       // addToArray(currencyInfo[1]['code'],currencyInfo[0]['name'])
      }
    }
    
  }

  const currencyItemsList = currencyArray.map((currencyCode) => (
    <option key={currencyCode.codeCurrency} value={currencyCode.codeCurrency}> 
    {currencyCode.codeCurrency} - {currencyCode.name}
    </option>
  ))

  return (
    <div className="dropdowns">
      <label>
        Pick a Currency:
      </label>
      <div className="select">
        <select
          className="form-select form-select-lg mb-3"
          id="currency1"
          aria-label=".form-select-lg currency"
          onChange={selection1}
          required
        >
          {currencyItemsList}
        </select>
      </div>
      
      <div className="errorMessage" id="alertOriginCurrency"></div>
      <label>
        Pick a Currency:
        <select
          className="slct-currency form-select form-select-lg mb-3"
          id="currency2"
          aria-label=".form-select-lg currency"
          onChange={selection2}
          required
        >
          {currencyItemsList}
        </select>
      </label>
      <div className="errorMessage" id="alertDestinationCurrency"></div>
    </div>
  )
}

function AmountToConvert({ setAmount, amount }) {
  return (
    <div className="amount">
      <label>
        Amount:
        <input
          type="text"
          name="amount"
          value={amount}
          onChange={setAmount}
          required
        />
      </label>
      <div className="errorMessage" id="alertMessageAmount"></div>
    </div>
  )
}

function SubmitBtn({ handleSubmit }) {
  return (
    <div className="button-wrapper">
      <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

function Result({ amountConverted, convResult, convertedTo, convertedFrom }) {
  console.log('test' + amountConverted)
  return (
 
    <section className='result-section'>

      <div className="result">
        <h1>result</h1>
        <p>
          {amountConverted}
          {convertedFrom} is {convResult} {convertedTo}{' '}
        </p>
      </div>
    </section>
  )
}

function LoadingConversion(){
 
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )



}

function DisplayConversion({
  isConverted,
  amountConverted,
  convResult,
  convertedTo,
  convertedFrom,
  loadingStatus
}) {
  // console.log('test' + amountConverted+""+isConverted)
  // console.log('tlonding' + loading+ "is conv " + isConverted)
  // if ((loadingStatus === false) && (isConverted === false)) {
  //   return (
  //     <LoadingConversion></LoadingConversion> 
  //   )
  // }else
  // <LoadingConversion></LoadingConversion> 
  console.log(loadingStatus)
  if ((loadingStatus !== false) && (isConverted === false)){
    return(
      <LoadingConversion></LoadingConversion> 
    )
    // 
   
  } else if((isConverted ===  true) && (loadingStatus === false)){
    return (
      <Result
        amountConverted={amountConverted}
        convResult={convResult}
        convertedFrom={convertedFrom}
        convertedTo={convertedTo}
      ></Result>
    )
  } 
  
  // if (loading === true && isConverted === false){
  //   console.log('test' + amountConverted + "" + isConverted)
  //   console.log('tlonding' + loading + "is conv " + isConverted)
  //   alert("yes");
  //   return(
  //     <LoadingConversion></LoadingConversion>
  //   )
  // } else if (loading === false && isConverted === true) {
  //   console.log('load' + loading +"is conv ?" + isConverted)
  //   alert("no");
  //     <Result
  //       amountConverted={amountConverted}
  //       convResult={convResult}
  //       convertedFrom={convertedFrom}
  //       convertedTo={convertedTo}
  //     ></Result>
  // }
}

export default App
