import Result from './Result';
import LoadingConversion from './LoadingConversion';

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

export default DisplayConversion;