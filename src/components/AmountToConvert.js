function AmountToConvert({ setAmount, amount }) {
    return (
        <div className="amount col-12 col-sm-10 col-md-12">
            <div className="select-amount">
                <label>
                    Amount:
                    <div className='amount-single'>
                        <input
                            className="amount-input"
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={setAmount}
                            required
                        />
                    </div>
                </label>
            </div>
            <div className="errorMessage" id="alertMessageAmount"></div>
        </div>
    )
}

export default AmountToConvert;