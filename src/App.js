import './App.css'
import { useEffect, useState } from 'react'
import React from 'react'
import Select from 'react-select'
import ConversionForm from './components/ConversionForm';

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
    <div className="App row">

      <header className="App-header col-12 col-md-6">
        <h1>Currency Converter</h1>
      </header>
      <div className="content-wrapper col-12 col-md-6">

        <div className="conversion-wrapper ">
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
        </div>

      </div>
      <footer className="App-footer col-12">
        <p>Made with React</p>
      </footer>
    </div>
  )
}

// function addToArray(currencyToAddObject) {

//   if (currencyArray.some(currency => currency.codeCurrency === currencyToAddObject.codeCurrency)) {

//   } else {
//     // console.log(currencyToAddObject)
//     currencyArray.push(currencyToAddObject);
//   }

// }

// function ConversionForm({
//   amountInput,
//   amountSet,
//   currenciesAll,
//   currencyInput2,
//   currencyInput1,
//   conversionResult,
//   setConversionResult,
//   submitConversion,
// }) {
//   return (
//     <section className="converter-section row">
//       <div className="form-wrapper col-10 col-sm-12 col-md-12">
//         <form className="needs-validation">
//           <DropdownButtons
//             currenciesList={currenciesAll}
//             selection1={currencyInput1}
//             selection2={currencyInput2}
//           ></DropdownButtons>

//           <div className="amount-submit-wrapper row">
//           <AmountToConvert
//             amount={amountInput}
//             setAmount={amountSet}
//           ></AmountToConvert>
//           <SubmitBtn handleSubmit={submitConversion}></SubmitBtn>
//           </div>
//         </form>
//       </div>
//     </section>
//   )
// }

// function DropdownButtons({ currenciesList, selection1, selection2 }) {
//   //console.log(currenciesList);
//   let svgFlag;
//   let pngFlag;
//   let code;
//   let codeName;
 
//   for (let i = 0; i < currenciesList.length; i++) {
//     let currencyItem = currenciesList[i]
//     let currencyInfo = currencyItem.currencies
//     let currencyFlags = currencyItem.flags;

//     if (currencyInfo !== undefined) {
  
//       for(let i=0; i<currencyInfo.length; i++){

//         code = currencyInfo[i]['code'];
//         codeName = currencyInfo[i]['name'];
//        // console.log(code)
//         switch (code) {
//           case "EUR":
//             svgFlag="https://flagcdn.com/eu.svg"
//             pngFlag = "https://flagcdn.com/w320/eu.png"
//              // console.log(svgFlag)
//             break;
//           case "USD":
//             svgFlag = "https://flagcdn.com/us.svg"
//             pngFlag = "https://flagcdn.com/w320/us.png"
//        //     console.log(svgFlag)
//             break;
//           case "GBP":
//             svgFlag = "https://flagcdn.com/gb.svg"
//             pngFlag = "https://flagcdn.com/w320/gb.png"
//             //     console.log(svgFlag)
//             break;
//           case "INR":
//             svgFlag = "https://flagcdn.com/in.svg"
//             pngFlag = "https://flagcdn.com/w320/in.png"
//             //     console.log(svgFlag)
//             break;
//           case "SGD":
//             svgFlag = "https://flagcdn.com/sg.svg"
//             pngFlag = "https://flagcdn.com/w320/sg.png"
//             //     console.log(svgFlag)
//             break;
//           default:
//             svgFlag=currencyFlags.svg
//             pngFlag=currencyFlags.png
//             console.log(code,svgFlag, pngFlag)
//         }


//         let currencyObject = {
//         codeCurrency: code,
//         name: codeName,
//         flagSVG: svgFlag,
//         flagPNG: pngFlag
//         }

//         addToArray(currencyObject)
  

//       }

//     }

//   }



//   let defaultCurrency = "Currency";
//   let placeholderValue = "Currency"

//   const options = currencyArray.map((currencyCode) => ({
//     "value": currencyCode.codeCurrency,
//     "label": <div className="currency-item"><div className="flag-wrapper"><img className="flag-icon rounded-circle" src={currencyCode.flagSVG} /></div> <span className="currency-name">{currencyCode.codeCurrency} - {currencyCode.name}</span></div>
//   }))



//   console.log(options);
//   return (
//     <div className="dropdowns row">

//       <div className="select-wrapper col-12 col-sm-5 col-md-12">
//         <div className="select" id="select1">
//           <label>
//             From
//             <Select className="basic-single"
//               classNamePrefix="select"
//               options={options}
//               placeholder={defaultCurrency}
//               onChange={selection1} />
//           </label>
//         </div>
//         <div className="errorMessage" id="alertOriginCurrency"></div>
//       </div>

//       <div className="select-wrapper col-12 col-sm-5 col-md-12">
//         <div className="select" id="select2">
//           <label>
//             To
//           <Select className="basic-single"
//             classNamePrefix="select"
//             isSearchable="true"
//             placeholder={placeholderValue}
//             options={options}
//             onChange={selection2} />
//           </label>
//         </div>
//         <div className="errorMessage" id="alertDestinationCurrency"></div>
//       </div>

//     </div>
//   ) 
// }

// function AmountToConvert({ setAmount, amount }) {
//   return (
//     <div className="amount col-12 col-sm-10 col-md-12">
//       <div className="select-amount">
//         <label>
//           Amount: 
//           <div className='amount-single'>
//           <input
//             className="amount-input"
//             type="number"
//             name="amount"
//             value={amount}
//             onChange={setAmount}
//             required
//           />
//           </div>
//         </label>
//       </div>
//       <div className="errorMessage" id="alertMessageAmount"></div>
//     </div>
//   )
// }

// function SubmitBtn({ handleSubmit }) {
//   return (
//     <div className="button-wrapper col-12 col-sm-6 col-md-12">
//       <button className="submit-btn" onClick={handleSubmit}>submit</button>
//     </div>
//   )
// }

function Result({ amountConverted, convResult, convertedTo, convertedFrom }) {
  //console.log('test' + amountConverted)
  return (

    <section className='result-section row'>

      <div className='result-wrapper col-10 col-sm-12 col-md-12'>
      <div className="result col-12 col-sm-10">
        {/* <h1>result</h1> */}
        <h1>{amountConverted}{' '}{convertedFrom}</h1>
        <h1>=</h1>
        <h1>{' '}{convResult}{' '}{convertedTo}</h1>
      </div>
      </div>
    </section>
  )
}

function LoadingConversion() {

  return (
    <div className="loading-container">
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
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

  console.log(loadingStatus)
  if ((loadingStatus !== false) && (isConverted === false)) {
    return (
      <LoadingConversion></LoadingConversion>
    )
    // 

  } else if ((isConverted === true) && (loadingStatus === false)) {
    return (
     
      <Result
        amountConverted={amountConverted}
        convResult={convResult}
        convertedFrom={convertedFrom}
        convertedTo={convertedTo}
      ></Result>
    )
  }

}

export default App
