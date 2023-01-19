function SubmitBtn({ handleSubmit }) {
    return (
        <div className="button-wrapper col-6 col-sm-6 col-md-5">
            <button className="submit-btn" onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default SubmitBtn;