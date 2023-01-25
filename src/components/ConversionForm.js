import DropdownButtons from "./DropdownButtons";
import AmountToConvert from "./AmountToConvert";
import SubmitBtn from "./SubmitBtn";


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
        <section className="converter-section col-12 col-md-7">
            <div className="form-container">
                <div className="form-wrapper col-12 col-sm-11 col-md-10">
                    <form className="needs-validation">
                        <DropdownButtons
                            currenciesList={currenciesAll}
                            selection1={currencyInput1}
                            selection2={currencyInput2}
                        ></DropdownButtons>

                        <div className="amount-wrapper row">
                            <AmountToConvert
                                amount={amountInput}
                                setAmount={amountSet}
                            ></AmountToConvert>
                        </div> 
                        <div className="submit-wrapper">
                            <SubmitBtn handleSubmit={submitConversion}></SubmitBtn> 
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ConversionForm;