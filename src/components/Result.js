function Result({ amountConverted, convResult, convertedTo, convertedFrom }) {
    //console.log('test' + amountConverted)
    return (

        <section className='result-section row'>

            <div className='result-wrapper col-12 col-sm-10 col-md-8'>
                <div className="result">
                    <h1>{amountConverted}{' '}{convertedFrom}</h1>
                    <h1>=</h1>
                    <h1>{' '}{convResult}{' '}{convertedTo}</h1>
                </div>
            </div>
        </section>
    )
}

export default Result;