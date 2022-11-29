//import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


let currencyInfo;
let currencyArray = new Array();


function CurrenciesList() {

  const [allCurrencies, setAllCurrencies] = useState([]);

  const [currencyValue1, setCurrencyValue1] = useState("");
  const [currencyValue2, setCurrencyValue2] = useState("");
  const [amountToConvert, setAmountToConvert] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [resultConversion,setResultConversion] = useState("");



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


  for(let i=0; i< allCurrencies.length; i++){

    let currency = allCurrencies[i];
    currencyInfo= currency.currencies;


    // some results seem to come up as undefined 
    // so we are going to ignore them for now
    // and use the currencies we have

    if (currencyInfo !== undefined){
    
      //some countries have more than one currency
      if (currencyInfo.length <= 1 ){
        addToArray(currencyInfo[0]['code']);
  
      } else if (currencyInfo.length === 2){
        addToArray(currencyInfo[0]['code']);
        addToArray(currencyInfo[1]['code']);
      }
    }

  }



  const valueSelected1 = (e) => {
   console.log(e.target.value);
    setCurrencyValue1(e.target.value);
   // alert(e.target.value);
  };

  const valueSelected2 = (e) => {
    console.log(e.target.value);
    setCurrencyValue2(e.target.value);
  //  alert(e.target.value);
  };

  const setAmount= (e) => {
    console.log(e.target.value);
    setAmountToConvert(e.target.value);

  }

  function conversion(currency1, currency2, amountInput) {

    const API_KEY = '62e007a045241fd8f591e565';
    let convResult;

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${currency1}/${currency2}/${amountInput}`, {
      method: "GET",
    })
      .then(data => data.json())
      .then(
        (result) => {
          console.log(result.conversion_result)
          convResult = result.conversion_result;
          setResultConversion(result.conversion_result);
        },
        (error) => {

        }

      )

    return convResult
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    conversion(currencyValue1, currencyValue2, amountToConvert)
    
       
  }



  console.log(currencyValue1+","+ currencyValue2+","+ amountToConvert);
  
  return (
    <section>
    <div>
      <form onSubmit={handleSubmit}>
        
        <select name="currencyPick1" onChange={valueSelected1}>
          {currencyArray.map((code) => <CurrencyCodes key={code} currCode={code} />)}
        </select> 
        <select name="currencyPick2" onChange={valueSelected2}>
          {currencyArray.map((code) => <CurrencyCodes key={code} currCode={code} />)}
        </select>

        <label>
          Amount:
          <input value={amountToConvert}
            type="text" name="amount" onChange={ setAmount} />
        </label>
        <button>submit</button>
      </form>
    </div>
    <div>{resultConversion}</div>

    </section>
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


function CurrencyCodes(props) {
  return <option key={props.currCode} value={props.currCode} >{props.currCode}</option>
}


function App() {
  console.log(CurrenciesList.currencyValue1 + "," + CurrenciesList.currencyValue2 + "," + CurrenciesList.amountToConvert);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Currency Conversion App
        </p>
      </header>
      
      <CurrenciesList>
        
      </CurrenciesList>
     
    </div> 
  ); 
}

export default App;
