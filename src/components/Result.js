function Result({ amountConverted, convResult, convertedTo, convertedFrom }) {
    //console.log('test' + amountConverted)
    return (

        <section className='result-section row'>

            <div className='result-wrapper col-10 col-sm-12 col-md-12'>
                <div className="result col-12 col-sm-10">
                    <h1>{amountConverted}{' '}{convertedFrom}</h1>
                    <h1>=</h1>
                    <h1>{' '}{convResult}{' '}{convertedTo}</h1>
                </div>
            </div>
        </section>
    )
}

export default Result;