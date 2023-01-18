
import Select from 'react-select'
let currencyArray = new Array();

function DropdownButtons({ currenciesList, selection1, selection2 }) {
    
    let svgFlag;
    let pngFlag;
    let code;
    let codeName;

    for (let i = 0; i < currenciesList.length; i++) {
        let currencyItem = currenciesList[i]
        let currencyInfo = currencyItem.currencies
        let currencyFlags = currencyItem.flags;

        if (currencyInfo !== undefined) {

            for (let i = 0; i < currencyInfo.length; i++) {

                code = currencyInfo[i]['code'];
                codeName = currencyInfo[i]['name'];
                // console.log(code)
                switch (code) {
                    case "EUR":
                        svgFlag = "https://flagcdn.com/eu.svg"
                        pngFlag = "https://flagcdn.com/w320/eu.png"
                        // console.log(svgFlag)
                        break;
                    case "USD":
                        svgFlag = "https://flagcdn.com/us.svg"
                        pngFlag = "https://flagcdn.com/w320/us.png"
                        //     console.log(svgFlag)
                        break;
                    case "GBP":
                        svgFlag = "https://flagcdn.com/gb.svg"
                        pngFlag = "https://flagcdn.com/w320/gb.png"
                        //     console.log(svgFlag)
                        break;
                    case "INR":
                        svgFlag = "https://flagcdn.com/in.svg"
                        pngFlag = "https://flagcdn.com/w320/in.png"
                        //     console.log(svgFlag)
                        break;
                    case "SGD":
                        svgFlag = "https://flagcdn.com/sg.svg"
                        pngFlag = "https://flagcdn.com/w320/sg.png"
                        //     console.log(svgFlag)
                        break;
                    default:
                        svgFlag = currencyFlags.svg
                        pngFlag = currencyFlags.png
                        console.log(code, svgFlag, pngFlag)
                }


                let currencyObject = {
                    codeCurrency: code,
                    name: codeName,
                    flagSVG: svgFlag,
                    flagPNG: pngFlag
                }

                addToArray(currencyObject)


            }

        }

    }



    let defaultCurrency = "Currency";
    let placeholderValue = "Currency"

    const options = currencyArray.map((currencyCode) => ({
        "value": currencyCode.codeCurrency,
        "label": <div className="currency-item"><div className="flag-wrapper"><img className="flag-icon rounded-circle" src={currencyCode.flagSVG} /></div> <span className="currency-name">{currencyCode.codeCurrency} - {currencyCode.name}</span></div>
    }))



    console.log(options);
    return (
        <div className="dropdowns row">

            <div className="select-wrapper col-12 col-sm-5 col-md-12">
                <div className="select" id="select1">
                    <label>
                        From
                        {<Select className="basic-single"
                            classNamePrefix="select"
                            options={options}
                            placeholder={defaultCurrency}
                            onChange={selection1} /> }
                    </label>
                </div>
                <div className="errorMessage" id="alertOriginCurrency"></div>
            </div>

            <div className="select-wrapper col-12 col-sm-5 col-md-12">
                <div className="select" id="select2">
                    <label>
                        To
                        { <Select className="basic-single"
                            classNamePrefix="select"
                            isSearchable="true"
                            placeholder={placeholderValue}
                            options={options}
                            onChange={selection2} /> }
                    </label>
                </div>
                <div className="errorMessage" id="alertDestinationCurrency"></div>
            </div>

        </div>
    )
}

function addToArray(currencyToAddObject) {

    if (currencyArray.some(currency => currency.codeCurrency === currencyToAddObject.codeCurrency)) {

    } else {
        // console.log(currencyToAddObject)
        currencyArray.push(currencyToAddObject);
    }

}

export default DropdownButtons;