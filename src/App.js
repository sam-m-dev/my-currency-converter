import './App.css';
import { useEffect, useState } from 'react';

let currencyInfo;
let currencyArray = new Array();

// //functional component to generate currency list
// function CurrenciesList() {

//   const [allCurrencies, setAllCurrencies] = useState([]);
//   const [currencyValue1, setCurrencyValue1] = useState("");
//   const [currencyValue2, setCurrencyValue2] = useState("");
//   const [amountToConvert, setAmountToConvert] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [resultConversion, setResultConversion] = useState("");



//   useEffect(() => {
//     fetch('https://restcountries.com/v2/all?fields=currencies')
//       .then(res => res.json())
//       .then(
//         (result) => {
//           setIsLoading(false);
//           setAllCurrencies(result);


//         },
//         (error) => {
//           setIsLoading(false);
//           setErrorMessage(error);
//         }

//       )

//   }, []);


//   for (let i = 0; i < allCurrencies.length; i++) {

//     let currency = allCurrencies[i];
//     currencyInfo = currency.currencies;


//     // some results seem to come up as undefined 
//     // so we are going to ignore them for now
//     // and use the currencies we have

//     if (currencyInfo !== undefined) {

//       //some countries have more than one currency
//       if (currencyInfo.length <= 1) {
//         addToArray(currencyInfo[0]['code']);

//       } else if (currencyInfo.length === 2) {
//         addToArray(currencyInfo[0]['code']);
//         addToArray(currencyInfo[1]['code']);
//       }
//     }

//   }



//   const valueSelected1 = (e) => {
//    // console.log(e.target.value);
//     setCurrencyValue1(e.target.value);

//   };

//   const valueSelected2 = (e) => {
//    // console.log(e.target.value);
//     setCurrencyValue2(e.target.value);

//   };

//   const setAmount = (e) => {
//   //  console.log(e.target.value);
//     setAmountToConvert(e.target.value);

//   }

//   function conversion(currency1, currency2, amountInput) {

//     const API_KEY = '62e007a045241fd8f591e565';
//     let convResult;

//     if (isNaN(amountInput) === false) {



//       fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currency1}/${currency2}/${amountInput}`, {
//         method: "GET",
//       })
//         .then(data => data.json())
//         .then(
//           (result) => {
//             console.log(result.conversion_result)
//             convResult = result.conversion_result;
//             setResultConversion(result.conversion_result);
//           },
//           (error) => {

//           }

//         )

//     } else {
//       alert("The amount must be a number");
//     }

//     return convResult
//   }

//   const handleSubmit = (evt) => {
//     evt.preventDefault();

//     conversion(currencyValue1, currencyValue2, amountToConvert)

//   }

//  // console.log(currencyValue1 + "," + currencyValue2 + "," + amountToConvert);

//   return (
//     <section>
//       <div className='form-wrapper'>
//         <form onSubmit={handleSubmit}>

//           <div className="dropdowns">
//             <label>
//               Pick a Currency:
//               <select name="currencyPick1" onChange={valueSelected1}>
//                 {currencyArray.map((code) => <CurrencyCodes key={code} currCode={code} />)}
//               </select>
//             </label>

//             <label>
//               Pick a Currency:
//               <select name="currencyPick2" onChange={valueSelected2}>
//                 {currencyArray.map((code) => <CurrencyCodes key={code} currCode={code} />)}
//               </select>
//             </label>
//           </div>
//           <div className='amount'>
//             <label >
//               Amount:
//               <input value={amountToConvert}
//                 type="text" name="amount" onChange={setAmount} />
//             </label>
//           </div>
//           <div className="button-wrapper">
//             <button>submit</button>
//           </div>
//         </form>
//       </div>
//       <div className='result'>
//         <h2>{resultConversion} {currencyValue2}</h2>
//         </div>

//     </section>
//   );
// }




// function CurrencyCodes(props) {
//   return <option key={props.currCode} value={props.currCode} >{props.currCode}</option>
// }


// function App() {
//   console.log(CurrenciesList.currencyValue1 + "," + CurrenciesList.currencyValue2 + "," + CurrenciesList.amountToConvert);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Currency Conversion App
//         </p>
//       </header>

//       <CurrenciesList> </CurrenciesList>

//     </div>
//   );
// }

// export default App;


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////test////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////


function App() {

  const [allCurrencies, setAllCurrencies] = useState([]);
  const [currencyValue1, setCurrencyValue1] = useState("");
  const [currencyValue2, setCurrencyValue2] = useState("");
  const [amountToConvert, setAmountToConvert] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [resultConversion, setResultConversion] = useState("");
  const [isConversionDone,setIsConversionDone]= useState(false);

  const valueSelected1 = (e) => {
    console.log(e.target.value);
    setCurrencyValue1(e.target.value);

  };

  const valueSelected2 = (e) => {
    console.log(e.target.value);
    setCurrencyValue2(e.target.value);

  };

  const setAmount = (e) => {
    console.log(e.target.value);
    setAmountToConvert(e.target.value);

  }

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=currencies')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setAllCurrencies(result);



        },
        (error) => {
          setIsLoading(false);
          setErrorMessage(error);
        }

      )

  }, []);


  function conversion(currency1, currency2, amountInput) {

    const API_KEY = '62e007a045241fd8f591e565';
    let convResult;

    if (isNaN(amountInput) === false) {



      fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currency1}/${currency2}/${amountInput}`, {
        method: "GET",
      })
        .then(data => data.json())
        .then(
          (result) => {
            console.log(result.conversion_result)
            convResult = result.conversion_result;
            setResultConversion(result.conversion_result);
            setIsConversionDone(true);
          },
          (error) => {

          }

        )

    } else {
      alert("The amount must be a number");
    }

    return convResult
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    conversion(currencyValue1, currencyValue2, amountToConvert)

  }
  console.log("test" + amountToConvert)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Currency Conversion App
        </p>
      </header>
      <ConversionForm 
      currenciesAll={allCurrencies} 
      currencyInput1={valueSelected1} 
      currencyInput2={valueSelected2} 
      amountInput={amountToConvert} 
      amountSet={setAmount} 
      conversionResult={resultConversion} 
      setConversionResult={setResultConversion} 
      submitConversion={handleSubmit}>
      </ConversionForm>
      {/* <Result amountConverted={amountToConvert} convResult={resultConversion} convertedFrom={currencyValue1} convertedTo={currencyValue2}></Result> */}
      <DisplayConversion isConverted={isConversionDone} amountConverted={amountToConvert} convResult={resultConversion} convertedFrom={currencyValue1} convertedTo={currencyValue2}></DisplayConversion> 
    </div>
  );
}




function addToArray(currencyToAdd) {
  // to avoid duplicates we want to check if the currency has already been added
  // if the currency 
  // is not already in the list we want to add it 
  if (currencyArray.includes(currencyToAdd) === false) {
    currencyArray.push(currencyToAdd);
  }

}

function ConversionForm({ amountInput, amountSet, currenciesAll, currencyInput2, currencyInput1, conversionResult, setConversionResult, submitConversion }) {

  return (
    <div>
      <section>
        <div className='form-wrapper'>
          <form>
            <DropdownButtons currenciesList={currenciesAll} selection1={currencyInput1} selection2={currencyInput2}></DropdownButtons>
            <AmountToConvert amount={amountInput} setAmount={amountSet}></AmountToConvert>
            <SubmitBtn handleSubmit={submitConversion}></SubmitBtn>
          </form>
        </div>
      </section>
    </div>

  )
}

function DropdownButtons({ currenciesList, selection1, selection2 }) {


  for (let i = 0; i < currenciesList.length; i++) {

    let currencyItem = currenciesList[i];
    let currencyInfo = currencyItem.currencies;

    if (currencyInfo !== undefined) {

      //some countries have more than one currency
      if (currencyInfo.length <= 1) {
        addToArray(currencyInfo[0]['code']);

      } else if (currencyInfo.length === 2) {
        addToArray(currencyInfo[0]['code']);
        addToArray(currencyInfo[1]['code']);
      }
    }

  }

  const currencyItemsList = currencyArray.map((currencyCode) => <option key={currencyCode} value={currencyCode}>{currencyCode}</option>);

  return (
    <div className="dropdowns">
      <label>
        Pick a Currency:
        <select className="form-select form-select-lg mb-3" id="currency1" aria-label=".form-select-lg example" onChange={selection1}>{currencyItemsList}</select>
      </label>
      <label>
        Pick a Currency:
        <select className="form-select form-select-lg mb-3" id="currency2" aria-label=".form-select-lg example" onChange={selection2}>{currencyItemsList}</select>
      </label>
    </div>
  )
}

function AmountToConvert({ setAmount, amount }) {
  return (
    <div className='amount'>
      <label >
        Amount:
        <input type="text" name="amount" value={amount} onChange={setAmount} />
      </label>
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


function Result({amountConverted, convResult, convertedTo, convertedFrom }) {
  console.log("test"+amountConverted)
  return (
    <p>{amountConverted}{convertedFrom} is {convResult} {convertedTo} </p>
  )
}

function DisplayConversion({isConverted, amountConverted, convResult, convertedTo, convertedFrom }){
 // const isConverted =props.isConverted;
  console.log("test" + amountConverted)
 if(isConverted){
  return <Result amountConverted={amountConverted} convResult={convResult} convertedFrom={convertedFrom} convertedTo={convertedTo}></Result>
 }

 return(
  <h1>Oops an error occured, please try again</h1>
 )
}


export default App;
