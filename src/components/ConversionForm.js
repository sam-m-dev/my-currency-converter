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
        <section className="converter-section row">
            <div className="form-wrapper col-10 col-sm-12 col-md-12">
                <form className="needs-validation">
                    <DropdownButtons
                        currenciesList={currenciesAll}
                        selection1={currencyInput1}
                        selection2={currencyInput2}
                    ></DropdownButtons>

                    <div className="amount-submit-wrapper row">
                        <AmountToConvert
                            amount={amountInput}
                            setAmount={amountSet}
                        ></AmountToConvert>
                        <SubmitBtn handleSubmit={submitConversion}></SubmitBtn> 
                    </div> 
                </form>
            </div>
        </section>
    )
}

export default ConversionForm;