function SubmitBtn({ handleSubmit }) {
    return (
        <div className="button-wrapper col-12 col-sm-6 col-md-12">
            <button className="submit-btn" onClick={handleSubmit}>submit</button>
        </div>
    )
}

export default SubmitBtn;